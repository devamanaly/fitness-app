"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveOnboardingDetails } from "@/actions/onboarding.actions";
import {
  ONBOARDING_STEPS,
  ONBOARDING_INITIAL_DATA,
  type OnboardingFormData,
} from "@/types/onboarding";

export function useOnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingFormData>(ONBOARDING_INITIAL_DATA);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (patch: Partial<OnboardingFormData>) =>
    setData((d) => ({ ...d, ...patch }));

  const toggleArrayItem = (key: "workoutDays" | "equipment", value: string) => {
    setData((d) => ({
      ...d,
      [key]: d[key].includes(value)
        ? d[key].filter((v) => v !== value)
        : [...d[key], value],
    }));
  };

  const isStepValid = () => {
    switch (ONBOARDING_STEPS[step].key) {
      case "basics":
        return !!data.age && !!data.gender;
      case "body":
        return !!data.currentWeight && !!data.targetWeight && !!data.height;
      case "goal":
        return !!data.primaryGoal;
      case "activity":
        return !!data.activityLevel;
      case "schedule":
        return !!data.preferredWorkoutTime && data.workoutDays.length > 0;
      case "experience":
        return !!data.experienceLevel && data.equipment.length > 0;
      case "health":
        return true;
      case "diet":
        return !!data.dietaryPreference && !!data.sleepHours;
      case "motivation":
        return !!data.primaryMotivation;
      default:
        return true;
    }
  };

  const submit = async () => {
    setSaving(true);
    setError("");

    const result = await saveOnboardingDetails({
      age: Number(data.age),
      gender: data.gender,
      currentWeight: Number(data.currentWeight),
      targetWeight: Number(data.targetWeight),
      height: Number(data.height),
      primaryGoal: data.primaryGoal,
      activityLevel: data.activityLevel,
      preferredWorkoutTime: data.preferredWorkoutTime,
      workoutDays: data.workoutDays,
      experienceLevel: data.experienceLevel,
      equipment: data.equipment,
      medicalConditions: data.medicalConditions || undefined,
      dietaryPreference: data.dietaryPreference,
      sleepHours: Number(data.sleepHours),
      primaryMotivation: data.primaryMotivation,
    });

    if (result.error) {
      setError(result.error);
      setSaving(false);
      return;
    }

    router.push("/onboarding/avatar");
    router.refresh();
  };

  const goNext = () => {
    setError("");
    if (!isStepValid()) {
      setError("Please fill in this step before continuing");
      return;
    }
    if (step < ONBOARDING_STEPS.length - 1) setStep((s) => s + 1);
    else submit();
  };

  const goBack = () => {
    setError("");
    if (step > 0) setStep((s) => s - 1);
  };

  return { step, data, error, saving, update, toggleArrayItem, goNext, goBack };
}
