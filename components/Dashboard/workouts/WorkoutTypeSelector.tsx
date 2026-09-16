// components/Dashboard/workouts/WorkoutTypeSelector.tsx
'use client'

import { Dumbbell, Home, TreePine, Check } from 'lucide-react'

type WorkoutType = 'gym' | 'home' | 'outdoor'

type WorkoutTypeSelectorProps = {
  selected: WorkoutType
  onSelect: (type: WorkoutType) => void
}

const workoutTypes = [
  {
    id: 'gym' as const,
    name: 'Gym',
    icon: Dumbbell,
    description: 'Full equipment access',
    tagline: 'Weights, machines, full setup',
  },
  {
    id: 'home' as const,
    name: 'Home',
    icon: Home,
    description: 'No equipment needed',
    tagline: 'Bodyweight & minimal equipment',
  },
  {
    id: 'outdoor' as const,
    name: 'Outdoor',
    icon: TreePine,
    description: 'Walk, jog, run',
    tagline: 'Nature-based movement',
  },
]

export function WorkoutTypeSelector({ selected, onSelect }: WorkoutTypeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-white">
          Where are you working out?
        </h2>
        <span className="text-xs text-gray-500 hidden sm:block">
          Choose your environment
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
        {workoutTypes.map((type) => {
          const Icon = type.icon
          const isActive = selected === type.id

          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`
                relative flex flex-col items-start p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border transition-all duration-200 text-left
                ${isActive
                  ? 'bg-gradient-to-br from-red-600/15 to-red-800/5 border-red-500/50 shadow-lg shadow-red-900/20'
                  : 'bg-[#111113] border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.02]'
                }
              `}
            >
              {/* Check indicator */}
              {isActive && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-4 h-4 sm:w-5 sm:h-5 bg-red-600 rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                </div>
              )}

              {/* Icon */}
              <div className={`
                w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 transition-all shrink-0
                ${isActive
                  ? 'bg-red-600 shadow-lg shadow-red-900/40'
                  : 'bg-white/[0.04]'
                }
              `}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              </div>

              {/* Text */}
              <h3 className={`text-sm sm:text-base font-semibold mb-0.5 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {type.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
                {type.description}
              </p>
              <p className="hidden lg:block text-[10px] text-gray-600 mt-1 line-clamp-1">
                {type.tagline}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}