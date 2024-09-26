import { cn } from "@/lib/utils";

export default function MaxWrapper({ children, className }: TMaxWrapper) {
  return (
    <section
      className={cn("w-full mx-auto max-w-[1404px] px-4 sm:px-5", className)}
    >
      {children}
    </section>
  );
}
