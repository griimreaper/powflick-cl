import { Metadata } from "next";
import { PackagePaymentPageView } from "pages-sections/vendor-dashboard/package-payments/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";

export const metadata: Metadata = {
  title: "Package Payments - SportZone",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function PackagePayments() {
  const payments = await api.packagePayments();
  return <PackagePaymentPageView payments={payments} />;
}
