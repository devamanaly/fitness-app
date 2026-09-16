/* eslint-disable react/no-unescaped-entities */
// app/(dashboard)/workouts/page.tsx
'use client'

import { useState } from 'react'
import {
  Dumbbell,
  Home,
  TreePine,
  Plus,
  Play,
  Clock,
  Flame,
  TrendingUp,
  Calendar,
  ChevronRight,
  Target,
  Zap,
  Activity,
  Heart,
  Footprints,
  Timer,
  Award,
  Filter,
  Search,
  Check
} from 'lucide-react'
import { WorkoutTypeSelector } from '@/components/Dashboard/workouts/WorkoutTypeSelector'
import { TodayWorkout } from '@/components/Dashboard/workouts/TodayWorkout'
import { WorkoutStats } from '@/components/Dashboard/workouts/WorkoutStats'
import { WorkoutHistory } from '@/components/Dashboard/workouts/WorkoutHistory'
import { StartWorkoutModal } from '@/components/Dashboard/workouts/StartWorkoutModal'
import { CustomWorkoutModal } from '@/components/Dashboard/workouts/CustomWorkoutModal'

// Static mock data
const mockWorkoutStats = {
  thisWeek: {
    workouts: 3,
    totalMinutes: 135,
    caloriesBurned: 1250,
    streak: 15,
  },
  thisMonth: {
    workouts: 12,
    totalMinutes: 540,
    caloriesBurned: 4800,
    activeDays: 12,
  },
}

