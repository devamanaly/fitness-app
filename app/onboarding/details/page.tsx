// app/onboarding/page.tsx
'use client'

import { useOnboardingForm } from '@/hooks/useOnboardingForm'
import { ONBOARDING_STEPS } from '@/types/onboarding'
import { OnboardingProgressBar } from '@/components/forms/onboarding/OnboardingProgressBar'
import { OnboardingStepShell } from '@/components/forms/onboarding/OnboardingStepShell'
import { OnboardingVisualPanel } from '@/components/forms/onboarding/OnboardingVisualPanel'
import { OnboardingMobileHeader } from '@/components/forms/onboarding/OnboardingMobileHeader'
import { STEP_COMPONENTS, STEP_ICONS } from '@/components/forms/onboarding/stepRegistry'

export default function OnboardingDetailsPage() {
  const { step, data, error, saving, update, toggleArrayItem, goNext, goBack } = useOnboardingForm()

  const currentStepDef = ONBOARDING_STEPS[step]
  const StepComponent = STEP_COMPONENTS[currentStepDef.key]
  const StepIcon = STEP_ICONS[currentStepDef.key]

  return (
    <div className="min-h-screen flex bg-[#111113]">
      {/* Left Panel - Align to top */}
      <OnboardingVisualPanel
        stepKey={currentStepDef.key}
        icon={StepIcon}
        stepNumber={step}
        totalSteps={ONBOARDING_STEPS.length}
      />

      {/* Right Panel - Align to top */}
      <div className="flex-1 flex flex-col">
        <OnboardingMobileHeader stepKey={currentStepDef.key} icon={StepIcon} />

        <div className="flex-1 flex items-start justify-center px-5 py-10 lg:py-16">
          <div className="w-full max-w-md">
            <OnboardingProgressBar currentStep={step} totalSteps={ONBOARDING_STEPS.length} />

            <OnboardingStepShell
              icon={StepIcon}
              title={currentStepDef.title}
              error={error}
              saving={saving}
              isFirstStep={step === 0}
              isLastStep={step === ONBOARDING_STEPS.length - 1}
              onBack={goBack}
              onNext={goNext}
              hideIconHeader
            >
              <StepComponent data={data} update={update} toggleArrayItem={toggleArrayItem} />
            </OnboardingStepShell>
          </div>
        </div>
      </div>
    </div>
  )
}