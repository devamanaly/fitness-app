// components/forms/onboarding/OnboardingProgressBar.tsx
'use client'

import { Check } from 'lucide-react'
import { ONBOARDING_STEPS } from '@/types/onboarding'

type OnboardingProgressBarProps = {
  currentStep: number
  totalSteps: number
}

export function OnboardingProgressBar({ currentStep, totalSteps }: OnboardingProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-400">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-xs text-gray-600">•</span>
          <span className="text-xs text-gray-500">
            {ONBOARDING_STEPS[currentStep]?.shortTitle || 'Onboarding'}
          </span>
        </div>
        <span className="text-xs font-semibold text-red-500">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="relative">
        <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
        
        {/* Step markers */}
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < currentStep
                  ? 'bg-red-500'
                  : i === currentStep
                  ? 'bg-red-500 ring-4 ring-red-500/20'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}