import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";
import MaxWrapper from "@/components/shared/max-wrapper";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { footer_routes } from "@/static";
import { assets } from "@/assets";

const socials = [
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/coiton-nigeria-b59b6831a/",
  },
  {
    icon: FaXTwitter,
    label: "X (Twitter)",
    url: "https://x.com/_COiTON",
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
  },
  {
    icon: SiInstagram,
    label: "Instagram",
  },
  {
    icon: BsYoutube,
    label: "YouTube",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#062623] text-primary-foreground">
      <div className="w-full py-24">
        <MaxWrapper className="flex flex-col justify-between gap-6 lg:flex-row">
          <img
            src={assets.svgs.logoIcon}
            alt="Coiton Logo"
            width={270}
            height={270}
            className="mx-auto size-[270px] object-contain lg:mx-0"
          />

          <h1 className="mx-auto mb-6 mt-4 flex text-center md:px-8 lg:hidden">
            Invest in Real Estate, Reinvented.
          </h1>

          <div className="flex flex-wrap items-start gap-[59px] md:justify-between">
            {footer_routes.map((route: ROUTES) => (
              <div
                key={route.label}
                className="flex w-full flex-col gap-4 md:w-max md:max-w-[168px] md:gap-6"
              >
                <p className="font-sans_bold text-lg">{route.label}</p>

                <ul className="flex flex-col md:gap-2">
                  {route.path.map((path: string) => (
                    <Link
                      to="/"
                      key={path}
                      className="text-sm capitalize leading-[26.46px] transition-transform duration-300 sm:font-sans_medium sm:text-base md:font-sans_regular md:text-[15px] md:hover:translate-x-2"
                    >
                      {path}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex w-full flex-col gap-4 md:w-[168px] md:gap-6" />
          </div>
        </MaxWrapper>
      </div>
      <div className="border-t py-8">
        <MaxWrapper className="flex flex-col justify-center gap-4 md:items-center lg:flex-row lg:justify-between">
          <div className="w-full text-center lg:w-[268px] lg:text-left">
            <p className="font-sans_light text-sm md:font-sans_regular md:text-[15px]">
              © 2024 Coiton All rights reserved.
            </p>
          </div>

          <ul className="flex flex-1 items-start justify-center gap-8">
            <li className="font-sans_light text-sm md:font-sans_regular md:text-[15px]">
              Privacy
            </li>
            <li className="font-sans_light text-sm md:font-sans_regular md:text-[15px]">
              Security
            </li>
            <li className="font-sans_light text-sm md:font-sans_regular md:text-[15px]">
              Terms
            </li>
          </ul>

          <div className="flex w-full items-center justify-center gap-4 lg:w-[268px] lg:justify-end">
            {socials.map((link) => (
              <Button
                disabled={!link.url}
                className="size-9 rounded-full"
                variant={"secondary"}
                size={"icon"}
                key={link.label}
              >
                <Link
                  to={link?.url ?? "/"}
                  target={link?.url && "_blank"}
                  className="flex size-full items-center justify-center"
                >
                  <link.icon size={19} className="text-foreground" />
                </Link>
              </Button>
            ))}
          </div>
        </MaxWrapper>
      </div>
    </footer>
  );
}
