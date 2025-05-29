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
  metadataBase: new URL(process.env.NEXTAUTH_URL as string),
  title: "Custom Sports Jerseys & Teamwear | Pow Flick",
  alternates: {
    canonical: "https://www.powflick.com/",
  },
  description: "Buy custom sports jerseys and team apparel for soccer, basketball, baseball, and more. Design your own uniforms with Pow Flick — fast, premium & affordable.",
  authors: [{ name: "Devcodelab", url: "https://ui-lib.com" }],
  keywords: [
    // Short-tail
    "sportswear", "team uniforms", "custom jerseys",
    // Mid-tail
    "custom team jerseys", "sports apparel for teams", "design your own jersey",
    // Long-tail
    "personalized basketball jerseys for teams", "custom soccer kits with logo", "buy custom baseball uniforms online", 
    "high-quality team sportswear", "affordable custom youth uniforms", 
    "quick delivery sports jerseys", "create your own sports apparel", "bulk team jersey orders"
  ],
  openGraph: {
    title: "Custom Sports Jerseys & Teamwear | Pow Flick",
    description: "Design and order personalized sports jerseys online. Perfect for soccer, basketball, baseball, and more. Fast delivery and top quality.",
    url: "https://www.powflick.com/",
    siteName: "Pow Flick",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/images/landing/dashboard/DASHBOARD_BACKGROUND.png", // Asegúrate de tener esta imagen optimizada
        width: 1200,
        height: 630,
        alt: "Custom sports jerseys from Pow Flick",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Sports Jerseys & Teamwear | Pow Flick",
    description: "Buy and customize team sports jerseys with Pow Flick. Quick delivery, premium quality.",
    images: ["/assets/images/landing/dashboard/DASHBOARD_BACKGROUND.png"],
  },
  other: {
    "google-site-verification": "gLeGcx6wTsSNO3gfrikN4xd4gC0uCQcNlvafGlX5DQM",
    "facebook-domain-verification": "l9qelbgya7lketq6r71amsfwdpjq0k"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
