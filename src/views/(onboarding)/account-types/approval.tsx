import { assets } from "@/assets";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Approval() {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="absolute left-0 top-0 -z-10 min-h-screen w-full bg-gradient-to-b from-[#FFF4DE] via-[#FFF4DE]/50 to-background" />
      <div className="w-full max-w-[720px] rounded-[32px] bg-background">
        <div className="flex h-[339px] w-full items-center justify-center rounded-t-[32px] bg-[#F1FEEE]">
          <img
            src={assets.svgs.approval}
            alt="APPROVAL CONFIRMATION"
            height={202}
            width={186}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-[32px] p-10">
          <div className="flex flex-col gap-2">
            <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
              You’ll receive an approval within 24-48 hrs
            </h4>
          </div>
          <Link to="/onboarding/mint" className="w-max">
            <Button className="gap-2">
              <span>Proceed to Mint your asset</span>
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
  );
}
