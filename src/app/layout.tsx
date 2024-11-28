import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'

export const openSans = Open_Sans({ subsets: ["latin"] });

// IMPORT i18n SUPPORT FILE
import "i18n";
import { getLanding } from "services/Landing";
import { DataStructure } from "models/types";
import React from "react";
import { GlobalProvider } from "./providers";

export const revalidate = 86400 * 7;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { navbar }: DataStructure = await getLanding();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <React.StrictMode>
          <GlobalProvider navbar={navbar}>
            {children}
          </GlobalProvider>
          <GoogleAnalytics gaId="G-XKPD36JXY0" />
        </React.StrictMode>
      </body>
    </html>
  );
}
