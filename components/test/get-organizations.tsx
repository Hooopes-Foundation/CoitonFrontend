"use client";

import { useOrganizations } from "@/hooks/organizations";
import { cn } from "@/lib/utils";

export default function GetOrganizations({
  address,
}: {
  address: string | undefined | null;
}) {
  const { fetchOrganizations } = useOrganizations();

  const tx = fetchOrganizations();

  return (
    <div className="space-y-1 w-full">
      <p className="text-base font-bold uppercase">All Organizations</p>
      <div
        className={cn(
          "p-4 border border-primary bg-primary/10 rounded-sm flex flex-col gap-2 overflow-scroll",
          {
            "border-blue-700 bg-blue-500/20": tx?.fetchStatus === "fetching",
            "border-yellow-700 bg-yellow-500/20": tx?.fetchStatus === "paused",
            "border-red-500 bg-red-500/20": tx?.isError,
            "pointer-events-none select-none opacity-50 border-border bg-secondary":
              !address,
          }
        )}
      >
        <div className="flex gap-2">
          <pre
            className={cn("font-sans text-primary text-sm font-semibold", {
              "text-blue-700": tx?.fetchStatus === "fetching",
              "text-yellow-700": tx?.fetchStatus === "paused",
              "text-red-500": tx?.isError,
              "text-foreground": !address,
            })}
          >
            {JSON.stringify(tx, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
