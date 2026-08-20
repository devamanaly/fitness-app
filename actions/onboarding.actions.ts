'use server'

import { createClient } from '@/lib/supabase/server'
import { onboardingSchema, type OnboardingPayload } from '@/schemas/onboarding.schema'

export async function saveOnboardingDetails(payload: OnboardingPayload) {
  const parsed = onboardingSchema.safeParse(payload)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('onboarding_data').upsert({
    id: user.id,
    age: parsed.data.age,
    gender: parsed.data.gender,
    current_weight: parsed.data.currentWeight,
    target_weight: parsed.data.targetWeight,
    height: parsed.data.height,
    primary_goal: parsed.data.primaryGoal,
    activity_level: parsed.data.activityLevel,
    preferred_workout_time: parsed.data.preferredWorkoutTime,
    workout_days: parsed.data.workoutDays,
    experience_level: parsed.data.experienceLevel,
    equipment: parsed.data.equipment,
    medical_conditions: parsed.data.medicalConditions ?? null,
    dietary_preference: parsed.data.dietaryPreference,
    sleep_hours: parsed.data.sleepHours,
    primary_motivation: parsed.data.primaryMotivation,
  })

  if (error) return { error: error.message }
  return { success: true }
}