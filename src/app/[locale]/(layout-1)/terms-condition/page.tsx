import TermsPage from "./Terms";
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from 'i18n/routing';

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'Terms' });
    const title = `${t('title')} - Pow Flick`;

    console.log(title);

    return {
        title,
        description: t('introShort'),
        alternates: {
            canonical: `https://www.powflick.com/${locale}/terms-condition`,
            languages: {
                en: 'https://www.powflick.com/en/terms-condition',
                es: 'https://www.powflick.com/es/terms-condition',
                'x-default': 'https://www.powflick.com/en/terms-condition'
            }
        },
        openGraph: {
            title,
            description: t('introShort'),
            url: `https://www.powflick.com/${locale}/terms-condition`,
            type: 'website'
        }
    };
}

const Page = ({ params: { locale } }: Props) => {
    setRequestLocale(locale);
    return <TermsPage />;
};

export default Page;
