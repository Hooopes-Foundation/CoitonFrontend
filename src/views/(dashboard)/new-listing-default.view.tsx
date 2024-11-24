// import { create } from "zustand";
// import { z } from "zod";

// // Define the form schemas with error messages
// export const clientInfoSchema = z.object({
//   email: z
//     .string()
//     .email("Invalid email format")
//     .min(2, "Email must be at least 2 characters")
//     .max(50, "Email must not exceed 50 characters"),
//   phone: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Phone number must only contain digits",
//   }),
//   social: z
//     .string()
//     .min(2, "Social media handle must be at least 2 characters")
//     .max(50, "Social media handle must not exceed 50 characters"),
//   occupation: z
//     .string()
//     .min(2, "Occupation must be at least 2 characters")
//     .max(50, "Occupation must not exceed 50 characters"),
// });

// export const documentOneSchema = z.object({
//   location: z
//     .string()
//     .min(2, "Location must be at least 2 characters")
//     .max(50, "Location must not exceed 50 characters"),
//   state: z
//     .string()
//     .min(2, "State must be at least 2 characters")
//     .max(50, "State must not exceed 50 characters"),
//   zip: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Zip code must only contain digits",
//   }),
//   price: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Price must only contain digits",
//   }),
//   bedroom: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Number of bedrooms must be a valid number",
//   }),
//   bathroom: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Number of bathrooms must be a valid number",
//   }),
//   parking: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Number of parking spaces must be a valid number",
//   }),
//   construction: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Construction year must be a valid number",
//   }),
//   land: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Land size must be a valid number",
//   }),
//   description: z
//     .string()
//     .min(2, "Description must be at least 2 characters")
//     .max(50, "Description must not exceed 50 characters"),
// });

// export const documentTwoSchema = z.object({
//   flat: z
//     .string()
//     .min(2, "Flat name must be at least 2 characters")
//     .max(50, "Flat name must not exceed 50 characters"),
//   rooms: z.string().refine((value) => !isNaN(Number(value)), {
//     message: "Number of rooms must be a valid number",
//   }),
//   security: z
//     .string()
//     .min(2, "Security description must be at least 2 characters")
//     .max(50, "Security description must not exceed 50 characters"),
// });

// export type ClientInfo = z.infer<typeof clientInfoSchema>;
// export type DocumentOne = z.infer<typeof documentOneSchema>;
// export type DocumentTwo = z.infer<typeof documentTwoSchema>;

// type STEP_STATE = {
//   currentStep: number;
//   completedSteps: number[];
// };

// interface INITIAL_LISTING_STATE {
//   stepState: STEP_STATE;
//   formData: {
//     clientInfo: Partial<ClientInfo>;
//     documentOne: Partial<DocumentOne>;
//     documentTwo: Partial<DocumentTwo>;
//   };
//   setStepState: (stepId: number) => void;
//   goToPreviousStep: () => void;
//   updateClientInfo: (data: Partial<ClientInfo>) => void;
//   updateDocumentOne: (data: Partial<DocumentOne>) => void;
//   updateDocumentTwo: (data: Partial<DocumentTwo>) => void;
// }

// export const useListingStore = create<INITIAL_LISTING_STATE>()((set) => ({
//   stepState: {
//     currentStep: 1,
//     completedSteps: [],
//   },
//   formData: {
//     clientInfo: {},
//     documentOne: {},
//     documentTwo: {},
//   },

//   setStepState: (stepId: number) =>
//     set((state) => {
//       const { currentStep, completedSteps } = state.stepState;
//       const updatedCompletedSteps = completedSteps.includes(stepId)
//         ? completedSteps
//         : [...completedSteps, stepId];
//       const nextStep =
//         currentStep < updatedCompletedSteps.length + 1
//           ? currentStep + 1
//           : currentStep;

//       return {
//         stepState: {
//           currentStep: nextStep,
//           completedSteps: updatedCompletedSteps,
//         },
//       };
//     }),

//   goToPreviousStep: () =>
//     set((state) => {
//       const { currentStep } = state.stepState;
//       if (currentStep > 1) {
//         return {
//           stepState: {
//             ...state.stepState,
//             currentStep: currentStep - 1,
//           },
//         };
//       }
//       return state;
//     }),

//   updateClientInfo: (data: Partial<ClientInfo>) =>
//     set((state) => ({
//       formData: {
//         ...state.formData,
//         clientInfo: { ...state.formData.clientInfo, ...data },
//       },
//     })),

//   updateDocumentOne: (data: Partial<DocumentOne>) =>
//     set((state) => ({
//       formData: {
//         ...state.formData,
//         documentOne: { ...state.formData.documentOne, ...data },
//       },
//     })),

