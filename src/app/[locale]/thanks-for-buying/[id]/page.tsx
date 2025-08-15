import ThanksForBuy from "components/ThanksForBuy/ThanksForBuy";
import type { Metadata } from "next";
import { locales } from "i18n/routing";

type Props = { params: { locale: (typeof locales)[number]; id: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const title = `Invoice - Pow Flick`;
  return {
    title,
    alternates: {
      canonical: `https://www.powflick.com/${locale}/thanks-for-buying`,
      languages: {
        en: "https://www.powflick.com/en/thanks-for-buying",
        es: "https://www.powflick.com/es/thanks-for-buying",
        "x-default": "https://www.powflick.com/en/thanks-for-buying",
      },
    },
    robots: { index: false, follow: false },
  };
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ThanksForBuying({ params }: PageProps) {
  return <ThanksForBuy id={params.id} />
}
