/* eslint-disable react/no-children-prop */
// components/forms/onboarding/steps/StepBasics.tsx
"use client";

import { GENDERS } from "@/constants/onboarding.constants";
import { OnboardingFormData } from "@/types/onboarding";
import { Field, inputClass } from "./Field";
import { Pill } from "./Pill";
import { Calendar ,User } from "lucide-react";

type StepProps = {
  data: OnboardingFormData;
  update: (patch: Partial<OnboardingFormData>) => void;
};

export function StepBasics({ data, update }: StepProps) {
  return (
    <>
      {/* <Field label="Full name" required>
      <div className="relative group">
      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
        <input
          type="text"
          value={data.name}
          className={`${inputClass} pl-10`}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="Enter your name "
        />
        </div>
      </Field> */}

      <Field label="Your Age" required hint="Used to calculate your metabolism">
        <div className="relative group">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-red-500 transition-colors" />
          <input
            type="number"
            min={13}
            max={100}
            value={data.age}
            onChange={(e) => update({ age: e.target.value })}
            className={`${inputClass} pl-10`}
            placeholder="e.g. 27"
          />
        </div>
      </Field>

      <Field label="Gender" required>
        <div className="grid grid-cols-2 gap-3">
          {GENDERS.map((g) => (
            <Pill
              key={g.value}
              label={g.value}
              active={data.gender === g.value}
              onClick={() => update({ gender: g.value })}
              icon={<g.icon className="w-4 h-4" />}
              description={g.description}
            />
          ))}
        </div>
      </Field>
    </>
  );
}
