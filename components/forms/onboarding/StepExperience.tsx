// components/forms/onboarding/steps/StepExperience.tsx
'use client'

import { EXPERIENCE_LEVELS, EQUIPMENT_OPTIONS } from '@/constants/onboarding.constants'
import { OnboardingFormData } from '@/types/onboarding'
import { Field } from './Field'
import { Pill } from './Pill'

type StepProps = {
  data: OnboardingFormData
  update: (patch: Partial<OnboardingFormData>) => void
  toggleArrayItem: (key: 'workoutDays' | 'equipment', value: string) => void
}

export function StepExperience({ data, update, toggleArrayItem }: StepProps) {
  return (
    <>
      <Field 
        label="Exercise Experience" 
        required
      >
        <div className="grid grid-cols-2 gap-3">
          {EXPERIENCE_LEVELS.map((level) => (
            <Pill 
              key={level.value} 
              label={level.value} 
              active={data.experienceLevel === level.value} 
              onClick={() => update({ experienceLevel: level.value })}
              icon={<level.icon className="w-4 h-4" />}
              description={level.description}
            />
          ))}
        </div>
      </Field>

      <Field 
        label="Available Equipment" 
        hint="Select all that apply"
      >
        <div className="grid grid-cols-2 gap-3">
          {EQUIPMENT_OPTIONS.map((equipment) => (
            <Pill 
              key={equipment.value} 
              label={equipment.value} 
              active={data.equipment.includes(equipment.value)} 
              onClick={() => toggleArrayItem('equipment', equipment.value)}
              icon={<equipment.icon className="w-4 h-4" />}
              description={equipment.description}
            />
          ))}
        </div>
      </Field>
    </>
  )
}