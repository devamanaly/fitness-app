import { LucideIcon } from 'lucide-react'
import { STEP_VISUALS } from '@/constants/onboarding.constants'
import { OnboardingStepKey } from '@/types/onboarding'

type OnboardingVisualPanelProps = {
  stepKey: OnboardingStepKey
  icon: LucideIcon
  stepNumber: number
  totalSteps: number
}

export function OnboardingVisualPanel({ stepKey, icon: Icon, stepNumber, totalSteps }: OnboardingVisualPanelProps) {
  const visual = STEP_VISUALS[stepKey]

  return (
    <div className="relative hidden lg:flex lg:flex-col lg:justify-between overflow-hidden bg-[#0d0d0e] border-r border-white/[0.06] px-10 py-12 w-[420px] shrink-0">
      {/* faint dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: 'radial-gradient(circle, #3f3f46 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      {/* top: brand mark */}
      <div className="relative z-10">
        <span className="text-white font-[family-name:var(--font-oswald)] tracking-widest text-sm uppercase">
          FitJourney <span className="text-red-500">AI</span>
        </span>
      </div>

      {/* center: icon + heartbeat pulse */}
      <div className="relative z-10 flex flex-col items-start gap-8">
        <div className="relative w-20 h-20 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center">
          <Icon className="w-9 h-9 text-red-500" strokeWidth={1.5} />
        </div>

        <div>
          <h2 className="text-3xl font-[family-name:var(--font-oswald)] font-semibold text-white leading-tight mb-3">
            {visual.tagline}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
            {visual.caption}
          </p>
        </div>

        {/* animated heartbeat pulse — the brand signature */}
        <svg className="w-full max-w-[280px] h-10" viewBox="0 0 280 40" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`pulse-${stepKey}`} x1="0" y1="0" x2="280" y2="0">
              <stop offset="0%" stopColor="#3f3f46" stopOpacity="0" />
              <stop offset="35%" stopColor="#52525b" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="65%" stopColor="#52525b" />
              <stop offset="100%" stopColor="#3f3f46" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            key={stepKey}
            d="M0 20 H105 L113 5 L121 35 L129 12 L137 20 H280"
            stroke={`url(#pulse-${stepKey})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="220"
            className="[animation:pulse-draw_1.2s_ease-out_forwards]"
          />
          <circle cx="121" cy="35" r="2.5" fill="#ef4444" className="[animation:glow-dot_2s_ease-in-out_infinite]" />
        </svg>
      </div>

      {/* bottom: step dots */}
      <div className="relative z-10 flex items-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === stepNumber ? 'w-6 bg-red-500' : i < stepNumber ? 'w-1.5 bg-red-500/40' : 'w-1.5 bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  )
}