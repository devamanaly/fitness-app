// components/Dashboard/nutrition/WaterTracker.tsx
'use client'

import { useState } from 'react'
import { Droplets, Plus, Minus } from 'lucide-react'

type WaterTrackerProps = {
  current: number
  target: number
  unit: string
}

export function WaterTracker({ current, target, unit }: WaterTrackerProps) {
  const [water, setWater] = useState(current)
  const progress = (water / target) * 100

  const addWater = (amount: number) => {
    setWater((prev) => Math.max(0, Math.min(target * 1.5, prev + amount)))
  }

  const glasses = Math.round(water / 0.25) // assuming 250ml per glass

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center">
          <Droplets className="w-4 h-4 text-blue-500" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white">Water Intake</h3>
      </div>

      {/* Big display */}
      <div className="text-center mb-4">
        <div className="flex items-baseline justify-center gap-1 mb-1">
          <span className="text-3xl sm:text-4xl font-bold text-white">{water.toFixed(1)}</span>
          <span className="text-lg text-gray-500">{unit}</span>
        </div>
        <p className="text-xs text-gray-500">of {target}{unit} goal</p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Glass indicators */}
      <div className="grid grid-cols-6 gap-1.5 mb-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md transition-all ${
              i < glasses
                ? 'bg-blue-500/60 border border-blue-500'
                : 'bg-white/[0.02] border border-white/[0.06]'
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => addWater(-0.25)}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] rounded-xl text-gray-300 text-sm font-medium transition-all"
        >
          <Minus className="w-3.5 h-3.5" />
          250ml
        </button>
        <button
          onClick={() => addWater(0.25)}
          className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-xl text-blue-400 text-sm font-medium transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          250ml
        </button>
      </div>

      <p className="text-[10px] text-center text-gray-600 mt-3">
        {Math.round(progress)}% of daily goal
      </p>
    </div>
  )
}