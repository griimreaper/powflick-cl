import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'

export const openSans = Open_Sans({ subsets: ["latin"] });

// THEME PROVIDER
import ThemeProvider from "theme/theme-provider";
// PRODUCT CART PROVIDER
import CartProvider from "contexts/CartContext";
// SITE SETTINGS PROVIDER
import SettingsProvider from "contexts/SettingContext";
// GLOBAL CUSTOM COMPONENTS
import RTL from "components/rtl";
import ProgressBar from "components/progress";

// IMPORT i18n SUPPORT FILE
import "i18n";
import { NavbarProvider } from "contexts/NavBarContext";
import { getLanding } from "services/Landing";
import { DataStructure } from "models/types";
import React from "react";

export const revalidate = 86400 * 7;

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { navbar }: DataStructure = await getLanding();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <React.StrictMode>
          <CartProvider>
            <NavbarProvider initialData={navbar}>
              <SettingsProvider>
                <ThemeProvider>
                  <ProgressBar />
                  <RTL>{children}</RTL>
                </ThemeProvider>
              </SettingsProvider>
            </NavbarProvider>
          </CartProvider>
          <GoogleAnalytics gaId="G-XKPD36JXY0" />
        </React.StrictMode>
      </body>
    </html>
  );
}
