import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({ subsets: ["latin"] });

// IMPORT i18n SUPPORT FILE
import "i18n";
import React from "react";
import "./global.css";
import { GlobalProvider } from "./providers";
import GoogleAnalytics from "./GoogleAnalytics";
import GoogleTagManager from "./GoogleTagManager";
import { GlobalStyles } from "@mui/material";
import { primary } from "theme/theme-colors";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
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
                backgroundColor: primary.main,
              },
              "*::-webkit-scrollbar-thumb:hover": {
                backgroundColor: primary.main,
              },
              "*::-webkit-scrollbar-track": {
                backgroundColor: "#1A1A1A",
              },
            }}
          />
          <GlobalProvider>{children}</GlobalProvider>
          <GoogleAnalytics />
          <GoogleTagManager />
        </React.StrictMode>
      </body>
    </html>
  );
}
