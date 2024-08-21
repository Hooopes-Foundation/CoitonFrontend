import Wrapper from "./wrapper";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";
import Image from "next/image";

const footerLinks = [
  {
    label: "About",
    routes: ["partners", "careers", "press", "community"],
  },
  {
    label: "Listings",
    routes: ["features", "how it works", "pricing"],
  },
  {
    label: "Community",
    routes: ["events", "blog", "forum", "podcast", "telegram"],
  },
  {
    label: "Our Office",
    routes: [
      "8 The Green, Dover, Delaware 19901 United States",
      "No. S265 Maiduguri Road beside Azman oil, Tarauni, Kano State. +234 703 937 5901",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#062623] text-primary-foreground">
      <div className="py-24">
        <Wrapper className={"flex justify-between"}>
          <Image
            src="/svgs/logo.svg"
            alt="logo"
            width={270}
            height={270}
            priority
            className="size-[270px] object-contain"
          />

          <div className="flex items-start gap-[59px]">
            {footerLinks.map((link) => (
              <div
                key={link.label}
                className="flex flex-col gap-6 max-w-[168px] w-max">
                <p className="text-lg font-bold">{link.label}</p>

                <ul className="flex flex-col gap-2">
                  {link.routes.map((route) => (
                    <li
                      key={route}
                      className="text-[15px] leading-[26.46px] font-normal capitalize">
                      {route}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
      <div className="py-8 border-t">
        <Wrapper className="flex items-center justify-between">
          <div className="w-[268px]">
            <p className="text-[15px] font-medium">
              © 2024 Coiton All rights reserved.
            </p>
          </div>

          <ul className="flex-1 flex items-start justify-center gap-8">
            <li className="text-[15px] font-medium">Privacy</li>
            <li className="text-[15px] font-medium">Security</li>
            <li className="text-[15px] font-medium">Terms</li>
          </ul>

          <div className="w-[268px] flex items-center justify-end gap-5">
            <div className="size-[34px] rounded-full bg-background flex items-center justify-center">
              <FaLinkedinIn size={19} className="text-foreground" />
            </div>
            <div className="size-[34px] rounded-full bg-background flex items-center justify-center">
              <FaFacebookF size={19} className="text-foreground" />
            </div>
            <div className="size-[34px] rounded-full bg-background flex items-center justify-center">
              <SiInstagram size={19} className="text-foreground" />
            </div>
            <div className="size-[34px] rounded-full bg-background flex items-center justify-center">
              <FaXTwitter size={19} className="text-foreground" />
            </div>
            <div className="size-[34px] rounded-full bg-background flex items-center justify-center">
              <BsYoutube size={19} className="text-foreground" />
            </div>
          </div>
        </Wrapper>
      </div>
    </footer>
  );
}
