import { assets } from "@/assets";
import { Link } from "react-router-dom";
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

export default function MintView() {
  // 1. Define your form.
  const form = useForm<DAO_MGMT_SCHEMA>({
    resolver: zodResolver(daoMgmtSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: DAO_MGMT_SCHEMA) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="flex h-full">
      <div className="flex w-1/2 items-center p-6">
        <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-primary p-5">
          <div className="pointer-events-none flex w-full max-w-[455px] select-none flex-col gap-10 rounded-[35px] border-[3px] border-[#055E57] p-5 text-white">
            <div className="grid aspect-square w-full place-content-center rounded-[inherit] bg-white">
              <svg
                width="346"
                height="346"
                viewBox="0 0 346 346"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_858_7808)">
                  <circle
                    cx="172.623"
                    cy="167.063"
                    r="126.576"
                    fill="#056F67"
                    stroke="url(#paint0_linear_858_7808)"
                    stroke-width="8.43839"
                  />
                  <g clip-path="url(#clip0_858_7808)">
                    <path
                      d="M159.627 221.995C154.262 221.995 148.821 221.239 143.408 219.656C128.027 215.15 115.253 204.7 107.442 190.219C99.6369 175.738 97.7239 158.968 102.063 142.997C103.206 138.794 107.407 136.354 111.455 137.534C115.503 138.722 117.852 143.083 116.716 147.286C113.479 159.198 114.906 171.7 120.729 182.496C126.551 193.292 136.075 201.087 147.546 204.448C151.58 205.628 155.642 206.189 159.641 206.189C179.111 206.189 197.056 192.831 202.594 172.434C203.738 168.231 207.938 165.791 211.986 166.971C216.034 168.159 218.383 172.52 217.247 176.724C209.816 204.081 185.758 221.995 159.641 221.995H159.627Z"
                      fill="white"
                    />
                    <path
                      d="M177.295 174.924C175.25 174.924 173.212 174.075 171.708 172.391C168.853 169.188 169.033 164.193 172.117 161.22L198.518 135.821L199.246 135.382C205.762 131.438 213.857 131.43 220.38 135.367L221.101 135.799L247.668 161.213C250.759 164.171 250.954 169.173 248.112 172.376C245.263 175.586 240.453 175.795 237.361 172.837L212.152 148.718C210.676 148.049 208.992 148.049 207.515 148.718L182.479 172.815C181.017 174.226 179.159 174.924 177.309 174.924H177.295Z"
                      fill="white"
                    />
                    <path
                      d="M234.685 163.648C230.484 163.648 227.074 160.107 227.074 155.745V138.443C227.074 134.081 230.484 130.54 234.685 130.54C238.885 130.54 242.295 134.081 242.295 138.443V155.745C242.295 160.107 238.885 163.648 234.685 163.648Z"
                      fill="white"
                    />
                  </g>
                  <path
                    opacity="0.03"
                    d="M229.671 49.4855C229.671 49.4855 244.281 55.7476 258.195 68.2703C270.563 79.402 281.155 93.3161 281.155 93.3161L116.268 284.64C116.268 284.64 98.2986 276.118 84.2645 263.769C66.8707 248.463 61.305 234.549 61.305 234.549L229.671 49.4855Z"
                    fill="#39F2E4"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_858_7808"
                    x="0.0850067"
                    y="0.090209"
                    width="345.076"
                    height="345.077"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="5.56575" />
                    <feGaussianBlur stdDeviation="20.8716" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_858_7808"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_858_7808"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_858_7808"
                    x1="84.0201"
                    y1="61.5828"
                    x2="322.405"
                    y2="285.2"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#099E92" />
                    <stop offset="1" stop-color="#033834" />
                  </linearGradient>
                  <clipPath id="clip0_858_7808">
                    <rect
                      width="150.339"
                      height="91.4566"
                      fill="white"
                      transform="translate(99.7891 130.54)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <p className="font-sans_bold text-2xl leading-none">
                  Coiton Token
                </p>
                <span className="font-sans_regular text-base">Issue 1219</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans_regular text-base">Price</span>
                <div className="flex items-center gap-2">
                  <img
                    src={assets.svgs.starknetIcon}
                    alt="icon"
                    width={35}
                    height={35}
                  />
                  <p className="font-sans_bold text-2xl leading-none">
                    0.01 Strk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center p-6">
        <div className="flex w-full max-w-[480px] flex-col gap-[32px] p-6">
          <div className="flex flex-col gap-2">
            <h4 className="whitespace-nowrap text-center font-sans_bold text-[32px] leading-none text-primary">
              DAO
            </h4>
            <p className="text-center font-sans_regular text-lg text-[#475467]">
              For the best user experience, enter your information.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Organization name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Hooopes Foundation"
                        type="text"
                        {...field}
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
                    <FormLabel className="text-base">Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Abdullahi Salihu"
                        type="text"
                        {...field}
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
                    <FormLabel className="text-base">Region</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="817 950 2285"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="h-px w-full bg-[#F2F4F7]" />

              {/* Social Handles */}
              <div className="flex items-center justify-center gap-4">
                <Button variant={"ghost"} size={"lg"} type="button">
                  Back
                </Button>
                <Button
                  disabled={isSubmitting || !isValid}
                  size={"lg"}
                  type="submit"
                  className="gap-2"
                >
                  <span>Mint</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
