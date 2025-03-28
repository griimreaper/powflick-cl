import ShopLayout1 from "components/layouts/shop-layout-1";
import { DataStructure } from "models/types";
import { Metadata } from "next";
import Fashion2 from "pages-sections/fashion-2/fashion-2";
import { cache } from "react";
import { getLanding } from "services/Landing";

export const revalidate = 3600;
export const dynamic = 'force-dynamic'

const getLandingCached = cache(async (): Promise<DataStructure> => {
  try {
    return await getLanding();
  } catch (error) {
    console.error("Error fetching landing data:", error);
    throw new Error("Failed to fetch landing data.");
  }
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL as string),
  title: "Pow Flick",
  alternates: {
    canonical: "https://www.powflick.com/", // 🔹 URL CANÓNICA PRINCIPAL
  },
  description: `Pow Flick is a modern e-commerce for selling sports equipment and accessories.`,
  authors: [{ name: "Devcodelab", url: "https://ui-lib.com" }],
  keywords: [
    "custom sportswear",
    "personalized sports jerseys",
    "custom basketball jerseys",
    "soccer uniforms for teams",
    "personalized running shirts",
    "design your own jerseys",
    "buy custom sportswear online",
    "custom baseball uniforms",
    "customizable team apparel",
    "premium sportswear for teams",
    "custom hockey jerseys",
    "create your own sportswear",
    "personalized activewear",
    "custom athletic wear",
    "sports uniforms for teams",
    "custom soccer kits",
    "basketball jerseys for sale",
    "running apparel for men",
    "women's custom sportswear",
    "youth team uniforms",
    "affordable custom jerseys",
    "unique sportswear designs",
    "premium team uniforms",
    "sports team apparel customization",
    "bulk custom jersey orders",
    "personalized sports apparel",
    "high-quality sports uniforms",
    "team jerseys for customization",
    "custom sports tops",
    "quick sportswear customization",
    "buy personalized team jerseys",
    "best custom jerseys for sports",
    "online sportswear shop",
    "create custom team shirts",
    "team uniforms with logos",
    "custom sports shirts online",
    "durable sports team jerseys",
    "men's custom activewear",
    "custom football kits",
    "lightweight running jerseys",
    "team hoodies customization",
    "custom workout apparel",
    "bulk sports jerseys orders",
    "printed team jerseys",
    "affordable sports uniforms",
    "stylish custom sportswear",
    "sportswear for all sports",
    "custom team hoodies",
    "custom youth sportswear",
    "quick team apparel orders",
  ],
  other: {
    "google-site-verification": "gLeGcx6wTsSNO3gfrikN4xd4gC0uCQcNlvafGlX5DQM",
  },
};

export default async function FashionShopTwo() {
  const [data]: [DataStructure] = await Promise.all([
    getLandingCached(),
  ]);

  return (
    <ShopLayout1 landing>
      <Fashion2 data={data} />
    </ShopLayout1>
  );
}
