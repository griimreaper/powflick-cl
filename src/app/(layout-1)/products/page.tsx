import { Metadata } from "next";
// PAGE VIEW COMPONENT
import ProductSearchPageView from "pages-sections/product-details/page-view/product-search";
import { getCategories } from "services/Categories";
import { getSearch } from "services/Search";

export const metadata: Metadata = {
  title: "Product Search - Pow Flick",
  description:
    "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
  robots: {
    index: true,
    follow: true
  }
};

export const revalidate = 86400 * 7;

export default async function ProductSearch({ params }: any) {

  return <ProductSearchPageView />;
}
