import { Metadata } from "next";
import { EditProductPageView } from "pages-sections/vendor-dashboard/products/page-view";
import { getOneProduct } from "services/dashboardAdmin/products";

export const metadata: Metadata = {
  title: "Product - SportZone",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductEdit({ params }: any) {
  const { product, collectionsList, categoriesList } = await getOneProduct(params.slug);

  return <EditProductPageView product={product} collectionsList={collectionsList} categoriesList={categoriesList} />;
}
