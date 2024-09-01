import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { assets } from "@/assets";
import { FiMenu } from "react-icons/fi";
import Wrapper from "../shared/wrapper";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const routes = ["about", "token", "team", "listings", "blog"];

export default function Header() {
  return (
    <header className="sticky top-0 left-0 w-full py-4 md:py-6 z-50 backdrop-blur-3xl">
      <Wrapper className={"flex items-center justify-between size-full"}>
        <div className="w-44">
          <Link to="/" className="w-fit">
            <img
              src={assets.svgs.logoIcon}
              alt="logo"
              width={38}
              height={38}
              className="object-contain size-[38px]"
            />
          </Link>
        </div>

        <ul className="flex-1 hidden md:flex items-center justify-center gap-12 lg:gap-16">
          {routes.map((path) => (
            <li key={path} className="relative group">
              <p className="text-lg font-medium text-primary capitalize cursor=pointer">
                {path}
              </p>
              {/* <Link
                to={`/${path}`}
                className="text-lg font-medium text-primary capitalize">
                {path}
              </Link> */}

              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-lg group-hover:w-[90%] transition-all" />
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center justify-end max-w-40 lg:max-w-44 w-full">
          <Button variant={"black"} className="font-medium">
            Get in Touch
          </Button>
        </div>

        <div className="flex md:hidden">
          <MobileNav />
        </div>
      </Wrapper>
    </header>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FiMenu className="size-7 cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="mt-12">
          {routes.map((path) => (
            <div key={path}>
              <SheetClose className="relative group border-border/50 border-b last:border-b-0 py-2">
                <p className="text-lg font-medium text-primary capitalize">
                  {path}
                </p>
              </SheetClose>
            </div>
            // <Link to={`/${path}`} key={path}>
            //   <SheetClose className="relative group border-border/50 border-b last:border-b-0 py-2">
            //     <p className="text-lg font-medium text-primary capitalize">
            //       {path}
            //     </p>

            //     <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-lg group-hover:w-[90%] transition-all" />
            //   </SheetClose>
            // </Link>
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
  );
}
