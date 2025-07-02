"use client"
// Local CUSTOM COMPONENTS
import ProductTabs from "../product-tabs";
import ProductIntro from "../productIntro/product-intro";
import RelatedProducts from "../related-products";

// CUSTOM DATA MODEL
import { detailProps } from "models/types";
import { Box, useMediaQuery } from "@mui/material";
import Section2 from "pages-sections/fashion-2/section-2";

export default function ProductDetailsPageView({ detail }: { detail: detailProps }) {
  const { product, sugestedProducts, frequentlyBought, reviews, PaymentMethods, ShippingTypes } = detail;
  const isMobile = useMediaQuery("(max-width:768px)", { noSsr: true });

  return (
    <Box p={{ xs: 2, sm: 4, md: 6 }} style={{ overflow: 'hidden', background: "white" }}>
      {/* PRODUCT DETAILS INFO AREA */}
      <ProductIntro product={detail} />

      {/* PRODUCT DESCRIPTION AND REVIEW */}
      <ProductTabs productPrice={product.price} reviews={reviews}/>

      {/* FREQUENTLY BOUGHT PRODUCTS AREA */}
      {/* <FrequentlyBought products={frequentlyBought} /> */}

      {/* AVAILABLE SHOPS AREA */}
      {/* <AvailableShops /> */}
      {/* RELATED PRODUCTS AREA */}
      <RelatedProducts products={sugestedProducts} />
      <Box width={'100%'} position={'relative'} >
        <Section2 className="section-2-detail" isMobile={isMobile} detail />
      </Box>
    </Box>
  );
}