// components/Dashboard/nutrition/MacroBreakdown.tsx
'use client'

import { TrendingUp } from 'lucide-react'

type MacroProps = {
  current: number
  target: number
}

type MacroBreakdownProps = {
  protein: MacroProps
  carbs: MacroProps
  fat: MacroProps
}

export function MacroBreakdown({ protein, carbs, fat }: MacroBreakdownProps) {
  const macros = [
    {
      name: 'Protein',
      current: protein.current,
      target: protein.target,
      color: 'red',
      bgColor: 'bg-red-500',
      textColor: 'text-red-400',
      bgLight: 'bg-red-600/10',
    },
    {
      name: 'Carbs',
      current: carbs.current,
      target: carbs.target,
      color: 'orange',
      bgColor: 'bg-orange-500',
      textColor: 'text-orange-400',
      bgLight: 'bg-orange-600/10',
    },
    {
      name: 'Fat',
      current: fat.current,
      target: fat.target,
      color: 'yellow',
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-400',
      bgLight: 'bg-yellow-600/10',
    },
  ]

  const totalCurrent = protein.current + carbs.current + fat.current

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white">Macros</h3>
      </div>

      {/* Stacked bar */}
      <div className="h-2 rounded-full overflow-hidden flex mb-4">
        {macros.map((macro) => {
          const percentage = totalCurrent > 0 ? (macro.current / totalCurrent) * 100 : 0
          return (
            <div
              key={macro.name}
              className={`${macro.bgColor} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          )
        })}
      </div>

      {/* Macro list */}
      <div className="space-y-3">
        {macros.map((macro) => {
          const progress = (macro.current / macro.target) * 100
          return (
            <div key={macro.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${macro.bgColor}`} />
                  <span className="text-xs sm:text-sm text-gray-300">{macro.name}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-400">
                  <span className="text-white font-medium">{macro.current}</span>
                  <span className="text-gray-600">/{macro.target}g</span>
                </span>
              </div>
              <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className={`h-full ${macro.bgColor} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}