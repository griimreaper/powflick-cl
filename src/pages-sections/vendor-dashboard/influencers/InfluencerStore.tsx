// components/influencer/InfluencerPreview.tsx
"use client";

import { Box, Grid, IconButton, MenuItem, TextField, useMediaQuery } from "@mui/material";
import { Apps, FilterList, ViewList } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";
import { H1, H2, Paragraph } from "components/Typography";
import ProductsGridView from "components/products-view/products-grid-view";
import ProductsListView from "components/products-view/products-list-view";
import SideNav from "components/side-nav";
import Section2 from "pages-sections/fashion-2/section-2";
import { ProductDB } from "models/types";
import { Theme } from "@mui/material";
import { useCallback, useState } from "react";
import { ProductFilters } from "pages-sections/product-details/types";
import Link from "next/link";

const SORT_OPTIONS = [
    { label: "Relevance", value: "relevance" },
    { label: "Date", value: "date" },
    { label: "Price Low to High", value: "asc" },
    { label: "Price High to Low", value: "desc" },
];

interface Props {
    values: {
        label: string;
        title: string;
        description: string;
    };
    logoPreview?: string;
    bannerPreview?: string;
    products: ProductDB[] | { title: string, image: string, price: string }[];
    influencersLabel?: string[];
}

export default function InfluencerStore({
    values,
    logoPreview,
    bannerPreview,
    products,
    influencersLabel,
}: Props) {
    const [view, setView] = useState("grid");
    const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
    const [page, setPage] = useState(1);
    const itemsPerPage = 9; // o el valor que quieras
    const [filters, setFilters] = useState<ProductFilters>({
        page: 1,
        rating: 0,
        color: [],
        brand: [],
        sales: [],
        price: [0, 300],
        category: [],
        collection: [],
        tag: [],
        search: "",
        featured: undefined,
        discount: undefined,
        mostSold: undefined,
        order: "",
    });
    const [sortBy, setSortBy] = useState("relevance");

    const toggleView = useCallback((v: string) => () => setView(v), []);

    const handleChangeSortBy = (value: string) => {
        setSortBy(value);
        setFilters((prev) => ({
            ...prev,
            order: "",           // limpiás orden anterior
            mostSold: undefined, // limpiás si era relevance
        }));
    };

    const sortedProducts = [...products].sort((a: any, b: any) => {
        switch (sortBy) {
            case "asc":
                return a.price - b.price;
            case "desc":
                return b.price - a.price;
            case "date":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // asegurate que tengan createdAt
            case "relevance":
            default:
                return 0; // sin orden específico
        }
    });

    const paginatedProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePage = (newPage: number) => {
        setPage(newPage);
    };


    return (
        <Grid item xs={12} textAlign="center" sx={{ backgroundColor: 'white' }}>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 300,
                    backgroundColor: "#f0f0f0",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {bannerPreview ? (
                    <img
                        src={bannerPreview}
                        alt="Banner Preview"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    />
                ) : (
                    <span style={{ color: "#999" }}>Banner Preview</span>
                )}

                {logoPreview && (
                    <img
                        src={logoPreview}
                        alt="Logo Preview"
                        style={{
                            height: 150,
                            objectFit: "contain",
                            zIndex: 2,
                        }}
                    />
                )}

                {values.label && (
                    <H1
                        sx={{
                            position: "absolute",
                            bottom: -20,
                            borderRadius: "10px",
                            width: "50%",
                            fontStyle: "italic",
                            backgroundColor: "white",
                            color: "black",
                            textAlign: "center",
                            py: 1,
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            zIndex: 2,
                            userSelect: "none",
                            textTransform: "uppercase",
                        }}
                    >
                        {values.label}
                    </H1>
                )}
            </Box>

            <Grid container spacing={3} my={3} alignItems="start">
                <Grid item xs={12} md={4} xl={4} display="flex" flexDirection="column" alignItems="end" textAlign="left">
                    <Box width="70%">
                        <H2 fontWeight="bold" my={2} textTransform="uppercase" fontSize="0.8rem">
                            {values.title || "Title"}
                        </H2>
                        <p>{values.description || "Description"}</p>
                    </Box>
                    <Box width="70%" mt={4}>
                        <H2 fontWeight="bold" color="primary.main" my={2} fontSize="0.8rem">Other Creators</H2>
                        <ul>
                            {(influencersLabel && influencersLabel.length > 0 ? influencersLabel : ['influencer1', 'influencer2', 'influencer3', 'influencer4', 'influencer5']).map((item, index) => (
                                <Link key={index} href={"/influencers/" + item}>
                                    <Paragraph key={index} my={3} fontSize="0.8rem" fontWeight="thin">{item}</Paragraph>
                                </Link>
                            ))}
                        </ul>
                    </Box>
                </Grid>

                <Grid item xs={12} md={8} xl={8} px={6} display="flex" flexDirection="column" alignItems="end">
                    <Box mb={6}>
                        <FlexBox alignItems="center" gap={1} flexWrap={{ xs: "wrap", sm: "nowrap" }} justifyContent={{ xs: "space-between", md: "flex-end" }} width={{ xs: "100%", md: "100%" }}>
                            <Box display="flex" alignItems="center" justifyContent="flex-end" width={'100%'} gap={1}>
                                <Paragraph whiteSpace="pre">Sort by:</Paragraph>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    value={sortBy}
                                    onChange={(e) => handleChangeSortBy(e.target.value)}
                                    sx={{ maxWidth: "180px", minWidth: "120px" }}
                                >
                                    {SORT_OPTIONS.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>

                            <FlexBox alignItems="center" justifyContent="flex-end">
                                <Paragraph mr={1}>View:</Paragraph>
                                <IconButton onClick={toggleView("grid")}>
                                    <Apps fontSize="small" color={view === "grid" ? "primary" : "disabled"} />
                                </IconButton>
                                <IconButton onClick={toggleView("list")}>
                                    <ViewList fontSize="small" color={view === "list" ? "primary" : "disabled"} />
                                </IconButton>

                                {downMd && (
                                    <SideNav handler={(close) => <IconButton onClick={close}><FilterList fontSize="small" /></IconButton>}>
                                        <Box px={3} py={2}>{/* filtros */}</Box>
                                    </SideNav>
                                )}
                            </FlexBox>
                        </FlexBox>
                    </Box>

                    {view === "grid" ? (
                        <ProductsGridView
                            data={{
                                products: paginatedProducts,
                                page,
                                totalPages,
                                count: { total: products.length }
                            }}
                            handlePage={handlePage}
                        />
                    ) : (
                        <ProductsListView
                            data={{
                                products: paginatedProducts,
                                page,
                                totalPages,
                                count: { total: products.length }
                            }}
                            handlePage={handlePage}
                        />
                    )}
                </Grid>
            </Grid>

            <Section2 className="" detail isMobile={downMd} />
        </Grid>
    );
}
