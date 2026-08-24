// components/dashboard/sections/UpcomingWorkouts.tsx
'use client'

import { Calendar, Dumbbell, ChevronRight, Play } from 'lucide-react'

export function UpcomingWorkouts() {
  const workouts = [
    { day: 'Mon', title: 'Upper Body', time: '7:00 AM', duration: '45 min', completed: true },
    { day: 'Tue', title: 'Cardio', time: '6:30 AM', duration: '30 min', completed: true },
    { day: 'Wed', title: 'Lower Body', time: '7:00 AM', duration: '50 min', completed: false },
    { day: 'Thu', title: 'Rest Day', time: '-', duration: '-', completed: false },
    { day: 'Fri', title: 'Full Body', time: '7:00 AM', duration: '45 min', completed: false },
    { day: 'Sat', title: 'HIIT', time: '8:00 AM', duration: '25 min', completed: false },
    { day: 'Sun', title: 'Yoga', time: '9:00 AM', duration: '30 min', completed: false },
  ]

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          <h3 className="text-base sm:text-lg font-semibold text-white">This Week</h3>
        </div>
        <button className="text-xs sm:text-sm text-red-500 hover:text-red-400 transition-colors">
          View All
        </button>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex sm:grid sm:grid-cols-7 gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {workouts.map((workout, index) => (
          <div
            key={index}
            className={`
              flex-shrink-0 w-28 sm:w-auto rounded-xl p-3 text-center transition-all
              ${workout.completed 
                ? 'bg-red-600/10 border border-red-500/20' 
                : workout.title === 'Rest Day'
                ? 'bg-white/[0.02] border border-white/[0.06]'
                : 'bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15]'
              }
            `}
          >
            <p className="text-[10px] text-gray-500 mb-2">{workout.day}</p>
            <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-red-600/10 flex items-center justify-center">
              <Dumbbell className="w-3.5 h-3.5 text-red-500" />
            </div>
            <p className="text-[10px] sm:text-xs font-medium text-white truncate">{workout.title}</p>
            {workout.completed && (
              <p className="text-[10px] text-green-400 mt-1">✓ Done</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}