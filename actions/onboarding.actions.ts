'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
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
    user_id: user.id,
  })

  if (error) return { error: error.message }

  // Mark onboarding as done in app_metadata so middleware can check it
  // without querying onboarding_data on every request.
  const { error: metaError } = await supabaseAdmin.auth.admin.updateUserById(
    user.id,
    { app_metadata: { onboarding_done: true } }
  )

  if (metaError) {
    // The onboarding row was saved successfully — don't fail the whole
    // action over this, but log it so you notice if it keeps happening.
    console.error('Failed to set onboarding_done in app_metadata:', metaError.message)
  }

  return { success: true }
}