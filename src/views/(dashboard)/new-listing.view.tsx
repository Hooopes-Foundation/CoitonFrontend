import { useState } from "react";
import StepIndicator from "./_components/step-indicator";
import { createListingSteps } from "@/static";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_LISTING_SCHEMA, createListingSchema } from "@/lib/validators";
import { Form } from "@/components/ui/form";
import { AnimatePresence, motion } from "framer-motion";
import OwnerInfo from "./_components/steps/owner-info";
import PropertyDetails from "./_components/steps/property-details";
import PropertyImages from "./_components/steps/property-image";
import PropertyDocuments from "./_components/steps/property-documents";
import { toast } from "sonner";
import { stringToByteArray } from "@/lib/utils";

export interface IPropsToPass {
  prev?: () => void;
  next?: () => void;
  form: UseFormReturn<CREATE_LISTING_SCHEMA>;
}

export default function NewListingWiew() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const form = useForm<CREATE_LISTING_SCHEMA>({
    resolver: zodResolver(createListingSchema),
  });

  const { handleSubmit, reset, trigger } = form;

  const processForm: SubmitHandler<CREATE_LISTING_SCHEMA> = (data) => {
    toast.success("Data submitted successfully");
    const detailsByte = stringToByteArray(JSON.stringify(data));
    console.log("Normal data: ", data);
    console.log("Converted to bytesArray: ", detailsByte);
    // reset();
  };

  type FieldName = keyof CREATE_LISTING_SCHEMA;

  const next = async () => {
    const fields = createListingSteps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < createListingSteps.length - 1) {
      if (currentStep === createListingSteps.length - 1) {
        await handleSubmit(processForm)();
      }
      setCurrentStep((step) => step + 1);
      setDirection((dir) => dir + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
      setDirection((dir) => dir - 1);
    }
  };

  const { icon: Icon, title } = createListingSteps[currentStep];

  const propsToPass: IPropsToPass = {
    prev,
    next,
    form,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OwnerInfo {...propsToPass} />;
      case 1:
        return <PropertyDetails {...propsToPass} />;
      case 2:
        return <PropertyImages {...propsToPass} />;
      case 3:
        return <PropertyDocuments {...propsToPass} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-1 p-6">
      <div className="flex h-full w-[500px] flex-col gap-10 p-10">
        <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
          List your property
        </h4>
        <StepIndicator steps={createListingSteps} currentStep={currentStep} />
      </div>

      <div className="inline-block h-[calc(100vh-150px)] flex-1 overflow-x-hidden">
        <div className="flex h-full items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(processForm)}
              className="flex w-full max-w-[544px] flex-col gap-4 p-6"
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({
                      y: direction > 0 ? 50 : -50,
                    }),
                    center: {
                      y: 0,
                    },
                    exit: (direction: number) => ({
                      y: direction < 0 ? 50 : -50,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex w-full flex-col gap-4"
                >
                  <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB]">
                    <Icon className="size-8 text-primary" />
                  </div>

                  <h3 className="font-sans_medium text-[20px] text-primary">
                    {title}
                  </h3>

                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
