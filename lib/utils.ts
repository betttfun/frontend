/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PublicKey, TokenAmount } from "@solana/web3.js";
import { SOLANA_CONNECTION } from "../const";
import { getAssociatedTokenAddress } from "@solana/spl-token";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getTokenAccountBalance(tokenAccount: PublicKey): Promise<TokenAmount | null> {
    try {
        const accountInfo = await SOLANA_CONNECTION.getParsedAccountInfo(tokenAccount) as any;
        
        if (!accountInfo) {
            return null;
        }

        return {
            amount: accountInfo.value.data.parsed.info.tokenAmount.amount,
            decimals: accountInfo.value?.data.parsed.info.tokenAmount.decimals,
            uiAmount: accountInfo.value.data.parsed.info.tokenAmount.uiAmount,
            uiAmountString: accountInfo.value.data.parsed.info.tokenAmount.uiAmountString,
        };
    } catch (error) {
        console.error('Error getting token balance:', error);
        return null;
    }
}

export async function getWalletTokenBalance(walletAddress: PublicKey, tokenMint: PublicKey): Promise<TokenAmount | null> {
  try {
      const tokenAccount = await getAssociatedTokenAddress(tokenMint, walletAddress);
      const balance = await SOLANA_CONNECTION.getTokenAccountBalance(tokenAccount);

      return balance.value;
  } catch (error) {
      console.error(error);
      return null;
  }
}

export function abbreviateNumber(num: number): string {
  const abbreviations = [
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ];

  for (const { value, symbol } of abbreviations) {
    if (num >= value) {
      // Using Math.floor to avoid rounding
      const truncated = Math.floor((num / value) * 100) / 100;
      return truncated + symbol;
    }
  }
  
  // For numbers less than 1000, show exact value without rounding
  return Math.floor(num * 100) / 100 + '';
}