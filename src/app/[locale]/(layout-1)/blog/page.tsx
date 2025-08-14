import * as React from "react";
import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import MainContent from "./components/MainContent";
import Latest from "./components/Latest";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "i18n/routing";

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  setRequestLocale(locale);
  // No tenemos namespace Blog; usa Navigation.pages -> FAQ as reference? Mejor simple literal localizable desde messages if added más tarde
  const title = `Blog - Pow Flick`;
  return {
    title,
    alternates: {
      canonical: `https://www.powflick.com/${locale}/blog`,
      languages: {
        en: "https://www.powflick.com/en/blog",
        es: "https://www.powflick.com/es/blog",
        "x-default": "https://www.powflick.com/en/blog",
      },
    },
    openGraph: { title, url: `https://www.powflick.com/${locale}/blog`, type: "website" },
  };
}

export default function Blog() {
  return (
    <>
      <CssBaseline enableColorScheme />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
    </>
  );
}
