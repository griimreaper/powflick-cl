import { Metadata } from "next";
import { CreateInfluencerPageView } from "pages-sections/vendor-dashboard/influencers/page-view";
import { getOneInfluencer } from "services/Influencers";

export const metadata: Metadata = {
  title: "Influencer Create - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function InfluencersCreate() {
  const { availableProducts }: { availableProducts: { title: string; image: string; price: string; }[] } = await getOneInfluencer('create');

  return <CreateInfluencerPageView availableProducts={availableProducts} />;
}
