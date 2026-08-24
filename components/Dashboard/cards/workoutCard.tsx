// components/dashboard/cards/WorkoutCard.tsx
'use client'

import { Clock, Flame, Activity, Play, ChevronRight } from 'lucide-react'

type WorkoutCardProps = {
  title: string
  duration: number
  exercises: number
  intensity: string
  calories: number
}

export function WorkoutCard({ title, duration, exercises, intensity, calories }: WorkoutCardProps) {
  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-red-600/20 to-transparent p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-white">Today&apos;s Workout</h3>
          <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full">In Progress</span>
        </div>
        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">{title}</p>
      </div>

      {/* Stats */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-center">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm sm:text-base font-semibold text-white">{duration} min</p>
          </div>
          <div className="text-center">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
            <p className="text-xs text-gray-500">Exercises</p>
            <p className="text-sm sm:text-base font-semibold text-white">{exercises}</p>
          </div>
          <div className="text-center">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
            <p className="text-xs text-gray-500">Calories</p>
            <p className="text-sm sm:text-base font-semibold text-white">{calories}</p>
          </div>
        </div>

        {/* Exercise list preview */}
        <div className="space-y-2 mb-4 sm:mb-6">
          {['Push-ups', 'Dumbbell Press', 'Rows', 'Shoulder Press'].map((exercise, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs text-red-500 font-medium">{i + 1}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-300">{exercise}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500">3x12</span>
            </div>
          ))}
        </div>

        {/* Start button */}
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5 active:translate-y-0">
          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Start Workout</span>
        </button>
      </div>
    </div>
  )
}