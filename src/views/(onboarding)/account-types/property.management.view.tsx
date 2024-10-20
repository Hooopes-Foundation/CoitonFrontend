import { assets } from "@/assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { propMgmtSchema, PROP_MGMT_SCHEMA } from "@/lib/validators";

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

export default function PropertyManagementView() {
  // 1. Define your form.
  const form = useForm<PROP_MGMT_SCHEMA>({
    resolver: zodResolver(propMgmtSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: PROP_MGMT_SCHEMA) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="flex h-full">
      <div className="flex w-1/2 items-center justify-center p-6">
        <div className="flex w-full max-w-[480px] flex-col gap-[32px]">
          <div className="flex flex-col gap-2">
            <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
              Personalize Your Experience
            </h4>
            <p className="font-sans_regular text-lg text-[#475467]">
              For the best user experience, enter your information.
            </p>
          </div>

          <div className="flex flex-col gap-4 pl-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  disabled={isSubmitting}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Contact Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="johndoe@gmail.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="h-px w-full bg-[#F2F4F7]" />

                {/* Social Handles */}
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-base">Social Handle</FormLabel>

                  <FormField
                    control={form.control}
                    name="handles.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="@twitter_handle"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="handles.telegram"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="@telegram_handle"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  disabled={isSubmitting || !isValid}
                  type="submit"
                  size={"lg"}
                  className="w-full"
                >
                  Continue
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-center p-6">
        <div className="h-full w-full rounded-[24px] bg-primary">
          <img
            src={assets.svgs.propertyManagement}
            alt="PROPERTY MANAGEMENT"
            className="size-full"
          />
        </div>
      </div>
    </div>
  );
}
