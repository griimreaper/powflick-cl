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
import IntercomChat from "./IntercomChat";
import FacebookPixel from "./FacebookPixel";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Precargar la fuente GYMER */}
        <link
          rel="preload"
          href="/fonts/GYMER/GYMER.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GYMER/GYMER.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className={openSans.className}>
        <React.StrictMode>
          <GlobalProvider>
            <IntercomChat />
            <FloatingWhatsApp />
            <FacebookPixel />
            {children}
          </GlobalProvider>
          <GoogleAnalytics />
          <GoogleTagManager />
        </React.StrictMode>
      </body>
    </html>
  );
}
