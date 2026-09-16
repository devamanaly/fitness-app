// components/Dashboard/nutrition/NutritionStats.tsx
'use client'

import { Flame, Target, TrendingUp, Droplets } from 'lucide-react'

type NutritionStatsProps = {
  totalTarget: number
  totalConsumed: number
  remaining: number
  waterIntake: {
    current: number
    target: number
    unit: string
  }
}

export function NutritionStats({ totalTarget, totalConsumed, remaining, waterIntake }: NutritionStatsProps) {
  const progress = (totalConsumed / totalTarget) * 100
  const waterProgress = (waterIntake.current / waterIntake.target) * 100

  const stats = [
    {
      id: 1,
      icon: Flame,
      label: 'Calories Eaten',
      value: `${totalConsumed}`,
      subtext: `of ${totalTarget} kcal`,
      color: 'red',
      progress: progress,
    },
    {
      id: 2,
      icon: Target,
      label: 'Remaining',
      value: `${remaining}`,
      subtext: 'kcal left today',
      color: 'green',
      progress: 100 - progress,
    },
    {
      id: 3,
      icon: TrendingUp,
      label: 'Burned',
      value: '450',
      subtext: 'kcal from workouts',
      color: 'orange',
      progress: 65,
    },
    {
      id: 4,
      icon: Droplets,
      label: 'Water',
      value: `${waterIntake.current}${waterIntake.unit}`,
      subtext: `of ${waterIntake.target}${waterIntake.unit}`,
      color: 'blue',
      progress: waterProgress,
    },
  ]

  const colorMap = {
    red: {
      iconBg: 'bg-red-600/10',
      iconColor: 'text-red-500',
      border: 'border-red-500/20',
      bar: 'bg-red-500',
    },
    green: {
      iconBg: 'bg-green-600/10',
      iconColor: 'text-green-500',
      border: 'border-green-500/20',
      bar: 'bg-green-500',
    },
    orange: {
      iconBg: 'bg-orange-600/10',
      iconColor: 'text-orange-500',
      border: 'border-orange-500/20',
      bar: 'bg-orange-500',
    },
    blue: {
      iconBg: 'bg-blue-600/10',
      iconColor: 'text-blue-500',
      border: 'border-blue-500/20',
      bar: 'bg-blue-500',
    },
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => {
        const colors = colorMap[stat.color as keyof typeof colorMap]
        return (
          <div
            key={stat.id}
            className="bg-[#111113] border border-white/[0.06] rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:border-white/[0.12] transition-all"
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className={`p-2 sm:p-2.5 rounded-lg ${colors.iconBg} border ${colors.border}`}>
                <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${colors.iconColor}`} />
              </div>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 truncate">{stat.label}</p>
            <p className="text-sm sm:text-base lg:text-xl font-bold text-white truncate">{stat.value}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">{stat.subtext}</p>
            
            {/* Progress bar */}
            <div className="mt-2 sm:mt-3 h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(stat.progress, 100)}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}