"use client"

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"

export interface LeaderboardEntry {
  name: string
  score: number
  game: string
  date: string
}

interface GameState {
  credits: number
  totalWon: number
  totalSpins: number
  playerName: string
  leaderboard: LeaderboardEntry[]
  soundEnabled: boolean
  freeSpins: number
  currentGame: string | null
}

interface GameContextType extends GameState {
  setCredits: (v: number | ((prev: number) => number)) => void
  addCredits: (amount: number) => void
  deductCredits: (amount: number) => boolean
  addWin: (amount: number) => void
  incrementSpins: () => void
  setPlayerName: (name: string) => void
  addLeaderboardEntry: (entry: LeaderboardEntry) => void
  toggleSound: () => void
  setFreeSpins: (v: number | ((prev: number) => number)) => void
  setCurrentGame: (game: string | null) => void
  resetCredits: () => void
  playSound: (type: "spin" | "win" | "bigwin" | "click" | "bonus" | "reel-stop") => void
}

const DEFAULT_CREDITS = 100000
const GameContext = createContext<GameContextType | null>(null)

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be used within GameProvider")
  return ctx
}

// Simple audio synthesis using Web Audio API
function createAudioContext() {
  if (typeof window === "undefined") return null
  return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState(DEFAULT_CREDITS)
  const [totalWon, setTotalWon] = useState(0)
  const [totalSpins, setTotalSpins] = useState(0)
  const [playerName, setPlayerName] = useState("Player")
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [freeSpins, setFreeSpins] = useState(0)
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = createAudioContext()
      }
      window.removeEventListener("click", initAudio)
    }
    window.addEventListener("click", initAudio)
    return () => window.removeEventListener("click", initAudio)
  }, [])

  const playSound = useCallback((type: "spin" | "win" | "bigwin" | "click" | "bonus" | "reel-stop") => {
    if (!soundEnabled) return
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext()
    }
    const ctx = audioCtxRef.current
    if (!ctx) return

    const now = ctx.currentTime

    try {
      switch (type) {
        case "click": {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.setValueAtTime(800, now)
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.05)
          gain.gain.setValueAtTime(0.1, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)
          osc.start(now)
          osc.stop(now + 0.05)
          break
        }
        case "spin": {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.type = "sawtooth"
          osc.frequency.setValueAtTime(200, now)
          osc.frequency.linearRampToValueAtTime(800, now + 0.3)
          gain.gain.setValueAtTime(0.06, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
          osc.start(now)
          osc.stop(now + 0.3)
          break
        }
        case "reel-stop": {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.setValueAtTime(500, now)
          osc.frequency.exponentialRampToValueAtTime(200, now + 0.08)
          gain.gain.setValueAtTime(0.08, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
          osc.start(now)
          osc.stop(now + 0.08)
          break
        }
        case "win": {
          for (let i = 0; i < 3; i++) {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.setValueAtTime(600 + i * 200, now + i * 0.12)
            gain.gain.setValueAtTime(0.08, now + i * 0.12)
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.15)
            osc.start(now + i * 0.12)
            osc.stop(now + i * 0.12 + 0.15)
          }
          break
        }
        case "bigwin": {
          for (let i = 0; i < 6; i++) {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.type = i % 2 === 0 ? "square" : "sine"
            osc.frequency.setValueAtTime(400 + i * 150, now + i * 0.1)
            gain.gain.setValueAtTime(0.06, now + i * 0.1)
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.2)
            osc.start(now + i * 0.1)
            osc.stop(now + i * 0.1 + 0.2)
          }
          break
        }
        case "bonus": {
          for (let i = 0; i < 5; i++) {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.type = "sine"
            osc.frequency.setValueAtTime(300 + i * 100, now + i * 0.08)
            osc.frequency.exponentialRampToValueAtTime(1200, now + i * 0.08 + 0.15)
            gain.gain.setValueAtTime(0.07, now + i * 0.08)
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.15)
            osc.start(now + i * 0.08)
            osc.stop(now + i * 0.08 + 0.15)
          }
          break
        }
      }
    } catch {
      // Audio context might not be available
    }
  }, [soundEnabled])

  const addCredits = useCallback((amount: number) => {
    setCredits(prev => prev + amount)
  }, [])

  const deductCredits = useCallback((amount: number): boolean => {
    let success = false
    setCredits(prev => {
      if (prev >= amount) {
        success = true
        return prev - amount
      }
      return prev
    })
    return success
  }, [])

  const addWin = useCallback((amount: number) => {
    setCredits(prev => prev + amount)
    setTotalWon(prev => prev + amount)
  }, [])

  const incrementSpins = useCallback(() => {
    setTotalSpins(prev => prev + 1)
  }, [])

  const addLeaderboardEntry = useCallback((entry: LeaderboardEntry) => {
    setLeaderboard(prev => {
      const next = [...prev, entry].sort((a, b) => b.score - a.score).slice(0, 50)
      return next
    })
  }, [])

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev)
  }, [])

  const resetCredits = useCallback(() => {
    setCredits(DEFAULT_CREDITS)
  }, [])

  return (
    <GameContext.Provider
      value={{
        credits,
        totalWon,
        totalSpins,
        playerName,
        leaderboard,
        soundEnabled,
        freeSpins,
        currentGame,
        setCredits,
        addCredits,
        deductCredits,
        addWin,
        incrementSpins,
        setPlayerName,
        addLeaderboardEntry,
        toggleSound,
        setFreeSpins,
        setCurrentGame,
        resetCredits,
        playSound,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
