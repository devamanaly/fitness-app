// components/Dashboard/nutrition/MealCard.tsx
'use client'

import { Plus, Check, MoreVertical, Trash2, Edit2 } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { useState } from 'react'

type MealItem = {
  id: number
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  quantity: string
}

type Meal = {
  id: string
  name: string
  icon: LucideIcon
  time: string
  targetCalories: number
  consumedCalories: number
  items: MealItem[]
  completed: boolean
}

type MealCardProps = {
  meal: Meal
  onAddItem: () => void
}

export function MealCard({ meal, onAddItem }: MealCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const Icon = meal.icon
  const progress = (meal.consumedCalories / meal.targetCalories) * 100
  const isComplete = meal.completed || progress >= 100

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all group">
      {/* Header */}
      <div className="p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`
            w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0
            ${isComplete 
              ? 'bg-green-600/10 border border-green-500/20' 
              : 'bg-red-600/10 border border-red-500/20'
            }
          `}>
            {isComplete ? (
              <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" strokeWidth={2.5} />
            ) : (
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" strokeWidth={1.5} />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-white">{meal.name}</h3>
              {isComplete && (
                <span className="text-[10px] bg-green-600/20 text-green-400 px-2 py-0.5 rounded-full">
                  Complete
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{meal.time}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right mr-2">
            <p className="text-sm sm:text-base font-bold text-white">
              {meal.consumedCalories}
              <span className="text-xs text-gray-500 font-normal">/{meal.targetCalories}</span>
            </p>
            <p className="text-[10px] text-gray-500">kcal</p>
          </div>

          {/* Menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors text-gray-500"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-40 bg-[#1a1a1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-300 hover:bg-white/5">
                    <Edit2 className="w-3.5 h-3.5" /> Edit Meal
                  </button>
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:bg-red-600/10">
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 sm:px-5 pb-3">
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isComplete ? 'bg-green-500' : 'bg-gradient-to-r from-red-600 to-red-400'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Meal Items */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5">
        {meal.items.length > 0 ? (
          <div className="space-y-2">
            {meal.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 px-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-300 truncate">{item.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-gray-600">{item.quantity}</span>
                      <span className="text-[10px] text-gray-700">•</span>
                      <span className="text-[10px] text-gray-500">
                        P: {item.protein}g · C: {item.carbs}g · F: {item.fat}g
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-medium text-white ml-2 shrink-0">
                  {item.calories} kcal
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center border border-dashed border-white/[0.08] rounded-xl">
            <p className="text-xs text-gray-500">No meals logged yet</p>
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={onAddItem}
          className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 border border-dashed border-red-500/30 hover:border-red-500/60 hover:bg-red-600/5 text-red-500 text-xs sm:text-sm font-medium rounded-xl transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Food
        </button>
      </div>
    </div>
  )
}