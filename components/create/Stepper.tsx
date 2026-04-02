"use client";

import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export function Stepper({ currentStep, totalSteps = 6 }: StepperProps) {
  return (
    <div className="w-full flex items-center justify-between gap-2 mb-10 px-2 lg:px-0">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div key={index} className="flex-1 flex flex-col gap-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                isCompleted ? "bg-indigo-600" : isActive ? "bg-indigo-400" : "bg-zinc-200"
              )}
            />
            <span
              className={cn(
                "text-[10px] uppercase font-bold tracking-widest text-center",
                isActive ? "text-indigo-600" : isCompleted ? "text-indigo-400" : "text-zinc-400"
              )}
            >
              Step {stepNumber}
            </span>
          </div>
        );
      })}
    </div>
  );
}
