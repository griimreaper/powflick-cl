"use client";

import { useCallback, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
// MUI ICON COMPONENTS
import Apps from "@mui/icons-material/Apps";
import ViewList from "@mui/icons-material/ViewList";
import FilterList from "@mui/icons-material/FilterList";
// Local CUSTOM COMPONENT
import ProductFilterCard from "../product-filter-card";
// GLOBAL CUSTOM COMPONENTS
import Sidenav from "components/side-nav";
import { H5, Paragraph } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductsGridView from "components/products-view/products-grid-view";
import ProductsListView from "components/products-view/products-list-view";
// PRODUCT DATA
import productDatabase from "data/product-database";
// TYPE
import {
  ProductFilterKeys,
  ProductFilterValues,
  ProductFilters,
} from "../types";
import Product from "models/Product.model";
import { useRouter, useSearchParams } from "next/navigation";
import { useNavbar } from "contexts/NavBarContext";
import { ProductDB } from "models/types";
import Breadcrumbs from "./Breadcrumbs";

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Date", value: "date" },
  { label: "Price Low to High", value: "asc" },
  { label: "Price High to Low", value: "desc" },
];

const initialFilters = {
  rating: 0,
  color: [],
  brand: [],
  sales: [],
  price: [0, 300],
  category: [],
  collection: [],
  search: "",
};

const handleSortProducts = (
  products: ProductDB[],
  sortBy: string,
  filters: ProductFilters
) => {
  const filteredProducts = products.filter((product) => {
    const isInPriceRange =
      product.price >= filters.price[0] && product.price <= filters.price[1];
    const matchesColor =
      filters.color.length === 0 ||
      filters.color.some((color) => product.colors?.includes(color) ?? false);
    const matchesSearch =
      !filters.search ||
      product.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory =
      filters.category.length === 0 ||
      filters.category.some((category) =>
        product.product_categories.includes(category)
      );
    const matchesCollection =
      filters.collection.length === 0 ||
      product.title.includes(filters.collection[0]);

    return isInPriceRange && matchesColor && matchesSearch && matchesCategory && matchesCollection;
  });

  switch (sortBy) {
    case "date":
      return filteredProducts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    case "asc":
      return filteredProducts.sort((a, b) => a.price - b.price);
    case "desc":
      return filteredProducts.sort((a, b) => b.price - a.price);
    default:
      return filteredProducts;
  }
};

export default function ProductSearchPageView({ data }: any) {
  const { navbarData } = useNavbar();
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState<ProductFilters>({ ...initialFilters });
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const searchParams = useSearchParams();

  useEffect(() => {
    const newFilters: any = { ...initialFilters };

    if (searchParams.get("query")) newFilters.search = searchParams.get("query") || "";
    if (searchParams.get("category")) newFilters.category = [searchParams.get("category")];
    if (searchParams.get("collection")) newFilters.collection = [searchParams.get("collection")];
    if (searchParams.get("color")) newFilters.color = [searchParams.get("color")];
    if (searchParams.get("minPrice")) newFilters.price[0] = parseInt(searchParams.get("minPrice") || "0", 10);
    if (searchParams.get("maxPrice")) newFilters.price[1] = parseInt(searchParams.get("maxPrice") || "300", 10);
    if (searchParams.get("rating")) newFilters.rating = parseInt(searchParams.get("rating") || "0", 10);

    setFilters(newFilters);
  }, [searchParams]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(filters.category[0] ? [{ label: filters.category[0], href: `/products?category=${filters.category[0]}` }] : []),
    ...(filters.collection[0] ? [{ label: `${filters.collection}`, href: `/products?collection=${filters.collection}` }] : []),
    ...(filters.color[0] ? [{ label: `${filters.color[0]}`, href: `/products?color=${filters.color[0]}` }] : []),
    ...(filters.search ? [{ label: `Search: ${filters.search}` }] : []),
  ];

  console.log(breadcrumbs);
  console.log(filters);


  const handleChangeFilters = (
    key: ProductFilterKeys,
    values: ProductFilterValues
  ) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const handleChangeSortBy = useCallback((v: string) => setSortBy(v), []);

  const toggleView = useCallback((v: string) => () => setView(v), []);

  const sortedProducts = handleSortProducts(data, sortBy, filters);

  return (
    <div className="bg-white pt-2 pb-4">
      <Container>
        {/* Breadcrumbs */}
        <Box mb={2}>
          <Breadcrumbs items={breadcrumbs} />
        </Box>

        {/* FILTER ACTION AREA */}
        <FlexBetween flexWrap="wrap" gap={2} mb={2}>
          <div>
            {filters.search &&
              <H5 lineHeight={1} mb={1}>
                Searching for “ {filters?.search} ”
              </H5>
            }
            <Paragraph color="grey.600">
              {sortedProducts.length} results found
            </Paragraph>
          </div>

          <FlexBox alignItems="center" columnGap={4} flexWrap="wrap">
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Sort by:
              </Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                value={sortBy}
                variant="outlined"
                placeholder="Sort by"
                onChange={(e) => handleChangeSortBy(e.target.value)}
                sx={{ flex: "1 1 0", minWidth: "150px" }}
              >
                {SORT_OPTIONS.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  fontSize="small"
                  color={view === "grid" ? "primary" : "inherit"}
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  fontSize="small"
                  color={view === "list" ? "primary" : "inherit"}
                />
              </IconButton>

              {/* SHOW IN THE SMALL DEVICE */}
              {downMd && (
                <Sidenav
                  handler={(close) => (
                    <IconButton onClick={close}>
                      <FilterList fontSize="small" />
                    </IconButton>
                  )}
                >
                  <Box px={3} py={2}>
                    <ProductFilterCard
                      products={sortedProducts}
                      filters={filters}
                      changeFilters={handleChangeFilters}
                      topCategories={navbarData?.categories}
                    />
                  </Box>
                </Sidenav>
              )}
            </FlexBox>
          </FlexBox>
        </FlexBetween>

        <Grid container spacing={4}>
          {/* PRODUCT FILTER SIDEBAR AREA */}
          <Grid
            item
            xl={2}
            md={3}
            sx={{ display: { md: "block", xs: "none" } }}
          >
            <ProductFilterCard
              products={sortedProducts}
              filters={filters}
              changeFilters={handleChangeFilters}
              topCategories={navbarData?.categories}
            />
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid item xl={10} md={9} xs={12}>
            {view === "grid" ? (
              <ProductsGridView products={sortedProducts} />
            ) : (
              <ProductsListView products={sortedProducts} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
