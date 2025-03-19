import { Metadata } from "next";
import { CreateTagsPageView } from "pages-sections/vendor-dashboard/tags/page-view";
import { getOneCollection } from "services/Collections";

export const metadata: Metadata = {
  title: "Tags Create - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function TagssCreate() {
  const { availableProducts }: { availableProducts: string[] } = await getOneCollection('create');

  return <CreateTagsPageView availableProducts={availableProducts}/>;
}
