/* eslint-disable react/no-unescaped-entities */
// app/(dashboard)/not-found.tsx
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Dumbbell, 
  ArrowLeft, 
  Home, 
  Search, 
  Compass,
  AlertTriangle 
} from 'lucide-react'

export default function DashboardNotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-red-600/10 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        </div>
      </div>

      {/* Error code */}
      <h1 className="text-7xl md:text-8xl font-bold text-white mb-4">
        4<span className="text-red-500">0</span>4
      </h1>
      
      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
        Page Not Found
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        Oops! The page you're looking for doesn't exist or has been moved. 
        Let's get you back on track.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 hover:border-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all hover:bg-white/[0.06]"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20"
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-12">
        <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { name: 'Workouts', href: '/dashboard/workouts', icon: Dumbbell },
            { name: 'Nutrition', href: '/dashboard/nutrition', icon: Compass },
            { name: 'Progress', href: '/dashboard/progress', icon: Search },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.08] rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="mt-12 p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl max-w-md">
        <p className="text-sm text-gray-400">
          Still lost?{' '}
          <Link href="/dashboard/coach" className="text-red-500 hover:text-red-400 transition-colors">
            Ask your AI Coach
          </Link>{' '}
          for help navigating the app.
        </p>
      </div>
    </div>
  )
}