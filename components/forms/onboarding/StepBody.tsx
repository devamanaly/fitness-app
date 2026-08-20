// components/forms/onboarding/steps/StepBody.tsx
'use client'

import { OnboardingFormData } from '@/types/onboarding'
import { Field, inputClass } from './Field'
import { Scale, Target, Ruler } from 'lucide-react'

type StepProps = {
  data: OnboardingFormData
  update: (patch: Partial<OnboardingFormData>) => void
}

export function StepBody({ data, update }: StepProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Field 
          label="Current Weight" 
          required
        >
          <div className="relative group">
            <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
            <input
              type="number"
              value={data.currentWeight}
              onChange={(e) => update({ currentWeight: e.target.value })}
              className={`${inputClass} pl-10`}
              placeholder="70"
            />
          </div>
        </Field>

        <Field 
          label="Target Weight" 
          required
        >
          <div className="relative group">
            <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
            <input
              type="number"
              value={data.targetWeight}
              onChange={(e) => update({ targetWeight: e.target.value })}
              className={`${inputClass} pl-10`}
              placeholder="65"
            />
          </div>
        </Field>
      </div>

      <Field 
        label="Height" 
        required
      >
        <div className="relative group">
          <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
          <input
            type="number"
            value={data.height}
            onChange={(e) => update({ height: e.target.value })}
            className={`${inputClass} pl-10`}
            placeholder="175"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">cm</span>
        </div>
      </Field>
    </>
  )
}