import { ReactNode } from "react";
import { Open_Sans } from "next/font/google";
import FloatingWhatsApp from "components/whatsapp/FloatingWhatsApp"; // Ajusta la ruta si es necesario
import Head from "next/head";

export const openSans = Open_Sans({ subsets: ["latin"] });

// IMPORT i18n SUPPORT FILE
import "i18n";
import React from "react";
import "./global.css";
import { GlobalProvider } from "./providers";
import GoogleAnalytics from "./GoogleAnalytics";
import GoogleTagManager from "./GoogleTagManager";
import IntercomChat from "./IntercomChat";
import { getStructuredData } from "./StructuredData";


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const structuredData = getStructuredData();

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

        {structuredData.map((ldJson, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: ldJson }}
          />
        ))}

        <script src="https://cdn.brevo.com/js/sdk-loader.js" async></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Version: 2.0
              window.Brevo = window.Brevo || [];
              Brevo.push([
                "init",
                { client_key: "a7z32zwzfapqugeahtbh5w6i" }
              ]);
            `,
          }}
        />

      </head>
      <body className={openSans.className}>
        <React.StrictMode>
          <GlobalProvider>
            <IntercomChat />
            <FloatingWhatsApp />
            {children}
          </GlobalProvider>
          <GoogleAnalytics />
          <GoogleTagManager />
        </React.StrictMode>
      </body>
    </html>
  );
}
