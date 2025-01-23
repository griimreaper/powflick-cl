import { Metadata } from "next";
import { PayoutSettingsPageView } from "pages-sections/vendor-dashboard/payout-settings/page-view";

export const metadata: Metadata = {
  title: "Payout Settings - Pow Flick",
  description: "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default function PayoutSettings() {
  return <PayoutSettingsPageView />;
}
