import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useListingStore } from "@/store/listing.store";
import { File, User } from "lucide-react";

const steps = [
  {
    id: 1,
    heading: "Client Information",
    subheading: "Please provide your name and email",
    icon: User,
  },
  {
    id: 2,
    heading: "Documentation 1",
    subheading: "Please provide property details",
    icon: File,
  },
  {
    id: 3,
    heading: "Documentation 2",
    subheading: "Upload pictures of your property",
    icon: File,
  },
];

export default function ListingPropertyView() {
  return (
    <div className="flex h-full flex-1">
      <Steps />

      <StepsForm />
    </div>
  );
}

const Steps = () => {
  const stepState = useListingStore((state) => state.stepState);
  const setStepState = useListingStore((state) => state.setStepState);

  const handleStepComplete = (stepId: number) => {
    setStepState(stepId, steps);
  };

  return (
    <div className="flex h-full w-[496px] flex-col gap-10 bg-[#F9FAFB] p-20">
      <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
        List your property
      </h4>
      <div className="flex flex-col gap-2">
        {steps.map(({ id, heading, subheading, icon: Icon }, _index) => (
          <div
            key={_index}
            className={cn("group flex items-start gap-4", {
              "pointer-events-none opacity-30":
                !stepState.completedSteps.includes(id) &&
                stepState.currentStep !== id,
              "pointer-events-auto opacity-100":
                stepState.completedSteps.includes(id) ||
                stepState.currentStep === id,
            })}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0]">
                <Icon className="size-8 text-primary" />
              </div>

              <span className="h-3 w-[2px] rounded-[2px] bg-[#EAECF0] group-last:hidden" />
            </div>

            <div className="flex flex-col">
              <p className="font-sans_medium leading-none text-primary">
                {heading}
              </p>
              <span className="font-sans_regular text-[#6C737F]">
                {subheading}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={() => handleStepComplete(stepState.currentStep)}>
        Complete Step {stepState.currentStep}
      </Button>
    </div>
  );
};

const StepsForm = () => {
  return <div>Form</div>;
};
