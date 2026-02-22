"use client"

import { useEffect, useState } from "react"
import { formatNumber } from "@/lib/utils"

interface WinCelebrationProps {
  amount: number
  isBigWin: boolean
  onComplete: () => void
}

export function WinCelebration({ amount, isBigWin, onComplete }: WinCelebrationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; size: number; symbol: string }>>([])
  const [countUp, setCountUp] = useState(0)

  useEffect(() => {
    if (!isBigWin) {
      onComplete()
      return
    }
    // Create particles
    const symbols = ["\u{1F4B0}", "\u{2B50}", "\u{1F48E}", "\u{1F451}", "\u{1FA99}", "\u{1F4B5}"]
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      size: Math.random() * 1.5 + 0.5,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }))
    setParticles(newParticles)

    // Count up animation
    const steps = 30
    const increment = amount / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= amount) {
        setCountUp(amount)
        clearInterval(interval)
      } else {
        setCountUp(Math.floor(current))
      }
    }, 50)

    const timer = setTimeout(onComplete, 4000)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [amount, isBigWin, onComplete])

  if (!isBigWin) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Coin rain particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-coin-rain"
          style={{
            left: `${p.x}%`,
            animationDelay: `${p.delay}s`,
            fontSize: `${p.size * 1.5}rem`,
            top: "-40px",
          }}
        >
          {p.symbol}
        </div>
      ))}

      {/* Center win amount */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center animate-bounce">
          <div className="text-5xl sm:text-7xl font-black text-primary drop-shadow-[0_0_30px_var(--gold)]">
            {formatNumber(countUp)}
          </div>
          <div className="text-xl sm:text-2xl font-bold text-foreground mt-2 tracking-widest">
            BIG WIN
          </div>
        </div>
      </div>
    </div>
  )
}
