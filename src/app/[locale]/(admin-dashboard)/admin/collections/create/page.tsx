import { Metadata } from "next";
import CreateCollectionPageView from "pages-sections/vendor-dashboard/collections/page-view/collection-create";
import { getOneCollection } from "services/Collections";

export const metadata: Metadata = {
  title: "Collections Create - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function CollectionsCreate() {
  const { availableProducts }: { availableProducts: string[] } = await getOneCollection('create');

  return <CreateCollectionPageView availableProducts={availableProducts}/>;
}
