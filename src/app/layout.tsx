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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pow Flick",
    "url": "https://www.powflick.com/",
    "description": "Buy custom sports jerseys for soccer, basketball, baseball, and more. High-quality teamwear with fast delivery and easy online customization.",
    "publisher": {
      "@type": "Organization",
      "name": "Pow Flick",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.powflick.com/assets/images/logo/POWFLICK_LOGO-HEADER.png"
      }
    },
    "sameAs": [
      "https://www.instagram.com/powflick",
      "https://www.facebook.com/powflick",
      "https://www.twitter.com/powflick"
    ]
  };

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData || JSON.stringify(jsonLd) }}
        />

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
