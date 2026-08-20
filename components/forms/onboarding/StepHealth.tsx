import { OnboardingFormData } from '@/types/onboarding'
import { Field, inputClass } from './Field'

type StepProps = {
  data: OnboardingFormData
  update: (patch: Partial<OnboardingFormData>) => void
}

export function StepHealth({ data, update }: StepProps) {
  return (
    <Field label="Any injuries or medical conditions we should know about?">
      <textarea
        value={data.medicalConditions}
        onChange={(e) => update({ medicalConditions: e.target.value })}
        rows={4}
        className={inputClass}
        placeholder="e.g. Lower back pain, knee injury — or leave blank if none"
      />
    </Field>
  )
}