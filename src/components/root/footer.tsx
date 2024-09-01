import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";
import Wrapper from "../shared/wrapper";
import { assets } from "@/assets";

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
      <div className="py-24 w-full">
        <Wrapper className="flex flex-col lg:flex-row justify-between gap-6">
          <img
            src={assets.svgs.logoIcon}
            alt="logo"
            width={270}
            height={270}
            className="size-[270px] object-contain mx-auto lg:mx-0"
          />

          <h1 className="text-center flex lg:hidden mt-4 mb-6 mx-auto md:px-8">
            Invest in Real Estate, Reinvented.
          </h1>

          <div className="flex items-start md:justify-between flex-wrap gap-[59px]">
            {footerLinks.map((link) => (
              <div
                key={link.label}
                className="flex flex-col gap-4 md:gap-6 md:max-w-[168px] w-full md:w-max">
                <p className="text-lg font-bold">{link.label}</p>

                <ul className="flex flex-col md:gap-2">
                  {link.routes.map((route) => (
                    <li
                      key={route}
                      className="text-sm md:text-[15px] leading-[26.46px] font-light md:font-normal capitalize">
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
        <Wrapper className="flex flex-col lg:flex-row md:items-center justify-center lg:justify-between gap-4">
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

          <div className="w-full lg:w-[268px] flex items-center justify-center lg:justify-end gap-5">
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
