import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddressDetailsPageView } from "pages-sections/customer-dashboard/address/page-view";
// CUSTOM DATA MODEL
import { IdParams } from "models/Common";

export const metadata: Metadata = {
  title: "Address - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Address({ params }: IdParams) {
  try {
    return <AddressDetailsPageView id={params.id}/>;
  } catch (error) {
    notFound();
  }
}
