import Image from "next/image";
import Wrapper from "./wrapper";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  const routes = ["about", "token", "team", "listings", "blog"];

  return (
    <header className="sticky top-0 left-0 w-full py-6 z-50 backdrop-blur-3xl">
      <Wrapper className={"flex items-center justify-between size-full"}>
        <div className="max-w-44 w-full">
          <Link href="/" className="w-max">
            <Image
              src="/svgs/logo.svg"
              alt="logo"
              width={38}
              height={38}
              priority
              className="object-contain size-[38px]"
            />
          </Link>
        </div>

        <ul className="flex-1 flex items-center justify-center gap-16">
          {routes.map((path) => (
            <li key={path} className="relative group">
              <Link
                href={`/${path}`}
                className="text-lg font-medium text-primary capitalize">
                {path}
              </Link>

              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-lg group-hover:w-[90%] transition-all" />
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end max-w-44 w-full">
          <Button variant={"black"} className="font-medium">
            Get in Touch
          </Button>
        </div>
      </Wrapper>
    </header>
  );
}
