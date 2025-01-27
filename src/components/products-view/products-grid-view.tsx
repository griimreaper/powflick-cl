import { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import ProductCard16 from "components/product-cards/product-card-16";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
import { ProductDB } from "models/types";
import { themeColors } from "theme/theme-colors";

// ========================================================
type Props = { data: any, handlePage: (number: number) => void };
// ========================================================

export default function ProductsGridView({ data, handlePage }: Props) {
  const itemsPerPage = 9;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePage(value)
    window.scrollTo({
      top: 0, // Ir al inicio de la página
      behavior: "smooth", // Animación de desplazamiento suave
    });
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        {data?.products?.map((item: ProductDB) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard16 product={item} />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={6} >
        <Span color={themeColors.text.secondary}>Showing {itemsPerPage * (data?.page - 1) + 1}-{Math.min(itemsPerPage * data?.page, data?.count?.total || 0)} of {data?.count?.total || 0} Products</Span>
        <Pagination count={data?.totalPages} page={data?.page} onChange={handleChange} color="primary" />
      </FlexBetween>
    </Fragment>
  );
}
