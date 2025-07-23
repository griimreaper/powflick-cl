// components/influencer/InfluencerPreview.tsx
"use client";

import { Avatar, Box, Grid, IconButton, MenuItem, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { Apps, Facebook, FilterList, Twitter, ViewList, YouTube } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";
import { H1, Paragraph } from "components/Typography";
import ProductsGridView from "components/products-view/products-grid-view";
import ProductsListView from "components/products-view/products-list-view";
import SideNav from "components/side-nav";
import Section2 from "pages-sections/fashion-2/section-2";
import { ProductDB } from "models/types";
import { Theme } from "@mui/material";
import { useCallback, useState } from "react";

const SORT_OPTIONS = [
    { label: "Relevance", value: "relevance" },
    { label: "Date", value: "date" },
    { label: "Price Low to High", value: "asc" },
    { label: "Price High to Low", value: "desc" },
];

interface SocialMediaLink {
    label?: string;
    url?: string;
}

interface Props {
    values: {
        label: string;
        title: string;
        description: string;
        socialMedia?: {
            instagram?: SocialMediaLink;
            twitter?: SocialMediaLink;
            facebook?: SocialMediaLink;
            tiktok?: SocialMediaLink;
            youtube?: SocialMediaLink;
        };
    };
    profileImage?: string;
    logoPreview?: string;
    bannerPreview?: string;
    products: ProductDB[] | { title: string, image: string, price: string }[];
}

export default function InfluencerStore({
    values,
    logoPreview,
    bannerPreview,
    profileImage,
    products,
}: Props) {
    const [view, setView] = useState("grid");
    const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
    const [page, setPage] = useState(1);
    const itemsPerPage = 9; // o el valor que quieras
    const [sortBy, setSortBy] = useState("relevance");

    const toggleView = useCallback((v: string) => () => setView(v), []);

    const handleChangeSortBy = (value: string) => {
        setSortBy(value);
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

    const renderSocialMedia = () => {
        const social = values.socialMedia || {};
        const icons = {
            youtube: <YouTube sx={{ color: "#FF0000", fontSize: 80 }} />,
            instagram: (
                <img
                    src="/assets/images/icons/Instagram_logo_2016.svg"
                    alt="Instagram"
                    style={{ width: 80, height: 80 }}
                />
            ),
            twitter: <Twitter sx={{ color: "#1DA1F2", fontSize: 80 }} />,
            facebook: <Facebook sx={{ color: "#4267B2", fontSize: 80 }} />,
            tiktok: (
                <img
                    src="/assets/images/icons/logo-tiktok-svgrepo-com.svg"
                    alt="TikTok"
                    style={{ width: 80, height: 80 }}
                />
            ),
        };

        return Object.entries(social).map(([platform, obj]) => {
            if (!obj || !obj.url) return null;

            // obj = { label?: string, url: string }
            const label = obj.label?.trim() || obj.url;

            return (
                <Stack
                    key={platform}
                    direction="column"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    {icons[platform as keyof typeof icons]}
                    <Typography fontWeight={500}>
                        <a href={obj.url} target="_blank" rel="noopener noreferrer">
                            {label}
                        </a>
                    </Typography>
                </Stack>
            );
        });
    };


    return (
        <Grid item xs={12} textAlign="center" pb={4} sx={{ backgroundColor: 'white' }}>
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
                            borderRadius: "8px",
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

            <Grid container my={8} alignItems="start">
                <Grid item xs={12} md={4} xl={4} display="flex" flexDirection="column" alignItems="end" textAlign="left">
                    <Box mt={3} mx="auto" textAlign="center">
                        {/* Imagen de perfil */}
                        <Avatar
                            src={profileImage}
                            alt="Influencer"
                            sx={{
                                width: "50%",
                                height: "auto",
                                mx: "auto",
                                mb: 3,
                            }}
                        />

                        {/* Título destacado */}
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#ca0b0b", mb: 2 }}
                        >
                            {values.title}
                        </Typography>

                        {/* Descripción */}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            maxWidth={500}
                            mx="auto"
                            sx={{ mb: 4 }}
                        >
                            {values.description}
                        </Typography>

                        {/* Redes sociales */}
                        <Stack direction="column" spacing={2} mt={3}>
                            {renderSocialMedia()}
                        </Stack>

                    </Box>
                </Grid>

                <Grid item xs={12} md={8} xl={8} px={3} display="flex" flexDirection="column" alignItems="end">
                    <Box mb={12} width="100%">
                        <FlexBox alignItems="center" gap={1} justifyContent={{ xs: "center", md: "flex-end" }} width={{ xs: "100%" }} display="flex" flexDirection={{ xs: "column", sm: "row" }} >
                            <Box display="flex" alignItems="center" justifyContent="flex-end" width={'100%'} gap={1} >
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
