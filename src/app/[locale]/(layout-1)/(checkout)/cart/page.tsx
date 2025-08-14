import { Metadata } from "next";
import { CartPageView } from "pages-sections/cart/page-view";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Cart" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: ["cart", "checkout", "sports uniforms"],
  };
}

export default function Cart() {
  return <CartPageView />;
}
