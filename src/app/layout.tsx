import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({ subsets: ["latin"] });

// IMPORT i18n SUPPORT FILE
import "i18n";
import { getLanding } from "services/Landing";
import { DataStructure } from "models/types";
import React from "react";
import "./global.css";
import { GlobalProvider } from "./providers";
import GoogleAnalytics from "./GoogleAnalytics";
import GoogleTagManager from "./GoogleTagManager";
import { GlobalStyles } from "@mui/material";

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
        <GlobalStyles
            styles={{
              "*::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
              },
              "*::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "4px",
              },
              "*::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
              "*::-webkit-scrollbar-track": {
                backgroundColor: "#f0f0f0",
              },
            }}
          />
          <GlobalProvider navbar={navbar}>{children}</GlobalProvider>
          <GoogleAnalytics />
          <GoogleTagManager />
        </React.StrictMode>
      </body>
    </html>
  );
}
