// app/(dashboard)/progress/page.tsx
'use client'

import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Scale,
  Ruler,
  Camera,
  Trophy,
  Target,
  Flame,
  Plus,
  Calendar,
  Award,
  Star,
  Zap,
  Heart,
  Dumbbell,
  ChevronRight,
  Filter
} from 'lucide-react'
import { WeightChart } from '@/components/Dashboard/progress/WeightChart'
import { ProgressStats } from '@/components/Dashboard/progress/ProgressStats'
import { MeasurementsTracker } from '@/components/Dashboard/progress/MeasurementsTracker'
import { ProgressPhotos } from '@/components/Dashboard/progress/ProgressPhotos'
import { AchievementsGrid } from '@/components/Dashboard/progress/AchievementsGrid'
import { MilestonesList } from '@/components/Dashboard/progress/MilestonesList'
import { AddMeasurementModal } from '@/components/Dashboard/progress/AddMeasurementModal'

// Static mock data
const mockProgressStats = {
  currentWeight: 72.5,
  startingWeight: 78.0,
  targetWeight: 68.0,
  weightChange: -5.5,
  bodyFat: 18.5,
  bodyFatChange: -3.2,
  bmi: 23.8,
  bmiChange: -1.8,
}

const mockWeightHistory = [
  { date: '2026-06-01', weight: 78.0, label: 'Jun 1' },
  { date: '2026-06-15', weight: 77.2, label: 'Jun 15' },
  { date: '2026-07-01', weight: 76.5, label: 'Jul 1' },
  { date: '2026-07-15', weight: 75.3, label: 'Jul 15' },
  { date: '2026-08-01', weight: 74.1, label: 'Aug 1' },
  { date: '2026-08-15', weight: 73.2, label: 'Aug 15' },
  { date: '2026-08-24', weight: 72.5, label: 'Today' },
]

const mockMeasurements = {
  waist: { current: 82, previous: 88, unit: 'cm' },
  chest: { current: 98, previous: 96, unit: 'cm' },
  hips: { current: 95, previous: 98, unit: 'cm' },
  arms: { current: 35, previous: 33, unit: 'cm' },
  thighs: { current: 55, previous: 57, unit: 'cm' },
  neck: { current: 38, previous: 39, unit: 'cm' },
}

const mockAchievements = [
  {
    id: 1,
    title: 'First Workout',
    description: 'Completed your first workout',
    icon: Dumbbell,
    unlocked: true,
    unlockedAt: '2026-06-01',
    color: 'red',
  },
  {
    id: 2,
    title: '7-Day Streak',
    description: 'Worked out 7 days in a row',
    icon: Flame,
    unlocked: true,
    unlockedAt: '2026-06-08',
    color: 'orange',
  },
  {
    id: 3,
    title: 'First 5kg Lost',
    description: 'Lost your first 5 kilograms',
    icon: Trophy,
    unlocked: true,
    unlockedAt: '2026-07-15',
    color: 'yellow',
  },
  {
    id: 4,
    title: 'Consistency King',
    description: 'Completed 30 workouts',
    icon: Award,
    unlocked: true,
    unlockedAt: '2026-08-01',
    color: 'purple',
  },
  {
    id: 5,
    title: 'Marathon Ready',
    description: 'Run 10km in one session',
    icon: Zap,
    unlocked: false,
    color: 'blue',
  },
  {
    id: 6,
    title: 'Perfect Week',
    description: 'Complete all planned workouts in a week',
    icon: Star,
    unlocked: false,
    color: 'pink',
  },
  {
    id: 7,
    title: 'Goal Crusher',
    description: 'Reach your target weight',
    icon: Target,
    unlocked: false,
    color: 'green',
  },
  {
    id: 8,
    title: '100 Workouts',
    description: 'Complete 100 total workouts',
    icon: Heart,
    unlocked: false,
    color: 'red',
  },
]
type Milestone = {
  id: number
  title: string
  description: string
  date: string
  completed: boolean
  type: 'start' | 'weight' | 'milestone' | 'goal'
}
const mockMilestones: Milestone[] = [
  {
    id: 1,
    title: 'Started Journey',
    description: 'Beginning weight: 78.0 kg',
    date: '2026-06-01',
    completed: true,
    type: 'start',
  },
  {
    id: 2,
    title: 'First 2kg Lost',
    description: 'Reached 76.0 kg',
    date: '2026-06-20',
    completed: true,
    type: 'weight',
  },
  {
    id: 3,
    title: 'First 5kg Lost',
    description: 'Reached 73.0 kg',
    date: '2026-08-05',
    completed: true,
    type: 'weight',
  },
  {
    id: 4,
    title: 'Halfway Point',
    description: 'Reached 73.0 kg (halfway to goal)',
    date: '2026-08-05',
    completed: true,
    type: 'milestone',
  },
  {
    id: 5,
    title: 'Target Weight',
    description: 'Reach 68.0 kg',
    date: 'Expected: Nov 2026',
    completed: false,
    type: 'goal',
  },
]

const mockPhotos = [
  { id: 1, date: '2026-06-01', label: 'Start', weight: 78.0 },
  { id: 2, date: '2026-07-01', label: 'Month 1', weight: 76.5 },
  { id: 3, date: '2026-08-01', label: 'Month 2', weight: 74.1 },
  { id: 4, date: '2026-08-24', label: 'Current', weight: 72.5 },
]

export default function ProgressPage() {
  const [addMeasurementOpen, setAddMeasurementOpen] = useState(false)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('90d')

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Your <span className="text-red-500">Progress</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            Track your transformation journey
          </p>
        </div>
        <button
          onClick={() => setAddMeasurementOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Log Measurement</span>
        </button>
      </div>

      {/* Stats Overview */}
      <ProgressStats stats={mockProgressStats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Weight Chart */}
        <div className="lg:col-span-2">
          <WeightChart
            data={mockWeightHistory}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            currentWeight={mockProgressStats.currentWeight}
            targetWeight={mockProgressStats.targetWeight}
            startingWeight={mockProgressStats.startingWeight}
          />
        </div>

        {/* Milestones */}
        <div>
          <MilestonesList milestones={mockMilestones} />
        </div>
      </div>

      {/* Measurements Tracker */}
      <MeasurementsTracker measurements={mockMeasurements} />

      {/* Progress Photos */}
      <ProgressPhotos photos={mockPhotos} />

      {/* Achievements */}
      <AchievementsGrid achievements={mockAchievements} />

      {/* Add Measurement Modal */}
      {addMeasurementOpen && (
        <AddMeasurementModal onClose={() => setAddMeasurementOpen(false)} />
      )}
    </div>
  )
}