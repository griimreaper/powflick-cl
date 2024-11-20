import { Metadata } from "next";
import { BrandsPageView } from "pages-sections/vendor-dashboard/brands/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "",
  description: ``,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: [""]
};

export default async function Brands() {
  const brands = await api.brands();
  return <BrandsPageView brands={brands} />;
}
