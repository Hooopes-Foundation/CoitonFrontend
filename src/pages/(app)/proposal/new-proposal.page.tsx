import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const createProposalSchema = z.object({
  title: z.coerce
    .string({
      required_error: "Title is required.",
    })
    .min(2, {
      message: "Title must be at least 2 characters.",
    }),
  description: z.coerce
    .string({
      required_error: "Description title is required.",
    })
    .min(2, {
      message: "Description must be at least 2 characters.",
    }),
  discussion: z.coerce
    .string({
      required_error: "Discussion title is required.",
    })
    .min(2, {
      message: "Discussion must be at least 2 characters.",
    }),
});

type CREATE_PROPOSAL_SCHEMA = z.infer<typeof createProposalSchema>;

export default function NewProposalPage() {
  const form = useForm<CREATE_PROPOSAL_SCHEMA>({
    resolver: zodResolver(createProposalSchema),
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(e: CREATE_PROPOSAL_SCHEMA) {
    console.log(e);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col-reverse gap-6 xl:flex-row"
      >
        <div className="flex flex-1 flex-col gap-8 sm:rounded-2xl sm:border sm:bg-background sm:p-6 md:p-10">
          <div className="flex h-max items-center gap-4 rounded-xl border bg-[#B9B9B9]/10 px-6 py-6">
            <Info className="size-6 text-[#B9B9B9]" />
            <p className="text-base font-normal text-[#B9B9B9] text-muted-foreground md:text-lg">
              You need to be a DAO member of the space in order to submit a
              proposal
            </p>
          </div>

          <div className="md:pb-6">
            <div className="flex flex-1 flex-col gap-10">
              <FormField
                control={control}
                name="title"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className={cn(
                          "h-20 border-muted-foreground/50 bg-transparent px-6 text-lg",
                          {
                            "border-red-500 focus-visible:ring-red-500":
                              errors.title,
                          },
                        )}
                        type="text"
                        {...register("title")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        className={cn(
                          "h-[267px] border-muted-foreground/50 bg-transparent px-6 py-4 text-lg",
                          {
                            "border-red-500 focus-visible:ring-red-500":
                              errors.description,
                          },
                        )}
                        {...register("description")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="discussion"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg">
                      Discussion
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        className={cn(
                          "h-20 border-muted-foreground/50 bg-transparent px-6 text-lg",
                          {
                            "border-red-500 focus-visible:ring-red-500":
                              errors.discussion,
                          },
                        )}
                        type="text"
                        {...register("discussion")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="top-24 flex h-max flex-col gap-6 xl:sticky xl:w-[400px] 2xl:w-[500px]">
          <div className="w-full space-y-6 rounded-2xl border bg-background px-7 py-8">
            <Button
              className="w-full rounded-full border"
              size={"lg"}
              variant={"secondary"}
              type="button"
            >
              Preview
            </Button>
            <Button type="submit" className="w-full rounded-full" size={"lg"}>
              Continue
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

// import {
//   CREATE_PROPOSAL_SCHEMA,
//   createProposalSchema,
// } from "@/utils/validators";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Info } from "lucide-react";
// import { useForm } from "react-hook-form";

// export default function NewProposalPage() {
// const form = useForm<CREATE_PROPOSAL_SCHEMA>({
//   resolver: zodResolver(createProposalSchema),
// });

// const {
//   handleSubmit,
//   control,
//   register,
//   formState: { errors, isSubmitting },
// } = form;

// async function onSubmit(e: CREATE_PROPOSAL_SCHEMA) {
//   console.log(e);
// }

//   return (
// <div className="flex flex-col-reverse xl:flex-row gap-6">
//   <div className="flex flex-1 flex-col gap-8">
//     <div className="flex h-max items-center gap-4 rounded-2xl border px-6 bg-blue-500/10 py-4">
//       <Info className="size-6 text-blue-500" />
//       <p className="font-normal text-base md:text-lg text-muted-foreground text-blue-500">
//         You need to be a DAO member of the space in order to submit a
//         proposal
//       </p>
//     </div>

//         <div className="md:px-6 md:pb-6">
// <Form {...form}>
//   <form
//     onSubmit={handleSubmit(onSubmit)}
//     className="flex flex-col gap-10 flex-1"
//   >
// <FormField
//   control={control}
//   name="title"
//   render={() => (
//     <FormItem>
//       <FormLabel className="text-base md:text-lg">
//         Title
//       </FormLabel>
//       <FormControl>
//         <Input
//           disabled={isSubmitting}
//           className={cn(
//             "bg-transparent border-muted-foreground/50 h-20 px-6 text-lg",
//             {
//               "border-red-500 focus-visible:ring-red-500":
//                 errors.title,
//             }
//           )}
//           type="text"
//           {...register("title")}
//         />
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   )}
// />
// <FormField
//   control={control}
//   name="description"
//   render={() => (
//     <FormItem>
//       <FormLabel className="text-base md:text-lg">
//         Description
//       </FormLabel>
//       <FormControl>
//         <Textarea
//           disabled={isSubmitting}
//           className={cn(
//             "bg-transparent border-muted-foreground/50 h-[267px] px-6 py-4 text-lg",
//             {
//               "border-red-500 focus-visible:ring-red-500":
//                 errors.description,
//             }
//           )}
//           {...register("description")}
//         />
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   )}
// />
// <FormField
//   control={control}
//   name="discussion"
//   render={() => (
//     <FormItem>
//       <FormLabel className="text-base md:text-lg">
//         Discussion
//       </FormLabel>
//       <FormControl>
//         <Input
//           disabled={isSubmitting}
//           className={cn(
//             "bg-transparent border-muted-foreground/50 h-20 px-6 text-lg",
//             {
//               "border-red-500 focus-visible:ring-red-500":
//                 errors.discussion,
//             }
//           )}
//           type="text"
//           {...register("discussion")}
//         />
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   )}
// />

//               <Separator className="h-px w-full my-2" />

//               <div className="flex h-max flex-1 flex-col gap-6 rounded-2xl border border-muted-foreground/50 px-7 py-8">
//                 <div className="flex flex-col border-b pb-4">
//                   <p className="font-normal text-base md:text-2xl">
//                     Select Voting System
//                   </p>
//                   <p className="font-light text-sm md:text-lg md:leading-[35px] text-muted-foreground">
//                     Choose the choice you resonate with
//                   </p>
//                 </div>

//                 <div className="flex flex-col gap-4">
//                   <div
//                     role="button"
//                     className="flex h-14 w-full items-center rounded-full border border-[#C0C0C0] bg-[#F6F6F6] pl-8"
//                   >
//                     <span className="text-base md:text-lg">Multichoice</span>
//                   </div>
//                   <div
//                     role="button"
//                     className="flex h-14 w-full items-center rounded-full border border-[#C0C0C0] bg-[#F6F6F6] pl-8"
//                   >
//                     <span className="text-base md:text-lg">Optional</span>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
// <div className="xl:sticky top-24 flex xl:w-[400px] 2xl:w-[500px] flex-col gap-6 h-max">
//   <div className="w-full space-y-6 bg-background rounded-2xl border px-7 py-8">
//     <Button
//       className="w-full border rounded-full"
//       size={"lg"}
//       variant={"secondary"}
//     >
//       Preview
//     </Button>
//     <Button className="w-full rounded-full" size={"lg"}>
//       Continue
//     </Button>
//   </div>
// </div>
//     </div>
//   );
// }
