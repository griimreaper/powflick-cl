import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import FloatingWhatsApp from "components/whatsapp/FloatingWhatsApp"; // Ajusta la ruta si es necesario

export const openSans = Open_Sans({ subsets: ["latin"] });

// IMPORT i18n SUPPORT FILE
import "i18n";
import React from "react";
import "./global.css";
import { GlobalProvider } from "./providers";
import GoogleAnalytics from "./GoogleAnalytics";
import GoogleTagManager from "./GoogleTagManager";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const MemoizedWhatsApp = React.useMemo(() => <FloatingWhatsApp />, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
        <GlobalProvider>
          {MemoizedWhatsApp}
          {children}
        </GlobalProvider>
        <GoogleAnalytics />
        <GoogleTagManager />
      </body>
    </html>
  );
}
