/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/bet_token.json`.
 */
export type BetToken = {
    "address": "ASkY59ftzBQghY8UyouNcrW9yqUxfj7h8ZzxJcLLWz76",
    "metadata": {
      "name": "betToken",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "initializeBetVault",
        "discriminator": [
          50,
          239,
          133,
          55,
          197,
          177,
          13,
          206
        ],
        "accounts": [
          {
            "name": "payer",
            "writable": true,
            "signer": true,
            "address": "4grLJhLZZAXKuHcLa6BSH5UVHQdTLdoW6tRY1Qou5nz4"
          },
          {
            "name": "betMint"
          },
          {
            "name": "betVault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "betMint"
                }
              ]
            }
          },
          {
            "name": "vaultAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "rent",
            "address": "SysvarRent111111111111111111111111111111111"
          }
        ],
        "args": []
      },
      {
        "name": "initializeCbetVault",
        "discriminator": [
          0,
          198,
          215,
          125,
          232,
          180,
          195,
          83
        ],
        "accounts": [
          {
            "name": "payer",
            "writable": true,
            "signer": true,
            "address": "4grLJhLZZAXKuHcLa6BSH5UVHQdTLdoW6tRY1Qou5nz4"
          },
          {
            "name": "cbetMint"
          },
          {
            "name": "cbetVault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    99,
                    104,
                    105,
                    101,
                    102,
                    115,
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "cbetMint"
                }
              ]
            }
          },
          {
            "name": "payerCbetTokenAccount",
            "writable": true
          },
          {
            "name": "vaultAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "rent",
            "address": "SysvarRent111111111111111111111111111111111"
          }
        ],
        "args": []
      },
      {
        "name": "initializeEbetVault",
        "discriminator": [
          196,
          240,
          77,
          88,
          65,
          241,
          58,
          231
        ],
        "accounts": [
          {
            "name": "payer",
            "writable": true,
            "signer": true,
            "address": "4grLJhLZZAXKuHcLa6BSH5UVHQdTLdoW6tRY1Qou5nz4"
          },
          {
            "name": "ebetMint"
          },
          {
            "name": "ebetVault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    101,
                    97,
                    103,
                    108,
                    101,
                    115,
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "ebetMint"
                }
              ]
            }
          },
          {
            "name": "payerEbetTokenAccount",
            "writable": true
          },
          {
            "name": "vaultAuthority",
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "rent",
            "address": "SysvarRent111111111111111111111111111111111"
          }
        ],
        "args": []
      },
      {
        "name": "placeBet",
        "docs": [
          "The user (bettor) sends an amount of the main bet token (from bettor_main_token_account)",
          "to the main bet vault. In exchange, they receive the same amount from the appropriate vault:",
          "- If the bet type is 0, tokens are transferred from the ebet_vault into the user's",
          "receiving token account.",
          "- If the bet type is 1, tokens are transferred from the cbet_vault instead.",
          "",
          "Note that the transfer _from_ the vault requires the vault authority PDA to sign."
        ],
        "discriminator": [
          222,
          62,
          67,
          220,
          63,
          166,
          126,
          33
        ],
        "accounts": [
          {
            "name": "bettor",
            "docs": [
              "The bettor (any signer)"
            ],
            "writable": true,
            "signer": true
          },
          {
            "name": "bettorMainTokenAccount",
            "docs": [
              "The bettor's token account for the main bet token."
            ],
            "writable": true
          },
          {
            "name": "betMint",
            "docs": [
              "The main bet token mint."
            ]
          },
          {
            "name": "betVault",
            "docs": [
              "The main bet vault. Its address is derived using [BET_VAULT_SEED, bet_mint.key()]."
            ],
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "betMint"
                }
              ]
            }
          },
          {
            "name": "vaultAuthority",
            "docs": [
              "The PDA authority used as the owner of the vaults."
            ],
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "ebetMint",
            "docs": [
              "The mint for the Eagles bet token."
            ]
          },
          {
            "name": "ebetVault",
            "docs": [
              "The vault holding the Eagles bet tokens."
            ],
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    101,
                    97,
                    103,
                    108,
                    101,
                    115,
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "ebetMint"
                }
              ]
            }
          },
          {
            "name": "cbetMint",
            "docs": [
              "The mint for the Chiefs bet token."
            ]
          },
          {
            "name": "cbetVault",
            "docs": [
              "The vault holding the Chiefs bet tokens."
            ],
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    99,
                    104,
                    105,
                    101,
                    102,
                    115,
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "cbetMint"
                }
              ]
            }
          },
          {
            "name": "bettorSideTokenAccount",
            "docs": [
              "The bettor's token account to receive tokens from the side vault.",
              "",
              "Its mint must match whichever bet type is selected:",
              "- For BetType::Eagles, the mint must equal ebet_mint.",
              "- For BetType::Chiefs, it must equal cbet_mint."
            ],
            "writable": true
          },
          {
            "name": "clock",
            "docs": [
              "Sysvar clock for checking the current time."
            ],
            "address": "SysvarC1ock11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": [
          {
            "name": "betType",
            "type": "u8"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "withdrawAll",
        "docs": [
          "This instruction can only be executed by the AUTHORIZED_WALLET and only after the game",
          "has started plus 30 minutes. It withdraws all tokens from the bet_vault, cbet_vault,",
          "and ebet_vault, transferring them to the AUTHORIZED_WALLET's respective token accounts."
        ],
        "discriminator": [
          96,
          246,
          166,
          130,
          229,
          50,
          43,
          70
        ],
        "accounts": [
          {
            "name": "authorizedWallet",
            "docs": [
              "Only the authorized wallet can call this instruction."
            ],
            "writable": true,
            "signer": true,
            "address": "4grLJhLZZAXKuHcLa6BSH5UVHQdTLdoW6tRY1Qou5nz4"
          },
          {
            "name": "authorizedBetTokenAccount",
            "docs": [
              "The authorized wallet's token account for the main bet token."
            ],
            "writable": true
          },
          {
            "name": "betMint"
          },
          {
            "name": "betVault",
            "docs": [
              "The main bet vault."
            ],
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "betMint"
                }
              ]
            }
          },
          {
            "name": "authorizedCbetTokenAccount",
            "docs": [
              "The authorized wallet's token account for the CBET token."
            ],
            "writable": true
          },
          {
            "name": "cbetMint"
          },
          {
            "name": "cbetVault",
            "docs": [
              "The CBET vault."
            ],
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    99,
                    104,
                    105,
                    101,
                    102,
                    115,
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "cbetMint"
                }
              ]
            }
          },
          {
            "name": "authorizedEbetTokenAccount",
            "docs": [
              "The authorized wallet's token account for the EBET token."
            ],
            "writable": true
          },
          {
            "name": "ebetMint"
          },
          {
            "name": "ebetVault",
            "docs": [
              "The EBET vault."
            ],
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    101,
                    97,
                    103,
                    108,
                    101,
                    115,
                    98,
                    101,
                    116,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                },
                {
                  "kind": "account",
                  "path": "ebetMint"
                }
              ]
            }
          },
          {
            "name": "vaultAuthority",
            "docs": [
              "The PDA authority used as the owner of the vaults."
            ],
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    118,
                    97,
                    117,
                    108,
                    116,
                    95,
                    97,
                    117,
                    116,
                    104,
                    111,
                    114,
                    105,
                    116,
                    121
                  ]
                }
              ]
            }
          },
          {
            "name": "clock",
            "docs": [
              "Sysvar clock for checking the current time."
            ],
            "address": "SysvarC1ock11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": []
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "invalidBetAmount",
        "msg": "Bet amount must be nonzero."
      },
      {
        "code": 6001,
        "name": "invalidSideTokenAccount",
        "msg": "The provided token account does not match the required mint for the bet type."
      },
      {
        "code": 6002,
        "name": "bettingClosed",
        "msg": "Betting period is over. No more bets can be placed."
      },
      {
        "code": 6003,
        "name": "withdrawalNotAllowed",
        "msg": "Withdrawal not allowed until after game start + 30 minutes."
      },
      {
        "code": 6004,
        "name": "invalidBetType",
        "msg": "Invalid bet type. Must be 0 for Eagles or 1 for Chiefs."
      }
    ]
  };
  