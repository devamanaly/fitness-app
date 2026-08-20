import { LucideIcon } from 'lucide-react'
import { STEP_VISUALS } from '@/constants/onboarding.constants'
import { OnboardingStepKey } from '@/types/onboarding'

type OnboardingMobileHeaderProps = {
  stepKey: OnboardingStepKey
  icon: LucideIcon
}

export function OnboardingMobileHeader({ stepKey, icon: Icon }: OnboardingMobileHeaderProps) {
  const visual = STEP_VISUALS[stepKey]

  return (
    <div className="lg:hidden bg-[#0d0d0e] border-b border-white/[0.06] px-5 py-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-red-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-[family-name:var(--font-oswald)] font-semibold text-white">
          {visual.tagline}
        </h2>
      </div>
      <p className="text-gray-500 text-xs pl-[52px]">{visual.caption}</p>
    </div>
  )
}