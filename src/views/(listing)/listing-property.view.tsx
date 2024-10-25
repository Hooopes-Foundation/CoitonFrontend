import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ClientInfo,
  clientInfoSchema,
  DocumentOne,
  documentOneSchema,
  DocumentTwo,
  documentTwoSchema,
  useListingStore,
} from "@/store/listing.store";
import { ArrowDown, File, User } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="flex h-full w-full">
      <Steps />
      <StepsForm />
    </div>
  );
}

// Steps Component (Static Left Sidebar)
const Steps = () => {
  const stepState = useListingStore((state) => state.stepState);

  return (
    <div className="sticky left-0 top-0 flex h-full w-[496px] flex-col gap-10 bg-[#F9FAFB] p-20">
      <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
        List your property
      </h4>
      <div className="flex flex-col gap-2">
        {steps.map(({ id, heading, subheading, icon: Icon }, _index) => (
          <motion.div
            key={_index}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity:
                stepState.completedSteps.includes(id) ||
                stepState.currentStep === id
                  ? 1
                  : 0.3,
            }}
            transition={{ duration: 0.3 }}
            className={cn("group flex items-start gap-4")}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-white">
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StepsForm = () => {
  const stepState = useListingStore((state) => state.stepState);
  const setStepState = useListingStore((state) => state.setStepState);
  const stepRefs = steps.map(() => useRef<HTMLDivElement>(null));

  const handleStepComplete = () => {
    setStepState(stepState.currentStep);
  };

  useEffect(() => {
    const currentStepIndex = stepState.currentStep - 1;
    if (stepRefs[currentStepIndex]?.current) {
      stepRefs[currentStepIndex].current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stepState.currentStep]);

  return (
    <div className="inline-block flex-1 overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        {stepState.currentStep === 1 && (
          <motion.div
            key="client-info"
            ref={stepRefs[0]}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex h-screen items-center justify-center"
          >
            <ClientInfoForm onComplete={handleStepComplete} />
          </motion.div>
        )}

        {stepState.currentStep === 2 && (
          <motion.div
            key="documentation-1"
            ref={stepRefs[1]}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex h-screen items-center justify-center"
          >
            <DocumentationForm1 onComplete={handleStepComplete} />
          </motion.div>
        )}

        {stepState.currentStep === 3 && (
          <motion.div
            key="documentation-2"
            ref={stepRefs[2]}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="flex h-screen items-center justify-center"
          >
            <DocumentationForm2 onComplete={handleStepComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ClientInfoForm = ({ onComplete }: { onComplete: () => void }) => {
  const formData = useListingStore((state) => state.formData);
  const updateClientInfo = useListingStore((state) => state.updateClientInfo);

  const form = useForm<ClientInfo>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: formData.clientInfo, // Load existing data
  });

  function onSubmit(values: ClientInfo) {
    updateClientInfo(values);
    onComplete();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-[544px] flex-col gap-4 p-6"
      >
        <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB]">
          <User className="size-8 text-primary" />
        </div>

        <h3 className="font-sans_medium text-[20px] text-primary">
          Client Information
        </h3>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone"
                    type="number"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="social"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Socials"
                    type="text"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Occupation"
                    className="text-base"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={"lg"}>
            <span>Next</span>
            <ArrowDown className="size-5" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

const DocumentationForm1 = ({ onComplete }: { onComplete: () => void }) => {
  const formData = useListingStore((state) => state.formData);
  const updateDocumentOne = useListingStore((state) => state.updateDocumentOne);
  const goToPreviousStep = useListingStore((state) => state.goToPreviousStep);

  const form = useForm<DocumentOne>({
    resolver: zodResolver(documentOneSchema),
    defaultValues: formData.documentOne, // Load existing data
  });

  function onSubmit(values: DocumentOne) {
    updateDocumentOne(values);
    onComplete();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-[544px] flex-col gap-4 p-6"
      >
        <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB]">
          <File className="size-8 text-primary" />
        </div>

        <h3 className="font-sans_medium text-[20px] text-primary">
          Documentations 1
        </h3>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Location"
                    type="text"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="State"
                    type="text"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Postal Code"
                    type="number"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Listing Price"
                      className="text-base"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedroom"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Bedrooms"
                      className="text-base"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="bathroom"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Bathrooms"
                      className="text-base"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parking"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Parking Spots"
                      className="text-base"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="construction"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Construction sqft."
                      className="text-base"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="land"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Land sqft."
                      className="text-base"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    placeholder="Property Description"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size={"lg"}
              className="w-max"
              variant={"ghost"}
              onClick={goToPreviousStep}
            >
              <span>Back</span>
            </Button>
            <Button type="submit" size={"lg"} className="flex-1">
              <span>Next</span>
              <ArrowDown className="size-5" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

const DocumentationForm2 = ({ onComplete }: { onComplete: () => void }) => {
  const formData = useListingStore((state) => state.formData);
  const updateDocumentTwo = useListingStore((state) => state.updateDocumentTwo);
  const goToPreviousStep = useListingStore((state) => state.goToPreviousStep);

  const form = useForm<DocumentTwo>({
    resolver: zodResolver(documentTwoSchema),
    defaultValues: formData.documentTwo, // Load existing data
  });

  function onSubmit(values: DocumentTwo) {
    updateDocumentTwo(values);
    onComplete();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-[544px] flex-col gap-4 p-6"
      >
        <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB]">
          <File className="size-8 text-primary" />
        </div>

        <h3 className="font-sans_medium text-[20px] text-primary">
          Documentations 2
        </h3>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="flat"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Flats"
                    type="text"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Number of rooms"
                    type="number"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="security"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Security"
                    type="text"
                    className="text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size={"lg"}
              className="w-max"
              variant={"ghost"}
              onClick={goToPreviousStep}
            >
              <span>Back</span>
            </Button>
            <Button type="submit" size={"lg"} className="flex-1">
              <span>Next</span>
              <ArrowDown className="size-5" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
