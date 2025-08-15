import ContactUs from "./ContactUs";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { locales } from "i18n/routing";
import type { Metadata } from "next";

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "Contact" });
    const title = `${t("heading")} - Pow Flick`;
    const description = t("subheading");
    return {
        title,
        description,
        alternates: {
            canonical: `https://www.powflick.com/${locale}/contact`,
            languages: {
                en: "https://www.powflick.com/en/contact",
                es: "https://www.powflick.com/es/contact",
                "x-default": "https://www.powflick.com/en/contact",
            },
        },
        openGraph: { title, description, url: `https://www.powflick.com/${locale}/contact`, type: "website" },
    };
}

export default function Page() {
    return <ContactUs />;
}
