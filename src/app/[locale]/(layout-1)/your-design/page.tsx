import YourDesignClient from "./YourDesignClient";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "i18n/routing";
import type { Metadata } from "next";

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  setRequestLocale(locale);
  // Usamos el texto del menú como título y una descripción general de Home
  const tNav = await getTranslations({ locale, namespace: "Navigation" });
  const tHome = await getTranslations({ locale, namespace: "Home" });
  const title = `${tNav("getFreeDesign")} - Pow Flick`;
  const description = tHome("description");

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.powflick.com/${locale}/your-design`,
      languages: {
        en: "https://www.powflick.com/en/your-design",
        es: "https://www.powflick.com/es/your-design",
        "x-default": "https://www.powflick.com/en/your-design",
      },
    },
    openGraph: { title, description, url: `https://www.powflick.com/${locale}/your-design`, type: "website" },
  };
}

export default function Page() {
  return <YourDesignClient />;
}
