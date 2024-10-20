import { assets } from "@/assets";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const types = [
  {
    label: "Property Management",
    sub: "List, buy, or rent properties. Perfect for sellers, landlords, buyers, and renters.",
    path: "property-management",
    isAvailable: true,
  },
  {
    label: "DAO Account",
    sub: "Join our DAO to verify listings and influence platform decisions.",
    path: "get-verified",
    isAvailable: true,
  },
  {
    label: "Trading Account",
    sub: "Trade tokenized real estate assets and invest in the future of real estate.",
    path: "/",
    isAvailable: false,
  },
];

export default function AccountTypeView() {
  return (
    <div className="flex h-full">
      <div className="flex w-1/2 items-center justify-center p-6">
        <div className="flex w-full max-w-[568px] flex-col gap-[32px]">
          <div className="flex flex-col gap-2">
            <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
              Choose Your Account Type
            </h4>
            <p className="font-sans_regular text-lg text-[#475467]">
              Select an option that best suits your needs.
            </p>
          </div>

          <div className="flex flex-col gap-4 pl-4">
            {types.map((type) => (
              <div
                key={type.sub}
                className={cn(
                  "relative flex items-center gap-4 rounded-md border border-[#EAECF0] bg-[#F9FAFB] p-6",
                  {
                    "cursor-not-allowed opacity-[0.48]": !type.isAvailable,
                  },
                )}
              >
                {!type.isAvailable && (
                  <span className="absolute left-0 top-0 h-full w-full rounded-[inherit]" />
                )}
                <div className="flex h-[118px] flex-1 flex-col justify-between">
                  <p className="font-sans_medium text-lg">{type.label}</p>
                  <p className="font-sans_regular text-base leading-[20.8px] text-[#475467]">
                    {type.sub}
                  </p>

                  {type.isAvailable ? (
                    <Link
                      to={`/onboarding/${type.path}`}
                      className="flex w-max items-center gap-2 font-sans_medium text-primary"
                    >
                      <span>Start Onboarding</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  ) : (
                    <p className="flex items-center gap-2 font-sans_medium text-primary">
                      <span>Coming Soon</span>
                    </p>
                  )}
                </div>

                <div className="size-[100px] bg-[#D9D9D9]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-center p-6">
        <div className="h-full w-full rounded-[24px] bg-primary">
          <img
            src={assets.svgs.propertyManagement}
            alt="ACCOUNT TYPE"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
