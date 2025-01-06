import { AppDispatch, RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  buildingFormSchema,
  BuildingFormSchemaTypes,
} from "../../new-listing.page";
import {
  resetForm,
  setCurrentStep,
  updateFormData,
} from "@/store/slice/new-listing.slice";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { toast } from "sonner";
import { useUploadFileToPinataHook } from "@/hooks/upload/useUploadFileToPinata.hook";
import { useGetHash } from "@/hooks/contract/useGetHash.hook";
import { useMemo } from "react";
import { stringToByteArray } from "@/lib/starknet/utils";
import { useContractInstance } from "@/hooks/useContractInstance.hook";
import { Contract } from "starknet";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { useNavigate } from "react-router-dom";

export default function FloorPlanForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector((state: RootState) => state.newListing.formData);

  const { onUpload, isUploading } = useUploadFileToPinataHook();

  const { getContractInstance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();

  //   const { hasStaked, isCheckingStakedStatus } = useHasStaked();

  const form = useForm<BuildingFormSchemaTypes>({
    resolver: zodResolver(
      buildingFormSchema.pick({
        floorPlan: true,
        license: true,
      }),
    ),
    defaultValues: formData,
  });

  const {
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = form;

  const { hash } = useGetHash(String(formData.title));

  const calls = useMemo(() => {
    const imagesCid = getValues("imagesCid");
    const licenseCid = getValues("licenseCid");
    const floorPlanCid = getValues("floorPlanCid");

    if (!formData || !imagesCid || !licenseCid || !floorPlanCid || !hash)
      return undefined;

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

  const onSubmit = async (data: Partial<BuildingFormSchemaTypes>) => {
    const formFields = {
      ...formData,
      ...data,
    };
    dispatch(updateFormData(formFields));

    try {
      toast.loading("Uploading files...");

      // Upload files only if they exist
      let imagesCid: string[] | null = null;
      let videosCid: string[] | null = null;
      let floorPlanCid: string[] | null = null;
      let licenseCid: string[] | null = null;

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

      if (formFields.floorPlan && formFields.floorPlan.length > 0) {
        floorPlanCid = await onUpload(formFields.floorPlan);
        if (!floorPlanCid || floorPlanCid.length === 0) {
          toast.error("Failed to upload floor plans. Please try again.");
          throw new Error("Floor plan upload failed");
        }
        setValue("floorPlanCid", floorPlanCid);
      }

      if (formFields.license && formFields.license.length > 0) {
        licenseCid = await onUpload(formFields.license);
        if (!licenseCid || licenseCid.length === 0) {
          toast.error("Failed to upload licenses. Please try again.");
          throw new Error("License upload failed");
        }
        setValue("licenseCid", licenseCid);
      }

      toast.success("Files uploaded successfully");

      // Prepare the result object with the uploaded CIDs
      const result = {
        ...formFields,
        imagesCid: imagesCid || undefined,
        videosCid: videosCid || undefined,
        floorPlanCid: floorPlanCid || undefined,
        licenseCid: licenseCid || undefined,
      };

      dispatch(updateFormData(result));

      // Send transaction
      try {
        await listingTx.sendAsync();

        if (listingReceipt?.isSuccess) {
          toast.success("Listing created successfully!");
          dispatch(resetForm());
          navigate("/dashboard");
        } else {
          toast.error("Failed to create listing. Please try again.");
        }
      } catch (error) {
        console.error("Transaction error:", error);
        toast.error("Transaction failed. Please try again.");
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
          name="floorPlan"
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
                      "border-red-500": errors.floorPlan,
                    },
                  )}
                >
                  <div className="flex flex-col gap-4 bg-background p-6">
                    <FormLabel className="text-base font-normal text-muted-foreground">
                      Ground Floor plans
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
          name="license"
          render={({ field }) => (
            <FormItem>
              <FileUploader
                value={field.value!}
                onValueChange={field.onChange}
                dropzoneOptions={
                  {
                    accept: {
                      "application/pdf": [".pdf"],
                      "text/csv": [".csv"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [".docx"],
                      "application/msword": [".doc"],
                      "application/vnd.ms-excel": [".xls"],
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                        [".xlsx"],
                    },
                    maxFiles: 3,
                    maxSize: 1024 * 1024 * 20,
                    multiple: true,
                  } satisfies DropzoneOptions
                }
                className="relative"
              >
                <FileInput
                  className={cn(
                    "overflow-hidden rounded-md border border-neutral-200 sm:rounded-xl",
                    {
                      "border-red-500": errors.license,
                    },
                  )}
                >
                  <div className="flex flex-col gap-4 bg-background p-6">
                    <FormLabel className="text-base font-normal text-muted-foreground">
                      Property Licenses
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
      </div>

      <Separator className="my-6 h-px w-full" />

      <div className="flex w-full items-center gap-4">
        <Button
          type="button"
          size={"lg"}
          variant={"outline"}
          className="w-[100px] rounded-full"
          onClick={() => dispatch(setCurrentStep(4))}
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
