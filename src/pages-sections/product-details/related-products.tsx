"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// GLOBAL CUSTOM COMPONENTS
import { H3 } from "components/Typography";
import ProductCard1 from "components/product-cards/product-card-1";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
import { ProductDB } from "models/types";

// ==============================================================
type Props = { products: ProductDB[] };
// ==============================================================

export default function RelatedProducts({ products }: Props) {
  return (
    <Box mb={7.5}>
      <H3 mb={3}>Related Products</H3>

      <Grid container spacing={3}>
        {products.map((item, ind) => (
          <Grid item lg={3} md={3} xs={6} key={ind}>
            <ProductCard1
              hoverEffect
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              rating={4}
              imgUrl={item.URL}
              discount={item.discount}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
