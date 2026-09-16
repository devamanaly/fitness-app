/* eslint-disable react/no-unescaped-entities */
// app/(dashboard)/nutrition/page.tsx
'use client'

import { useState } from 'react'
import { 
  Plus, 
  Flame, 
  Droplets, 
  Target, 
  TrendingUp,
  Apple,
  Coffee,
  Sun,
  Moon,
  Cookie,
  ChevronRight,
  Utensils,
  Salad
} from 'lucide-react'
import { MealCard } from '@/components/Dashboard/MealCard/MealCard'
import { NutritionStats } from '@/components/Dashboard/NutritionStat/NutritionStat'
import { MacroBreakdown } from '@/components/Dashboard/MacroBreakDown/MacroBreakDown'
import { WaterTracker } from '@/components/Dashboard/WaterTracker/WaterTracker'
import { AddMealModal } from '@/components/Dashboard/MealModel/MealModel'

// Static mock data
const mockMeals = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    icon: Coffee,
    time: '7:00 AM - 9:00 AM',
    targetCalories: 450,
    consumedCalories: 380,
    items: [
      { id: 1, name: 'Oatmeal with berries', calories: 280, protein: 8, carbs: 45, fat: 6, quantity: '1 bowl' },
      { id: 2, name: 'Greek yogurt', calories: 100, protein: 15, carbs: 6, fat: 2, quantity: '150g' },
    ],
    completed: true,
  },
  {
    id: 'lunch',
    name: 'Lunch',
    icon: Sun,
    time: '12:00 PM - 2:00 PM',
    targetCalories: 650,
    consumedCalories: 420,
    items: [
      { id: 3, name: 'Grilled chicken breast', calories: 280, protein: 45, carbs: 0, fat: 8, quantity: '150g' },
      { id: 4, name: 'Brown rice', calories: 140, protein: 3, carbs: 30, fat: 1, quantity: '100g' },
    ],
    completed: false,
  },
  {
    id: 'snacks',
    name: 'Snacks',
    icon: Cookie,
    time: '3:00 PM - 5:00 PM',
    targetCalories: 200,
    consumedCalories: 150,
    items: [
      { id: 5, name: 'Apple', calories: 95, protein: 0, carbs: 25, fat: 0, quantity: '1 medium' },
      { id: 6, name: 'Almonds', calories: 55, protein: 2, carbs: 2, fat: 5, quantity: '10 pieces' },
    ],
    completed: false,
  },
  {
    id: 'dinner',
    name: 'Dinner',
    icon: Moon,
    time: '7:00 PM - 9:00 PM',
    targetCalories: 600,
    consumedCalories: 0,
    items: [],
    completed: false,
  },
  {
    id: 'supper',
    name: 'Supper',
    icon: Moon,
    time: '9:00 PM - 10:30 PM',
    targetCalories: 200,
    consumedCalories: 0,
    items: [],
    completed: false,
  },
]

const mockWaterIntake = {
  current: 1.5,
  target: 3.0,
  unit: 'L',
}

export default function NutritionPage() {
  const [addMealOpen, setAddMealOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null)

  const totalTarget = mockMeals.reduce((sum, meal) => sum + meal.targetCalories, 0)
  const totalConsumed = mockMeals.reduce((sum, meal) => sum + meal.consumedCalories, 0)
  const remaining = totalTarget - totalConsumed

  const handleAddMeal = (mealId: string) => {
    setSelectedMeal(mealId)
    setAddMealOpen(true)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Nutrition <span className="text-red-500">Tracker</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            Track your meals and stay on top of your nutrition goals
          </p>
        </div>
        <button
          onClick={() => handleAddMeal('custom')}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Log Meal</span>
        </button>
      </div>

      {/* Stats Overview */}
      <NutritionStats
        totalTarget={totalTarget}
        totalConsumed={totalConsumed}
        remaining={remaining}
        waterIntake={mockWaterIntake}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Meals List */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Today's Meals</h2>
            <span className="text-xs sm:text-sm text-gray-500">
              {mockMeals.filter(m => m.completed).length} of {mockMeals.length} logged
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {mockMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onAddItem={() => handleAddMeal(meal.id)}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Macro Breakdown */}
          <MacroBreakdown
            protein={{ current: 85, target: 140 }}
            carbs={{ current: 120, target: 250 }}
            fat={{ current: 45, target: 70 }}
          />

          {/* Water Tracker */}
          <WaterTracker
            current={mockWaterIntake.current}
            target={mockWaterIntake.target}
            unit={mockWaterIntake.unit}
          />

          {/* Quick Tips */}
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Apple className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">Quick Tips</h3>
            </div>
            <div className="space-y-3">
              {[
                'Drink a glass of water before each meal',
                'Include protein in every meal for satiety',
                'Add colorful vegetables to your plate',
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Meal Modal */}
      {addMealOpen && (
        <AddMealModal
          mealId={selectedMeal}
          onClose={() => {
            setAddMealOpen(false)
            setSelectedMeal(null)
          }}
        />
      )}
    </div>
  )
}