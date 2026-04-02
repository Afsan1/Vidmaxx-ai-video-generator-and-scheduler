"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreationFooterProps {
  currentStep: number;
  totalSteps: number;
  onContinue: () => void;
  onBack: () => void;
  isContinueDisabled?: boolean;
}

export function CreationFooter({
  currentStep,
  totalSteps,
  onContinue,
  onBack,
  isContinueDisabled = false,
}: CreationFooterProps) {
  return (
    <div className="flex items-center justify-between pt-8 mt-12 border-t border-zinc-100">
      {/* Back Button - Visible from Step 2 onwards */}
      <div className="flex-1">
        {currentStep > 1 && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="h-14 px-6 rounded-2xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 text-lg font-bold transition-all flex items-center gap-3 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Button>
        )}
      </div>

      {/* Continue Button */}
      <div className="flex-1 flex justify-end">
        <Button
          disabled={isContinueDisabled}
          onClick={onContinue}
          className="h-14 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-xl shadow-indigo-200 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
        >
          {currentStep === totalSteps ? "Schedule Series" : "Continue"}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
