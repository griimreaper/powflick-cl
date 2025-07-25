"use client"
// Local CUSTOM COMPONENTS
import ProductTabs from "../product-tabs";
import ProductIntro from "../productIntro/product-intro";
import RelatedProducts from "../related-products";

// CUSTOM DATA MODEL
import { detailProps } from "models/types";
import { Box, useMediaQuery } from "@mui/material";
import Section2 from "pages-sections/fashion-2/section-2";
import { useSearchParams } from "next/navigation";
import ProductInfluencerIntro from "../productIntro/product-influencer-intro";

export default function ProductDetailsPageView({ detail }: { detail: detailProps }) {
  const { product, sugestedProducts, frequentlyBought, reviews, PaymentMethods, ShippingTypes } = detail;
  const isMobile = useMediaQuery("(max-width:768px)", { noSsr: true });
  const searchParams = useSearchParams();
  const fromInfluencer = searchParams?.get("fromInfluencer");

  const hasInfluencer = !!detail.product.influencer_id

  return (
    <Box
      p={{ xs: 2, sm: 4, md: 6 }}
      style={{
        overflow: 'hidden',
        background: fromInfluencer ? "white" : "white", // Cambia aquí si quieres otro fondo
        border: fromInfluencer ? "none" : undefined, // Quita borde si viene de influencer
        boxShadow: fromInfluencer ? "none" : undefined, // Quita sombra si viene de influencer
      }}
    >
      {/* PRODUCT DETAILS INFO AREA */}
      {
        hasInfluencer ?
          <ProductInfluencerIntro product={detail} /> :
          <ProductIntro product={detail} />
      }

      {/* PRODUCT DESCRIPTION AND REVIEW */}
      <ProductTabs productPrice={product.price} reviews={reviews} hasInfluencer={hasInfluencer} />

      {/* FREQUENTLY BOUGHT PRODUCTS AREA */}
      {/* <FrequentlyBought products={frequentlyBought} /> */}

      {/* AVAILABLE SHOPS AREA */}
      {/* <AvailableShops /> */}
      {/* RELATED PRODUCTS AREA */}
      {!fromInfluencer && <RelatedProducts products={sugestedProducts} />}
      <Box width={'100%'} position={'relative'} >
        {!fromInfluencer && <Section2 className="section-2-detail" isMobile={isMobile} detail />}
      </Box>
    </Box>
  );
}