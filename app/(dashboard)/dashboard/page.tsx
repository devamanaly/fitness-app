// app/(dashboard)/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { 
  Scale, 
  Flame, 
  Droplets, 
  Zap, 
  Plus,
  Clock,
  Play,
  ChevronRight,
  Check,
  Trophy,
  Target,
  Activity,
  TrendingUp,
  TrendingDown,
  Brain,
  Calendar,
  Dumbbell,
  AlertCircle,
  Sparkles,
  Moon,
  Heart
} from 'lucide-react'
import { CheckInModal } from '@/components/Dashboard/CheckInModal'
import { StatCard } from '@/components/Dashboard/cards/StatCard'
import { WeightChart } from '@/components/Dashboard/charts/WeightChart'
import { ProgressRing } from '@/components/Dashboard/charts/ProgressRing'

// Mock Data
const mockStats = [
  {
    id: 1,
    icon: Scale,
    label: 'Current Weight',
    value: '72.5 kg',
    change: '-1.2 kg this week',
    trend: 'down' as const,
    color: 'red' as const,
  },
  {
    id: 2,
    icon: Flame,
    label: 'Calories Burned',
    value: '450 kcal',
    change: '+120 today',
    trend: 'up' as const,
    color: 'orange' as const,
  },
  {
    id: 3,
    icon: Droplets,
    label: 'Water Intake',
    value: '1.5L',
    change: '75% of daily goal',
    trend: 'neutral' as const,
    color: 'blue' as const,
  },
  {
    id: 4,
    icon: Zap,
    label: 'Day Streak',
    value: '15',
    change: 'Personal best!',
    trend: 'up' as const,
    color: 'yellow' as const,
  },
]

const mockWorkout = {
  title: 'Upper Body Strength',
  duration: 45,
  exercises: 8,
  intensity: 'Moderate',
  calories: 350,
  exercises_list: [
    { name: 'Push-ups', sets: 3, reps: 12, weight: 'Bodyweight' },
    { name: 'Dumbbell Press', sets: 3, reps: 10, weight: '15 kg' },
    { name: 'Bent Over Rows', sets: 3, reps: 12, weight: '20 kg' },
    { name: 'Shoulder Press', sets: 3, reps: 10, weight: '12.5 kg' },
  ]
}

const mockInsights = [
  {
    id: 1,
    icon: TrendingUp,
    color: 'text-green-400 bg-green-600/10',
    title: 'Consistency Win',
    text: "You're 15% more consistent this week! Keep it up.",
  },
  {
    id: 2,
    icon: AlertCircle,
    color: 'text-yellow-400 bg-yellow-600/10',
    title: 'Schedule Optimization',
    text: "Consider moving your workout to morning - you'll be more consistent.",
  },
  {
    id: 3,
    icon: Sparkles,
    color: 'text-red-400 bg-red-600/10',
    title: 'Quick Tip',
    text: "Try adding 10 minutes of walking after lunch to hit your step goal.",
  },
]

const mockWeekWorkouts = [
  { day: 'Mon', title: 'Upper Body', time: '7:00 AM', duration: '45 min', completed: true },
  { day: 'Tue', title: 'Cardio', time: '6:30 AM', duration: '30 min', completed: true },
  { day: 'Wed', title: 'Lower Body', time: '7:00 AM', duration: '50 min', completed: false },
  { day: 'Thu', title: 'Rest Day', time: '-', duration: '-', completed: false },
  { day: 'Fri', title: 'Full Body', time: '7:00 AM', duration: '45 min', completed: false },
  { day: 'Sat', title: 'HIIT', time: '8:00 AM', duration: '25 min', completed: false },
  { day: 'Sun', title: 'Yoga', time: '9:00 AM', duration: '30 min', completed: false },
]

export default function DashboardPage() {
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [greeting, setGreeting] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {greeting}, <span className="text-red-500">John</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1">
            Ready to crush your fitness goals today?
          </p>
        </div>
        <button
          onClick={() => setCheckInOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Daily Check-in</span>
        </button>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {mockStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Today's Workout */}
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-600/20 to-transparent p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-white">Today&apos;s Workout</h3>
                <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full">In Progress</span>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">{mockWorkout.title}</p>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm sm:text-base font-semibold text-white">{mockWorkout.duration} min</p>
                </div>
                <div className="text-center">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs text-gray-500">Exercises</p>
                  <p className="text-sm sm:text-base font-semibold text-white">{mockWorkout.exercises}</p>
                </div>
                <div className="text-center">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="text-sm sm:text-base font-semibold text-white">{mockWorkout.calories}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 sm:mb-6">
                {mockWorkout.exercises_list.map((exercise, i) => (
                  <div key={i} className="flex items-center justify-between py-2 px-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600/10 rounded-lg flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs text-red-500 font-medium">{i + 1}</span>
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm text-gray-300">{exercise.name}</span>
                        <span className="hidden sm:block text-[10px] text-gray-600">{exercise.weight}</span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500">{exercise.sets}x{exercise.reps}</span>
                  </div>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5 active:translate-y-0">
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Start Workout</span>
              </button>
            </div>
          </div>

          {/* Weight Chart */}
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-white">Weight Progress</h3>
              <select className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-400 w-full sm:w-auto">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <WeightChart />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Daily Goals */}
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Daily Goals</h3>
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <ProgressRing progress={75} size={isMobile ? 80 : 100} label="Water" />
              <ProgressRing progress={60} size={isMobile ? 80 : 100} label="Calories" />
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">AI Insights</h3>
            </div>

            <div className="space-y-3">
              {mockInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className={`p-2 rounded-lg ${insight.color} shrink-0`}>
                    <insight.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white">{insight.title}</p>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-0.5">{insight.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* This Week */}
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

        <div className="flex sm:grid sm:grid-cols-7 gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {mockWeekWorkouts.map((workout, index) => (
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
              {workout.completed ? (
                <p className="text-[10px] text-green-400 mt-1">✓ Done</p>
              ) : (
                <p className="text-[10px] text-gray-500 mt-1">{workout.time}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Check-in Modal */}
      {checkInOpen && (
        <CheckInModal onClose={() => setCheckInOpen(false)} />
      )}
    </div>
  )
}