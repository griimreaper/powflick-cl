import { Category } from "models/types";
import { Metadata } from "next";
import { EditCategoryPageView } from "pages-sections/vendor-dashboard/categories/page-view";
import { getOneCategory } from "services/Categories";

export const metadata: Metadata = {
  title: "Edit Category - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function EditCategory({ params }: any) {
  const { category, availableProducts }: { category: Category, availableProducts: string[] } = await getOneCategory(params.id);

  return <EditCategoryPageView category={category} availableProducts={availableProducts} />;
}
