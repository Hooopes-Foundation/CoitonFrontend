"use client";

import { ctxConfig } from "@/lib/blockchain";
import { organizationSchema, TOrganizationSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAccount,
  useBalance,
  useContract,
  useSendTransaction,
} from "@starknet-react/core";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import CustomButton from "../shared/custom-button";
import { useValidatorStore } from "@/store/validator.store";
import { useWalletStore } from "@/store/wallet.store";
import { useFeltConversion } from "@/hooks/feltConversion";

export const RegisterOrganization = () => {
  const wltAddr = useWalletStore((state) => state.wltAddr);
  const isWltCntd = useWalletStore((state) => state.isWltCntd);
  const vId = useValidatorStore((state) => state.vId);

  const form = useForm<TOrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "Hooopes Foundation",
      region: "Lagos State, Nigeria Africa",
      vId: vId,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const { contract } = useContract({
    abi: ctxConfig.CONTRACT_ABI,
    address: ctxConfig.CONTRACT_ADDR,
  });

  const calls = useMemo(() => {
    if (!contract || !wltAddr || typeof vId !== "string") return undefined;

    const name = form.getValues("name");
    const region = form.getValues("region");

    const nameConversion = useFeltConversion(name);
    const regionConversion = useFeltConversion(region);

    if (!nameConversion.felt || !regionConversion.felt) {
      console.error("Failed to convert strings to felt");
      return undefined;
    }

    try {
      return [
        contract.populate("register_organization", [
          vId,
          `0x${nameConversion.felt}`, // Add 0x prefix for hex strings
          `0x${regionConversion.felt}`, // Add 0x prefix for hex strings
        ]),
      ];
    } catch (error) {
      console.error("Error populating contract call:", error);
      return undefined;
    }
  }, [
    contract,
    wltAddr,
    vId,
    form.getValues("name"),
    form.getValues("region"),
  ]);

  const { sendAsync, isPending } = useSendTransaction({
    calls,
  });

  async function onSubmit(values: TOrganizationSchema) {
    if (!isWltCntd) {
      toast.error("Please connect your wallet", {
        position: "top-right",
      });
      return;
    }

    try {
      const dt = await sendAsync();
      if (dt !== undefined) {
        console.log({ dt });
        toast.success("Organization registration submitted", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error("Transaction error:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to register organization"
      );
    }
  }

  return (
    <div className="space-y-1 w-full">
      <p className="text-base font-bold uppercase">Register Organization</p>
      <div className="space-y-1 w-full">
        {isWltCntd ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 mb-4"
            >
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-2">Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting || isPending}
                          placeholder="Hooopes Foundation"
                          className="mb-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-2">Region</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isSubmitting || isPending}
                          placeholder="Abuja Nigeria"
                          className="mb-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <CustomButton
                size={"lg"}
                disabled={isSubmitting || !isValid || isPending}
                isLoading={isSubmitting || isPending}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isSubmitting || isPending
                  ? "Registering..."
                  : "Register Organization"}
              </CustomButton>
            </form>
          </Form>
        ) : (
          <p className="text-sm text-muted-foreground">
            Please connect your wallet to register an organization.
          </p>
        )}
      </div>
    </div>
  );
};
