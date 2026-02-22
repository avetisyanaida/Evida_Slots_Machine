"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"
import { useGame } from "@/components/casino/game-provider"
import { WinCelebration } from "@/components/casino/win-celebration"
import { SlotTheme, SlotSymbol, spinReels, calculateWin, getDynamicMaxBet } from "@/lib/slot-engine"
import { formatNumber } from "@/lib/utils"
import { Volume2, VolumeX, ArrowLeft, Zap, RotateCcw, ChevronDown } from "lucide-react"

interface SlotMachineProps {
  theme: SlotTheme
  onBack: () => void
}

export function SlotMachine({ theme, onBack }: SlotMachineProps) {
  const {
    credits,
    freeSpins,
    soundEnabled,
    addWin,
    deductCredits,
    incrementSpins,
    toggleSound,
    setFreeSpins,
    playSound,
    addLeaderboardEntry,
    playerName,
    setCurrentGame,
  } = useGame()

  const [grid, setGrid] = useState<SlotSymbol[][]>(() => spinReels(theme))
  const [bet, setBet] = useState(theme.minBet)
  const [spinning, setSpinning] = useState(false)
  const [winAmount, setWinAmount] = useState(0)
  const [bigWin, setBigWin] = useState(false)
  const [winningCells, setWinningCells] = useState<Set<number>>(new Set())
  const [winLineCount, setWinLineCount] = useState(0)
  const [showBonus, setShowBonus] = useState(false)
  const [showFreeSpinsAward, setShowFreeSpinsAward] = useState(false)
  const [reelsStopped, setReelsStopped] = useState([true, true, true, true, true])
  const [displayGrid, setDisplayGrid] = useState<SlotSymbol[][]>(() => spinReels(theme))
  const spinIntervalRef = useRef<ReturnType<typeof setInterval>[]>([])
  const [sessionWin, setSessionWin] = useState(0)
  const [autoSpin, setAutoSpin] = useState(false)
  const autoSpinRef = useRef(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [showBetPicker, setShowBetPicker] = useState(false)
  const betPickerRef = useRef<HTMLDivElement>(null)

  // Dynamic max bet based on current balance
  const dynamicMaxBet = useMemo(() => getDynamicMaxBet(credits, theme.minBet), [credits, theme.minBet])

  // Generate available bet amounts as a structured list
  const availableBets = useMemo(() => {
    const bets: number[] = []
    const presets = [
      50, 100, 200, 500,
      1000, 2000, 5000,
      10000, 20000, 50000,
      100000,
    ]
    for (const p of presets) {
      if (p >= theme.minBet && p <= dynamicMaxBet) {
        bets.push(p)
      }
    }
    // Always include the min bet
    if (!bets.includes(theme.minBet)) bets.unshift(theme.minBet)
    // Always include the max bet if not already there
    if (!bets.includes(dynamicMaxBet)) bets.push(dynamicMaxBet)
    return bets.sort((a, b) => a - b)
  }, [theme.minBet, dynamicMaxBet])

  // Clamp bet if it exceeds the new dynamic max
  useEffect(() => {
    if (bet > dynamicMaxBet) {
      setBet(dynamicMaxBet)
    }
  }, [dynamicMaxBet, bet])

  useEffect(() => {
    setCurrentGame(theme.id)
    return () => setCurrentGame(null)
  }, [theme.id, setCurrentGame])

  // Close bet picker when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (betPickerRef.current && !betPickerRef.current.contains(e.target as Node)) {
        setShowBetPicker(false)
      }
    }
    if (showBetPicker) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showBetPicker])

  const clearSpinIntervals = useCallback(() => {
    spinIntervalRef.current.forEach(clearInterval)
    spinIntervalRef.current = []
  }, [])

  const doSpin = useCallback(() => {
    if (spinning) return
    if (credits < bet && freeSpins <= 0) return

    clearSpinIntervals()

    playSound("spin")
    setSpinning(true)
    setWinAmount(0)
    setBigWin(false)
    setWinningCells(new Set())
    setWinLineCount(0)
    setShowBonus(false)
    setShowFreeSpinsAward(false)
    setReelsStopped([false, false, false, false, false])

    if (freeSpins > 0) {
      setFreeSpins(prev => prev - 1)
    } else {
      deductCredits(bet)
    }
    incrementSpins()

    const finalGrid = spinReels(theme)
    setGrid(finalGrid)

    const reelIntervals: ReturnType<typeof setInterval>[] = []
    const symbols = theme.symbols
    for (let c = 0; c < theme.reelCount; c++) {
      const interval = setInterval(() => {
        setDisplayGrid(prev => {
          const next = prev.map(row => [...row])
          for (let r = 0; r < theme.rowCount; r++) {
            next[r][c] = symbols[Math.floor(Math.random() * symbols.length)]
          }
          return next
        })
      }, 60)
      reelIntervals.push(interval)
    }
    spinIntervalRef.current = reelIntervals

    for (let c = 0; c < theme.reelCount; c++) {
      setTimeout(() => {
        clearInterval(reelIntervals[c])
        playSound("reel-stop")
        setDisplayGrid(prev => {
          const next = prev.map(row => [...row])
          for (let r = 0; r < theme.rowCount; r++) {
            next[r][c] = finalGrid[r][c]
          }
          return next
        })
        setReelsStopped(prev => {
          const next = [...prev]
          next[c] = true
          return next
        })

        if (c === theme.reelCount - 1) {
          setTimeout(() => {
            const result = calculateWin(finalGrid, bet, theme)
            setSpinning(false)

            if (result.totalWin > 0) {
              setWinAmount(Math.round(result.totalWin))
              addWin(Math.round(result.totalWin))
              setSessionWin(prev => prev + Math.round(result.totalWin))
              setWinningCells(result.winningCellSet)
              setWinLineCount(result.winningLines.length)

              if (result.bigWin) {
                setBigWin(true)
                setShowCelebration(true)
                playSound("bigwin")
                addLeaderboardEntry({
                  name: playerName,
                  score: Math.round(result.totalWin),
                  game: theme.name,
                  date: new Date().toISOString(),
                })
              } else {
                playSound("win")
              }
            }

            if (result.isFreeSpins) {
              setShowFreeSpinsAward(true)
              setFreeSpins(prev => prev + theme.freeSpinsCount)
              playSound("bonus")
              setTimeout(() => setShowFreeSpinsAward(false), 3000)
            }

            if (result.isBonus) {
              setShowBonus(true)
              playSound("bonus")
            }
          }, 200)
        }
      }, 400 + c * 350)
    }
  }, [
    spinning, credits, bet, freeSpins, theme, playSound, deductCredits,
    incrementSpins, addWin, addLeaderboardEntry, playerName,
    clearSpinIntervals, setFreeSpins,
  ])

  useEffect(() => {
    autoSpinRef.current = autoSpin
  }, [autoSpin])

  useEffect(() => {
    if (autoSpin && !spinning && credits >= bet) {
      const timer = setTimeout(() => {
        if (autoSpinRef.current) doSpin()
      }, 1200)
      return () => clearTimeout(timer)
    }
    if (autoSpin && credits < bet) {
      setAutoSpin(false)
    }
  }, [autoSpin, spinning, credits, bet, doSpin])

  useEffect(() => {
    return () => clearSpinIntervals()
  }, [clearSpinIntervals])

  const selectBet = (amount: number) => {
    playSound("click")
    setBet(amount)
    setShowBetPicker(false)
  }

  const handleBonusCollect = () => {
    const bonusWin = bet * (Math.floor(Math.random() * 20) + 10)
    addWin(bonusWin)
    setWinAmount(bonusWin)
    setSessionWin(prev => prev + bonusWin)
    setShowBonus(false)
    playSound("bigwin")
    addLeaderboardEntry({
      name: playerName,
      score: bonusWin,
      game: theme.name + " Bonus",
      date: new Date().toISOString(),
    })
  }

  const canSpin = (credits >= bet || freeSpins > 0) && !spinning

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.bgGradient} flex flex-col`}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-background/30 backdrop-blur-md border-b border-border/30">
        <button
          onClick={() => { playSound("click"); onBack() }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Lobby</span>
        </button>
        <h1 className={`text-lg font-bold ${theme.accentColor}`}>{theme.name}</h1>
        <button onClick={toggleSound} className="text-muted-foreground hover:text-foreground transition-colors">
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </header>

      {/* Credits bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-background/20 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Credits:</span>
          <span className="text-primary font-mono font-bold text-lg">{formatNumber(credits)}</span>
        </div>
        {freeSpins > 0 && (
          <div className="flex items-center gap-1 text-neon-green font-bold animate-pulse-gold">
            <Zap className="w-4 h-4" />
            <span>{freeSpins} Free Spins</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Session:</span>
          <span className="text-neon-green font-mono font-bold">+{formatNumber(sessionWin)}</span>
        </div>
      </div>

      {/* Slot machine area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 gap-4">
        {/* Win display */}
        <div className="h-16 flex items-center justify-center">
          {bigWin && (
            <div className="text-center animate-bounce">
              <div className="text-3xl font-black text-primary animate-win-glow inline-block px-6 py-2 rounded-xl bg-background/40">
                BIG WIN!
              </div>
              <div className="text-2xl font-bold text-primary mt-1">
                +{formatNumber(winAmount)}
              </div>
            </div>
          )}
          {winAmount > 0 && !bigWin && (
            <div className="text-center">
              <div className="text-xl font-bold text-primary">
                WIN +{formatNumber(winAmount)}
              </div>
              {winLineCount > 0 && (
                <div className="text-xs text-muted-foreground mt-0.5">
                  {winLineCount} winning line{winLineCount > 1 ? "s" : ""}
                </div>
              )}
            </div>
          )}
          {showFreeSpinsAward && (
            <div className="text-center animate-bounce">
              <div className="text-2xl font-black text-neon-green">
                +{theme.freeSpinsCount} FREE SPINS!
              </div>
            </div>
          )}
        </div>

        {/* Reels grid */}
        <div className={`${theme.cardBg} backdrop-blur-sm rounded-2xl border-2 border-primary/30 p-3 shadow-2xl`}>
          <div
            className="grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${theme.reelCount}, 1fr)`,
              gridTemplateRows: `repeat(${theme.rowCount}, 1fr)`,
            }}
          >
            {displayGrid.map((row, r) =>
              row.map((symbol, c) => {
                const cellIndex = r * theme.reelCount + c
                const isWinning = winningCells.has(cellIndex)
                const isStopped = reelsStopped[c]
                return (
                  <div
                    key={`${r}-${c}`}
                    className={`
                      w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                      flex items-center justify-center
                      rounded-xl bg-background/60 border border-border/50
                      text-3xl sm:text-4xl md:text-5xl
                      transition-all duration-200
                      ${isWinning ? "animate-win-glow border-primary scale-110 z-10" : ""}
                      ${!isStopped ? "opacity-80" : ""}
                      ${isStopped && !spinning ? "animate-reel-bounce" : ""}
                    `}
                  >
                    <span className={!isStopped ? "blur-[1px]" : ""}>
                      {symbol.emoji}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Paylines info */}
        <div className="text-xs text-muted-foreground text-center">
          RTP {theme.rtp}% | {theme.volatility.toUpperCase()} Volatility | 20 Paylines
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 pb-6 pt-2 bg-background/30 backdrop-blur-md border-t border-border/30">
        <div className="flex items-center justify-between gap-3 max-w-xl mx-auto">
          {/* Bet picker */}
          <div className="flex flex-col items-center gap-1 relative" ref={betPickerRef}>
            <span className="text-xs text-muted-foreground">BET</span>
            <button
              onClick={() => { if (!spinning) setShowBetPicker(!showBetPicker) }}
              disabled={spinning}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-xl
                font-mono font-bold text-lg text-foreground
                bg-secondary border border-border/50
                hover:bg-secondary/80 transition-all
                disabled:opacity-40 disabled:cursor-not-allowed
                ${showBetPicker ? "ring-2 ring-primary" : ""}
              `}
            >
              {formatNumber(bet)}
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showBetPicker ? "rotate-180" : ""}`} />
            </button>
            <span className="text-[10px] text-muted-foreground/70">
              Max: {formatNumber(dynamicMaxBet)}
            </span>

            {/* Dropdown list */}
            {showBetPicker && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 w-40 max-h-64 overflow-y-auto rounded-xl bg-card border border-border shadow-2xl shadow-black/40">
                <div className="py-1">
                  {availableBets.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => selectBet(amount)}
                      className={`
                        w-full px-4 py-2.5 text-left font-mono font-semibold text-sm
                        transition-colors
                        ${amount === bet
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-secondary"
                        }
                        ${amount === dynamicMaxBet ? "border-t border-border/50" : ""}
                      `}
                    >
                      <span>{formatNumber(amount)}</span>
                      {amount === dynamicMaxBet && (
                        <span className="ml-2 text-[10px] opacity-70 uppercase tracking-wider">max</span>
                      )}
                      {amount === theme.minBet && amount !== dynamicMaxBet && (
                        <span className="ml-2 text-[10px] opacity-70 uppercase tracking-wider">min</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Spin button */}
          <button
            onClick={doSpin}
            disabled={!canSpin}
            className={`
              w-24 h-24 rounded-full
              flex items-center justify-center
              text-primary-foreground font-black text-lg
              shadow-lg shadow-primary/30
              transition-all duration-200
              ${canSpin
                ? "bg-primary hover:scale-105 active:scale-95"
                : "bg-muted opacity-50 cursor-not-allowed"
              }
              ${spinning ? "animate-pulse" : ""}
            `}
          >
            {spinning ? (
              <RotateCcw className="w-8 h-8 animate-spin" />
            ) : freeSpins > 0 ? (
              <span className="text-sm leading-tight text-center">FREE<br />SPIN</span>
            ) : (
              "SPIN"
            )}
          </button>

          {/* Auto spin + Max bet */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-muted-foreground">AUTO</span>
            <button
              onClick={() => { playSound("click"); setAutoSpin(!autoSpin) }}
              className={`
                px-4 py-2 rounded-xl font-bold text-sm transition-all
                ${autoSpin
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
              `}
            >
              {autoSpin ? "STOP" : "AUTO"}
            </button>
            <button
              onClick={() => selectBet(dynamicMaxBet)}
              disabled={spinning}
              className="px-4 py-1.5 rounded-xl bg-primary/20 text-primary text-xs font-bold hover:bg-primary/30 transition-colors disabled:opacity-30"
            >
              MAX
            </button>
          </div>
        </div>
      </div>

      {/* Bonus round modal */}
      {showBonus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-casino-dark/80 backdrop-blur-sm">
          <div className={`${theme.cardBg} border-2 border-primary rounded-3xl p-8 mx-4 text-center max-w-sm animate-bounce`}>
            <div className="text-5xl mb-4">
              {theme.symbols.find(s => s.isBonus)?.emoji}
            </div>
            <h2 className="text-2xl font-black text-primary mb-2">BONUS ROUND!</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              You triggered the bonus! Collect your mystery prize.
            </p>
            <button
              onClick={handleBonusCollect}
              className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:scale-105 active:scale-95 transition-transform"
            >
              COLLECT PRIZE
            </button>
          </div>
        </div>
      )}

      {/* Win celebration overlay */}
      {showCelebration && (
        <WinCelebration
          amount={winAmount}
          isBigWin={bigWin}
          onComplete={() => setShowCelebration(false)}
        />
      )}
    </div>
  )
}
