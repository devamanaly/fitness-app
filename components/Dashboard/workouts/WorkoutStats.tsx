// components/Dashboard/workouts/WorkoutStats.tsx
'use client'

import { Dumbbell, Clock, Flame, Zap } from 'lucide-react'

type WorkoutStatsProps = {
  stats: {
    thisWeek: {
      workouts: number
      totalMinutes: number
      caloriesBurned: number
      streak: number
    }
    thisMonth: {
      workouts: number
      totalMinutes: number
      caloriesBurned: number
      activeDays: number
    }
  }
}

export function WorkoutStats({ stats }: WorkoutStatsProps) {
  const statCards = [
    {
      id: 1,
      icon: Dumbbell,
      label: 'Workouts This Week',
      value: stats.thisWeek.workouts.toString(),
      subtext: `Goal: 5 per week`,
      color: 'red',
      progress: (stats.thisWeek.workouts / 5) * 100,
    },
    {
      id: 2,
      icon: Clock,
      label: 'Active Minutes',
      value: stats.thisWeek.totalMinutes.toString(),
      subtext: `This week`,
      color: 'orange',
      progress: (stats.thisWeek.totalMinutes / 300) * 100,
    },
    {
      id: 3,
      icon: Flame,
      label: 'Calories Burned',
      value: stats.thisWeek.caloriesBurned.toString(),
      subtext: `This week`,
      color: 'green',
      progress: (stats.thisWeek.caloriesBurned / 2000) * 100,
    },
    {
      id: 4,
      icon: Zap,
      label: 'Current Streak',
      value: `${stats.thisWeek.streak} days`,
      subtext: `Keep it going!`,
      color: 'yellow',
      progress: 100,
    },
  ]

  const colorMap = {
    red: {
      iconBg: 'bg-red-600/10',
      iconColor: 'text-red-500',
      border: 'border-red-500/20',
      bar: 'bg-red-500',
    },
    orange: {
      iconBg: 'bg-orange-600/10',
      iconColor: 'text-orange-500',
      border: 'border-orange-500/20',
      bar: 'bg-orange-500',
    },
    green: {
      iconBg: 'bg-green-600/10',
      iconColor: 'text-green-500',
      border: 'border-green-500/20',
      bar: 'bg-green-500',
    },
    yellow: {
      iconBg: 'bg-yellow-600/10',
      iconColor: 'text-yellow-500',
      border: 'border-yellow-500/20',
      bar: 'bg-yellow-500',
    },
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statCards.map((stat) => {
        const colors = colorMap[stat.color as keyof typeof colorMap]
        return (
          <div
            key={stat.id}
            className="bg-[#111113] border border-white/[0.06] rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:border-white/[0.12] transition-all group"
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
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
              {stat.subtext}
            </p>
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