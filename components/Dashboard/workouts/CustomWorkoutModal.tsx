/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
// components/Dashboard/workouts/CustomWorkoutModal.tsx
'use client'

import { useState } from 'react'
import {
  X,
  Plus,
  Trash2,
  Dumbbell,
  Home,
  TreePine,
  Search,
  Check,
  Save
} from 'lucide-react'

type CustomWorkoutModalProps = {
  workoutType: 'gym' | 'home' | 'outdoor'
  onClose: () => void
}

type ExerciseEntry = {
  id: string
  name: string
  sets: number
  reps: string
  rest: string
}

// Predefined exercise library per type
const exerciseLibrary = {
  gym: [
    'Barbell Bench Press', 'Incline Dumbbell Press', 'Cable Flyes', 'Push-ups',
    'Pull-ups', 'Bent Over Rows', 'Lat Pulldowns', 'Deadlifts',
    'Shoulder Press', 'Lateral Raises', 'Bicep Curls', 'Tricep Extensions',
    'Squats', 'Leg Press', 'Romanian Deadlifts', 'Calf Raises',
    'Plank', 'Cable Crunches', 'Hanging Leg Raises',
  ],
  home: [
    'Push-ups', 'Diamond Push-ups', 'Wide Push-ups', 'Pike Push-ups',
    'Bodyweight Squats', 'Lunges', 'Bulgarian Split Squats', 'Glute Bridges',
    'Plank', 'Side Plank', 'Mountain Climbers', 'Bicycle Crunches',
    'Burpees', 'Jumping Jacks', 'High Knees', 'Wall Sits',
  ],
  outdoor: [
    'Walk', 'Brisk Walk', 'Jog', 'Sprint Intervals',
    'Hill Sprints', 'Stair Climbing', 'Cycling', 'Jump Rope',
  ],
}

export function CustomWorkoutModal({ workoutType, onClose }: CustomWorkoutModalProps) {
  const [workoutName, setWorkoutName] = useState('')
  const [exercises, setExercises] = useState<ExerciseEntry[]>([])
  const [search, setSearch] = useState('')
  const [showLibrary, setShowLibrary] = useState(false)

  const filteredLibrary = exerciseLibrary[workoutType].filter(ex =>
    ex.toLowerCase().includes(search.toLowerCase())
  )

  const typeConfig = {
    gym: { icon: Dumbbell, label: 'Gym Workout', color: 'text-red-500' },
    home: { icon: Home, label: 'Home Workout', color: 'text-orange-500' },
    outdoor: { icon: TreePine, label: 'Outdoor Activity', color: 'text-green-500' },
  }

  const config = typeConfig[workoutType]
  const TypeIcon = config.icon

  const addExercise = (name: string) => {
    setExercises([
      ...exercises,
      {
        id: Date.now().toString(),
        name,
        sets: workoutType === 'outdoor' ? 1 : 3,
        reps: workoutType === 'outdoor' ? '20 min' : '10-12',
        rest: workoutType === 'outdoor' ? '-' : '60s',
      },
    ])
    setSearch('')
    setShowLibrary(false)
  }

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(e => e.id !== id))
  }

  const updateExercise = (id: string, field: keyof ExerciseEntry, value: any) => {
    setExercises(exercises.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ))
  }

  const handleSave = () => {
    // Will connect to backend later
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:max-w-2xl bg-[#111113] border border-white/10 rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
              <TypeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Create Custom Workout</h2>
              <p className="text-xs text-gray-500 mt-0.5">{config.label}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Workout Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Workout Name</label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="e.g. Monday Morning Gym Session"
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05]"
            />
          </div>

          {/* Exercise Library Search */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              {workoutType === 'outdoor' ? 'Add Activities' : 'Add Exercises'}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowLibrary(true) }}
                onFocus={() => setShowLibrary(true)}
                placeholder="Search exercises..."
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.05]"
              />
            </div>

            {/* Suggestions */}
            {showLibrary && search && filteredLibrary.length > 0 && (
              <div className="mt-2 bg-[#1a1a1c] border border-white/10 rounded-xl overflow-hidden max-h-64 overflow-y-auto">
                {filteredLibrary.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => addExercise(ex)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-300 hover:bg-white/[0.05] hover:text-white transition-colors text-left"
                  >
                    <span>{ex}</span>
                    <Plus className="w-4 h-4 text-gray-500" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Exercise List */}
          {exercises.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-gray-400">
                  {workoutType === 'outdoor' ? 'Your Activities' : 'Your Exercises'}
                </label>
                <span className="text-xs text-gray-600">{exercises.length} added</span>
              </div>

              <div className="space-y-2">
                {exercises.map((ex, index) => (
                  <div
                    key={ex.id}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-6 h-6 bg-red-600/10 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-[10px] text-red-500 font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm font-medium text-white truncate">{ex.name}</p>
                      </div>
                      <button
                        onClick={() => removeExercise(ex.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-600/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Sets</label>
                        <input
                          type="number"
                          min={1}
                          value={ex.sets}
                          onChange={(e) => updateExercise(ex.id, 'sets', parseInt(e.target.value) || 1)}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-red-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">
                          {workoutType === 'outdoor' ? 'Duration' : 'Reps'}
                        </label>
                        <input
                          type="text"
                          value={ex.reps}
                          onChange={(e) => updateExercise(ex.id, 'reps', e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-red-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-gray-500 mb-1">Rest</label>
                        <input
                          type="text"
                          value={ex.rest}
                          onChange={(e) => updateExercise(ex.id, 'rest', e.target.value)}
                          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-red-500/50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exercises.length === 0 && (
            <div className="py-8 text-center border border-dashed border-white/[0.08] rounded-xl">
              <div className="w-12 h-12 bg-white/[0.02] rounded-full flex items-center justify-center mx-auto mb-3">
                <Plus className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-sm text-gray-500">No exercises added yet</p>
              <p className="text-xs text-gray-600 mt-1">Search above to add exercises</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-white/[0.06] shrink-0 bg-[#0d0d0e]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-gray-300 rounded-xl font-medium transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!workoutName || exercises.length === 0}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}