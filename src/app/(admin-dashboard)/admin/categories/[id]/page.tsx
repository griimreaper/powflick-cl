import { Category } from "models/types";
import { Metadata } from "next";
import { EditCategoryPageView } from "pages-sections/vendor-dashboard/categories/page-view";
import { getOneCategory } from "services/Categories";

export const metadata: Metadata = {
  title: "Edit Category - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function EditCategory({ params }: any) {
  const { category, availableProducts }: { category: Category, availableProducts: string[] } = await getOneCategory(params.id);

  return <EditCategoryPageView category={category} availableProducts={availableProducts} />;
}
