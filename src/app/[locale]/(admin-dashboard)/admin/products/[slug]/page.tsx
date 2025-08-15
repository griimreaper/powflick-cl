import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { EditProductPageView } from "pages-sections/vendor-dashboard/products/page-view";
import { getOneProduct } from "services/dashboardAdmin/products";

export const metadata: Metadata = {
  title: "Product - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductEdit({ params }: any) {
  // Obtener la sesión del lado del servidor
  const session = await getServerSession();

  let token = session?.user?.name?.split("|")[0];

  const { product, collectionsList, categoriesList, tagList } = await getOneProduct(params.slug, token as string);

  return <EditProductPageView product={product} collectionsList={collectionsList} categoriesList={categoriesList} tagList={tagList}/>;
}
