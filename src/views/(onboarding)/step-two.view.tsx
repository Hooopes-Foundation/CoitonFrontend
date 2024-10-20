import { assets } from "@/assets";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function StepTwo() {
  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="absolute left-0 top-0 -z-10 min-h-screen w-full bg-gradient-to-b from-[#FFF4DE] via-[#FFF4DE]/50 to-background" />
      <div className="w-full max-w-[720px] rounded-[32px] bg-background">
        <div className="flex h-[339px] w-full items-center justify-center rounded-t-[32px] bg-[#F1FEEE]">
          <img
            src={assets.svgs.stepTwo}
            alt="STEP TWO"
            height={241.12}
            width={361.05}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-[32px] p-10">
          <div className="flex flex-col gap-2">
            <h4 className="whitespace-nowrap font-sans_bold text-[32px] leading-none text-primary">
              Connect Your Wallet
            </h4>
            <p className="font-sans_regular text-lg text-[#475467]">
              Secure your transactions with your crypto wallet.
            </p>
          </div>

          <div className="mx-auto flex max-w-xl flex-col gap-4">
            <div className="flex items-start gap-4">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 0.75H1.5C1.10218 0.75 0.720644 0.908035 0.43934 1.18934C0.158035 1.47064 0 1.85218 0 2.25V7.5C0 12.4425 2.3925 15.4378 4.39969 17.0803C6.56156 18.8484 8.71219 19.4484 8.80594 19.4738C8.93484 19.5088 9.07078 19.5088 9.19969 19.4738C9.29344 19.4484 11.4413 18.8484 13.6059 17.0803C15.6075 15.4378 18 12.4425 18 7.5V2.25C18 1.85218 17.842 1.47064 17.5607 1.18934C17.2794 0.908035 16.8978 0.75 16.5 0.75ZM13.2825 7.28063L8.0325 12.5306C7.96285 12.6004 7.88013 12.6557 7.78908 12.6934C7.69803 12.7312 7.60044 12.7506 7.50187 12.7506C7.40331 12.7506 7.30572 12.7312 7.21467 12.6934C7.12362 12.6557 7.0409 12.6004 6.97125 12.5306L4.72125 10.2806C4.58052 10.1399 4.50146 9.94902 4.50146 9.75C4.50146 9.55098 4.58052 9.36011 4.72125 9.21937C4.86198 9.07864 5.05285 8.99958 5.25187 8.99958C5.4509 8.99958 5.64177 9.07864 5.7825 9.21937L7.5 10.9397L12.2194 6.21937C12.2891 6.14969 12.3718 6.09442 12.4628 6.0567C12.5539 6.01899 12.6515 5.99958 12.75 5.99958C12.8485 5.99958 12.9461 6.01899 13.0372 6.0567C13.1282 6.09442 13.2109 6.14969 13.2806 6.21937C13.3503 6.28906 13.4056 6.37178 13.4433 6.46283C13.481 6.55387 13.5004 6.65145 13.5004 6.75C13.5004 6.84855 13.481 6.94613 13.4433 7.03717C13.4056 7.12822 13.3503 7.21094 13.2806 7.28063H13.2825Z"
                  fill="#0053F3"
                />
              </svg>
              <p className="-mt-1 flex-1 text-base font-normal">
                Please connect your wallet to proceed. Supported wallets include
                MetaMask, Trust Wallet, and others.
              </p>
            </div>
          </div>
          <Link to="/onboarding/step-three" className="w-max">
            <Button className="gap-2">
              <span>Connect Wallet</span>
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
