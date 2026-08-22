import { MOTIVATIONS } from '@/constants/onboarding.constants'
import { OnboardingFormData } from '@/types/onboarding'
import { Field } from './Field'
import { Pill } from './Pill'

type StepProps = {
  data: OnboardingFormData
  update: (patch: Partial<OnboardingFormData>) => void
}

export function StepMotivation({ data, update }: StepProps) {
  return (
    <Field label="What's driving you right now?">
      <div className="flex flex-col gap-2">
        {MOTIVATIONS.map((m) => (
          <Pill
            key={m.value}
            label={m.description}
            active={data.primaryMotivation === m.value}
            onClick={() => update({ primaryMotivation: m.value })}
          />
        ))}
      </div>
    </Field>
  )
}