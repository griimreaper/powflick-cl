import Faqs from "./Help";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "i18n/routing";
import type { Metadata } from "next";

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Faq" });
    const title = `${t("heroTitle")} - Pow Flick`;
    const description = t("heroSubtitle");
    return {
        title,
        description,
        alternates: {
            canonical: `https://www.powflick.com/${locale}/help`,
            languages: {
                en: "https://www.powflick.com/en/help",
                es: "https://www.powflick.com/es/help",
                "x-default": "https://www.powflick.com/en/help",
            },
        },
        openGraph: { title, description, url: `https://www.powflick.com/${locale}/help`, type: "website" },
    };
}

export default function Page() {
    return <Faqs />;
}
