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
      <ProductTabs content={product.content} reviews={reviews} paymentMethods={PaymentMethods} shippingTypes={ShippingTypes} />

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