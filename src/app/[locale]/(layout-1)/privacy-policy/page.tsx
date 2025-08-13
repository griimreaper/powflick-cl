import PrivacyPage from "./Privacy";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from 'i18n/routing';

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props) {
    setRequestLocale(locale);
    let t: any;
    try {
        t = await getTranslations('Privacy');
    } catch {
        t = (key: string) => key;
    }
    const title = `${t('title')} - Pow Flick`;
    const description = t('introShort');
    return {
        title,
        description,
        alternates: {
            canonical: `https://www.powflick.com/${locale}/privacy-policy`,
            languages: {
                en: 'https://www.powflick.com/en/privacy-policy',
                es: 'https://www.powflick.com/es/privacy-policy',
                'x-default': 'https://www.powflick.com/en/privacy-policy'
            }
        },
        openGraph: {
            title,
            description,
            url: `https://www.powflick.com/${locale}/privacy-policy`,
            type: 'website'
        }
    };
}

export default function Page({ params: { locale } }: Props) {
    setRequestLocale(locale);
    return <PrivacyPage />;
}
