"use client"

import { useGame } from "@/components/casino/game-provider"
import { SLOT_THEMES, SlotTheme } from "@/lib/slot-engine"
import { formatNumber } from "@/lib/utils"
import { Volume2, VolumeX, Trophy, Coins, RotateCcw, Star, Zap, TrendingUp } from "lucide-react"

interface GameLobbyProps {
  onSelectGame: (theme: SlotTheme) => void
  onShowLeaderboard: () => void
}

export function GameLobby({ onSelectGame, onShowLeaderboard }: GameLobbyProps) {
  const { credits, totalWon, totalSpins, soundEnabled, toggleSound, resetCredits, playerName, setPlayerName, playSound } = useGame()

  return (
    <div className="min-h-screen bg-gradient-to-b from-casino-dark via-background to-casino-dark">
      {/* Hero header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative px-4 pt-8 pb-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="text-xl">
                  {"\u{1F3B0}"}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-black text-foreground tracking-tight">Lucky Spin</h1>
                <p className="text-xs text-muted-foreground">Demo Casino</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { playSound("click"); onShowLeaderboard() }}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Trophy className="w-5 h-5" />
              </button>
              <button
                onClick={toggleSound}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Player name input */}
          <div className="mb-6">
            <label className="text-xs text-muted-foreground mb-1 block">Player Name</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={16}
              className="w-full max-w-xs bg-input border border-border rounded-xl px-4 py-2 text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Enter your name..."
            />
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Credits</span>
              </div>
              <p className="text-xl font-black text-primary font-mono">{formatNumber(credits)}</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-neon-green" />
                <span className="text-xs text-muted-foreground">Total Won</span>
              </div>
              <p className="text-xl font-black text-neon-green font-mono">{formatNumber(totalWon)}</p>
            </div>
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-1">
                <RotateCcw className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Spins</span>
              </div>
              <p className="text-xl font-black text-foreground font-mono">{formatNumber(totalSpins)}</p>
            </div>
          </div>

          {/* Reset credits */}
          {credits < 100 && (
            <button
              onClick={() => { playSound("bonus"); resetCredits() }}
              className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Coins className="w-4 h-4" />
              Claim 100,000 Free Demo Credits
            </button>
          )}
        </div>
      </header>

      {/* Games section */}
      <section className="px-4 pb-8">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Slot Games</h2>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{SLOT_THEMES.length} games</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SLOT_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => { playSound("click"); onSelectGame(theme) }}
              className="group text-left"
            >
              <div className={`bg-gradient-to-br ${theme.bgGradient} rounded-2xl border border-border/30 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10`}>
                {/* Game preview */}
                <div className="p-4 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">{theme.icon}</span>
                    <div className="flex flex-col items-end gap-0.5">
                      {theme.bonusRounds && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent-foreground border border-accent/30">
                          BONUS
                        </span>
                      )}
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-neon-green/20 text-neon-green border border-neon-green/30">
                        FREE SPINS
                      </span>
                    </div>
                  </div>
                  <h3 className={`text-sm font-black ${theme.accentColor} mb-0.5`}>{theme.name}</h3>
                  <p className="text-[10px] text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                    {theme.description}
                  </p>
                  {/* Symbol preview */}
                  <div className="flex items-center gap-0.5 mb-2 flex-wrap">
                    {theme.symbols.slice(0, 5).map((s, i) => (
                      <span key={i} className="text-sm">{s.emoji}</span>
                    ))}
                  </div>
                </div>
                {/* Game info bar */}
                <div className="px-4 py-2 bg-background/20 flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">
                      Bet: <span className="text-foreground font-bold">{theme.minBet}-{theme.maxBet}</span>
                    </span>
                    <span className="text-muted-foreground">
                      RTP: <span className="text-foreground font-bold">{theme.rtp}%</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary" />
                    <span className={`font-bold ${
                      theme.volatility === "high" ? "text-accent" :
                      theme.volatility === "medium" ? "text-primary" : "text-neon-green"
                    }`}>
                      {theme.volatility.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Demo disclaimer */}
      <footer className="px-4 py-6 text-center border-t border-border/30">
        <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
          This is a demo casino for entertainment purposes only. No real money is involved.
          All credits are virtual and have no monetary value. Must be 18+ to play real casino games.
        </p>
      </footer>
    </div>
  )
}
