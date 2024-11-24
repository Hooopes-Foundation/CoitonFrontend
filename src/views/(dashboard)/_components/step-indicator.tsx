import { cn } from "@/lib/utils";
import { createListingSteps } from "@/static";
import { Check } from "lucide-react";

type StepIndicatorProps = {
  steps: typeof createListingSteps;
  currentStep: number;
};

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map(({ title, subtitle, icon: Icon }, _index) => (
        <div
          key={_index}
          className={cn(
            "group flex cursor-not-allowed items-start gap-4 opacity-50",
            {
              "cursor-pointer opacity-100": _index <= currentStep,
            },
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-white">
              {_index < currentStep ? (
                <Check className="size-6 text-primary" />
              ) : (
                <Icon className="size-6 text-primary" />
              )}
            </div>
            <span className="h-3 w-[2px] rounded-[2px] bg-[#EAECF0] group-last:hidden" />
          </div>

          <div className="mt-2 flex flex-col">
            <p className="font-sans_medium text-primary">{title}</p>
            <span className="font-sans_regular text-[#6C737F]">{subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
