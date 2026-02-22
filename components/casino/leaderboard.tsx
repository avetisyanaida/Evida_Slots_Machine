"use client"

import { useGame } from "@/components/casino/game-provider"
import { formatNumber } from "@/lib/utils"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"

interface LeaderboardProps {
  onBack: () => void
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const { leaderboard, playSound } = useGame()

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-primary" />
    if (index === 1) return <Medal className="w-5 h-5 text-muted-foreground" />
    if (index === 2) return <Award className="w-5 h-5 text-accent" />
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">{index + 1}</span>
  }

  const getRankBg = (index: number) => {
    if (index === 0) return "bg-primary/10 border-primary/30"
    if (index === 1) return "bg-muted/30 border-border/50"
    if (index === 2) return "bg-accent/10 border-accent/30"
    return "bg-card/40 border-border/30"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-casino-dark via-background to-casino-dark">
      {/* Header */}
      <header className="flex items-center gap-4 px-4 py-4 bg-background/30 backdrop-blur-md border-b border-border/30">
        <button
          onClick={() => { playSound("click"); onBack() }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Leaderboard</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {leaderboard.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">{"\u{1F3C6}"}</div>
            <h2 className="text-xl font-bold text-foreground mb-2">No Scores Yet</h2>
            <p className="text-sm text-muted-foreground">
              Play some games and land big wins to appear on the leaderboard!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {leaderboard.map((entry, index) => (
              <div
                key={`${entry.name}-${entry.date}-${index}`}
                className={`flex items-center gap-3 rounded-xl border p-4 transition-all ${getRankBg(index)}`}
              >
                <div className="flex-shrink-0">
                  {getRankIcon(index)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground truncate">{entry.name}</span>
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full flex-shrink-0">
                      {entry.game}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-lg font-black text-primary font-mono">
                    {formatNumber(entry.score)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
