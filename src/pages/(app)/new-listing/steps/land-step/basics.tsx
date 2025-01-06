import { AppDispatch, RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { landFormSchema, LandFormSchemaTypes } from "../../new-listing.page";
import {
  resetForm,
  setCurrentStep,
  updateFormData,
} from "@/store/slice/new-listing.slice";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowDown, UploadIcon, Paperclip, Loader } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/file-uploader";
import { DropzoneOptions } from "react-dropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useGetHash } from "@/hooks/contract/useGetHash.hook";
import { useMemo } from "react";
import { stringToByteArray } from "@/lib/starknet/utils";
import { useNavigate } from "react-router-dom";
import { useUploadFileToPinataHook } from "@/hooks/upload/useUploadFileToPinata.hook";
import { useContractInstance } from "@/hooks/useContractInstance.hook";
import { Contract } from "starknet";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";

export default function BasicsForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.newListing.formData);

  const { onUpload, isUploading } = useUploadFileToPinataHook();

  const { getContractInstance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();

  const form = useForm<LandFormSchemaTypes>({
    resolver: zodResolver(
      landFormSchema.pick({
        title: true,
        images: true,
        videos: true,
        description: true,
      }),
    ),
    defaultValues: {
      ...formData,
    },
  });

  const {
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = form;

  const { hash } = useGetHash(String(formData.title));

  const calls = useMemo(() => {
    const imagesCid = getValues("imagesCid");
    const surveyPlanCid = getValues("surveyPlanCid");

    if (!formData || !imagesCid || !surveyPlanCid || !hash) return undefined;

    const regionBytes = stringToByteArray(JSON.stringify(formData?.region));
    const detailsBytes = stringToByteArray(JSON.stringify(formData));
    // const hashFelt = shortStringToFelt(hash)?.output?.toString(10);

    return [
      contractInstance.populate("create_listing", [
        regionBytes,
        detailsBytes,
        hash,
      ]),
    ];
  }, [contractInstance, formData, hash]);

  const listingTx = useSendTransaction({
    calls: calls,
  });

  const listingReceipt = useTransactionReceipt({
    hash: listingTx?.data?.transaction_hash,
    watch: !!listingTx?.data?.transaction_hash,
  });

  const onSubmit = async (data: Partial<LandFormSchemaTypes>) => {
    const formFields = {
      ...formData,
      ...data,
    };
    dispatch(updateFormData(formFields));

    try {
      // Upload files only if they exist
      let imagesCid: string[] | null = null;
      let videosCid: string[] | null = null;
      let surveyPlanCid: string[] | null = null;

      if (formFields.images && formFields.images.length > 0) {
        imagesCid = await onUpload(formFields.images);
        if (!imagesCid || imagesCid.length === 0) {
          toast.error("Failed to upload images. Please try again.");
          throw new Error("Image upload failed");
        }
        setValue("imagesCid", imagesCid);
      }

      if (formFields.videos && formFields.videos.length > 0) {
        videosCid = await onUpload(formFields.videos);
        if (!videosCid || videosCid.length === 0) {
          toast.error("Failed to upload videos. Please try again.");
          throw new Error("Video upload failed");
        }
        setValue("videosCid", videosCid);
      }

      if (formFields.surveyPlan && formFields.surveyPlan.length > 0) {
        surveyPlanCid = await onUpload(formFields.surveyPlan);
        if (!surveyPlanCid || surveyPlanCid.length === 0) {
          toast.error("Failed to upload floor plans. Please try again.");
          throw new Error("Floor plan upload failed");
        }
        setValue("surveyPlanCid", surveyPlanCid);
      }

      toast.success("Files uploaded successfully");

      // Prepare the result object with the uploaded CIDs
      const result = {
        ...formFields,
        imagesCid: imagesCid || undefined,
        videosCid: videosCid || undefined,
        surveyPlanCid: surveyPlanCid || undefined,
      };

      dispatch(updateFormData(result));

      try {
        console.log({ formData });
        await listingTx.sendAsync();

        if (listingReceipt?.isSuccess) {
          toast.success("Listing created successfully!");
          dispatch(resetForm());
          navigate("/dashboard");
        } else {
          toast.error("Failed to create listing. Please try again.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        toast.dismiss();
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong during submission.",
      );
      toast.dismiss();
    }
  };

  const isCreating =
    listingTx?.isPending ||
    listingReceipt?.isLoading ||
    isSubmitting ||
    isUploading;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Title"
                  type="text"
                  className={cn("text-foreground", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.title?.message,
                  })}
                  {...field}
                />
              </FormControl>
              {errors.title && (
                <p
                  className={cn(
                    "text-sm font-medium text-red-500 dark:text-red-900",
                  )}
                >
                  {errors.title?.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                dropzoneOptions={
                  {
                    accept: {
                      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
                    },
                    maxFiles: 10,
                    maxSize: 1024 * 1024 * 5,
                    multiple: true,
                  } satisfies DropzoneOptions
                }
                className="relative"
              >
                <FileInput
                  className={cn(
                    "overflow-hidden rounded-md border border-neutral-200 sm:rounded-xl",
                    {
                      "border-red-500": errors.images,
                    },
                  )}
                >
                  <div className="flex flex-col gap-4 bg-background p-6">
                    <FormLabel className="text-base font-normal text-muted-foreground">
                      Upload Images
                    </FormLabel>

                    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-primary/50 bg-[#F8FAFA]">
                      <UploadIcon className="size-10 text-primary/80" />
                      <p className="text-primary">
                        Drag and Drop file here or{" "}
                        <span className="underline">Choose file</span>
                      </p>
                    </div>
                  </div>
                </FileInput>
                <FileUploaderContent>
                  {field.value && field.value.length > 0 && (
                    <ScrollArea className="mt-2 max-h-36 rounded-xl border bg-background px-1 py-2">
                      {field.value.map((file, i) => (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          className="!rounded-md"
                          type="document"
                        >
                          <Paperclip className="size-5" />
                          <span className="text-sm font-medium text-foreground">
                            {file.name}
                          </span>
                        </FileUploaderItem>
                      ))}
                    </ScrollArea>
                  )}
                </FileUploaderContent>
              </FileUploader>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videos"
          render={({ field }) => (
            <FormItem>
              <FileUploader
                value={field.value!}
                onValueChange={field.onChange}
                dropzoneOptions={
                  {
                    accept: {
                      "video/*": [".mp4", ".mov", ".avi"],
                    },
                    maxFiles: 3,
                    maxSize: 1024 * 1024 * 40,
                    multiple: true,
                  } satisfies DropzoneOptions
                }
                className="relative"
              >
                <FileInput
                  className={cn(
                    "overflow-hidden rounded-md border border-neutral-200 sm:rounded-xl",
                    {
                      "border-red-500": errors.videos,
                    },
                  )}
                >
                  <div className="flex flex-col gap-4 bg-background p-6">
                    <FormLabel className="text-base font-normal text-muted-foreground">
                      Upload Video
                    </FormLabel>

                    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-primary/50 bg-[#F8FAFA]">
                      <UploadIcon className="size-10 text-primary/80" />
                      <p className="text-primary">
                        Drag and Drop file here or{" "}
                        <span className="underline">Choose file</span>
                      </p>
                    </div>
                  </div>
                </FileInput>
                <FileUploaderContent>
                  {field.value && field.value.length > 0 && (
                    <ScrollArea className="mt-2 max-h-36 rounded-xl border bg-background px-1 py-2">
                      {field.value.map((file, i) => (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          className="!rounded-md"
                          type="document"
                        >
                          <Paperclip className="size-5" />
                          <span className="text-sm font-medium text-foreground">
                            {file.name}
                          </span>
                        </FileUploaderItem>
                      ))}
                    </ScrollArea>
                  )}
                </FileUploaderContent>
              </FileUploader>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Property Description"
                  {...field}
                  className={cn("h-[144px] resize-none py-4 text-foreground", {
                    "border-red-500 focus-visible:ring-red-500":
                      errors.description?.message,
                  })}
                />
              </FormControl>
              {errors.description && (
                <p
                  className={cn(
                    "text-sm font-medium text-red-500 dark:text-red-900",
                  )}
                >
                  {errors.description.message}
                </p>
              )}
            </FormItem>
          )}
        />
      </div>

      <Separator className="my-6 h-px w-full" />

      <div className="flex w-full items-center gap-4">
        <Button
          type="button"
          size={"lg"}
          variant={"outline"}
          className="w-[100px] rounded-full"
          onClick={() => dispatch(setCurrentStep(2))}
          disabled={isCreating}
        >
          Back
        </Button>
        <Button
          disabled={isCreating}
          type="submit"
          size={"lg"}
          className="flex-1 rounded-full"
        >
          {isCreating ? (
            <>
              <span>Please wait</span>
              <Loader className="size-5 animate-spin" />
            </>
          ) : (
            <>
              <span>Finish</span>
              <ArrowDown className="size-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
