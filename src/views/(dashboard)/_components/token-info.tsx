import { useStakeListingFee } from "@/hooks/useCreateListing";
import { Info, Loader } from "lucide-react";
import { memo, ReactNode, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { usePaystackPayment } from "react-paystack";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { env } from "@/lib/envs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const TokenInfo = () => {
  const { stakingFeeTx, stakingFeeReceipt } = useStakeListingFee();

  useEffect(() => {
    if (
      stakingFeeReceipt?.isLoading &&
      stakingFeeReceipt?.status === "success"
    ) {
      toast.success("Listing fee paid successfully");
    }
  }, [stakingFeeReceipt?.isLoading, stakingFeeReceipt?.status]);

  return (
    <>
      {stakingFeeReceipt?.isLoading && (
        <div className="fixed inset-0 z-50 flex size-full items-center justify-center bg-black/30 backdrop-blur-sm">
          <Loader className="size-8 animate-spin text-white" />
        </div>
      )}
      <div className="flex w-full items-start gap-4 border border-l-4 border-l-blue-500 bg-blue-500/10 p-4">
        <Info className="size-5 text-blue-500" />

        <div className="flex flex-1 items-start gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-base italic tracking-wide text-blue-500">
              To create a listing, a listing fee of 20 STRK is required.
            </p>
            <p className="text-base italic tracking-wide text-blue-500">
              Don't have enough token, <BuyToken>buy now</BuyToken>
            </p>
          </div>
          <p
            role="button"
            onClick={async () => await stakingFeeTx.sendAsync()}
            className="ml-auto text-base tracking-wide text-blue-500 underline"
          >
            20 STRK
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(TokenInfo);

const BuyToken = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const FormSchema = z.object({
    email: z.coerce
      .string({
        message: "Email is required.",
      })
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .email({
        message: "Invalid email address.",
      }),
    name: z.coerce
      .string({
        required_error: "Name is required.",
      })
      .min(3, {
        message: "Name must be at least 3 characters.",
      }),
    amount: z.coerce
      .number({
        required_error: "Amount is required.",
      })
      .min(0, {
        message: "Amount must be greater than 0.",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "abdullahisalihuinusa@gmail.com",
      amount: 50000,
    },
  });

  const config = {
    reference: new Date().getTime().toString(),
    publicKey: env.paystackPubKey,
  };

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { email, amount } = data;
    const paystackConfig = {
      ...config,
      email,
      amount: amount * 100, // Convert amount to lowest denomination (e.g., Kobo for Naira)
    };

    const initializePayment = usePaystackPayment(paystackConfig);

    const onSuccess = async (reference: any) => {
      const paymentData = {
        receipt: reference?.trans,
        address: address,
      };
      const response = await axios.post(
        "https://coiton-backend.onrender.com/api/v1/payment",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status) {
        toast.success("Payment successful ✅");
      } else {
        toast.error("Payment failed ❌");
      }
    };

    const onClose = () => {
      console.log("Payment dialog closed.");
    };

    initializePayment({ onSuccess, onClose });
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="cursor-pointer font-sans_bold underline">
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[540px] p-8">
        <div className="flex flex-col gap-10">
          <div className="flex aspect-video h-[289px] items-center justify-center rounded-sm bg-[#F0FCFB]">
            <svg
              width="218"
              height="208"
              viewBox="0 0 218 208"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M213.848 73.7963L187.796 86.8138L179.681 90.8797L164.956 82.3722L158.84 78.853L128.278 61.2059L122.162 57.6697L109.93 50.6143L91.5827 40.0226L57.416 20.2913L91.5827 3.20801L213.848 73.7963Z"
                fill="#007C71"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M50.7107 111.289V125.834L25.3379 111.196V96.6357L50.7107 111.289Z"
                fill="#D5F5F2"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M81.5573 37.6377V52.1982L68.0611 58.954L54.5342 65.7098L50.709 67.6224V53.0618L81.5573 37.6377Z"
                fill="#007C71"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M81.559 37.6374L50.7107 53.0616L49.8469 52.5682L46.0063 50.3469L25.3379 38.4242L56.1864 23L81.559 37.6374Z"
                fill="#007C71"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M50.7107 53.0631V67.6237L32.4948 57.1043L25.3379 52.9707V38.4258L46.0063 50.3485L49.8469 52.5697L50.7107 53.0631Z"
                fill="#D5F5F2"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M71.2263 60.7745C67.4474 63.0727 64.4087 66.1885 62.1567 70.1062C60.7686 72.4661 59.6736 75.1343 58.887 78.0803L50.7122 82.1677L19 63.8593L32.4961 57.1035L50.7122 67.6229L54.5372 65.7103L68.0643 58.9546L71.2263 60.7745Z"
                fill="#007C71"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M57.9466 82.2293C57.3451 85.5455 57.0519 89.17 57.0519 93.1186C57.0519 93.2574 57.0519 93.4117 57.0519 93.5505L56.173 93.9979L50.6973 96.728V82.1675L58.8722 78.0801C58.4866 79.4066 58.1778 80.7795 57.931 82.2293H57.9466Z"
                fill="#007C71"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M58.3302 107.479L50.7107 111.289L25.3379 96.6357L38.8497 89.8799L50.7107 96.7284L56.1864 93.9983L57.0653 93.5508C57.0653 94.4609 57.0807 95.3865 57.1115 96.3119C57.2658 100.014 57.667 103.731 58.3302 107.479Z"
                fill="#007C71"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M50.7122 82.1678V96.7284L38.851 89.8799L19 78.4199V63.8594L50.7122 82.1678Z"
                fill="#D5F5F2"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M61.5677 120.404L50.709 125.833V111.288L58.3285 107.479C59.0689 111.766 60.1487 116.07 61.5677 120.404Z"
                fill="#007C71"
                stroke="black"
                strokeWidth="1.54241"
              />
              <path
                d="M164.956 82.3728L158.84 78.8537L128.278 61.2066L122.162 57.6703L109.93 50.6149L91.5827 40.0232L57.416 20.292V132.529L179.681 203.118V90.8803L164.956 82.3728ZM87.9952 122.109L75.7635 115.053V58.9345L87.9952 65.9899V122.109ZM124.673 143.292L94.111 125.645V69.5262L109.93 78.6657L119.343 84.0982L122.162 85.7212L124.673 87.1732V143.292ZM161.351 164.475L130.789 146.828V90.7095L140.492 96.3128L146.608 99.8491L156.021 105.282L158.84 106.904L161.351 108.357V164.475Z"
                fill="#D5F5F2"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M87.9953 65.99V108.937L75.7637 115.053V58.9346L87.9953 65.99Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M149.12 115.325V143.376L143.807 140.318L143.004 139.857V111.789L149.12 115.325Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M161.353 137.261V164.474L130.791 146.827L138.906 142.762L143.809 140.319L149.121 143.377L161.353 137.261Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M143.006 139.858L143.809 140.319L138.906 142.762L130.791 146.828V90.709L140.494 96.3123L146.61 99.8486L156.023 105.281L143.006 111.79V139.858Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M106.328 90.6072V118.675L107.131 119.136L102.228 121.596L94.1133 125.645V69.5264L109.932 78.6659L119.345 84.0984L109.932 88.8135L106.328 90.6072Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M124.675 116.095V143.291L94.1133 125.644L102.228 121.596L107.131 119.136L112.444 122.211L124.675 116.095Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M87.9953 108.937V122.108L75.7637 115.052L87.9953 108.937Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M161.351 108.356V109.21L158.84 110.475L149.12 115.326L143.004 111.79L156.021 105.281L158.84 106.904L161.351 108.356Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M161.351 109.21V137.261L149.119 143.377V115.326L158.84 110.474L161.351 109.21Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M124.676 87.1727V88.0268L122.164 89.291L112.444 94.1427L109.933 92.6906L106.328 90.6064L109.933 88.8127L119.346 84.0977L122.164 85.7206L124.676 87.1727Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M112.444 94.1437V122.212L107.131 119.137L106.328 118.675V90.6074L109.933 92.6916L112.444 94.1437Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M124.675 88.0273V116.095L112.443 122.211V94.1432L122.164 89.2915L124.675 88.0273Z"
                stroke="black"
                strokeWidth="1.70833"
              />
              <path
                d="M213.85 73.7969V186.034L179.684 203.118V90.8802L187.798 86.8144L213.85 73.7969Z"
                fill="#007C71"
                stroke="black"
                strokeWidth="1.70833"
              />
            </svg>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        type="email"
                        placeholder="johndoe@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        type="text"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="20"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center">
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  size={"lg"}
                  className="w-full max-w-[277px]"
                >
                  Purchase
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
