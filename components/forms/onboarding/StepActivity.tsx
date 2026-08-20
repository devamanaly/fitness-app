// components/forms/onboarding/steps/StepActivity.tsx
'use client'

import { ACTIVITY_LEVELS } from '@/constants/onboarding.constants'
import { OnboardingFormData } from '@/types/onboarding'
import { Field } from './Field'
import { Pill } from './Pill'

type StepProps = {
  data: OnboardingFormData
  update: (patch: Partial<OnboardingFormData>) => void
}

export function StepActivity({ data, update }: StepProps) {
  return (
    <Field 
      label="How active are you day-to-day?" 
      required
      hint="This helps us calculate your daily calorie needs"
    >
      <div className="flex flex-col gap-3">
        {ACTIVITY_LEVELS.map((level) => (
          <Pill 
            key={level.value} 
            label={level.value} 
            active={data.activityLevel === level.value} 
            onClick={() => update({ activityLevel: level.value })}
            icon={<level.icon className="w-4 h-4" />}
            description={level.description}
          />
        ))}
      </div>
    </Field>
  )
}