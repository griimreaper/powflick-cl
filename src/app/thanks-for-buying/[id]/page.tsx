import ThanksForBuy from "components/ThanksForBuy/ThanksForBuy";
import { Metadata } from "next";
// PAGE VIEW COMPONENT

export const metadata: Metadata = {
  title: "Invoice - Pow Flick",
  description:
    "Pow Flick es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
  robots: {
    index: true,
    follow: true
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
