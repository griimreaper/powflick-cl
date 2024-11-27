"use client"
import Container from "@mui/material/Container";
import ProductFilterCard from "../product-filter-card";
// Local CUSTOM COMPONENTS
import ProductTabs from "../product-tabs";
import ProductIntro from "../product-intro";
import AvailableShops from "../available-shops";
import RelatedProducts from "../related-products";
import FrequentlyBought from "../frequently-bought";

// CUSTOM DATA MODEL
import Product from "models/Product.model";
import { useState } from "react";
import { ProductFilterKeys, ProductFilterValues } from "../types";

// ==============================================================
interface Props {
  product: Product;
  relatedProducts: Product[];
  frequentlyBought: Product[];
}
// ==============================================================

export default function ProductDetailsPageView(props: Props) {
  const [filteredProducts, setFilteredProducts] = useState(
    props.relatedProducts
  );

  const handleFilterChange = (
    key: ProductFilterKeys,
    values: ProductFilterValues
  ) => {
    if (key === "category" && Array.isArray(values)) {
      const filtered = props.relatedProducts.filter((product) =>
        (values as number[]).some((value) =>
          product.product_categories.includes(value.toString())
        )
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <Container className="mt-2 mb-2">
      {/* PRODUCT FILTER AREA */}
      <ProductFilterCard
        topCategories={props.relatedProducts.map((product) => ({
          id: product.id,
          name: product.product_categories,
        }))}
        changeFilters={handleFilterChange}
      />
      {/* PRODUCT DETAILS INFO AREA */}
      <ProductIntro product={props.product} />
      {/* PRODUCT DESCRIPTION AND REVIEW */}
      <ProductTabs />
      {/* FREQUENTLY BOUGHT PRODUCTS AREA */}
      <FrequentlyBought products={props.frequentlyBought} />
      {/* AVAILABLE SHOPS AREA */}
      <AvailableShops />
      {/* RELATED PRODUCTS AREA */}
      <RelatedProducts products={filteredProducts} />
    </Container>
  );
}