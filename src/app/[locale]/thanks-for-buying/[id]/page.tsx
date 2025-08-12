import ThanksForBuy from "components/ThanksForBuy/ThanksForBuy";
import { Metadata } from "next";
// PAGE VIEW COMPONENT

export const metadata: Metadata = {
  title: "Invoice - Pow Flick",
  description:
    "Pow Flick is an online store specializing in high-quality sportswear. Find customizable t-shirts, sports uniforms, and accessories for soccer, basketball, baseball, hockey, running, and more. Designed for athletes and teams looking for performance and style.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
  robots: {
    index: false,
    follow: false
  }
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ThanksForBuying({ params }: PageProps) {

  return <ThanksForBuy id={params.id}></ThanksForBuy>
}
