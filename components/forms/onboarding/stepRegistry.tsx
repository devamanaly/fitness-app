/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ruler, Target, Flame, HeartPulse, Clock, Dumbbell, Salad, Sparkles } from 'lucide-react'
import { OnboardingStepKey } from '@/types/onboarding'
import { StepBasics } from './StepBasics'
import { StepBody } from './StepBody'
import { StepGoal } from './StepGoal'
import { StepActivity } from './StepActivity'
import { StepSchedule } from './StepSchedule'
import { StepExperience } from './StepExperience'
import { StepHealth } from './StepHealth'
import { StepDiet } from './StepDiet'
import { StepMotivation } from './StepMotivation'
import type { LucideIcon } from 'lucide-react'

export const STEP_COMPONENTS: Record<OnboardingStepKey, React.ComponentType<any>> = {
  basics: StepBasics,
  body: StepBody,
  goal: StepGoal,
  activity: StepActivity,
  schedule: StepSchedule,
  experience: StepExperience,
  health: StepHealth,
  diet: StepDiet,
  motivation: StepMotivation,
}

export const STEP_ICONS: Record<OnboardingStepKey, LucideIcon> = {
  basics: Ruler,
  body: Target,
  goal: Flame,
  activity: HeartPulse,
  schedule: Clock,
  experience: Dumbbell,
  health: HeartPulse,
  diet: Salad,
  motivation: Sparkles,
}