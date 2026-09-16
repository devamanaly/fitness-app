/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Dashboard/workouts/WorkoutHistory.tsx
'use client'

import { useState } from 'react'
import {
  Dumbbell,
  Home,
  TreePine,
  Clock,
  Flame,
  Check,
  Filter,
  Search,
  ChevronRight,
  Calendar
} from 'lucide-react'

type Workout = {
  id: string
  date: string
  day: string
  type: 'gym' | 'home' | 'outdoor'
  name: string
  duration: number
  calories: number
  completed: boolean
}

type WorkoutHistoryProps = {
  workouts: Workout[]
}

const typeConfig = {
  gym: { icon: Dumbbell, label: 'Gym', color: 'text-red-500 bg-red-600/10' },
  home: { icon: Home, label: 'Home', color: 'text-orange-500 bg-orange-600/10' },
  outdoor: { icon: TreePine, label: 'Outdoor', color: 'text-green-500 bg-green-600/10' },
}

export function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  const [filter, setFilter] = useState<'all' | 'gym' | 'home' | 'outdoor'>('all')
  const [search, setSearch] = useState('')

  const filteredWorkouts = workouts.filter(w => {
    const matchesFilter = filter === 'all' || w.type === filter
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-red-500" />
          <h3 className="text-base sm:text-lg font-semibold text-white">Recent Workouts</h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full sm:w-48 bg-white/[0.03] border border-white/[0.08] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
        {[
          { id: 'all', label: 'All' },
          { id: 'gym', label: 'Gym' },
          { id: 'home', label: 'Home' },
          { id: 'outdoor', label: 'Outdoor' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all
              ${filter === f.id
                ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                : 'bg-white/[0.02] text-gray-400 border border-white/[0.06] hover:border-white/[0.15]'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Workout List */}
      <div className="space-y-2">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => {
            const config = typeConfig[workout.type]
            const Icon = config.icon

            return (
              <button
                key={workout.id}
                className="w-full flex items-center justify-between py-3 px-3 sm:px-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.15] rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 ${config.color}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="min-w-0 flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white truncate">
                        {workout.name}
                      </p>
                      {workout.completed && (
                        <Check className="w-3.5 h-3.5 text-green-500 shrink-0" strokeWidth={3} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
                      <span>{workout.day}</span>
                      <span className="text-gray-700">·</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{workout.duration} min</span>
                      </div>
                      <span className="text-gray-700">·</span>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        <span>{workout.calories} kcal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors shrink-0 ml-2" />
              </button>
            )
          })
        ) : (
          <div className="py-12 text-center">
            <div className="w-12 h-12 bg-white/[0.02] rounded-full flex items-center justify-center mx-auto mb-3">
              <Dumbbell className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-500">No workouts found</p>
            <p className="text-xs text-gray-600 mt-1">Try changing the filter</p>
          </div>
        )}
      </div>
    </div>
  )
}