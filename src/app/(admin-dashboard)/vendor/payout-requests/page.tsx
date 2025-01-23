import { Metadata } from "next";
import { VendorPayoutRequestsPageView } from "pages-sections/vendor-dashboard/v-payout-request/page-view";
// API FUNCTIONS
import api from "utils/__api__/vendor";

export const metadata: Metadata = {
  title: "Payout Requests - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function PayoutRequests() {
  const requests = await api.getAllPayoutRequests();
  return <VendorPayoutRequestsPageView payoutRequests={requests} />;
}
