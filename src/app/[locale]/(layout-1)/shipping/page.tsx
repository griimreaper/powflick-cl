import React, { FC } from 'react'
import Shipping from './Shipping';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from 'i18n/routing';

type Props = { params: { locale: (typeof locales)[number] } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Shipping' });
  const title = `${t('title')} - Pow Flick`;
  return {
    title,
    description: t('fastReliableBody'),
    alternates: {
      canonical: `https://www.powflick.com/${locale}/shipping`,
      languages: {
        en: 'https://www.powflick.com/en/shipping',
        es: 'https://www.powflick.com/es/shipping',
        'x-default': 'https://www.powflick.com/en/shipping'
      }
    },
    openGraph: {
      title,
      description: t('fastReliableBody'),
      url: `https://www.powflick.com/${locale}/shipping`,
      type: 'website'
    }
  };
}

const Page: FC<Props> = ({ params: { locale } }) => {
  setRequestLocale(locale);
  return <Shipping />;
};

export default Page;