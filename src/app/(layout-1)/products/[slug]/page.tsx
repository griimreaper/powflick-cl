import { Metadata } from "next";
import { notFound } from "next/navigation";
// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
// API FUNCTIONS
import api from "utils/__api__/products";
import {
  getFrequentlyBought,
  getRelatedProducts,
} from "utils/__api__/related-products";

export const metadata: Metadata = {
  title: "Product Details - SportZone ",
  description: "SportZone es una tienda en línea especializada en ropa deportiva de alta calidad. Encuentra camisetas personalizables, uniformes deportivos y accesorios para fútbol, baloncesto, béisbol, hockey, running y más. Diseñada para deportistas y equipos que buscan rendimiento y estilo.",
  authors: [{ name: "devcodelab" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"],
};

export default async function ProductDetails({ params }) {
  try {
    const product = await api.getProduct(params.slug as string);
    const relatedProducts = await getRelatedProducts();
    const frequentlyBought = await getFrequentlyBought();

    return (
      <ProductDetailsPageView
        product={product}
        relatedProducts={relatedProducts}
        frequentlyBought={frequentlyBought}
      />
    );
  } catch (error) {
    notFound();
  }
}
