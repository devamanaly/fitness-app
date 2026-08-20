import { GOALS } from '@/constants/onboarding.constants'
import { OnboardingFormData } from '@/types/onboarding'
import { Field } from './Field'
import { Pill } from './Pill'

type StepProps = {
  data: OnboardingFormData
  update: (patch: Partial<OnboardingFormData>) => void
}

export function StepGoal({ data, update }: StepProps) {
  return (
    <Field label="What's your primary goal?">
      <div className="flex flex-wrap gap-2">
      {GOALS.map((g) => (
  <Pill
    key={g.value}
    label={g.value}
    icon={<g.icon className="w-5 h-5" />}
        description={g.description}
    active={data.primaryGoal === g.value}
    onClick={() => update({ primaryGoal: g.value })}
  />
))}
      </div>
    </Field>
  )
}