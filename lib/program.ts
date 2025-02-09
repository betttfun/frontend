/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */

import { BET_TOKEN_ADDRESS, BET_VAULT_SEED, CBET_VAULT_SEED, CHIEFS_TOKEN_ADDRESS, EAGLES_TOKEN_ADDRESS, EBET_VAULT_SEED, MAIN_REWARDS_POOL_ADDRESS, SOLANA_CONNECTION, VAULT_AUTHORITY_SEED } from '../const';
import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import idl from './idl2.json';
import { Account, createAssociatedTokenAccountInstruction, getAccount, getAssociatedTokenAddress, getAssociatedTokenAddressSync, getOrCreateAssociatedTokenAccount, TOKEN_PROGRAM_ID, TokenAccountNotFoundError, TokenInvalidAccountOwnerError } from '@solana/spl-token';
import { ASSOCIATED_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import { Program } from "@coral-xyz/anchor";
import { BetToken } from './betProgramType';

const BETT_PROGRAM_ID = new PublicKey('ASkY59ftzBQghY8UyouNcrW9yqUxfj7h8ZzxJcLLWz76');

const provider = new anchor.AnchorProvider(SOLANA_CONNECTION, new Keypair() as any, {});
const BETT_PROGRAM = new Program<BetToken>(idl as BetToken, {} as anchor.Provider);

interface BetInstructionArgs {
    userWallet: PublicKey;
    betAmount: number;
    betType: 'eagles' | 'chiefs';
}

const getProgramPDA = (seed: string, extraPubKey?: PublicKey) => {
    const seeds: any[] = [Buffer.from(seed)];

    if (extraPubKey) {
        seeds.push(extraPubKey.toBuffer());
    }

    const [programPDA] = PublicKey.findProgramAddressSync(
        seeds,
        BETT_PROGRAM_ID
      );

    return programPDA;
}

const getPotentialSideBetTokenAccountCreationInstruction = async (tokenMint: PublicKey, owner: PublicKey, associatedTokenAccount: PublicKey): Promise<TransactionInstruction | null> => {
    try {
        let account: Account;

        try {
            account = await getAccount(SOLANA_CONNECTION, associatedTokenAccount, "confirmed", TOKEN_PROGRAM_ID);
        }
        catch (error) {
            if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
                // As this isn't atomic, it's possible others can create associated accounts meanwhile.
                try {
                    const instruction = createAssociatedTokenAccountInstruction(
                        owner,
                        associatedTokenAccount,
                        owner,
                        tokenMint,
                        TOKEN_PROGRAM_ID,
                        ASSOCIATED_PROGRAM_ID,
                    );

                    return instruction;
                } catch (error: unknown) {
                    // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
                    // instruction error if the associated account exists already.
                }
            }
        }

        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getBetTransaction = async (props: BetInstructionArgs) =>{
    try {
        const { userWallet, betAmount, betType } = props;

        const bettorMainTokenAccount = await getAssociatedTokenAddress(new PublicKey(BET_TOKEN_ADDRESS), props.userWallet);

        let firstArgument;
        let bettorSideTokenAccount;

        if (betType === 'eagles') {
            firstArgument = 0;
            
            bettorSideTokenAccount = getAssociatedTokenAddressSync(
                new PublicKey(EAGLES_TOKEN_ADDRESS),
                userWallet,
                false,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_PROGRAM_ID,
            );
        } else {
            firstArgument = 1;

            bettorSideTokenAccount = getAssociatedTokenAddressSync(
                new PublicKey(CHIEFS_TOKEN_ADDRESS),
                userWallet,
                false,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_PROGRAM_ID,
            );
        }

        const betInstruction = await BETT_PROGRAM.methods.placeBet(firstArgument, new anchor.BN(betAmount * 1_000_000)).accounts({
            bettor: userWallet,
            bettorMainTokenAccount: bettorMainTokenAccount,
            betMint: new PublicKey(BET_TOKEN_ADDRESS),
            // @ts-ignore
            betVault: getProgramPDA(BET_VAULT_SEED, new PublicKey(BET_TOKEN_ADDRESS)),
            vaultAuthority: getProgramPDA(VAULT_AUTHORITY_SEED),
            ebetMint: new PublicKey(EAGLES_TOKEN_ADDRESS),
            
            ebetVault: getProgramPDA(EBET_VAULT_SEED, new PublicKey(EAGLES_TOKEN_ADDRESS)),
            
            cbetMint: new PublicKey(CHIEFS_TOKEN_ADDRESS),
            cbetVault: getProgramPDA(CBET_VAULT_SEED, new PublicKey(CHIEFS_TOKEN_ADDRESS)),
            bettorSideTokenAccount: bettorSideTokenAccount,
            tokenProgram: TOKEN_PROGRAM_ID,
        }).instruction()

        const sideBetTokenAccountCreationInstruction = await getPotentialSideBetTokenAccountCreationInstruction(
            new PublicKey(BET_TOKEN_ADDRESS),
            userWallet,
            bettorSideTokenAccount,
        );
        
        let tx = new Transaction();

        const recentBlockhash = await SOLANA_CONNECTION.getLatestBlockhash();

        if (sideBetTokenAccountCreationInstruction) {
            tx.add(sideBetTokenAccountCreationInstruction);
        }

        tx.add(betInstruction);

        tx.recentBlockhash = recentBlockhash.blockhash;

        return tx;
    } catch (error) {
        console.error(error);
        return null;
    }
}