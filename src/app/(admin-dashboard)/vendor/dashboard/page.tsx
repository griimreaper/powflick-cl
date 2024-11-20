import { Metadata } from "next";
import { DashboardPageView } from "pages-sections/vendor-dashboard/dashboard/page-view";

export const metadata: Metadata = {
  title: "Vendor Dashboard - SportZone Next.js E-commerce Template",
  description: `SportZone is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function VendorDashboard() {
  return <DashboardPageView />;
}
