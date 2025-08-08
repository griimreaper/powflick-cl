import { Collection } from "models/types";
import { Metadata } from "next";
import EditCollectionPageView from "pages-sections/vendor-dashboard/collections/page-view/collection-edit";
import { getOneCollection } from "services/Collections";

export const metadata: Metadata = {
  title: "Edit Collections - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function CollectionEdit({ params }: any) {
  const { collection, availableProducts }: { collection: Collection, availableProducts: string[] } = await getOneCollection(params.id);

  return <EditCollectionPageView collection={collection} availableProducts={availableProducts} />;
}
