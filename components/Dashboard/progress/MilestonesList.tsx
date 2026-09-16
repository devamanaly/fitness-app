// components/Dashboard/progress/MilestonesList.tsx
'use client'

import { Check, Target, Flag, Trophy, Sparkles } from 'lucide-react'

type Milestone = {
  id: number
  title: string
  description: string
  date: string
  completed: boolean
  type: 'start' | 'weight' | 'milestone' | 'goal'
}

type MilestonesListProps = {
  milestones: Milestone[]
}

const typeConfig = {
  start: { icon: Flag, color: 'text-blue-500 bg-blue-600/10' },
  weight: { icon: Trophy, color: 'text-yellow-500 bg-yellow-600/10' },
  milestone: { icon: Sparkles, color: 'text-purple-500 bg-purple-600/10' },
  goal: { icon: Target, color: 'text-green-500 bg-green-600/10' },
}

export function MilestonesList({ milestones }: MilestonesListProps) {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">Milestones</h3>
          <p className="text-xs text-gray-500">Your journey timeline</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-white/[0.06]" />

        <div className="space-y-4">
          {milestones.map((milestone, index) => {
            const config = typeConfig[milestone.type]
            const Icon = config.icon
            const isLast = index === milestones.length - 1

            return (
              <div key={milestone.id} className="relative flex items-start gap-3 pl-1">
                {/* Icon */}
                <div className={`
                  relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2
                  ${milestone.completed
                    ? `${config.color} border-transparent`
                    : 'bg-white/[0.04] border-white/[0.08]'
                  }
                `}>
                  {milestone.completed ? (
                    <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                  ) : (
                    <Icon className="w-3.5 h-3.5 text-gray-600" strokeWidth={2} />
                  )}
                </div>

                {/* Content */}
                <div className={`
                  flex-1 pb-4 min-w-0
                  ${isLast ? 'pb-0' : 'border-b border-white/[0.04]'}
                `}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs sm:text-sm font-semibold truncate ${
                          milestone.completed ? 'text-white' : 'text-gray-500'
                        }`}>
                          {milestone.title}
                        </h4>
                        {milestone.completed && (
                          <Check className="w-3 h-3 text-green-500 shrink-0" strokeWidth={3} />
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                        {milestone.description}
                      </p>
                      <p className="text-[10px] text-gray-600 mt-1">
                        {milestone.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}