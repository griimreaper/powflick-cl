import { Metadata } from "next";
import { PaymentMethodsPageView } from "pages-sections/customer-dashboard/payment-methods/page-view";

export const metadata: Metadata = {
  title: "Payment Methods - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function PaymentMethods() {
  return <PaymentMethodsPageView />;
}
