import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
// PAGE VIEW COMPONENT
import ProductSearchPageView from "pages-sections/product-details/page-view/product-search";
import { setStructuredData } from "../../StructuredData";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "Products" });
  return {
    title: t("meta.title"),
    alternates: {
      // Canonical con prefijo de idioma para evitar duplicados
      canonical: `https://www.powflick.com/${params.locale}/products`,
      languages: {
        en: "https://www.powflick.com/en/products",
        es: "https://www.powflick.com/es/products",
        "x-default": "https://www.powflick.com/en/products",
      },
    },
    description: t("meta.description"),
    authors: [{ name: "devcodelab" }],
    keywords: [
      // Short-tail (genéricas)
      "sportswear", "team uniforms", "custom jerseys", "basketball jerseys", "soccer kits",
      "baseball uniforms", "hockey jerseys", "running shirts", "gym apparel", "athletic wear",
      "training gear", "sports clothing", "fan jerseys", "custom t-shirts", "sports merchandise",
      "activewear", "workout gear", "jerseys", "sports gear", "youth uniforms",

      // Mid-tail (más específicas)
      "custom team uniforms", "design your own jersey", "personalized sportswear",
      "custom soccer jerseys", "basketball uniforms for teams", "buy baseball jerseys online",
      "sportswear for teams", "youth sports uniforms", "affordable custom jerseys",
      "premium sports apparel", "fast delivery uniforms", "custom sports shirts",
      "sportswear for clubs", "fan apparel shop", "athletic uniforms for kids",
      "bulk custom teamwear", "custom logo jerseys", "team kits online", "sports apparel for schools",
      "high-performance sportswear",

      // Long-tail (detalladas)
      "buy personalized basketball jerseys for teams", "custom soccer kits with name and number",
      "order custom baseball uniforms with fast shipping", "high-quality sports uniforms for youth teams",
      "design your own sports t-shirts online", "affordable custom running shirts for clubs",
      "quick delivery custom team jerseys", "customizable gym apparel for teams",
      "bulk order custom fan jerseys online", "team uniforms with embroidered logos",
      "custom youth soccer kits with names", "create personalized hockey jerseys online",
      "sportswear shop for school teams", "custom sports jerseys for local leagues",
      "design basketball uniforms with colors and logos", "fast shipping fan apparel",
      "customizable sports tops and shorts", "premium-quality team apparel store",
      "cheap custom sportswear for schools", "order team kits with logos online",

      // Keywords con intención (acción)
      "buy custom sports jerseys", "customize your team uniform", "design jerseys online",
      "shop team sportswear", "personalize sports kits", "get custom basketball uniforms",
      "order team jerseys now", "create your own sports shirt", "purchase fan jerseys online",
      "build your team’s uniform", "buy custom youth uniforms", "custom soccer shirt with logo",
      "shop running apparel for teams", "get fast custom sports clothing", "order sportswear in bulk",
      "shop affordable custom uniforms", "customize performance gear", "design custom fan t-shirts",
      "get your team kitted out", "custom jersey store online",

      // Extras para categorías específicas
      "soccer team apparel", "basketball jersey shop", "hockey gear store", "custom baseball apparel",
      "running team uniforms", "fan merchandise for teams", "training kits with names", "gym team shirts",
      "sports teamwear supplier", "custom shirts for clubs",

      // Branding + nicho
      "Pow Flick sportswear", "Pow Flick custom uniforms", "Pow Flick team jerseys", "buy from Pow Flick",
      "Pow Flick custom team kits", "Pow Flick online store", "Pow Flick fan apparel", "Pow Flick team gear",
      "design with Pow Flick", "Pow Flick sports customization"
    ],
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const revalidate = 86400 * 7;

export default async function ProductSearch({ params }: any) {
  const t = await getTranslations({ locale: params?.locale ?? "en", namespace: "Products" });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Pow Flick",
    "url": "https://www.powflick.com/products",
    "logo": "https://www.powflick.com/logo.png", // Reemplaza con tu logo real si es diferente
    "description": t("meta.description"),
    "image": "https://www.powflick.com/assets/images/landing/dashboard/DASHBOARD_BACKGROUND.png",
    "telephone": "+86 159 2011 0846", // Reemplaza por el tuyo real
    "email": "support@powflick.com", // Opcional si tenés contacto visible
    "currenciesAccepted": "USD",
    "paymentAccepted": "Credit Card, PayPal",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cali",
      "addressCountry": "Colombia"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.powflick.com/products?query={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.instagram.com/powflick/",
      "https://www.pinterest.com/powflick/",
      "https://www.facebook.com/profile.php?id=61572571284039"
    ],
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
  "name": t("breadcrumbs.soccer"),
        "item": "https://www.powflick.com/products?category=Custom+Soccer+Jerseys"
      },
      {
        "@type": "ListItem",
        "position": 2,
  "name": t("breadcrumbs.basketball"),
        "item": "https://www.powflick.com/products?category=Custom+Basketball+Jerseys"
      }
    ]
  };

  setStructuredData([structuredData, breadcrumbStructuredData]);
  return <ProductSearchPageView />;
}
