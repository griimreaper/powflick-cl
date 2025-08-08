import { ReactNode } from "react";
import { openSans } from "theme/fonts";
import FloatingWhatsApp from "components/whatsapp/FloatingWhatsApp"; // Ajusta la ruta si es necesario
import Head from "next/head";

// Fuente global importada desde theme/fonts

// IMPORT i18n SUPPORT FILE (client initializer)
import "i18n/index";
import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "./global.css";
import { GlobalProvider } from "./providers";
import GoogleAnalytics from "./GoogleAnalytics";
import GoogleTagManager from "./GoogleTagManager";
import IntercomChat from "./IntercomChat";
import { getStructuredData } from "./StructuredData";
import MicrosoftClarity from "./MicrosoftClarity";


export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const messages = await getMessages({ locale: params.locale });
  const structuredData = getStructuredData();

  return (
    <html lang={params.locale} suppressHydrationWarning>
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
        <MicrosoftClarity />
      </head>
      <body className={openSans.className}>
        <React.StrictMode>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <GlobalProvider>
              <IntercomChat />
              <FloatingWhatsApp />
              {children}
            </GlobalProvider>
            <GoogleAnalytics />
            <GoogleTagManager />
          </NextIntlClientProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
