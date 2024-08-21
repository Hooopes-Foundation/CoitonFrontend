"use client";

import { useQuery } from "@tanstack/react-query";
import { type LottieComponentProps } from "lottie-react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const LazyLottieComponent = lazy(() => import("lottie-react"));

interface LottieProps<T extends Record<string, unknown>> {
  getAnimationData: () => Promise<T>;
  id: string;
}

export default function LazyLottie<T extends Record<string, unknown>>({
  getAnimationData,
  id,
  ref,
  ...props
}: LottieProps<T> & Omit<LottieComponentProps, "animationData">) {
  const { data } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      void import("lottie-react"); // Trigger the library lazy load even if the animationData is not ready
      return getAnimationData();
    },
    enabled: typeof window !== "undefined",
  });

  if (!data)
    return (
      <Skeleton className={cn(`h-[${props.height}px] w-[${props.width}px]`)} />
    );

  return (
    <Suspense
      fallback={
        <Skeleton
          className={cn(`h-[${props.height}px] w-[${props.width}px]`)}
        />
      }>
      <LazyLottieComponent animationData={data} {...props} />
    </Suspense>
  );
}
