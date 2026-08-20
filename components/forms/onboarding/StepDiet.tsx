// components/forms/onboarding/steps/StepDiet.tsx
'use client'

import { DIET_PREFERENCES } from '@/constants/onboarding.constants'
import { OnboardingFormData } from '@/types/onboarding'
import { Field, inputClass } from './Field'
import { Pill } from './Pill'
import { Moon } from 'lucide-react'

type StepProps = {
  data: OnboardingFormData
  update: (patch: Partial<OnboardingFormData>) => void
}

export function StepDiet({ data, update }: StepProps) {
  return (
    <>
      <Field 
        label="Dietary Preference" 
        required
      >
        <div className="grid grid-cols-2 gap-3">
          {DIET_PREFERENCES.map((diet) => (
            <Pill 
              key={diet.value} 
              label={diet.value} 
              active={data.dietaryPreference === diet.value} 
              onClick={() => update({ dietaryPreference: diet.value })}
              icon={<diet.icon className="w-4 h-4" />}
              description={diet.description}
            />
          ))}
        </div>
      </Field>

      <Field 
        label="Average Sleep" 
        required
        hint="Hours per night"
      >
        <div className="relative group">
          <Moon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
          <input
            type="number" 
            step={0.5} 
            min={0} 
            max={14} 
            value={data.sleepHours}
            onChange={(e) => update({ sleepHours: e.target.value })}
            className={`${inputClass} pl-10`} 
            placeholder="7"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">hrs</span>
        </div>
      </Field>
    </>
  )
}