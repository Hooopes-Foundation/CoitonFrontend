import { assets } from "@/assets";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

const terms = [
  "I am not a person or company who is a resident of, or is located, incorporated or has a registered agent in, the United States or a restricted location.",
  "I will not in the future access this site or trade on Coiton while located in the United States or a restricted location.",
  "I am not using, and will not in the future use, a VPN to mask my physical location from a restricted location.",
  "I am lawfully permitted to access this site and trade on Coiton under the laws of jurisdiction in which I reside and am located.",
  "I understand DeFi is a new phenomenon, and understand and undertake any technological and market risks associated with it.",
];

export default function StepThree() {
  return (
    <div className="flex h-full">
      <div className="flex w-1/2 items-center justify-center p-6">
        <div className="flex w-full max-w-[480px] flex-col gap-[32px]">
          <div className="flex flex-col gap-2">
            <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
              Wallet Verification
            </h4>
            <p className="font-sans_regular text-lg text-[#475467]">
              By verifying your wallet, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>

          <div className="flex flex-col gap-10 px-5">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Terms</p>

              <div className="flex flex-col gap-4">
                {terms.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[#475467]">
                    <Dot className="size-6" />
                    <span className="flex-1 text-sm font-normal">{t}</span>
                  </li>
                ))}
              </div>
            </div>

            <Link to="/onboarding/step-four" className="w-max">
              <Button className="font-sans_normal gap-4" size={"lg"}>
                <span>Accept & Verify Wallet</span>
                <svg
                  width="12"
                  height="11"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8538 5.85372L7.35375 10.3537C7.25993 10.4475 7.13268 10.5003 7 10.5003C6.86732 10.5003 6.74007 10.4475 6.64625 10.3537C6.55243 10.2599 6.49972 10.1327 6.49972 9.99997C6.49972 9.86729 6.55243 9.74004 6.64625 9.64622L10.2931 5.99997H0.5C0.367392 5.99997 0.240215 5.94729 0.146447 5.85353C0.0526785 5.75976 0 5.63258 0 5.49997C0 5.36736 0.0526785 5.24019 0.146447 5.14642C0.240215 5.05265 0.367392 4.99997 0.5 4.99997H10.2931L6.64625 1.35372C6.55243 1.2599 6.49972 1.13265 6.49972 0.999973C6.49972 0.867291 6.55243 0.740043 6.64625 0.646223C6.74007 0.552402 6.86732 0.499695 7 0.499695C7.13268 0.499695 7.25993 0.552402 7.35375 0.646223L11.8538 5.14622C11.9002 5.19266 11.9371 5.2478 11.9623 5.3085C11.9874 5.3692 12.0004 5.43427 12.0004 5.49997C12.0004 5.56568 11.9874 5.63074 11.9623 5.69144C11.9371 5.75214 11.9002 5.80729 11.8538 5.85372Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-center p-6">
        <div className="h-full w-full rounded-[24px] bg-primary">
          <img
            src={assets.svgs.stepThree}
            alt="STEP THREE"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
