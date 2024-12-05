import { Metadata } from "next";
import { ProductCreatePageView } from "pages-sections/vendor-dashboard/products/page-view";
import { getOneProduct } from "services/dashboardAdmin/products";

export const metadata: Metadata = {
  title: "Product Create - SportZone",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductCreate() {
  const { collectionsList, categoriesList } = await getOneProduct('create');

  return <ProductCreatePageView collectionsList={collectionsList} categoriesList={categoriesList}/>;
}
