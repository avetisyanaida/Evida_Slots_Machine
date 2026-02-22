"use client"

import { useState } from "react"
import { GameLobby } from "@/components/casino/game-lobby"
import { SlotMachine } from "@/components/casino/slot-machine"
import { Leaderboard } from "@/components/casino/leaderboard"
import { Paytable } from "@/components/casino/paytable"
import { SlotTheme } from "@/lib/slot-engine"

type Screen = "lobby" | "game" | "leaderboard"

export default function CasinoPage() {
  const [screen, setScreen] = useState<Screen>("lobby")
  const [selectedTheme, setSelectedTheme] = useState<SlotTheme | null>(null)
  const [showPaytable, setShowPaytable] = useState(false)

  const handleSelectGame = (theme: SlotTheme) => {
    setSelectedTheme(theme)
    setScreen("game")
  }

  return (
    <main className="min-h-screen">
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
          />
          {/* Floating paytable button */}
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
