// components/dashboard/StatCard.tsx
'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  color: 'red' | 'orange' | 'blue' | 'yellow'
}

const colorMap = {
  red: {
    iconBg: 'bg-red-600/10',
    iconColor: 'text-red-500',
    border: 'border-red-500/20',
  },
  orange: {
    iconBg: 'bg-orange-600/10',
    iconColor: 'text-orange-500',
    border: 'border-orange-500/20',
  },
  blue: {
    iconBg: 'bg-blue-600/10',
    iconColor: 'text-blue-500',
    border: 'border-blue-500/20',
  },
  yellow: {
    iconBg: 'bg-yellow-600/10',
    iconColor: 'text-yellow-500',
    border: 'border-yellow-500/20',
  },
}

export function StatCard({ icon: Icon, label, value, change, trend, color }: StatCardProps) {
  const colors = colorMap[color]
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  
  const trendColor = trend === 'up' 
    ? 'text-green-400' 
    : trend === 'down' 
    ? 'text-red-400' 
    : 'text-gray-400'

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 hover:border-white/[0.12] transition-all hover:shadow-lg group">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className={`p-2 sm:p-2.5 rounded-lg ${colors.iconBg} border ${colors.border}`}>
          <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${colors.iconColor}`} />
        </div>
        <TrendIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${trendColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
      </div>
      <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1 truncate">{label}</p>
      <p className="text-sm sm:text-base lg:text-xl font-bold text-white truncate">{value}</p>
      <p className="text-[10px] sm:text-xs mt-1 sm:mt-2 truncate">
        <span className={trendColor}>{change}</span>
      </p>
    </div>
  )
}