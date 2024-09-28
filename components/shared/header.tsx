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

export default function Header() {
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

        <ul className="flex-1 hidden md:flex items-center justify-center gap-12 lg:gap-16">
          {routes.map((route: TRoutes) => (
            <li key={route.path} className="relative group">
              <Link
                href={route.path}
                className="text-lg font-medium text-primary capitalize cursor-pointer"
              >
                {route.label}
              </Link>

              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-lg group-hover:w-[90%] transition-all" />
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center justify-end max-w-40 lg:max-w-44 w-full">
          <Link href="/starknet-test">
            <Button variant={"black"} className="font-medium rounded-full">
              Get in Touch
            </Button>
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
                    className="relative group border-border/50 border-b last:border-b-0 p-2 w-full"
                    key={route.path}
                  >
                    <Link href={route.path} className="text-left">
                      <p className="text-lg font-medium text-primary capitalize text-left">
                        {route.label}
                      </p>
                    </Link>
                  </SheetClose>
                ))}
              </SheetHeader>
              <SheetFooter className="mt-auto">
                <SheetClose asChild>
                  <Button variant={"black"} className="font-medium h-12">
                    Get in Touch
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </MaxWrapper>
    </header>
  );
}
