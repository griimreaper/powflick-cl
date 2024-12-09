import { Metadata } from "next";
import { CreateCategoryPageView } from "pages-sections/vendor-dashboard/categories/page-view";
import { getOneCategory } from "services/Categories";

export const metadata: Metadata = {
  title: "Create Category - SportZone",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function CreateCategory() {
  const { availableProducts }: { availableProducts: string[] } = await getOneCategory('create');

  return <CreateCategoryPageView availableProducts={availableProducts}/>;
}
