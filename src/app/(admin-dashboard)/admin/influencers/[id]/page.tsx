import { Influencer } from "models/types";
import { Metadata } from "next";
import EditInfluencerPageView from "pages-sections/vendor-dashboard/influencers/page-view/influencer-edit";
import { getOneInfluencer } from "services/Influencers";

export const metadata: Metadata = {
  title: "Edit influencer - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function CollectionEdit({ params }: any) {
  const { influencer, availableProducts }: { influencer: Influencer, availableProducts: { title: string, image: string, price: string }[] } = await getOneInfluencer(params.id);

  return <EditInfluencerPageView influencer={influencer} availableProducts={availableProducts} />;
}
