"use client";

import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { notFound, usePathname } from "next/navigation";

export default function PublicLayout({ children }: TParentLayout) {
  const pathname = usePathname();

  if (!pathname) {
    notFound();
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="absolute -z-10 top-0 left-0 bg-gradient-to-b from-[#FFF4DE] via-[#FFF4DE]/50 to-background min-h-screen w-full" />
      <Header />
      <main className="flex flex-1">{children}</main>
      <Footer />
    </div>
  );
}
