import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";

import { assets } from "@/assets";
import MaxWrapper from "./max-wrapper";
import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "@/constants";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#062623] text-primary-foreground">
      <div className="py-24 w-full">
        <MaxWrapper className="flex flex-col lg:flex-row justify-between gap-6">
          <Image
            src={assets.svgs.logoIcon}
            alt="logo"
            width={270}
            height={270}
            priority
            quality={100}
            className="size-[270px] object-contain mx-auto lg:mx-0"
          />

          <h1 className="text-center flex lg:hidden mt-4 mb-6 mx-auto md:px-8">
            Invest in Real Estate, Reinvented.
          </h1>

          <div className="flex items-start md:justify-between flex-wrap gap-[59px]">
            {footerLinks.map((route: TRoutes) => (
              <div
                key={route.label}
                className="flex flex-col gap-4 md:gap-6 md:max-w-[168px] w-full md:w-max"
              >
                <p className="text-lg font-bold">{route.label}</p>

                <ul className="flex flex-col md:gap-2">
                  {route.path.map((path: string) => (
                    <Link
                      href="/"
                      key={path}
                      className="text-sm sm:text-base md:text-[15px] leading-[26.46px] sm:font-medium md:font-normal capitalize"
                    >
                      {path}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MaxWrapper>
      </div>
      <div className="py-8 border-t">
        <MaxWrapper className="flex flex-col lg:flex-row md:items-center justify-center lg:justify-between gap-4">
          <div className="w-full lg:w-[268px] text-center lg:text-left">
            <p className="text-sm md:text-[15px] font-light md:font-normal">
              © 2024 Coiton All rights reserved.
            </p>
          </div>

          <ul className="flex-1 flex items-start justify-center gap-8">
            <li className="text-sm md:text-[15px] font-light md:font-normal">
              Privacy
            </li>
            <li className="text-sm md:text-[15px] font-light md:font-normal">
              Security
            </li>
            <li className="text-sm md:text-[15px] font-light md:font-normal">
              Terms
            </li>
          </ul>

          <div className="w-full lg:w-[268px] flex items-center justify-center lg:justify-end gap-4">
            <Button
              className="rounded-full size-9"
              size={"icon"}
              variant={"secondary"}
            >
              <Link
                href="https://www.linkedin.com/in/coiton-nigeria-b59b6831a/"
                target="_blank"
                className="size-full flex items-center justify-center"
              >
                <FaLinkedinIn size={19} className="text-foreground" />
              </Link>
            </Button>
            <Button
              className="rounded-full size-9"
              size={"icon"}
              variant={"secondary"}
            >
              <Link
                href="https://x.com/_COiTON"
                target="_blank"
                className="size-full flex items-center justify-center"
              >
                <FaXTwitter size={19} className="text-foreground" />
              </Link>
            </Button>
            <Button
              className="rounded-full size-9"
              size={"icon"}
              variant={"secondary"}
              disabled
            >
              <Link
                href="/"
                target="_blank"
                className="size-full flex items-center justify-center"
              >
                <FaFacebookF size={19} className="text-foreground" />
              </Link>
            </Button>
            <Button
              className="rounded-full size-9"
              size={"icon"}
              variant={"secondary"}
              disabled
            >
              <Link
                href="/"
                target="_blank"
                className="size-full flex items-center justify-center"
              >
                <SiInstagram size={19} className="text-foreground" />
              </Link>
            </Button>
            <Button
              className="rounded-full size-9"
              size={"icon"}
              variant={"secondary"}
              disabled
            >
              <Link
                href="/"
                target="_blank"
                className="size-full flex items-center justify-center"
              >
                <BsYoutube size={19} className="text-foreground" />
              </Link>
            </Button>
          </div>
        </MaxWrapper>
      </div>
    </footer>
  );
}
