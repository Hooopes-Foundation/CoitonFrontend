//! Third-party libraries
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TiArrowRightOutline } from "react-icons/ti";
import { Check, ChevronsUpDown, Loader } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { formatPhoneNumber } from "react-phone-number-input";

//! Starknet libraries
import { Contract } from "starknet";
import {
  useAccount,
  useSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";

//! Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store";

//! Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SocialInput from "../_components/social-input";
import { PhoneInput } from "@/components/extension/phone-input";

//! Utilities
import {
  cn,
  CountryData,
  generateAvatarFromAddress,
  getCountries,
  getStatesByCountry,
  StateData,
} from "@/lib/utils";
import { assets } from "@/assets";
import { registrationSchema } from "@/utils/validators";
import { stringToByteArray } from "@/lib/starknet/utils";
import { useContractInstance } from "@/hooks/useContractInstance.hook";

//! React and Router
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const propertyManagementSchema = registrationSchema.extend({});

export type PROPERTY_MANAGEMENT_SCHEMA = z.infer<
  typeof propertyManagementSchema
>;

export default function PropertyManagementPage() {
  const navigate = useNavigate();

  const [countryPopover, setCountryPopover] = useState(false);
  const [statePopover, setStatePopover] = useState(false);

  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);

  const { getContractInstance } = useContractInstance();
  const contractInstance = getContractInstance();

  const { address } = useAccount();
  const walletStore = useSelector((state: RootState) => state.wallet);

  const form = useForm<PROPERTY_MANAGEMENT_SCHEMA>({
    resolver: zodResolver(propertyManagementSchema),
    defaultValues: {
      isDao: false,
      name: "Albert Freeman",
      email: "albert.freeman@starknet.io",
      region: {
        country: {
          countryName: "Aland Islands",
          countryCode: "AX",
          countryFlag: "🇦🇽",
          countryLat: 60.116667,
          countryLong: 19.9,
        },
      },
      phone: {
        national: "+12066578426",
        international: "+1 206 657 8426",
      },
      socials: [
        {
          id: "17c086d4-0082-41fe-81e9-9426d1ba6070",
          url: "https://facebook.com/albertfreeman",
          type: "facebook",
        },
        {
          id: "06cfa17f-e4c3-4a9c-aa97-d1d492cd9ab9",
          url: "https://x.com.albertfreeman",
          type: "twitter",
        },
        {
          id: "5aeda92e-b36a-49bd-ba7c-2616850aaace",
          url: "https://linkedin.com/in/albertfreeman",
          type: "linkedin",
        },
        {
          id: "0bee4019-54fb-4414-8762-e862ae2d6436",
          url: "https://instagram.com/albertfreeman",
          type: "instagram",
        },
        {
          id: "40e26644-c33e-41c9-b296-f056fd9a30d5",
          url: "https://t.me/albertfreeman",
          type: "telegram",
        },
        {
          id: "d8cac55d-7a50-4111-bc23-af6bad2ea940",
          url: "https://albertfreeman.com",
          type: "other",
        },
      ],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const formData = useMemo(() => {
    const values = form.getValues();

    const data = {
      ...values,
      avatar: generateAvatarFromAddress(
        address || (walletStore?.walletAddress as string),
      ),
    };

    return data;
  }, [form.getValues, form.watch()]);

  const [isLoading, setIsLoading] = useState(false);

  // const calls = useMemo(() => {
  //   const { region, email, name, phone, isDao } = formData;

  //   // Validate top-level fields
  //   if (!email || !name || !phone?.national || !phone?.national) {
  //     return;
  //   }

  //   // Validate `region.country` fields
  //   if (
  //     !region?.country?.countryLat ||
  //     !region.country.countryLong ||
  //     !region.country.countryCode ||
  //     !region.country.countryName
  //   ) {
  //     return;
  //   }

  //   // Prepare region and details as byte arrays
  //   const regionToBytesArray = stringToByteArray(
  //     JSON.stringify(formData.region),
  //   );
  //   const detailsToBytesArray = stringToByteArray(JSON.stringify(formData));
  //   // Return the contract calls
  //   return [
  //     contractInstance!.populate("register_user", [
  //       isDao,
  //       regionToBytesArray,
  //       detailsToBytesArray,
  //     ]),
  //   ];
  // }, [contractInstance, formData]);

  // const transaction = useSendTransaction({
  //   calls,
  // });

  // const receipt = useTransactionReceipt({
  //   hash: transaction?.data?.transaction_hash,
  //   watch: !!transaction?.data?.transaction_hash,
  //   refetchInterval: (query) => (query?.state.isInvalidated ? 5000 : false),
  // });

  // const isLoading = receipt?.isLoading || transaction?.isPending;

  const onSubmit = async (data: PROPERTY_MANAGEMENT_SCHEMA) => {
    try {
      if (isLoading) return;
      const { region, email, name, phone, isDao } = formData;

      // Validate top-level fields
      if (!email || !name || !phone?.national || !phone?.national) {
        return;
      }

      // Validate `region.country` fields
      if (
        !region?.country?.countryLat ||
        !region.country.countryLong ||
        !region.country.countryCode ||
        !region.country.countryName
      ) {
        return;
      }

      setIsLoading(true)

      // Prepare region and details as byte arrays
      const regionToBytesArray = stringToByteArray(
        JSON.stringify(formData.region),
      );

      const detailsToBytesArray = stringToByteArray(JSON.stringify(formData));
      const call = contractInstance!.populate("register_user", [
        isDao,
        regionToBytesArray,
        detailsToBytesArray,
      ])
      await window.Wallet.Account?.execute(call);

      setIsLoading(false);

      navigate("/dashboard")

      // await transaction.sendAsync();
      // console.log(data);
    } catch (error) {
      setIsLoading(false);

      console.error("Unexpected error during transaction:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  // useEffect(() => {
  //   if (receipt?.status === "success") {
  //     console.log("Transaction successful:", receipt.data);
  //     toast.success("Transaction completed successfully!");
  //     setCountryPopover(false);
  //     setStatePopover(false);
  //   } else if (receipt?.status === "error") {
  //     console.error("Transaction failed:", receipt.error);
  //     toast.error(
  //       receipt.error?.message || "Transaction failed. Please try again.",
  //     );
  //   }
  // }, [receipt?.status]);
  // const isLoading = false;
  useEffect(() => {
    setCountries(getCountries());
  }, []);

  useEffect(() => {
    form.setValue(
      "phone.international",
      formatPhoneNumber(form.watch("phone.national")),
    );
  }, [form.watch("phone.national")]);

  const handleCountryChange = (countryCode: string) => {
    const country: CountryData | undefined = countries.find(
      (c) => c.countryCode === countryCode,
    );

    if (country) {
      form.setValue("region.country", country);
      const newStates: StateData[] = getStatesByCountry(countryCode);
      setStates(newStates);
      form.setValue("region.state", {
        stateName: "",
        stateCode: "",
        countryCode: "",
        stateLat: 0,
        stateLong: 0,
      });
    }
  };

  const handleStateChange = (stateCode: string) => {
    const state: StateData | undefined = states?.find(
      (s) => s.stateCode === stateCode,
    );

    if (state) {
      form.setValue("region.state", state);
    }
  };

  return (
    <div className="flex lg:h-full">
      <Form {...form}>
        <motion.form
          variants={{
            enter: (currentStep: number) => ({
              x: currentStep > 0 ? -100 : 100, // Enter from left if moving forward, right if going back
              opacity: 0,
            }),
            center: {
              x: 0, // Centered position
              opacity: 1,
            },
            exit: (currentStep: number) => ({
              x: currentStep > 0 ? 100 : -100, // Exit to right if moving forward, left if going back
              opacity: 0,
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 0.5, ease: "linear" },
            opacity: { duration: 0.5, ease: "linear" },
          }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full items-center justify-center overflow-y-auto p-6 lg:max-w-[55%]"
        >
          <div className="flex w-full max-w-[480px] flex-col gap-4">
            <div className="mb-4 flex flex-col sm:mb-0 sm:gap-2">
              <p className="text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
                Personalize Your Experience
              </p>
              <p className="text-base font-normal text-muted-foreground sm:text-lg">
                For the best user experience, enter your information.
              </p>
            </div>

            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Albert Freeman"
                      type="text"
                      className={cn("text-foreground", {
                        "border-red-500 focus-visible:ring-red-500":
                          errors.name,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="albert.freeman@starknet.io"
                      type="email"
                      className={cn("text-foreground", {
                        "border-red-500 focus-visible:ring-red-500":
                          errors.email,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone.national"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <PhoneInput
                      placeholder="(206) 657-8426"
                      className={cn("text-foreground", {
                        "border-red-500 focus-visible:ring-red-500":
                          errors.phone,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col items-center gap-4 md:flex-row">
              <FormField
                control={control}
                name="region.country"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Popover
                      open={countryPopover}
                      onOpenChange={setCountryPopover}
                    >
                      <FormControl className="w-full">
                        <PopoverTrigger className="w-full" asChild>
                          <div
                            aria-expanded={countryPopover}
                            role="combobox"
                            className={cn(
                              "flex h-12 !w-full cursor-pointer items-center justify-between rounded-md border border-neutral-200 bg-background px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:rounded-xl sm:text-base",
                              {
                                "border-red-500 focus-visible:ring-red-500":
                                  errors.region?.country,
                              },
                            )}
                          >
                            {field.value?.countryName
                              ? countries.find(
                                (country) =>
                                  country.countryName ===
                                  field.value?.countryName,
                              )?.countryName
                              : "Select country..."}
                            <ChevronsUpDown className="size-4 opacity-50" />
                          </div>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-[480px] p-0">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {countries.map((country) => (
                                <CommandItem
                                  key={country.countryCode}
                                  value={country.countryName}
                                  onSelect={() => {
                                    form.setValue("region.country", country);
                                    handleCountryChange(country.countryCode);
                                    setCountryPopover(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-1 size-4",
                                      field.value?.countryName ===
                                        country.countryName
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <span className="mr-2 text-2xl">
                                    {country.countryFlag}
                                  </span>
                                  {country.countryName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="region.state"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Popover open={statePopover} onOpenChange={setStatePopover}>
                      <FormControl className="w-full">
                        <PopoverTrigger className="w-full" asChild>
                          <div
                            aria-expanded={statePopover}
                            role="combobox"
                            className={cn(
                              "flex h-12 !w-full cursor-pointer items-center justify-between rounded-md border border-neutral-200 bg-background px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:rounded-xl sm:text-base",
                              {
                                "border-red-500 focus-visible:ring-red-500":
                                  errors.region?.state,
                              },
                            )}
                          >
                            {field.value?.stateName
                              ? states.find(
                                (state) =>
                                  state.stateName === field.value?.stateName,
                              )?.stateName
                              : "Select state..."}
                            <ChevronsUpDown className="size-4 opacity-50" />
                          </div>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-[480px] p-0">
                        <Command>
                          <CommandInput placeholder="Search state..." />
                          <CommandList>
                            <CommandEmpty>No state found.</CommandEmpty>
                            <CommandGroup>
                              {states.map((state) => (
                                <CommandItem
                                  key={state.stateCode}
                                  value={state.stateName}
                                  onSelect={() => {
                                    form.setValue("region.state", state);
                                    handleStateChange(state.stateCode);
                                    setStatePopover(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-1 size-4",
                                      field.value?.stateName === state.stateName
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {state.stateName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="socials"
              render={({ field }) => (
                <SocialInput error={errors?.socials?.message} {...field} />
              )}
            />

            <div className="flex items-center gap-4">
              <Button
                variant={"outline"}
                size={"lg"}
                className="rounded-full tracking-wide"
                type="button"
                onClick={() => navigate("/onboarding")}
              >
                <span>Back</span>
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full rounded-full tracking-wide"
                size={"lg"}
              >
                {isLoading ? (
                  <>
                    <Loader className="size-5 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <span>Register</span>
                    <TiArrowRightOutline className="size-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.form>
      </Form>

      <motion.div
        variants={{
          enter: (currentStep: number) => ({
            x: currentStep > 0 ? 100 : -100, // Enter from right if moving forward, left if going back
            opacity: 0,
          }),
          center: {
            x: 0, // Centered position
            opacity: 1,
          },
          exit: (currentStep: number) => ({
            x: currentStep > 0 ? -100 : 100, // Exit to left if moving forward, right if going back
            opacity: 0,
          }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { duration: 0.5, ease: "linear" },
          opacity: { duration: 0.5, ease: "linear" },
        }}
        className="hidden w-full max-w-[45%] items-center p-4 lg:flex"
      >
        <div className="h-full w-full overflow-hidden rounded-2xl bg-primary">
          <img
            src={assets.svgs.stepFour}
            alt="STEP FOUR"
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
