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
import { useRouter, useSearchParams } from "next/navigation";
import { ProductFilterKeys, ProductFilterValues } from "pages-sections/product-details/types";

// ========================================================
type Props = { data: any, handlePage: (number: number) => void };
// ========================================================

export default function ProductsGridView({ data, handlePage }: Props) {
  const itemsPerPage = 9;
  const router = useRouter();
  const searchParams = useSearchParams() || new URLSearchParams();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePage(value)
    updateURL("page", value);
    window.scrollTo({
      top: 0, // Ir al inicio de la página
      behavior: "smooth", // Animación de desplazamiento suave
    });
  };

  const updateURL = (key: ProductFilterKeys, value: ProductFilterValues) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(",")); // Convierte array a string separada por comas
    } else if (typeof value === "string" || typeof value === "number") {
      params.set(key, String(value));
    } else {
      params.delete(key); // Elimina el parámetro si está vacío o es undefined
    }

    router.push(`?${params.toString()}`, { scroll: false }); // Actualiza la URL sin recargar la página
  };

  return (
    <Fragment>
      <Grid container spacing={3} minHeight={'800px'}>
        {data?.products?.map((item: ProductDB) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard16 product={item} />
          </Grid>
        ))}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4} width={'100%'} justifyContent={'space-between'}>
        {data.page ?
          <Span color={themeColors.text.secondary}>Showing {itemsPerPage * (data?.page - 1) + 1}-{Math.min(itemsPerPage * data?.page, data?.count?.total || 0)} of {data?.count?.total || 0} Products</Span>
          : <Grid></Grid>
        }
        <Pagination count={data?.totalPages} page={data.page} onChange={handleChange} color="primary" />
      </FlexBetween>
    </Fragment>
  );
}
