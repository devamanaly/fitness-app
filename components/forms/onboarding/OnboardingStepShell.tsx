// components/forms/onboarding/OnboardingStepShell.tsx
'use client'

import { ChevronLeft, ChevronRight, Loader2, Lock } from 'lucide-react'

type OnboardingStepShellProps = {
  // icon: React.ReactNode
  title: string
  subtitle?: string
  error: string
  saving: boolean
  isFirstStep: boolean
  isLastStep: boolean
  onBack: () => void
  onNext: () => void
  children: React.ReactNode
  hideIconHeader?: boolean
}

export function OnboardingStepShell({
  title,
  subtitle,
  error,
  saving,
  isFirstStep,
  isLastStep,
  onBack,
  onNext,
  children,
  hideIconHeader,
}: OnboardingStepShellProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-[family-name:var(--font-oswald)] font-semibold tracking-wide text-white mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-600/10 border border-red-600/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            <Lock className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-6">{children}</div>
      </div>

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.06]">
        <button
          onClick={onBack}
          disabled={isFirstStep || saving}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium disabled:opacity-0 transition-all px-4 py-2 rounded-lg hover:bg-white/5"
        >
          <ChevronLeft className="w-4 h-4" /> 
          Back
        </button>

        <button
          onClick={onNext}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-7 py-3.5 rounded-xl font-semibold tracking-wide transition-all shadow-lg shadow-red-900/40 hover:shadow-xl hover:shadow-red-600/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLastStep ? (saving ? 'Saving...' : 'Complete Setup') : 'Continue'}
          {!saving && !isLastStep && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}