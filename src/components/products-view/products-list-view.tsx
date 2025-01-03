import Pagination from "@mui/material/Pagination";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import FlexBetween from "components/flex-box/flex-between";
import { ProductCard9 } from "components/product-cards/product-card-9";
// CUSTOM DATA MODEL
import Product from "models/Product.model";
import { ProductDB } from "models/types";
import { useState } from "react";

// ==========================================================
type Props = { products: ProductDB[] };
// ==========================================================

export default function ProductsListView({ products }: Props) {
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
    <div>
      {paginatedProducts?.map((item) => (
        <ProductCard9
          id={item.id}
          key={item.id}
          slug={item.slug}
          title={item.title}
          price={item.price}
          off={item.discount}
          discount={item.discount}
          product_categories={item.product_categories}
          rating={0}
          imgUrl={item.URL}
        />
      ))}

      <FlexBetween flexWrap="wrap" mt={4}>
      <Span color="grey.600">Showing {itemsPerPage * (page - 1) + 1}-{Math.min(itemsPerPage * page, products?.length || 0)} of {products?.length || 0} Products</Span>
        <Pagination count={Math.ceil((products?.length || 0) / itemsPerPage)} page={page} onChange={handleChange} variant="outlined" color="primary" />
      </FlexBetween>
    </div>
  );
}
