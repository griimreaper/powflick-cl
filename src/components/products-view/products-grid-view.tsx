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

// ========================================================
type Props = { products: ProductDB[] };
// ========================================================

export default function ProductsGridView({ products }: Props) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({
      top: 0, // Ir al inicio de la página
      behavior: "smooth", // Animación de desplazamiento suave
    });
  };
  const paginatedProducts = products?.slice((page - 1) * itemsPerPage, page * itemsPerPage) || [];

  return (
    <Fragment>
      <Grid container spacing={3}>
        {paginatedProducts.map((item: ProductDB) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard16 product={item} />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={6}>
        <Span color="grey.600">Showing {itemsPerPage * (page - 1) + 1}-{Math.min(itemsPerPage * page, products?.length || 0)} of {products?.length || 0} Products</Span>
        <Pagination count={Math.ceil((products?.length || 0) / itemsPerPage)} page={page} onChange={handleChange} variant="outlined" color="primary" />
      </FlexBetween>
    </Fragment>
  );
}
