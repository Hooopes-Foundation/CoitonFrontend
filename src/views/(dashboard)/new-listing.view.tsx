import StepIndicator from "./_components/step-indicator";
import { createListingSteps, initialCreateListing } from "@/static";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CREATE_LISTING_SCHEMA, createListingSchema } from "@/lib/validators";
import { Form } from "@/components/ui/form";
import { AnimatePresence, motion } from "framer-motion";
import OwnerInfo from "./_components/steps/owner-info";
import PropertyDocuments from "./_components/steps/property-documents";
import { toast } from "sonner";
import { useCreateListingFormStore } from "@/store/listing.store";
import PropertyBasics from "./_components/steps/property-basics";
import PropertyFeatures from "./_components/steps/property-features";
import PropertyMedia from "./_components/steps/property-media";
import { useCreateListing, useStakeListingFee } from "@/hooks/useCreateListing";
import { useWalletStore } from "@/store/wallet.store";
import { useState } from "react";
import { onUpload } from "@/lib/utils";
import { Info } from "lucide-react";

export interface IPropsToPass {
  prev?: () => void;
  next?: () => void;
  form: UseFormReturn<CREATE_LISTING_SCHEMA>;
}

export default function NewListingWiew() {
  const isWalletConnected = useWalletStore((state) => state.isWalletConnected);
  const currentStep = useCreateListingFormStore((state) => state.currentStep);
  const setCurrentStep = useCreateListingFormStore(
    (state) => state.setCurrentStep,
  );
  const direction = useCreateListingFormStore((state) => state.direction);
  const setDirection = useCreateListingFormStore((state) => state.setDirection);

  const [listing, setListing] = useState<CREATE_LISTING_SCHEMA | any>();

  const form = useForm<CREATE_LISTING_SCHEMA>({
    resolver: zodResolver(createListingSchema),
    defaultValues: initialCreateListing,
  });

  const { handleSubmit, trigger, getValues } = form;
  const { listingTx } = useCreateListing({ listing });
  const { stakingFeeTx } = useStakeListingFee();

  const processForm: SubmitHandler<CREATE_LISTING_SCHEMA> = async (data) => {
    const bannerFile = getValues("banner");

    // Validate banner
    if (!bannerFile) {
      return toast.info("Please select a banner for your property");
    }

    // Prepare the other file data (e.g., photos and documents)
    const photosFiles = getValues("photos") || [];
    const documentsFiles = getValues("propertyDocuments") || [];

    // Upload the files
    try {
      // Only pass the raw `File` object for the banner
      toast.loading("Uploading banner");
      const bannerUploadResult = await onUpload([bannerFile]);
      toast.dismiss();

      toast.loading("Uploading property media");
      const photosUploadResult = await onUpload(photosFiles);
      toast.dismiss();

      toast.loading("Uploading property documents");
      const documentsUploadResult = await onUpload(documentsFiles);
      toast.dismiss();

      // Build the form data object with IPFS URLs
      const formData = {
        ...data,
        banner: {
          path: bannerUploadResult[0], // IPFS URL
          preview: URL.createObjectURL(bannerFile), // Local preview
        },
        photos: photosFiles.map((photo, index) => ({
          path: photosUploadResult[index], // IPFS URL
          preview: URL.createObjectURL(photo), // Local preview
        })),
        propertyDocuments: documentsFiles.map((doc, index) => ({
          path: documentsUploadResult[index], // IPFS URL
          preview: URL.createObjectURL(doc), // Local preview
        })),
      };
      setListing(formData);
      await listingTx.sendAsync();
    } catch (error: unknown) {
      console.error("Error during file upload:", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      toast.dismiss();
    }
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
      setCurrentStep((prevStep) => prevStep + 1);
      setDirection((prevDir) => prevDir + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
      setDirection((prevDir) => prevDir - 1);
    }
  };

  const propsToPass: IPropsToPass = {
    prev,
    next,
    form,
  };

  const renderStep = () => {
    const stepComponents = [
      <OwnerInfo {...propsToPass} />,
      <PropertyBasics {...propsToPass} />,
      <PropertyFeatures {...propsToPass} />,
      <PropertyMedia {...propsToPass} />,
      <PropertyDocuments {...propsToPass} />,
    ];
    return stepComponents[currentStep];
  };

  const { icon: Icon, title } = createListingSteps[currentStep];

  return (
    <div className="flex flex-col p-6">
      <div className="flex w-full items-center gap-4 border border-l-4 border-l-blue-500 bg-blue-500/10 p-4">
        <Info className="size-5 text-blue-500" />

        <div className="flex flex-1 items-center gap-2">
          <p className="text-base italic tracking-wide text-blue-500">
            20 STARK Listing Fee Required
          </p>
          <p
            role="button"
            onClick={async () => await stakingFeeTx.sendAsync()}
            className="ml-auto text-base tracking-wide text-blue-500 underline"
          >
            Stake Fee
          </p>
        </div>
      </div>

      <div className="relative flex flex-1">
        {!isWalletConnected && (
          <div className="absolute z-10 size-full bg-background/50 backdrop-blur"></div>
        )}
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
    </div>
  );
}
