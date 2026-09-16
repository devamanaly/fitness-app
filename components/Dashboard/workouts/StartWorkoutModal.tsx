// components/Dashboard/workouts/StartWorkoutModal.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  X,
  Play,
  Pause,
  Check,
  SkipForward,
  Clock,
  Timer,
  Flame,
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  RotateCcw
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
  name: string
  duration: number
  exercisesList: Exercise[]
}

type StartWorkoutModalProps = {
  workout: Workout
  onClose: () => void
}

export function StartWorkoutModal({ workout, onClose }: StartWorkoutModalProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [restTime, setRestTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])

  const currentExercise = workout.exercisesList[currentExerciseIndex]

  // Timer for elapsed time
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isPlaying])

  // Rest timer countdown
  useEffect(() => {
    if (restTime <= 0) return
    const interval = setInterval(() => {
      setRestTime(prev => {
        if (prev <= 1) {
          setIsPlaying(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [restTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCompleteSet = () => {
    if (currentSet < currentExercise.sets) {
      setCurrentSet(prev => prev + 1)
      setRestTime(parseInt(currentExercise.rest) || 60)
      setIsPlaying(false)
    } else {
      // Exercise complete
      if (!completed.includes(currentExercise.id)) {
        setCompleted([...completed, currentExercise.id])
      }
      handleNextExercise()
    }
  }

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercisesList.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1)
      setCurrentSet(1)
      setRestTime(0)
      setIsPlaying(false)
    }
  }

  const handlePrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1)
      setCurrentSet(1)
      setRestTime(0)
      setIsPlaying(false)
    }
  }

  const progress = ((currentExerciseIndex + 1) / workout.exercisesList.length) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:max-w-2xl bg-[#111113] border border-white/10 rounded-t-2xl sm:rounded-2xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">{workout.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">
                  Exercise {currentExerciseIndex + 1} of {workout.exercisesList.length}
                </span>
                <span className="text-gray-700">·</span>
                <div className="flex items-center gap-1 text-xs text-red-400">
                  <Clock className="w-3 h-3" />
                  {formatTime(elapsedTime)}
                </div>
              </div>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/[0.04] shrink-0">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Current Exercise */}
          <div className="text-center mb-6">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 mb-3">
              {currentExercise.muscle}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {currentExercise.name}
            </h3>

            {/* Set/Rep Display */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Set</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-500">
                  {currentSet}
                  <span className="text-gray-600 text-base sm:text-lg">/{currentExercise.sets}</span>
                </p>
              </div>
              <div className="w-px h-12 bg-white/[0.08]" />
              <div className="text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Reps</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{currentExercise.reps}</p>
              </div>
              <div className="w-px h-12 bg-white/[0.08]" />
              <div className="text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Rest</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{currentExercise.rest}</p>
              </div>
            </div>
          </div>

          {/* Rest Timer */}
          {restTime > 0 && (
            <div className="bg-red-600/10 border border-red-500/30 rounded-2xl p-4 sm:p-6 mb-6 text-center">
              <p className="text-xs text-red-400 uppercase tracking-wider mb-2">Rest Timer</p>
              <p className="text-4xl sm:text-5xl font-bold text-white mb-3">
                {formatTime(restTime)}
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setRestTime(prev => prev + 15)}
                  className="px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.1] rounded-lg text-xs text-white transition-all"
                >
                  +15s
                </button>
                <button
                  onClick={() => { setRestTime(0); setIsPlaying(true) }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs text-white transition-all"
                >
                  Skip Rest
                </button>
              </div>
            </div>
          )}

          {/* Exercise List */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Workout Plan</p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {workout.exercisesList.map((ex, i) => {
                const isCurrent = i === currentExerciseIndex
                const isCompleted = completed.includes(ex.id)
                return (
                  <div
                    key={ex.id}
                    className={`
                      flex items-center justify-between py-2 px-3 rounded-lg text-xs transition-all
                      ${isCurrent
                        ? 'bg-red-600/10 border border-red-500/30'
                        : isCompleted
                        ? 'bg-green-600/5 border border-green-500/20'
                        : 'bg-white/[0.02] border border-white/[0.04]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        isCompleted ? 'bg-green-600/20' : isCurrent ? 'bg-red-600/30' : 'bg-white/[0.04]'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-3 h-3 text-green-500" strokeWidth={3} />
                        ) : (
                          <span className="text-[9px] text-gray-400">{i + 1}</span>
                        )}
                      </div>
                      <span className={`truncate ${
                        isCompleted ? 'text-green-400 line-through' : isCurrent ? 'text-white font-medium' : 'text-gray-400'
                      }`}>
                        {ex.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 ml-2 shrink-0">
                      {ex.sets} × {ex.reps}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-white/[0.06] shrink-0 bg-[#0d0d0e]">
          {/* Main Action Button */}
          <button
            onClick={handleCompleteSet}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 mb-3"
          >
            <Check className="w-5 h-5" />
            {currentSet < currentExercise.sets ? `Complete Set ${currentSet}` : 'Complete Exercise'}
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevExercise}
              disabled={currentExerciseIndex === 0}
              className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <button
              onClick={() => { setRestTime(0); setElapsedTime(0); setCurrentSet(1) }}
              className="flex items-center justify-center gap-1 py-2.5 px-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 rounded-xl text-sm font-medium transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextExercise}
              disabled={currentExerciseIndex === workout.exercisesList.length - 1}
              className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 rounded-xl text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Skip
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}