import { Collection } from "models/types";
import { Metadata } from "next";
import EditCollectionPageView from "pages-sections/vendor-dashboard/collections/page-view/collection-edit";
import { getOneCollection } from "services/Collections";

export const metadata: Metadata = {
  title: "Edit Collections - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function CollectionEdit({ params }: any) {
  const { collection, availableProducts }: { collection: Collection, availableProducts: string[] } = await getOneCollection(params.id);

  return <EditCollectionPageView collection={collection} availableProducts={availableProducts} />;
}
