import { Metadata } from "next";
import DashboardPageView from "pages-sections/vendor-dashboard/dashboard/page-view/dashboard";

export const metadata: Metadata = {
    title: "Vendor Dashboard - Pow Flick",
    description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
    authors: [{ name: "devcodelab" }],
    keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function VendorDashboard() {
    return <DashboardPageView />;
}
