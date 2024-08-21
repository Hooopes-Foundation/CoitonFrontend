"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import TanstackProvider from "@/providers/tanstack";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <TanstackProvider>{children}</TanstackProvider>;
}
