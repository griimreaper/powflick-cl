import { Metadata } from "next";
import { notFound } from "next/navigation";
// API FUNCTIONS
import api from "utils/__api__/shop";
// PAGE VIEW COMPONENT
import { ShopsPageView } from "pages-sections/shops/page-view";

export const metadata: Metadata = {
  title: "Shops - SportZone ",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Shops() {
  try {
    const shops = await api.getShopList();
    return <ShopsPageView shops={shops} />;
  } catch (error) {
    notFound();
  }
}
