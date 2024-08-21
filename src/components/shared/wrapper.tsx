import { cn } from "@/lib/utils";

export default function Wrapper({ children, className }: TWrapperProps) {
  return (
    <section className={cn("w-full mx-auto max-w-[1404px] px-5", className)}>
      {children}
    </section>
  );
}
