import { Tags } from "models/types";
import { Metadata } from "next";
import EditTagPageView from "pages-sections/vendor-dashboard/tags/page-view/tag-edit";
import { getOneTags } from "services/Tags";

export const metadata: Metadata = {
  title: "Edit Tag - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function CollectionEdit({ params }: any) {
  const { tag, availableProducts }: { tag: Tags, availableProducts: string[] } = await getOneTags(params.id);

  return <EditTagPageView tag={tag} availableProducts={availableProducts} />;
}