//   updateDocumentTwo: (data: Partial<DocumentTwo>) =>
//     set((state) => ({
//       formData: {
//         ...state.formData,
//         documentTwo: { ...state.formData.documentTwo, ...data },
//       },
//     })),
// }));

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import {
//   ClientInfo,
//   clientInfoSchema,
//   DocumentOne,
//   documentOneSchema,
//   DocumentTwo,
//   documentTwoSchema,
//   useListingStore,
// } from "@/store/listing.store";
// import { ArrowDown, File, User } from "lucide-react";
// import { useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Textarea } from "@/components/ui/textarea";

// const steps = [
//   {
//     id: 1,
//     heading: "Property owner information",
//     subheading: "Please provide your name and email",
//     icon: User,
//   },
//   {
//     id: 2,
//     heading: "Documentation 1",
//     subheading: "Please provide property details",
//     icon: File,
//   },
//   {
//     id: 3,
//     heading: "Documentation 2",
//     subheading: "Upload pictures of your property",
//     icon: File,
//   },
// ];

// export default function NewListingView() {
//   return (
//     <div className="flex h-[calc(100dvh-20%)] w-full">
//       <Steps />
//       <StepsForm />
//     </div>
//   );
// }

// // Steps Component (Static Left Sidebar)
// const Steps = () => {
//   const stepState = useListingStore((state) => state.stepState);

//   return (
{
  /* <div className="sticky left-0 top-0 flex h-full w-[496px] flex-col gap-10 p-20">
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
</div> */
}
//   );
// };

// const StepsForm = () => {
//   const stepState = useListingStore((state) => state.stepState);
//   const setStepState = useListingStore((state) => state.setStepState);
//   const stepRefs = steps.map(() => useRef<HTMLDivElement>(null));

//   const handleStepComplete = () => {
//     setStepState(stepState.currentStep);
//   };

//   useEffect(() => {
//     const currentStepIndex = stepState.currentStep - 1;
//     if (stepRefs[currentStepIndex]?.current) {
//       stepRefs[currentStepIndex].current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [stepState.currentStep]);

//   return (
//     <div className="inline-block h-full flex-1 overflow-hidden">
//       <AnimatePresence initial={false} mode="wait">
//         {stepState.currentStep === 1 && (
//           <motion.div
//             key="client-info"
//             ref={stepRefs[0]}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.5 }}
//             className="flex h-full items-center justify-center"
//           >
//             <OwnerInfo onComplete={handleStepComplete} />
//           </motion.div>
//         )}

//         {stepState.currentStep === 2 && (
//           <motion.div
//             key="documentation-1"
//             ref={stepRefs[1]}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.5 }}
//             className="flex h-full items-center justify-center"
//           >
//             <DocumentationForm1 onComplete={handleStepComplete} />
//           </motion.div>
//         )}

//         {stepState.currentStep === 3 && (
//           <motion.div
//             key="documentation-2"
//             ref={stepRefs[2]}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -50 }}
//             transition={{ duration: 0.5 }}
//             className="flex h-full items-center justify-center"
//           >
//             <DocumentationForm2 onComplete={handleStepComplete} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const OwnerInfo = ({ onComplete }: { onComplete: () => void }) => {
//   const formData = useListingStore((state) => state.formData);
//   const updateClientInfo = useListingStore((state) => state.updateClientInfo);

//   const form = useForm<ClientInfo>({
//     resolver: zodResolver(clientInfoSchema),
//     defaultValues: formData.clientInfo,
//   });

//   function onSubmit(values: ClientInfo) {
//     updateClientInfo(values);
//     onComplete();
//   }

//   return (
// <Form {...form}>
//   <form
//     onSubmit={form.handleSubmit(onSubmit)}
//     className="flex w-full max-w-[544px] flex-col gap-4 p-6"
//   >
//     <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB]">
//       <User className="size-8 text-primary" />
//     </div>

//     <h3 className="font-sans_medium text-[20px] text-primary">
//       Property owner information
//     </h3>

//     <div className="flex flex-col gap-4">
//       <FormField
//         control={form.control}
//         name="email"
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder="Email"
//                 type="email"
//                 className="text-base"
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="phone"
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder="Phone"
//                 type="number"
//                 className="text-base"
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="social"
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder="Socials"
//                 type="text"
//                 className="text-base"
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={form.control}
//         name="occupation"
//         render={({ field }) => (
//           <FormItem>
//             <FormControl>
//               <Input
//                 placeholder="Occupation"
//                 className="text-base"
//                 type="text"
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       <Button type="submit" size={"lg"}>
//         <span>Next</span>
//         <ArrowDown className="size-5" />
//       </Button>
//     </div>
//   </form>
// </Form>
//   );
// };

// const DocumentationForm1 = ({ onComplete }: { onComplete: () => void }) => {
//   const formData = useListingStore((state) => state.formData);
//   const updateDocumentOne = useListingStore((state) => state.updateDocumentOne);
//   const goToPreviousStep = useListingStore((state) => state.goToPreviousStep);

//   const form = useForm<DocumentOne>({
//     resolver: zodResolver(documentOneSchema),
//     defaultValues: formData.documentOne, // Load existing data
//   });

//   function onSubmit(values: DocumentOne) {
//     updateDocumentOne(values);
//     onComplete();
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex w-full max-w-[544px] flex-col gap-4 p-6"
//       >
//         <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB]">
//           <File className="size-8 text-primary" />
//         </div>

//         <h3 className="font-sans_medium text-[20px] text-primary">
//           Documentations 1
//         </h3>

//         <div className="flex flex-col gap-4">
//           <FormField
//             control={form.control}
//             name="location"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     placeholder="Location"
//                     type="text"
//                     className="text-base"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="state"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     placeholder="State"
//                     type="text"
//                     className="text-base"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="zip"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     placeholder="Postal Code"
//                     type="number"
//                     className="text-base"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex w-full gap-4">
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormControl>
//                     <Input
//                       placeholder="Listing Price"
//                       className="text-base"
//                       type="number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="bedroom"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormControl>
//                     <Input
//                       placeholder="Bedrooms"
//                       className="text-base"
//                       type="number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="flex w-full gap-4">
//             <FormField
//               control={form.control}
//               name="bathroom"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormControl>
//                     <Input
//                       placeholder="Bathrooms"
//                       className="text-base"
//                       type="number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="parking"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormControl>
//                     <Input
//                       placeholder="Parking Spots"
//                       className="text-base"
//                       type="number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="flex w-full gap-4">
//             <FormField
//               control={form.control}
//               name="construction"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormControl>
//                     <Input
//                       placeholder="Construction sqft."
//                       className="text-base"
//                       type="number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="land"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormControl>
//                     <Input
//                       placeholder="Land sqft."
//                       className="text-base"
//                       type="number"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem className="w-full">
//                 <FormControl>
//                   <Textarea
//                     placeholder="Property Description"
//                     className="text-base"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex items-center gap-2">
//             <Button
//               type="button"
//               size={"lg"}
//               className="w-max"
//               variant={"ghost"}
//               onClick={goToPreviousStep}
//             >
//               <span>Back</span>
//             </Button>
//             <Button type="submit" size={"lg"} className="flex-1">
//               <span>Next</span>
//               <ArrowDown className="size-5" />
//             </Button>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// };

// const DocumentationForm2 = ({ onComplete }: { onComplete: () => void }) => {
//   const formData = useListingStore((state) => state.formData);
//   const updateDocumentTwo = useListingStore((state) => state.updateDocumentTwo);
//   const goToPreviousStep = useListingStore((state) => state.goToPreviousStep);

//   const form = useForm<DocumentTwo>({
//     resolver: zodResolver(documentTwoSchema),
//     defaultValues: formData.documentTwo,
//   });

//   function onSubmit(values: DocumentTwo) {
//     updateDocumentTwo(values);
//     onComplete();
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex w-full max-w-[544px] flex-col gap-4 p-6"
//       >
//         <div className="flex size-16 items-center justify-center rounded-full border border-[#EAECF0] bg-[#F9FAFB]">
//           <File className="size-8 text-primary" />
//         </div>

//         <h3 className="font-sans_medium text-[20px] text-primary">
//           Documentations 2
//         </h3>

//         <div className="flex flex-col gap-4">
//           <FormField
//             control={form.control}
//             name="flat"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     placeholder="Flats"
//                     type="text"
//                     className="text-base"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="rooms"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     placeholder="Number of rooms"
//                     type="number"
//                     className="text-base"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="security"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input
//                     placeholder="Security"
//                     type="text"
//                     className="text-base"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex items-center gap-2">
//             <Button
//               type="button"
//               size={"lg"}
//               className="w-max"
//               variant={"ghost"}
//               onClick={goToPreviousStep}
//             >
//               <span>Back</span>
//             </Button>
//             <Button type="submit" size={"lg"} className="flex-1">
//               <span>Next</span>
//               <ArrowDown className="size-5" />
//             </Button>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// };
