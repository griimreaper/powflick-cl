import { Metadata } from "next";
import { AddressPageView } from "pages-sections/customer-dashboard/address/page-view";
// API FUNCTIONS
import api from "utils/__api__/address";

export const metadata: Metadata = {
  title: "Address - SportZone ",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function Address() {
  const addressList = await api.getAddressList();
  return <AddressPageView addressList={addressList} />;
}
