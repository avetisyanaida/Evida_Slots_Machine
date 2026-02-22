"use client"

import { SlotTheme } from "@/lib/slot-engine"
import { X, Star, Zap, Gift } from "lucide-react"

interface PaytableProps {
  theme: SlotTheme
  onClose: () => void
}

// Visual representation of the 20 paylines on a 3x5 grid
const PAYLINE_PATTERNS = [
  { label: "1", rows: [1, 1, 1, 1, 1] },
  { label: "2", rows: [0, 0, 0, 0, 0] },
  { label: "3", rows: [2, 2, 2, 2, 2] },
  { label: "4", rows: [0, 1, 2, 1, 0] },
  { label: "5", rows: [2, 1, 0, 1, 2] },
  { label: "6", rows: [0, 0, 1, 2, 2] },
  { label: "7", rows: [2, 2, 1, 0, 0] },
  { label: "8", rows: [1, 0, 0, 0, 1] },
  { label: "9", rows: [1, 2, 2, 2, 1] },
  { label: "10", rows: [0, 1, 0, 1, 0] },
  { label: "11", rows: [2, 1, 2, 1, 2] },
  { label: "12", rows: [1, 0, 1, 0, 1] },
  { label: "13", rows: [1, 2, 1, 2, 1] },
  { label: "14", rows: [0, 1, 1, 1, 0] },
  { label: "15", rows: [2, 1, 1, 1, 2] },
  { label: "16", rows: [0, 0, 1, 0, 0] },
  { label: "17", rows: [2, 2, 1, 2, 2] },
  { label: "18", rows: [1, 0, 1, 2, 1] },
  { label: "19", rows: [1, 2, 1, 0, 1] },
  { label: "20", rows: [0, 2, 0, 2, 0] },
]

function PaylineMiniGrid({ rows }: { rows: number[] }) {
  return (
    <div className="grid grid-cols-5 gap-px w-20 h-12">
      {Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => {
          const active = rows[c] === r
          return (
            <div
              key={`${r}-${c}`}
              className={`w-3.5 h-3.5 rounded-sm ${active ? "bg-primary" : "bg-background/20"}`}
            />
          )
        })
      )}
    </div>
  )
}

export function Paytable({ theme, onClose }: PaytableProps) {
  const regularSymbols = theme.symbols.filter(s => !s.isWild && !s.isScatter && !s.isBonus)
  const specialSymbols = theme.symbols.filter(s => s.isWild || s.isScatter || s.isBonus)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-casino-dark/90 backdrop-blur-sm p-4">
      <div className={`${theme.cardBg} border border-border/50 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-4 border-b border-border/30 sticky top-0 bg-inherit rounded-t-2xl z-10">
          <h2 className={`text-lg font-bold ${theme.accentColor}`}>Paytable - {theme.name}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Special symbols */}
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            Special Symbols
          </h3>
          <div className="flex flex-col gap-2 mb-6">
            {specialSymbols.map((s) => (
              <div key={s.id} className="flex items-center gap-3 bg-background/30 rounded-xl p-3">
                <span className="text-3xl">{s.emoji}</span>
                <div className="flex-1">
                  <span className="font-bold text-foreground text-sm">{s.name}</span>
                  <p className="text-xs text-muted-foreground">
                    {s.isWild && "Substitutes for all symbols. Wild pays highest!"}
                    {s.isScatter && `3+ anywhere triggers ${theme.freeSpinsCount} Free Spins + scatter pay`}
                    {s.isBonus && "3+ triggers Bonus Round with mystery prizes!"}
                  </p>
                </div>
                {s.isWild && <Zap className="w-4 h-4 text-primary" />}
                {s.isScatter && <Star className="w-4 h-4 text-neon-green" />}
                {s.isBonus && <Gift className="w-4 h-4 text-accent" />}
              </div>
            ))}
          </div>

          {/* Regular symbols with 3/4/5 of a kind payouts */}
          <h3 className="text-sm font-bold text-foreground mb-3">Symbol Payouts (per line bet)</h3>
          <div className="flex flex-col gap-1.5 mb-6">
            <div className="flex items-center gap-3 px-2.5 text-xs text-muted-foreground font-bold">
              <span className="w-10" />
              <span className="flex-1">Symbol</span>
              <span className="w-12 text-center">x3</span>
              <span className="w-12 text-center">x4</span>
              <span className="w-12 text-center">x5</span>
            </div>
            {regularSymbols.sort((a, b) => b.multiplier - a.multiplier).map((s) => (
              <div key={s.id} className="flex items-center gap-3 bg-background/20 rounded-lg p-2.5">
                <span className="text-2xl w-10 text-center">{s.emoji}</span>
                <span className="text-sm text-foreground flex-1">{s.name}</span>
                <span className="w-12 text-center text-xs font-mono text-primary">{s.multiplier}x</span>
                <span className="w-12 text-center text-xs font-mono text-primary">{s.multiplier * 3}x</span>
                <span className="w-12 text-center text-xs font-mono font-bold text-primary">{s.multiplier * 10}x</span>
              </div>
            ))}
          </div>

          {/* Paylines visual grid */}
          <h3 className="text-sm font-bold text-foreground mb-3">20 Paylines</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {PAYLINE_PATTERNS.map((pl) => (
              <div key={pl.label} className="flex flex-col items-center gap-1 bg-background/20 rounded-lg p-2">
                <span className="text-[10px] font-bold text-muted-foreground">Line {pl.label}</span>
                <PaylineMiniGrid rows={pl.rows} />
              </div>
            ))}
          </div>

          {/* Rules */}
          <div className="bg-background/20 rounded-xl p-4 text-xs text-muted-foreground space-y-1.5">
            <p className="font-bold text-foreground text-sm mb-2">Rules</p>
            <p>Match 3, 4, or 5 identical symbols from the leftmost reel on a payline to win.</p>
            <p>20 paylines are always active. Your bet is divided equally across all lines.</p>
            <p>Wild symbols substitute for any regular symbol.</p>
            <p>3+ Scatter symbols anywhere trigger Free Spins.</p>
            <p>3+ Bonus symbols anywhere trigger the Bonus Round.</p>
            <p>Wins = Line Bet x Multiplier x Count Bonus (3 = 1x, 4 = 3x, 5 = 10x).</p>
            <p>Max bet scales with your balance -- the more you earn, the higher you can bet!</p>
            <p className="pt-2 font-bold">RTP: {theme.rtp}% | Volatility: {theme.volatility}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
