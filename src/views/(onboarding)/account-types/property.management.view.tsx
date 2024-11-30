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
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useContractInstance } from "@/hooks/test/useContractInstance";
import { Contract } from "starknet";
import { stringToByteArray } from "@/lib/utils";
import {
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { toast } from "sonner";

export default function PropertyManagementView() {
  const navigate = useNavigate();
  const { getContractInstance } = useContractInstance();
  const contractInstance: Contract = getContractInstance();

  const initialValues = {
    email: "abdullahisalihuinusa@gmail.com",
    handles: {
      twitter: "https://twitter.com/i_abdulsalihu",
      telegram: "t.me/i_abdulsalihu",
    },
  };

  const form = useForm<PROP_MGMT_SCHEMA>({
    resolver: zodResolver(propMgmtSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit, control, getValues, formState } = form;
  const { email, handles } = getValues();
  const { twitter, telegram } = handles;
  const { isSubmitting, isValid } = formState;

  const calls = useMemo(() => {
    if (!email || !telegram || !twitter) return [];

    const details = {
      type: "user",
      email,
      handles: { telegram, twitter },
    };

    const userDetails = stringToByteArray(JSON.stringify(details));

    return [contractInstance.populate("register_user", [userDetails])];
  }, [email, telegram, twitter]);

  const {
    sendAsync,
    data: writeData,
    isPending: writeIsPending,
  } = useSendTransaction({ calls });

  const {
    isLoading: waitIsLoading,
    isError: waitIsError,
    error: waitError,
    status: waitStatus,
  } = useTransactionReceipt({ hash: writeData?.transaction_hash, watch: true });

  async function onSubmit(values: PROP_MGMT_SCHEMA) {
    try {
      console.log(values);

      await sendAsync();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  }

  useEffect(() => {
    if (waitStatus === "success") {
      toast.success("Registration successful!");
      navigate("/dashboard");
    } else if (waitIsError && waitError) {
      toast.error(waitError.message || "Transaction failed");
    }
  }, [waitStatus, waitIsError, waitError, navigate]);

  return (
    <div className="flex h-full">
      <div className="flex w-1/2 items-center justify-center p-6">
        <div className="flex w-full max-w-[480px] flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="font-sans_bold text-[32px] leading-none text-primary">
              Personalize Your Experience
            </h4>
            <p className="font-sans_regular text-lg text-[#475467]">
              For the best user experience, enter your information.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Contact Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={
                            isSubmitting || writeIsPending || waitIsLoading
                          }
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

                <div className="flex flex-col gap-2">
                  <FormLabel className="text-base">Social Handles</FormLabel>
                  <FormField
                    control={control}
                    name="handles.twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={
                              isSubmitting || writeIsPending || waitIsLoading
                            }
                            placeholder="https://twitter.com/i_abdulsalihu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="handles.telegram"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled={
                              isSubmitting || writeIsPending || waitIsLoading
                            }
                            placeholder="t.me/i_abdulsalihu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={
                    isSubmitting || !isValid || writeIsPending || waitIsLoading
                  }
                  type="submit"
                  size="lg"
                  className="w-full"
                >
                  {writeIsPending || isSubmitting
                    ? "Processing..."
                    : "Continue"}
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
