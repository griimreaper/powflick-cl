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
import { H5, Paragraph, Span } from "components/Typography";
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
import { DataStructure, ProductDB } from "models/types";
import Breadcrumbs from "./Breadcrumbs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "services/Products";
import { themeColors } from "theme/theme-colors";

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Date", value: "date" },
  { label: "Price Low to High", value: "asc" },
  { label: "Price High to Low", value: "desc" },
];

const initialFilters = {
  page: 1,
  rating: 0,
  color: [],
  brand: [],
  sales: [],
  price: [0, 300],
  category: [],
  collection: [],
  search: "",
  featured: undefined,
  discount: undefined,
  mostSold: undefined,
  order: "",
};
export const useProducts = (params: ProductFilters) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () =>
      getProducts(
        params.page,
        "",
        params.category[0],
        params.collection[0],
        "",
        params.color[0],
        params.featured,
        params.mostSold,
        params.discount,
        params.order,
        params.search,
        params.price[0],
        params.price[1],
        9
      ),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData, previousQuery) => previousData,
  });
};

const useGlobalLoadingCursor = (isFetching: boolean) => {
  useEffect(() => {
    if (isFetching) {
      document.body.style.cursor = "wait"; // Aplica el cursor a todo el documento
    } else {
      document.body.style.cursor = "default"; // Vuelve al estado normal
    }

    return () => {
      document.body.style.cursor = "default"; // Limpieza al desmontar
    };
  }, [isFetching]);
};

export default function ProductSearchPageView() {
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState<ProductFilters>({ ...initialFilters });
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const searchParams = useSearchParams();

  const { data, isLoading, isError, error, isFetching } = useProducts(filters);

  useGlobalLoadingCursor(isFetching);

  useEffect(() => {
    const newFilters: any = { ...initialFilters };

    if (searchParams) {
      if (searchParams.get("query"))
        newFilters.search = searchParams.get("query") || "";
      if (searchParams.get("category"))
        newFilters.category = [searchParams.get("category")];
      if (searchParams.get("collection"))
        newFilters.collection = [searchParams.get("collection")];
      if (searchParams.get("color"))
        newFilters.color = [searchParams.get("color")];
      if (searchParams.get("minPrice"))
        newFilters.price[0] = parseInt(searchParams.get("minPrice") || "0", 10);
      if (searchParams.get("maxPrice"))
        newFilters.price[1] = parseInt(
          searchParams.get("maxPrice") || "300",
          10
        );
      if (searchParams.get("rating"))
        newFilters.rating = parseInt(searchParams.get("rating") || "0", 10);
    }

    setFilters(newFilters);
  }, [searchParams]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    ...(filters.category[0]
      ? [
          {
            label: filters.category[0],
            href: `/products?category=${filters.category[0]}`,
          },
        ]
      : []),
    ...(filters.collection[0]
      ? [
          {
            label: `${filters.collection}`,
            href: `/products?collection=${filters.collection}`,
          },
        ]
      : []),
    ...(filters.color[0]
      ? [
          {
            label: `${filters.color[0]}`,
            href: `/products?color=${filters.color[0]}`,
          },
        ]
      : []),
    ...(filters.search ? [{ label: `Search: ${filters.search}` }] : []),
  ];

  const handleChangeFilters = (
    key: ProductFilterKeys,
    values: ProductFilterValues
  ) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  const handleChangeSortBy = (value: string) => {
    console.log(value);

    setSortBy(value);

    setFilters((prevFilters) => {
      switch (value) {
        case "asc":
          return { ...prevFilters, order: "ASC" }; // Modifica el valor de `order`
        case "desc":
          return { ...prevFilters, order: "DESC" }; // Modifica el valor de `order`
        case "date":
          return { ...prevFilters, order: "date" }; // Modifica el valor de `order`
        case "relevance":
          return { ...prevFilters, mostSold: true }; // Cambia `mostSold` a true
        default:
          return prevFilters;
      }
    });
  };

  const toggleView = useCallback((v: string) => () => setView(v), []);
  console.log(data);

  // const sortedProducts = handleSortProducts(data, sortBy, filters);

  return (
    <div
      className="pt-2 pb-4"
      style={{
        cursor: isFetching ? "wait" : "default", // Cambia el cursor según `isFetching`
        opacity: isFetching ? 0.7 : 1,
        background: "white",
      }}
    >
      <Container>
        {/* Breadcrumbs */}
        <Box mb={2}>
          <Breadcrumbs items={breadcrumbs} />
        </Box>

        {/* FILTER ACTION AREA */}
        <FlexBetween flexWrap="wrap" gap={2} mb={2}>
          <div>
            {filters.search && (
              <H5 lineHeight={1} mb={1} color={themeColors.text.secondary}>
                Searching for “ {filters?.search} ”
              </H5>
            )}
            <Span style={{ color: themeColors.text.secondary }}>
              {data?.count?.total} results found
            </Span>
          </div>

          <FlexBox alignItems="center" columnGap={4} flexWrap="wrap">
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph whiteSpace="pre">Sort by:</Paragraph>

              <TextField
                select
                fullWidth
                size="small"
                value={sortBy}
                variant="outlined"
                placeholder="Sort by"
                color="primary"
                onChange={(e) => handleChangeSortBy(e.target.value)}
                sx={{ flex: "1 1 0", minWidth: "150px" }}
              >
                {SORT_OPTIONS.map((item) => (
                  <MenuItem
                    value={item.value}
                    key={item.value}
                    color="primary"
                    style={{ color: "black" }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="#FFFFFF" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  fontSize="small"
                  color={view === "grid" ? "primary" : "disabled"}
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  fontSize="small"
                  color={view === "list" ? "primary" : "disabled"}
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
                      products={data?.products}
                      filters={filters}
                      changeFilters={handleChangeFilters}
                      topCategories={data?.filt}
                      colors={data?.colors || []}
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
              products={data?.products}
              filters={filters}
              changeFilters={handleChangeFilters}
              topCategories={data?.filt}
              colors={data?.colors || []}
            />
          </Grid>

          {/* PRODUCT VIEW AREA */}
          <Grid item xl={10} md={9} xs={12}>
            {view === "grid" ? (
              <ProductsGridView
                data={data}
                handlePage={(number: number) =>
                  setFilters({ ...filters, page: number })
                }
              />
            ) : (
              <ProductsListView
                data={data}
                handlePage={(number: number) =>
                  setFilters({ ...filters, page: number })
                }
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
