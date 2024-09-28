"use client";

import Link from "next/link";
import MaxWrapper from "./max-wrapper";
import { assets } from "@/assets";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FiMenu } from "react-icons/fi";
import { routes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import CustomButton from "./custom-button";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 left-0 w-full py-4 md:py-6 z-50 backdrop-blur-3xl">
      <MaxWrapper className="flex items-center justify-between size-full">
        <div className="w-44">
          <Link href="/" className="size-[38px]">
            <Image
              src={assets.svgs.logoIcon}
              alt="logo"
              width={38}
              height={38}
              priority
              quality={1000}
              className="object-contain size-[38px]"
            />
          </Link>
        </div>

        <ul className="flex-1 hidden md:flex items-center justify-center gap-10 lg:gap-12">
          {routes.map((route: TRoutes) => {
            const isActive = pathname === route.path;

            return (
              <li key={route.path} className="relative group">
                <Link
                  href={route.path}
                  className="text-lg font-medium text-primary capitalize cursor-pointer leading-none px-2"
                >
                  {route.label}
                </Link>

                <span
                  className={cn(
                    "absolute -bottom-1 -translate-x-1/2 size-1 bg-primary rounded-lg transition-all duration-300",
                    {
                      "left-0 opacity-0 group-hover:left-1/2 group-hover:opacity-100":
                        !isActive,
                      "left-1/2 opacity-100": isActive,
                    }
                  )}
                />
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center justify-end max-w-40 lg:max-w-44 w-full">
          <Link href="/starknet-test">
            <CustomButton
              variant={"black"}
              className="font-medium rounded-full"
            >
              Get in Touch
            </CustomButton>
          </Link>
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <FiMenu className="size-7 cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
              <SheetHeader className="mt-12">
                {routes.map((route: TRoutes) => (
                  <SheetClose
                    className="relative group border-border/50 border-b last:border-b-0 px-2 py-3 w-full text-left outline-none focus:outline-none"
                    key={route.path}
                    onClick={() => router.push(route.path)}
                  >
                    <p className="text-lg font-medium text-primary capitalize text-left">
                      {route.label}
                    </p>
                  </SheetClose>
                ))}
              </SheetHeader>
              <SheetFooter className="mt-auto">
                <SheetClose asChild>
                  <CustomButton variant={"black"} className="font-medium h-12">
                    Get in Touch
                  </CustomButton>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </MaxWrapper>
    </header>
  );
}
