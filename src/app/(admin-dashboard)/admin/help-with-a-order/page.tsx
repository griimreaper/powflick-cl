import { ContactType } from "models/types";
import { Metadata } from "next";
import { MessagesPageView } from "pages-sections/vendor-dashboard/messages/page-view";

export const metadata: Metadata = {
  title: "Messages - Help With A Order - Pow Flick",
  description: "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ComplaintOrClaim() {
  return <MessagesPageView type={ContactType.OrderHelp}/>;
}
