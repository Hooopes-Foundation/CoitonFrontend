import { assets } from "@/assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { daoMgmtSchema, DAO_MGMT_SCHEMA } from "@/lib/validators";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { FileUploader } from "@/components/shared/file-uploader";
import { useNavigate } from "react-router-dom";

export default function GetVerifiedView() {
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<DAO_MGMT_SCHEMA>({
    resolver: zodResolver(daoMgmtSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: DAO_MGMT_SCHEMA) {
    console.log(values);
    navigate("/onboarding/approval");
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="flex h-full">
      <div className="flex w-1/2 items-center justify-center p-6">
        <div className="flex w-full max-w-[480px] flex-col gap-[32px]">
          <div className="flex flex-col gap-2">
            <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
              Get Verified
            </h4>
            <p className="font-sans_regular text-lg text-[#475467]">
              Upload your licence so we can verify and make you a proper dao
              member.
            </p>
          </div>

          <div className="flex flex-col gap-4 p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="files"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFiles={3}
                          maxSize={100 * 1024 * 1024}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Email address</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="johndoe@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-sm">
                        You’ll receive an approval within 24-48 hrs
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="h-px w-full bg-[#F2F4F7]" />

                {/* Social Handles */}
                <div className="flex w-max items-center gap-4">
                  <Button
                    disabled={isSubmitting}
                    type="button"
                    variant={"ghost"}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={isSubmitting || !isValid}
                    type="submit"
                    className="gap-2"
                  >
                    <span>Upload</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-center p-6">
        <div className="h-full w-full rounded-[24px] bg-primary">
          <img
            src={assets.svgs.daoManagement}
            alt="PROPERTY MANAGEMENT"
            className="size-full"
          />
        </div>
      </div>
    </div>
  );
}
