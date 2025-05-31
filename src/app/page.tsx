import ShopLayout1 from "components/layouts/shop-layout-1";
import { DataStructure } from "models/types";
import { Metadata } from "next";
import Fashion2 from "pages-sections/fashion-2/fashion-2";
import { cache } from "react";
import { getLanding } from "services/Landing";

export const revalidate = 3600;
// export const dynamic = 'force-dynamic'

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
    "sportswear", "team uniforms", "custom jerseys", "basketball jerseys", "soccer kits",
    "baseball uniforms", "team apparel", "athletic wear", "sports clothing", "youth uniforms",
    "custom t-shirts", "training jerseys", "team gear", "sports merchandise", "gym wear",
    "fan jerseys", "running shirts", "custom sportswear", "workout clothes", "team outfits",

    // Mid-tail
    "custom team jerseys", "sports apparel for teams", "design your own jersey", "personalized basketball jerseys",
    "custom soccer kits with logo", "buy custom baseball uniforms", "affordable team sportswear", "youth sports uniforms online",
    "bulk order sports jerseys", "high-quality custom jerseys", "fast delivery sportswear", "create custom team uniforms",
    "sportswear for youth teams", "custom printed jerseys", "design sports uniforms online", "team jerseys with names",
    "custom logo sports apparel", "custom training kits", "personalized fan jerseys", "team apparel customization",
    "sports uniforms for schools", "team jersey printing", "order custom sportswear online", "sports team merchandise",
    "custom sports t-shirts", "sports team apparel bulk", "custom running shirts", "buy team jerseys online",
    "custom soccer uniforms with numbers", "personalized baseball jerseys", "custom basketball jerseys with logo",
    "sports team kit design", "custom workout clothes", "order team uniforms online", "affordable sports uniforms",
    "fast custom sports jerseys", "sports apparel design service", "youth basketball uniforms custom", "team apparel for schools",
    "bulk sports team jerseys",

    // Long-tail
    "personalized basketball jerseys for teams", "custom soccer kits with logo and numbers",
    "buy custom baseball uniforms online with fast shipping", "high-quality team sportswear for schools and clubs",
    "affordable custom youth uniforms for sports teams", "quick delivery sports jerseys with personalized names",
    "create your own sports apparel online easy and fast", "bulk team jersey orders for local leagues",
    "custom basketball jerseys with player names and numbers", "design your own soccer uniform with logos and sponsors",
    "buy affordable custom baseball team uniforms in bulk", "fast turnaround custom team jerseys for tournaments",
    "personalized sports jerseys with breathable fabric", "order custom youth sports uniforms with team logo",
    "custom printed soccer kits with custom fonts", "sports team apparel customization for schools and colleges",
    "design basketball uniforms online with custom colors", "bulk order custom baseball jerseys for youth teams",
    "quick custom soccer jerseys with name printing", "affordable personalized basketball jerseys for clubs",
    "high-quality custom team apparel with logos", "custom team sportswear with sponsor logos",
    "fast shipping custom sports uniforms for teams", "design custom basketball jerseys with mesh fabric",
    "personalized youth soccer jerseys with player names", "buy custom baseball jerseys with embroidered logos",
    "bulk custom team uniforms for sports clubs", "quick delivery of custom basketball jerseys online",
    "custom printed soccer uniforms with team branding", "affordable sports apparel for youth teams online",
    "order personalized baseball jerseys for local leagues", "custom basketball uniforms with unique designs",
    "fast production custom soccer kits with printed logos", "personalized sports jerseys with moisture-wicking fabric",
    "bulk order youth basketball jerseys with names and numbers", "custom team apparel design service for schools",
    "buy fast delivery custom sports uniforms online", "design custom baseball jerseys with sponsor patches",
    "affordable custom soccer kits for youth leagues", "personalized team sportswear with custom embroidery"
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
