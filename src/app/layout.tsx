import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { Instrument_Sans } from "next/font/google";

export const openSans = Instrument_Sans({ subsets: ["latin"] });

// IMPORT i18n SUPPORT FILE
import "i18n";
import { getLanding } from "services/Landing";
import { DataStructure } from "models/types";
import React from "react";
import { GlobalProvider } from "./providers";
import GoogleAnalytics from "./GoogleAnalytics";
import GoogleTagManager from "./GoogleTagManager";

export const revalidate = 86400 * 7;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { navbar }: DataStructure = await getLanding();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <React.StrictMode>
          <GlobalProvider navbar={navbar}>{children}</GlobalProvider>
          <GoogleAnalytics/>
          <GoogleTagManager/>
        </React.StrictMode>
      </body>
    </html>
  );
}
