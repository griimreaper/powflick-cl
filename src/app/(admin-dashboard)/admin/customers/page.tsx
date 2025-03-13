import { Metadata } from "next";
import { CustomersPageView } from "pages-sections/vendor-dashboard/customers/page-view";
import { getUsers } from "services/dashboardAdmin/users";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Customers - Pow Flick",
  description:
    "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Customers() {

  return <CustomersPageView />;
}
