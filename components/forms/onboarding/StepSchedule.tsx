import { WORKOUT_TIMES, DAYS } from '@/constants/onboarding.constants'
import { OnboardingFormData } from '@/types/onboarding'
import { Field } from './Field'
import { Pill } from './Pill'

type StepProps = {
  data: OnboardingFormData
  update: (patch: Partial<OnboardingFormData>) => void
  toggleArrayItem: (key: 'workoutDays' | 'equipment', value: string) => void
}

export function StepSchedule({
  data,
  update,
  toggleArrayItem,
}: StepProps) {
  return (
    <>
      <Field label="Preferred workout time">
        <div className="flex flex-wrap gap-2">
          {WORKOUT_TIMES.map((t) => (
            <Pill
              key={t.value}
              label={t.value}
              icon={<t.icon className="w-5 h-5" />}
              description={t.description}
              active={data.preferredWorkoutTime === t.value}
              onClick={() =>
                update({ preferredWorkoutTime: t.value })
              }
            />
          ))}
        </div>
      </Field>

      <Field label="Days available to work out">
        <div className="flex flex-wrap gap-2">
          {DAYS.map((d) => (
            <Pill
              key={d}
              label={d}
              active={data.workoutDays.includes(d)}
              onClick={() =>
                toggleArrayItem('workoutDays', d)
              }
            />
          ))}
        </div>
      </Field>
    </>
  )
}