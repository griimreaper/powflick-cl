import { Metadata } from "next";
// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";
import { getCategories } from "services/Categories";
import { getSearch } from "services/Search";

export const metadata: Metadata = {
  title: "Product Search - SportZone Next.js E-commerce Template",
  description: `SportZone is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export const revalidate = 86400 * 7;

export default async function ProductSearch({ params }: any) {
  const { products } = await getSearch();
  const categories = await getCategories();

 

  return (
    <ProductSearchPageView
      data={products}
      querys={params}
      topCategories={categories}
    />
  );
}
