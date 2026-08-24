// components/dashboard/sections/AIInsights.tsx
'use client'

import { Brain, TrendingUp, AlertCircle, Sparkles } from 'lucide-react'

export function AIInsights() {
  const insights = [
    {
      icon: TrendingUp,
      color: 'text-green-400 bg-green-600/10',
      text: "You're 15% more consistent this week! Keep it up.",
    },
    {
      icon: AlertCircle,
      color: 'text-yellow-400 bg-yellow-600/10',
      text: "Consider moving your workout to morning - you'll be more consistent.",
    },
    {
      icon: Sparkles,
      color: 'text-red-400 bg-red-600/10',
      text: "Try adding 10 minutes of walking after lunch to hit your step goal.",
    },
  ]

  return (
    <div className="bg-[#111113] border border-white/[0.06] rounded-2xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white">AI Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            <div className={`p-2 rounded-lg ${insight.color} shrink-0`}>
              <insight.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}