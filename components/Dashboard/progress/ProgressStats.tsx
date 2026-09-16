// components/Dashboard/progress/ProgressStats.tsx
'use client'

import { Scale, TrendingDown, Target, Activity, Percent, Ruler } from 'lucide-react'

type ProgressStatsProps = {
  stats: {
    currentWeight: number
    startingWeight: number
    targetWeight: number
    weightChange: number
    bodyFat: number
    bodyFatChange: number
    bmi: number
    bmiChange: number
  }
}

export function ProgressStats({ stats }: ProgressStatsProps) {
  const totalToLose = stats.startingWeight - stats.targetWeight
  const lostSoFar = stats.startingWeight - stats.currentWeight
  const remaining = stats.currentWeight - stats.targetWeight
  const overallProgress = (lostSoFar / totalToLose) * 100

  const statCards = [
    {
      id: 1,
      icon: Scale,
      label: 'Current Weight',
      value: `${stats.currentWeight} kg`,
      change: `${stats.weightChange > 0 ? '+' : ''}${stats.weightChange} kg`,
      trend: stats.weightChange < 0 ? 'down' : 'up',
      color: 'red',
      progress: null,
      subtext: `From ${stats.startingWeight} kg`,
    },
    {
      id: 2,
      icon: Target,
      label: 'To Goal',
      value: `${remaining.toFixed(1)} kg`,
      change: `${overallProgress.toFixed(0)}% complete`,
      trend: 'neutral',
      color: 'green',
      progress: overallProgress,
      subtext: `Goal: ${stats.targetWeight} kg`,
    },
    {
      id: 3,
      icon: Percent,
      label: 'Body Fat',
      value: `${stats.bodyFat}%`,
      change: `${stats.bodyFatChange}%`,
      trend: stats.bodyFatChange < 0 ? 'down' : 'up',
      color: 'orange',
      progress: null,
      subtext: 'Estimated',
    },
    {
      id: 4,
      icon: Activity,
      label: 'BMI',
      value: stats.bmi.toFixed(1),
      change: `${stats.bmiChange > 0 ? '+' : ''}${stats.bmiChange}`,
      trend: stats.bmiChange < 0 ? 'down' : 'up',
      color: 'blue',
      progress: null,
      subtext: 'Healthy range: 18.5-24.9',
    },
  ]

  const colorMap = {
    red: {
      iconBg: 'bg-red-600/10',
      iconColor: 'text-red-500',
      border: 'border-red-500/20',
      bar: 'bg-red-500',
      trendDown: 'text-green-400',
      trendUp: 'text-red-400',
    },
    green: {
      iconBg: 'bg-green-600/10',
      iconColor: 'text-green-500',
      border: 'border-green-500/20',
      bar: 'bg-green-500',
      trendDown: 'text-green-400',
      trendUp: 'text-red-400',
    },
    orange: {
      iconBg: 'bg-orange-600/10',
      iconColor: 'text-orange-500',
      border: 'border-orange-500/20',
      bar: 'bg-orange-500',
      trendDown: 'text-green-400',
      trendUp: 'text-red-400',
    },
    blue: {
      iconBg: 'bg-blue-600/10',
      iconColor: 'text-blue-500',
      border: 'border-blue-500/20',
      bar: 'bg-blue-500',
      trendDown: 'text-green-400',
      trendUp: 'text-red-400',
    },
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statCards.map((stat) => {
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
            <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 truncate">
              {stat.label}
            </p>
            <p className="text-sm sm:text-base lg:text-xl font-bold text-white truncate">
              {stat.value}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] sm:text-xs font-medium ${
                stat.trend === 'down' ? colors.trendDown : stat.trend === 'up' ? colors.trendUp : 'text-gray-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 mt-0.5 truncate">
              {stat.subtext}
            </p>
            {stat.progress !== null && (
              <div className="mt-2 sm:mt-3 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className={`h-full ${colors.bar} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(stat.progress, 100)}%` }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}