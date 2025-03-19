import { Metadata } from "next";
// PAGE VIEW COMPONENT
import ProductSearchPageView from "pages-sections/product-details/page-view/product-search";
import { getCategories } from "services/Categories";
import { getSearch } from "services/Search";

export const metadata: Metadata = {
  title: "Product Search - Pow Flick",
  alternates: {
    canonical: "https://www.powflick.com/products", // 🔹 URL CANÓNICA STORE
  },
  description:
    "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
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