const mockTodayWorkout = {
  id: '1',
  type: 'gym' as const,
  name: 'Upper Body Strength',
  duration: 45,
  exercises: 8,
  intensity: 'Moderate',
  calories: 350,
  completed: false,
  exercisesList: [
    { id: 1, name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s', muscle: 'Chest', completed: true },
    { id: 2, name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s', muscle: 'Upper Chest', completed: true },
    { id: 3, name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '45s', muscle: 'Chest', completed: false },
    { id: 4, name: 'Pull-ups', sets: 3, reps: '8-12', rest: '90s', muscle: 'Back', completed: false },
    { id: 5, name: 'Bent Over Rows', sets: 4, reps: '8-10', rest: '90s', muscle: 'Back', completed: false },
    { id: 6, name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: '60s', muscle: 'Lats', completed: false },
    { id: 7, name: 'Shoulder Press', sets: 3, reps: '10-12', rest: '60s', muscle: 'Shoulders', completed: false },
    { id: 8, name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45s', muscle: 'Side Delts', completed: false },
  ],
}

const mockWorkoutHistory = [
  {
    id: '1',
    date: '2026-08-24',
    day: 'Today',
    type: 'gym' as const,
    name: 'Upper Body Strength',
    duration: 45,
    calories: 350,
    completed: false,
  },
  {
    id: '2',
    date: '2026-08-23',
    day: 'Yesterday',
    type: 'outdoor' as const,
    name: 'Morning Run',
    duration: 30,
    calories: 280,
    completed: true,
  },
  {
    id: '3',
    date: '2026-08-22',
    day: 'Saturday',
    type: 'home' as const,
    name: 'HIIT Cardio',
    duration: 25,
    calories: 220,
    completed: true,
  },
  {
    id: '4',
    date: '2026-08-21',
    day: 'Friday',
    type: 'gym' as const,
    name: 'Lower Body',
    duration: 50,
    calories: 420,
    completed: true,
  },
  {
    id: '5',
    date: '2026-08-20',
    day: 'Thursday',
    type: 'outdoor' as const,
    name: 'Evening Walk',
    duration: 40,
    calories: 180,
    completed: true,
  },
]

export default function WorkoutsPage() {
  const [workoutType, setWorkoutType] = useState<'gym' | 'home' | 'outdoor'>('gym')
  const [startWorkoutOpen, setStartWorkoutOpen] = useState(false)
  const [customWorkoutOpen, setCustomWorkoutOpen] = useState(false)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Your <span className="text-red-500">Workouts</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            Choose your environment and let's get moving
          </p>
        </div>
        <button
          onClick={() => setCustomWorkoutOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Custom Workout</span>
        </button>
      </div>

      {/* Workout Type Selector */}
      <WorkoutTypeSelector
        selected={workoutType}
        onSelect={setWorkoutType}
      />

      {/* Stats */}
      <WorkoutStats stats={mockWorkoutStats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Today's Workout */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <TodayWorkout
            workout={mockTodayWorkout}
            workoutType={workoutType}
            onStart={() => setStartWorkoutOpen(true)}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Start */}
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">Quick Start</h3>
            </div>

            <div className="space-y-2">
              {workoutType === 'gym' && (
                <>
                  {[
                    { name: 'Push Day', icon: Dumbbell, duration: '45 min', calories: 350 },
                    { name: 'Pull Day', icon: Dumbbell, duration: '45 min', calories: 340 },
                    { name: 'Leg Day', icon: Activity, duration: '50 min', calories: 420 },
                  ].map((workout) => (
                    <button
                      key={workout.name}
                      onClick={() => setStartWorkoutOpen(true)}
                      className="w-full flex items-center justify-between py-3 px-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-red-500/30 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                          <workout.icon className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-white">{workout.name}</p>
                          <p className="text-[10px] text-gray-500">{workout.duration} · {workout.calories} kcal</p>
                        </div>
                      </div>
                      <Play className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
                    </button>
                  ))}
                </>
              )}

              {workoutType === 'home' && (
                <>
                  {[
                    { name: 'Bodyweight Circuit', icon: Home, duration: '30 min', calories: 220 },
                    { name: 'HIIT Cardio', icon: Zap, duration: '25 min', calories: 250 },
                    { name: 'Core Workout', icon: Target, duration: '20 min', calories: 150 },
                  ].map((workout) => (
                    <button
                      key={workout.name}
                      onClick={() => setStartWorkoutOpen(true)}
                      className="w-full flex items-center justify-between py-3 px-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-red-500/30 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                          <workout.icon className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-white">{workout.name}</p>
                          <p className="text-[10px] text-gray-500">{workout.duration} · {workout.calories} kcal</p>
                        </div>
                      </div>
                      <Play className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
                    </button>
                  ))}
                </>
              )}

              {workoutType === 'outdoor' && (
                <>
                  {[
                    { name: 'Morning Walk', icon: Footprints, duration: '30 min', calories: 120 },
                    { name: 'Jogging', icon: Activity, duration: '25 min', calories: 220 },
                    { name: 'Interval Run', icon: Zap, duration: '30 min', calories: 320 },
                  ].map((workout) => (
                    <button
                      key={workout.name}
                      onClick={() => setStartWorkoutOpen(true)}
                      className="w-full flex items-center justify-between py-3 px-3 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-red-500/30 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                          <workout.icon className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-white">{workout.name}</p>
                          <p className="text-[10px] text-gray-500">{workout.duration} · {workout.calories} kcal</p>
                        </div>
                      </div>
                      <Play className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors" />
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Weekly Progress */}
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">This Week</h3>
            </div>

            <div className="flex items-end justify-between gap-1 mb-4">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                const isActive = i < 4
                const height = isActive ? [40, 65, 50, 80][i % 4] : 15
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full h-20 flex items-end">
                      <div
                        className={`w-full rounded-t-md transition-all ${
                          isActive
                            ? 'bg-gradient-to-t from-red-700 to-red-500'
                            : 'bg-white/[0.06]'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className={`text-[10px] ${isActive ? 'text-red-400' : 'text-gray-600'}`}>
                      {day}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
              <div>
                <p className="text-[10px] text-gray-500">Workouts</p>
                <p className="text-lg font-bold text-white">4/5</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Active Minutes</p>
                <p className="text-lg font-bold text-white">135</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workout History */}
      <WorkoutHistory workouts={mockWorkoutHistory} />

      {/* Modals */}
      {startWorkoutOpen && (
        <StartWorkoutModal
          workout={mockTodayWorkout}
          onClose={() => setStartWorkoutOpen(false)}
        />
      )}

      {customWorkoutOpen && (
        <CustomWorkoutModal
          workoutType={workoutType}
          onClose={() => setCustomWorkoutOpen(false)}
        />
      )}
    </div>
  )
}