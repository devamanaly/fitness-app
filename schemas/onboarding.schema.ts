import { z } from 'zod'

export const onboardingSchema = z.object({
  age: z.number().min(13).max(100),
  gender: z.string().min(1),
  currentWeight: z.number().positive(),
  targetWeight: z.number().positive(),
  height: z.number().positive(),
  primaryGoal: z.string().min(1),
  activityLevel: z.string().min(1),
  preferredWorkoutTime: z.string().min(1),
  workoutDays: z.array(z.string()).min(1),
  experienceLevel: z.string().min(1),
  equipment: z.array(z.string()).min(1),
  medicalConditions: z.string().optional(),
  dietaryPreference: z.string().min(1),
  sleepHours: z.number().min(0).max(14),
  primaryMotivation: z.string().min(1),
})

export type OnboardingPayload = z.infer<typeof onboardingSchema>