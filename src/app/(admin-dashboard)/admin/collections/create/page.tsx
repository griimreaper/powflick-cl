import { Metadata } from "next";
import CreateCollectionPageView from "pages-sections/vendor-dashboard/collections/page-view/collection-create";
import { getOneCollection } from "services/Collections";

export const metadata: Metadata = {
  title: "Collections Create - SportZone",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function CollectionsCreate() {
  const { availableProducts }: { availableProducts: string[] } = await getOneCollection('create');

  return <CreateCollectionPageView availableProducts={availableProducts}/>;
}
