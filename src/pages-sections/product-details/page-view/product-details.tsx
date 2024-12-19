"use client"
import Container from "@mui/material/Container";
import ProductFilterCard from "../product-filter-card";
// Local CUSTOM COMPONENTS
import ProductTabs from "../product-tabs";
import ProductIntro from "../productIntro/product-intro";
import AvailableShops from "../available-shops";
import RelatedProducts from "../related-products";
import FrequentlyBought from "../frequently-bought";

// CUSTOM DATA MODEL
import { detailProps, ProductDB } from "models/types";


export default function ProductDetailsPageView({ detail }: { detail: detailProps }) {
  const { product, sugestedProducts, frequentlyBought, reviews } = detail;
  console.log("detail", detail);
  
  return (
    <Container className="mt-2 mb-2">
      {/* PRODUCT DETAILS INFO AREA */}
      <ProductIntro product={detail} />

      {/* PRODUCT DESCRIPTION AND REVIEW */}
      <ProductTabs content={product.content} reviews={reviews} productId={product.id} />

      {/* FREQUENTLY BOUGHT PRODUCTS AREA */}
      <FrequentlyBought products={frequentlyBought} />

      {/* AVAILABLE SHOPS AREA */}
      <AvailableShops />
      {/* RELATED PRODUCTS AREA */}
      <RelatedProducts products={sugestedProducts} />
    </Container>
  );
}