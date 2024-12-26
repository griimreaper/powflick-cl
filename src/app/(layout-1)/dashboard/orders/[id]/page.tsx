import { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/customer-dashboard/orders/page-view";
// API FUNCTIONS
import api from "utils/__api__/orders";
// CUSTOM DATA MODEL
import { IdParams } from "models/Common";
import { getOrder } from "services/ThanksForBuying";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Order Details - SportZone ",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function OrderDetails({ params }: IdParams) {
  try {
    // Obtener la sesión del lado del servidor
    const session = await getServerSession();
    let token = session?.user?.name?.split("|")[0];

    const { data: order } = await getOrder(String(params.id), token as string);
    
    return <OrderDetailsPageView order={order} />;
  } catch (error) {
    notFound();
  }
}
