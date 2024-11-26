import { Metadata } from "next";
import { ReviewsPageView } from "pages-sections/vendor-dashboard/reviews/page-view";
// API FUNCTIONS
import api from "utils/__api__/vendor";

export const metadata: Metadata = {
  title: "Reviews - SportZone ",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Reviews() {
  const reviews = await api.getAllProductReviews();
  return <ReviewsPageView reviews={reviews} />;
}
