"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import Lenis from "lenis";

const queryClient = new QueryClient();

export default function Template({ children }: TPropsWithChildren) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
      {children}
    </QueryClientProvider>
  );
}
