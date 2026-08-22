import Image from 'next/image'
import { Target, TrendingUp, Trophy } from 'lucide-react'
import { STEP_VISUALS } from '@/constants/onboarding.constants'
import { OnboardingStepKey } from '@/types/onboarding'
import pic from '../../../public/onboarding/eNuZh.jpg'
type OnboardingVisualPanelProps = {
  stepKey: OnboardingStepKey
  stepNumber: number
  totalSteps: number
}

const FEATURES = [
  { icon: Target, title: 'Personalized', subtitle: 'Plans just for you' },
  { icon: TrendingUp, title: 'AI Powered', subtitle: 'Smarter every day' },
  { icon: Trophy, title: 'Stay Consistent', subtitle: 'Track. Improve. Achieve.' },
]

export function OnboardingVisualPanel({ stepKey, stepNumber, totalSteps }: OnboardingVisualPanelProps) {
  const visual = STEP_VISUALS[stepKey]

  return (
    <div className="relative hidden lg:flex lg:flex-col justify-between overflow-hidden w-[420px] xl:w-[480px] 2xl:w-[560px] 3xl:w-[640px] shrink-0 h-screen sticky top-0">
      {/* background photo */}
      <Image
        src={pic}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="(min-width: 1536px) 600px, (min-width: 1280px) 480px, 420px"
      />
      {/* gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* top: brand mark */}
      <div className="relative z-10 px-8 xl:px-10 2xl:px-12 pt-10">
        <span className="text-white font-[family-name:var(--font-oswald)] tracking-widest text-sm 2xl:text-base uppercase">
          FitJourney <span className="text-red-500">AI</span>
        </span>
      </div>

      {/* bottom: headline + features + step dots */}
      <div className="relative z-10 px-8 xl:px-10 2xl:px-12 pb-10 2xl:pb-12">
        <h2 className="text-4xl 2xl:text-5xl font-[family-name:var(--font-oswald)] font-bold text-white leading-[1.05] mb-3">
          {visual.tagline.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-red-500">{visual.tagline.split(' ').slice(-1)}</span>
        </h2>
        <p className="text-gray-300 text-sm 2xl:text-base leading-relaxed max-w-[320px] mb-8">
          {visual.caption}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {FEATURES.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-500/20 flex items-center justify-center mb-2">
                <Icon className="w-4 h-4 text-red-500" />
              </div>
              <p className="text-white text-xs font-semibold leading-tight">{title}</p>
              <p className="text-gray-500 text-[11px] leading-tight">{subtitle}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === stepNumber ? 'w-6 bg-red-500' : i < stepNumber ? 'w-1.5 bg-red-500/40' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}