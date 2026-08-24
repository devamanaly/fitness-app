"use client";

import { useOnboardingForm } from "@/hooks/useOnboardingForm";
import { ONBOARDING_STEPS } from "@/types/onboarding";
import { OnboardingProgressBar } from "@/components/forms/onboarding/OnboardingProgressBar";
import { OnboardingStepShell } from "@/components/forms/onboarding/OnboardingStepShell";
import { OnboardingVisualPanel } from "@/components/forms/onboarding/OnboardingVisualPanel";
import { OnboardingMobileHeader } from "@/components/forms/onboarding/OnboardingMobileHeader";
import {
  STEP_COMPONENTS,
  STEP_ICONS,
} from "@/components/forms/onboarding/stepRegistry";

export default function OnboardingDetailsPage() {
  const { step, data, error, saving, update, toggleArrayItem, goNext, goBack } =
    useOnboardingForm();

  const currentStepDef = ONBOARDING_STEPS[step];
  const StepComponent = STEP_COMPONENTS[currentStepDef.key];
  const StepIcon = STEP_ICONS[currentStepDef.key];
  console.log("form data", data);
  return (
    <div className="bg-[#0b0b0d] w-screen flex justify-center">
      <div className="min-h-screen w-full 3xl:w-[70%]  bg-[#0b0b0d] text-white lg:flex">
        <OnboardingVisualPanel
          stepKey={currentStepDef.key}
          stepNumber={step}
          totalSteps={ONBOARDING_STEPS.length}
        />

        <div className="flex min-h-screen flex-1 flex-col bg-[#0f0f11]">
          <OnboardingMobileHeader
            stepKey={currentStepDef.key}
            icon={StepIcon}
          />

          <div className="flex flex-1 items-center justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 xl:px-16 2xl:px-20">
            <div className="w-full max-w-[440px] xl:max-w-[520px] 2xl:max-w-[600px]">
              <div className="mb-8 2xl:mb-10">
                <OnboardingProgressBar
                  currentStep={step}
                  totalSteps={ONBOARDING_STEPS.length}
                />
              </div>

              <OnboardingStepShell
                // icon={StepIcon}
                title={currentStepDef.title}
                error={error}
                saving={saving}
                isFirstStep={step === 0}
                isLastStep={step === ONBOARDING_STEPS.length - 1}
                onBack={goBack}
                onNext={goNext}
                hideIconHeader
              >
                <StepComponent
                  data={data}
                  update={update}
                  toggleArrayItem={toggleArrayItem}
                />
              </OnboardingStepShell>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
