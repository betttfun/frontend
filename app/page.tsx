"use client";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getTokenAccountBalance, getWalletTokenBalance, abbreviateNumber } from "@/lib/utils";
import {
  BET_TOKEN_ADDRESS,
  CHIEFS_POOL_ADDRESS,
  CHIEFS_TOKEN_ADDRESS,
  EAGLES_POOL_ADDRESS,
  EAGLES_TOKEN_ADDRESS,
  MAIN_REWARDS_POOL_ADDRESS,
  SOLANA_CONNECTION,
} from "../const";
import { PublicKey } from "@solana/web3.js";
import { getBetTransaction } from "@/lib/program";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WalletMultiButtonDynamic = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function SuperBowlBet() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);

  const [betAmount, setBetAmount] = useState("");

  const [eaglesPool, setEaglesPool] = useState("0");
  const [chiefsPool, setChiefsPool] = useState("0");
  const [mainRewardsPoolAddress, setMainRewardsPoolAddress] = useState("");

  const [totalEBetMinted, setTotalEBetMinted] = useState(0);
  const [totalCBetMinted, setTotalCBetMinted] = useState(0);

  const [userBetTokens, setUserBetTokens] = useState({ cBET: "0", eBET: "0" });
  const [userBettBalance, setUserBettBalance] = useState("0");

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeDialog(true);
      sessionStorage.setItem('hasSeenWelcome', 'true');
    }
  }, []);

  useEffect(() => {
    const fetchMainRewardsPoolAddress = async () => {
      const totalBalance = await getTokenAccountBalance(
        new PublicKey(MAIN_REWARDS_POOL_ADDRESS)
      );
      setMainRewardsPoolAddress(totalBalance?.uiAmountString || "0");
    };

    const fetchEaglesPool = async () => {
      const eaglesPoolBalance = await getTokenAccountBalance(
        new PublicKey(EAGLES_POOL_ADDRESS)
      );
      if (eaglesPoolBalance?.uiAmount) {
        setEaglesPool((1000000000 - eaglesPoolBalance.uiAmount).toString());
        setTotalEBetMinted(eaglesPoolBalance.uiAmount);
      }
    };

    const fetchChiefsPool = async () => {
      const chiefsPoolBalance = await getTokenAccountBalance(
        new PublicKey(CHIEFS_POOL_ADDRESS)
      );
      if (chiefsPoolBalance?.uiAmount) {
        setChiefsPool((1000000000 - chiefsPoolBalance.uiAmount).toString());
        setTotalCBetMinted(chiefsPoolBalance.uiAmount);
      }
    };

    fetchMainRewardsPoolAddress();
    fetchEaglesPool();
    fetchChiefsPool();

    const interval = setInterval(async () => {
      await fetchChiefsPool();
      await fetchEaglesPool();
      await fetchMainRewardsPoolAddress();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (connected && publicKey) {
      const fetchUserBetTokens = async () => {
        const cBETBalance = await getWalletTokenBalance(
          publicKey,
          new PublicKey(CHIEFS_TOKEN_ADDRESS)
        );
        const eBETBalance = await getWalletTokenBalance(
          publicKey,
          new PublicKey(EAGLES_TOKEN_ADDRESS)
        );
        const bettBalance = await getWalletTokenBalance(
          publicKey,
          new PublicKey(BET_TOKEN_ADDRESS)
        );

        setUserBetTokens({
          cBET: cBETBalance?.uiAmountString || "0",
          eBET: eBETBalance?.uiAmountString || "0",
        });
        setUserBettBalance(bettBalance?.uiAmountString || "0");
      };

      fetchUserBetTokens();
    }
  }, [connected, publicKey]);

  const placeBet = async (team: "eagles" | "chiefs") => {
    console.log(`Placing bet of ${betAmount} $BETT on ${team}`);
    if (!publicKey) {
      alert("Please connect your wallet");
      return;
    }

    const tx = await getBetTransaction({
      userWallet: publicKey,
      betAmount: Number(betAmount),
      betType: team,
    });

    if (!tx) {
      alert("Failed to get transaction");
      return;
    }

    const sendResponse = await sendTransaction(tx, SOLANA_CONNECTION, {
      skipPreflight: true,
    });
    console.log(sendResponse);
  };

  const rewardPool = parseFloat(mainRewardsPoolAddress) || 0;
  const userEBet = parseFloat(userBetTokens.eBET) || 0;
  const userCBet = parseFloat(userBetTokens.cBET) || 0;

  const estimatedEaglesReward =
    totalEBetMinted > 0 ? (userEBet / totalEBetMinted) * rewardPool : 0;
  const estimatedChiefsReward =
    totalCBetMinted > 0 ? (userCBet / totalCBetMinted) * rewardPool : 0;

  const totalEstimatedReward = estimatedEaglesReward + estimatedChiefsReward;

  const eaglesPoolNum = parseFloat(eaglesPool) || 0;
  const chiefsPoolNum = parseFloat(chiefsPool) || 0;
  const eaglesPercent =
    rewardPool > 0 ? ((eaglesPoolNum / rewardPool) * 100).toFixed(2) : "0";
  const chiefsPercent =
    rewardPool > 0 ? ((chiefsPoolNum / rewardPool) * 100).toFixed(2) : "0";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-[#0b0b0b] to-black">
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="bg-black border border-[#121212] text-white rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">Welcome to BETTT.FUN!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="flex items-center gap-2">
              <span className="font-bold text-[#00e0b7]">Step 1:</span>
              <span>Buy $BETTT on <a href="https://jup.ag" target="_blank" rel="noopener noreferrer" className="text-[#00e0b7] hover:underline">jup.ag</a></span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-[#00e0b7]">Step 2:</span>
              <span>Connect your wallet to BETTT.FUN</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-[#00e0b7]">Step 3:</span>
              <span>Pick which team you think will win the Super Bowl</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-[#00e0b7]">Step 4:</span>
              <span>Enter the amount of $BETTT you want to bet</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-bold text-[#00e0b7]">Step 5:</span>
              <span>Earn tokens when your team wins!</span>
            </p>
          </div>
          <Button 
            onClick={() => setShowWelcomeDialog(false)}
            className="w-full mt-4 bg-[#00e0b7] text-black font-semibold hover:bg-[#00b298] py-2 rounded-2xl"
          >
            Got it!
          </Button>
        </DialogContent>
      </Dialog>

      <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-black border-b border-[#ffffff10] overflow-x-hidden">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Image src="/logo-white.png" alt="BETTT.FUN" width={35} height={35} className="sm:w-[45px] sm:h-[45px]" />
          <h1 className="hidden sm:block text-white font-bold text-base sm:text-lg tracking-wide">
            BETTT.FUN
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent h-12 w-12 sm:h-20 sm:w-20"
            onClick={() => window.open('https://x.com/betttdotfun', '_blank')}
          >
            <FaXTwitter className="h-6 w-6 sm:h-12 sm:w-12 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent h-12 w-12 sm:h-20 sm:w-20"
            onClick={() => window.open('https://github.com/betttfun', '_blank')}
          >
            <FaGithub className="h-6 w-6 sm:h-12 sm:w-12 text-white" />
          </Button>
          <WalletMultiButtonDynamic className="bg-[#00e0b7] hover:bg-[#00b298] text-black font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base" />
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-md w-full mx-auto px-4 py-10 flex flex-col gap-8">
          <Card className="bg-[#00000020] border border-[#121212] rounded-3xl shadow-xl transition-transform hover:scale-[1.01]">
            <CardHeader>
              <div className="flex justify-center py-4">
                <h2 className="text-2xl font-bold text-white">
                  Super Bowl LIX
                </h2>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-6">
              {connected ? (
                <>
                  <div className="space-y-2">
                    <label
                      htmlFor="betAmount"
                      className="text-white font-medium text-sm"
                    >
                      Enter amount you want to Bet
                    </label>
                    <Input
                      id="betAmount"
                      type="number"
                      className="bg-black border border-[#2a2a2a] text-white text-2xl placeholder:text-gray-500 p-4 rounded-2xl outline-none focus:outline-none focus:border-[#00e0b7] focus:ring-0"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      placeholder="0.00"
                    />
                    <p className="text-xs text-gray-400">
                      Balance: {abbreviateNumber(parseFloat(userBettBalance))} $BETT
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => placeBet("eagles")}
                      disabled={!betAmount}
                      className="bg-[#00e0b7] text-black font-semibold py-6 rounded-3xl hover:bg-[#00b298] text-xl"
                    >
                      Eagles
                    </Button>
                    <Button
                      onClick={() => placeBet("chiefs")}
                      disabled={!betAmount}
                      className="bg-[#00e0b7] text-black font-semibold py-6 rounded-3xl hover:bg-[#00b298] text-xl"
                    >
                      Chiefs
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center text-white font-medium">
                  Connect your wallet to start betting.
                </p>
              )}
            </CardContent>
            <CardFooter className="px-8 pb-4 text-center">
              <p className="font-normal text-gray-400 text-sm px-5">
                {!connected
                  ? ""
                  : "After placing your bet, you will receive a tokenized version of your BETTT."}
              </p>
            </CardFooter>
          </Card>

          <Card className="bg-[#00000020] border border-[#121212] rounded-3xl shadow-xl transition-transform hover:scale-[1.01]">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col items-center space-y-1">
                  <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-400">
                    Eagles Pool
                  </h3>
                  <p className="text-white text-lg font-semibold">
                    {abbreviateNumber(parseFloat(eaglesPool))} BETTT
                  </p>
                  <p className="text-xs text-gray-500">{eaglesPercent}%</p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <h3 className="font-semibold text-xs uppercase tracking-wide text-gray-400">
                    Chiefs Pool
                  </h3>
                  <p className="text-white text-lg font-semibold">
                    {abbreviateNumber(parseFloat(chiefsPool))} BETTT
                  </p>
                  <p className="text-xs text-gray-500">{chiefsPercent}%</p>
                </div>
              </div>

              {/* <p className="font-semibold text-white">
                    cBETTT: {userBetTokens.cBET}
                  </p>
                  <p className="font-semibold text-white">
                    eBETTT: {userBetTokens.eBET}
                  </p> */}
            </CardContent>
          </Card>
          <Card className="bg-[#00000020] border border-[#121212] rounded-3xl shadow-xl transition-transform hover:scale-[1.01] p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <h2 className="text-xs font-regular text-white">
                  Total Rewards
                </h2>
                <p className="text-md font-bold text-[#00e0b7]">
                  {abbreviateNumber(parseFloat(mainRewardsPoolAddress))} BETTT
                </p>
              </div>

              <div>
                <h2 className="text-xs font-regular text-white">Estimated Earnings </h2>{" "}
                <p className="text-md font-bold text-[#00e0b7]">
                  {abbreviateNumber(totalEstimatedReward)} BETTT
                </p>
              </div>
            </div>
          </Card>
          <p className="px-6 text-sm font-normal text-gray-700 text-center">
            Connect your wallet to start betting. Winners will receive tokens
            from the prize pool after the Super Bowl.
          </p>
        </div>
      </main>

      <footer className="bg-black py-4 text-center text-gray-500 text-xs">
        <p>© 2025 BETTT.FUN. All rights reserved.</p>
      </footer>
    </div>
  );
}
