// components/Dashboard/workouts/TodayWorkout.tsx
'use client'

import { useState } from 'react'
import {
  Play,
  Clock,
  Flame,
  Activity,
  Check,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Home,
  TreePine,
  Footprints,
  Zap,
  Target,
  Timer,
  Heart,
  TrendingUp
} from 'lucide-react'

type Exercise = {
  id: number
  name: string
  sets: number
  reps: string
  rest: string
  muscle: string
  completed: boolean
}

type Workout = {
  id: string
  type: 'gym' | 'home' | 'outdoor'
  name: string
  duration: number
  exercises: number
  intensity: string
  calories: number
  completed: boolean
  exercisesList: Exercise[]
}

type TodayWorkoutProps = {
  workout: Workout
  workoutType: 'gym' | 'home' | 'outdoor'
  onStart: () => void
}

// Type-specific workout data
const getWorkoutForType = (type: 'gym' | 'home' | 'outdoor'): Workout => {
  if (type === 'home') {
    return {
      id: '2',
      type: 'home',
      name: 'Home Bodyweight Circuit',
      duration: 30,
      exercises: 6,
      intensity: 'Moderate',
      calories: 220,
      completed: false,
      exercisesList: [
        { id: 1, name: 'Push-ups', sets: 3, reps: '12-15', rest: '45s', muscle: 'Chest', completed: true },
        { id: 2, name: 'Bodyweight Squats', sets: 3, reps: '15-20', rest: '45s', muscle: 'Legs', completed: true },
        { id: 3, name: 'Plank', sets: 3, reps: '45s', rest: '30s', muscle: 'Core', completed: false },
        { id: 4, name: 'Lunges', sets: 3, reps: '10 each', rest: '45s', muscle: 'Legs', completed: false },
        { id: 5, name: 'Burpees', sets: 3, reps: '10', rest: '60s', muscle: 'Full Body', completed: false },
        { id: 6, name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '30s', muscle: 'Core', completed: false },
      ],
    }
  }

  if (type === 'outdoor') {
    return {
      id: '3',
      type: 'outdoor',
      name: 'Morning Walk & Jog',
      duration: 40,
      exercises: 4,
      intensity: 'Light',
      calories: 250,
      completed: false,
      exercisesList: [
        { id: 1, name: 'Warm-up Walk', sets: 1, reps: '5 min', rest: '-', muscle: 'Full Body', completed: true },
        { id: 2, name: 'Brisk Walk', sets: 1, reps: '15 min', rest: '-', muscle: 'Cardio', completed: true },
        { id: 3, name: 'Jogging Intervals', sets: 5, reps: '2 min jog / 1 min walk', rest: '-', muscle: 'Cardio', completed: false },
        { id: 4, name: 'Cool-down Walk', sets: 1, reps: '5 min', rest: '-', muscle: 'Full Body', completed: false },
      ],
    }
  }

  return {
    id: '1',
    type: 'gym',
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
}

export function TodayWorkout({ workout, workoutType, onStart }: TodayWorkoutProps) {
  const [expanded, setExpanded] = useState(true)
  const currentWorkout = getWorkoutForType(workoutType)

  const completedExercises = currentWorkout.exercisesList.filter(e => e.completed).length
  const progress = (completedExercises / currentWorkout.exercisesList.length) * 100

  const typeConfig = {
    gym: {
      icon: Dumbbell,
      label: 'Gym Workout',
      gradient: 'from-red-600/20 to-transparent',
      badge: 'bg-red-600/20 text-red-400',
    },
    home: {
      icon: Home,
      label: 'Home Workout',
      gradient: 'from-orange-600/20 to-transparent',
      badge: 'bg-orange-600/20 text-orange-400',
    },
    outdoor: {
      icon: TreePine,
      label: 'Outdoor Activity',
      gradient: 'from-green-600/20 to-transparent',
      badge: 'bg-green-600/20 text-green-400',
    },
  }

  const config = typeConfig[workoutType]
  const TypeIcon = config.icon

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${config.gradient} p-4 sm:p-6`}>
        <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/[0.05] backdrop-blur border border-white/[0.1] rounded-xl flex items-center justify-center shrink-0">
              <TypeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" strokeWidth={1.5} />
            </div>
            <div>
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${config.badge}`}>
                {config.label}
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-1">
                {currentWorkout.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 rounded-lg hover:bg-white/[0.06] text-gray-400 transition-colors"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-500 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-500">Duration</p>
              <p className="text-sm font-semibold text-white">{currentWorkout.duration} min</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-500 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-500">Exercises</p>
              <p className="text-sm font-semibold text-white">{currentWorkout.exercises}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-500 shrink-0" />
            <div>
              <p className="text-[10px] text-gray-500">Calories</p>
              <p className="text-sm font-semibold text-white">{currentWorkout.calories}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-gray-400">
              Progress · {completedExercises}/{currentWorkout.exercisesList.length} completed
            </span>
            <span className="text-xs text-red-400 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercises List */}
      {expanded && (
        <div className="p-4 sm:p-6 border-t border-white/[0.06]">
          <h3 className="text-sm font-semibold text-white mb-4">
            {workoutType === 'outdoor' ? 'Activity Plan' : 'Exercises'}
          </h3>

          <div className="space-y-2">
            {currentWorkout.exercisesList.map((exercise, i) => (
              <div
                key={exercise.id}
                className={`flex items-center justify-between py-2.5 sm:py-3 px-3 rounded-xl transition-colors ${
                  exercise.completed
                    ? 'bg-green-600/5 border border-green-500/20'
                    : 'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    exercise.completed
                      ? 'bg-green-600/20'
                      : 'bg-red-600/10'
                  }`}>
                    {exercise.completed ? (
                      <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
                    ) : (
                      <span className="text-[10px] sm:text-xs text-red-500 font-bold">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`text-xs sm:text-sm font-medium truncate ${
                      exercise.completed ? 'text-green-400' : 'text-gray-200'
                    }`}>
                      {exercise.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-600">{exercise.muscle}</span>
                      <span className="text-[10px] text-gray-700">·</span>
                      <span className="text-[10px] text-gray-500">
                        {workoutType === 'outdoor'
                          ? exercise.reps
                          : `${exercise.sets} × ${exercise.reps}`
                        }
                      </span>
                    </div>
                  </div>
                </div>

                {workoutType !== 'outdoor' && (
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    <div className="hidden sm:flex items-center gap-1 text-[10px] text-gray-500">
                      <Timer className="w-3 h-3" />
                      <span>{exercise.rest}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Start Button */}
          <button
            onClick={onStart}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">
              {workoutType === 'outdoor' ? 'Start Activity' : 'Start Workout'}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}