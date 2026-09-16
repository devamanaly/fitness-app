// components/Dashboard/progress/AchievementsGrid.tsx
'use client'

import { Trophy, Lock, Check } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

type Achievement = {
  id: number
  title: string
  description: string
  icon: LucideIcon
  unlocked: boolean
  unlockedAt?: string
  color: string
}

type AchievementsGridProps = {
  achievements: Achievement[]
}

const colorMap = {
  red: {
    bg: 'bg-red-600/10',
    border: 'border-red-500/30',
    icon: 'text-red-500',
    glow: 'shadow-red-900/20',
  },
  orange: {
    bg: 'bg-orange-600/10',
    border: 'border-orange-500/30',
    icon: 'text-orange-500',
    glow: 'shadow-orange-900/20',
  },
  yellow: {
    bg: 'bg-yellow-600/10',
    border: 'border-yellow-500/30',
    icon: 'text-yellow-500',
    glow: 'shadow-yellow-900/20',
  },
  green: {
    bg: 'bg-green-600/10',
    border: 'border-green-500/30',
    icon: 'text-green-500',
    glow: 'shadow-green-900/20',
  },
  blue: {
    bg: 'bg-blue-600/10',
    border: 'border-blue-500/30',
    icon: 'text-blue-500',
    glow: 'shadow-blue-900/20',
  },
  purple: {
    bg: 'bg-purple-600/10',
    border: 'border-purple-500/30',
    icon: 'text-purple-500',
    glow: 'shadow-purple-900/20',
  },
  pink: {
    bg: 'bg-pink-600/10',
    border: 'border-pink-500/30',
    icon: 'text-pink-500',
    glow: 'shadow-pink-900/20',
  },
}

export function AchievementsGrid({ achievements }: AchievementsGridProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white">Achievements</h3>
            <p className="text-xs text-gray-500">
              {unlockedCount} of {totalCount} unlocked
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          <div className="w-24 sm:w-32 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-red-400">
            {Math.round((unlockedCount / totalCount) * 100)}%
          </span>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon
          const colors = achievement.unlocked 
            ? colorMap[achievement.color as keyof typeof colorMap]
            : { bg: 'bg-white/[0.02]', border: 'border-white/[0.06]', icon: 'text-gray-600', glow: '' }

          return (
            <div
              key={achievement.id}
              className={`
                relative flex flex-col items-center text-center p-4 rounded-2xl border transition-all
                ${achievement.unlocked
                  ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
                  : 'bg-white/[0.02] border-white/[0.06] opacity-60'
                }
              `}
            >
              {/* Lock/Check indicator */}
              <div className="absolute top-2 right-2">
                {achievement.unlocked ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-white/[0.06] rounded-full flex items-center justify-center">
                    <Lock className="w-3 h-3 text-gray-600" />
                  </div>
                )}
              </div>

              {/* Icon */}
              <div className={`
                w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3
                ${achievement.unlocked ? `${colors.bg} border-2 ${colors.border}` : 'bg-white/[0.04]'}
              `}>
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${colors.icon}`} strokeWidth={1.5} />
              </div>

              {/* Title */}
              <h4 className={`text-xs sm:text-sm font-semibold mb-1 ${
                achievement.unlocked ? 'text-white' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h4>

              {/* Description */}
              <p className="text-[10px] text-gray-500 line-clamp-2 mb-2">
                {achievement.description}
              </p>

              {/* Date */}
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-[9px] text-gray-600">
                  {new Date(achievement.unlockedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}