"use client"

import { useState } from "react"
import { GameLobby } from "@/components/casino/game-lobby"
import { SlotMachine } from "@/components/casino/slot-machine"
import { Leaderboard } from "@/components/casino/leaderboard"
import { Paytable } from "@/components/casino/paytable"
import { SlotTheme } from "@/lib/slot-engine"
import { AdMob, RewardAdOptions } from '@capacitor-community/admob'
import { useGame } from "@/components/casino/game-provider"

type Screen = "lobby" | "game" | "leaderboard"

export default function CasinoPage() {
  const { credits, addWin, playSound } = useGame();

  const [screen, setScreen] = useState<Screen>("lobby")
  const [selectedTheme, setSelectedTheme] = useState<SlotTheme | null>(null)
  const [showPaytable, setShowPaytable] = useState(false)
  const [sessionWin, setSessionWin] = useState(0)

  const handleSelectGame = (theme: SlotTheme) => {
    setSelectedTheme(theme)
    setScreen("game")
  }

  const handleWatchAd = async () => {
    try {
      await AdMob.initialize();
      const options: RewardAdOptions = {
        adId: 'ca-app-pub-2296093498264168/1256842236',
      };

      await AdMob.prepareRewardVideoAd(options);
      const reward = await AdMob.showRewardVideoAd();

      if (reward && reward.type) {
        addWin(10000);
        setSessionWin((prev: number) => prev + 10000);
        playSound("bigwin");
        console.log("Success! +10,000 Credits added.");
      }
    } catch (error) {
      console.error("AdMob Error:", error);
    }
  };


  return (
      <main className="min-h-screen relative">
        {screen === "lobby" && (
            <GameLobby
                onSelectGame={handleSelectGame}
                onShowLeaderboard={() => setScreen("leaderboard")}
            />
        )}

        {screen === "game" && selectedTheme && (
            <>
              <SlotMachine
                  theme={selectedTheme}
                  onBack={() => setScreen("lobby")}
                  onWatchAd={handleWatchAd}
              />

              {credits <= 20000 && (
                  <button
                      onClick={handleWatchAd}
                      className="fixed bottom-40 right-4 px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold shadow-2xl animate-bounce z-50 border-2 border-white"
                  >
                    📺 +10,000 Credits
                  </button>
              )}

              <button
                  onClick={() => setShowPaytable(true)}
                  className="fixed bottom-24 right-4 w-12 h-12 rounded-full bg-card border border-border/50 flex items-center justify-center text-xl shadow-lg hover:scale-110 transition-transform z-40"
                  aria-label="View paytable"
              >
                {"\u{2139}\u{FE0F}"}
              </button>
              {showPaytable && (
                  <Paytable theme={selectedTheme} onClose={() => setShowPaytable(false)} />
              )}
            </>
        )}

        {screen === "leaderboard" && (
            <Leaderboard onBack={() => setScreen("lobby")} />
        )}
      </main>
  )
}