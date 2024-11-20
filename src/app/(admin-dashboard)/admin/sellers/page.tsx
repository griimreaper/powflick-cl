import { Metadata } from "next";
import { SellersPageView } from "pages-sections/vendor-dashboard/sellers/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Sellers - SportZone Next.js E-commerce Template",
  description: `SportZone is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Sellers() {
  const sellers = await api.sellers();
  return <SellersPageView sellers={sellers} />;
}
