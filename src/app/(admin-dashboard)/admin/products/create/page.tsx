import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { ProductCreatePageView } from "pages-sections/vendor-dashboard/products/page-view";
import { getOneProduct } from "services/dashboardAdmin/products";

export const metadata: Metadata = {
  title: "Product Create - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductCreate() {
  const session = await getServerSession();

  let token = session?.user?.name?.split("|")[0];

  const { collectionsList, categoriesList, tagList } = await getOneProduct('create', token as string);

  return <ProductCreatePageView collectionsList={collectionsList} categoriesList={categoriesList} tagList={tagList}/>;
}
