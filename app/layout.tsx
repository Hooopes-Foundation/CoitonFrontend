import type { Metadata } from "next";

import "@/assets/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontSans, fontSerif } from "@/assets/fonts";
import { siteConfig } from "@/config/site.config";
import { StarknetProvider } from "@/providers/starknet-provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<TPropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={cn(
          "antialiased bg-background flex flex-col flex-1 font-sans",
          fontSans.variable,
          fontSerif.variable
        )}
      >
        <Analytics />
        <StarknetProvider>{children}</StarknetProvider>
      </body>
    </html>
  );
}
