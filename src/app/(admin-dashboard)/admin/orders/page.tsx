import { Metadata } from "next";
import { OrdersPageView } from "pages-sections/vendor-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Orders - SportZone ",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Orders() {
  const orders = await api.orders();
  return <OrdersPageView orders={orders} />;
}
