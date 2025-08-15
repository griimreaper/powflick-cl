import AboutUs from "./AboutUs";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "i18n/routing";
import type { Metadata } from "next";

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "About" });
    const title = `${t("aboutUs")} - Pow Flick`;
    const description = t("promiseText");
    return {
        title,
        description,
        alternates: {
            canonical: `https://www.powflick.com/${locale}/about-us`,
            languages: {
                en: "https://www.powflick.com/en/about-us",
                es: "https://www.powflick.com/es/about-us",
                "x-default": "https://www.powflick.com/en/about-us",
            },
        },
        openGraph: { title, description, url: `https://www.powflick.com/${locale}/about-us`, type: "website" },
    };
}

export default function Page() {
    return <AboutUs />;
}
