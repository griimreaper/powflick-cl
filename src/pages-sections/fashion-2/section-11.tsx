"use client";
import { Box, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Container from "@mui/material/Container";
import { useState, useMemo } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import { Carousel } from "components/carousel";
import ProductCard8 from "components/product-cards/product-card-8";
import { DataStructure } from "models/types";
import Link from "next/link";

export default function Section11({
    products,
    isMobile,
}: {
    products: DataStructure["landing"]["collections"]["mostSoldProducts"];
    isMobile: boolean;
}) {
    const [selectedType, setSelectedType] = useState("all");

    // Extraer tipos únicos (puede cambiar según la propiedad real)
    const types = ["All", "Soccer", "Basketball", "Baseball", "Hockey", "Gaming", "Running"];

    const filteredProducts = useMemo(() => {
        return selectedType === "All"
            ? products
            : products.filter((p) => p.title.toLowerCase().includes(selectedType.toLowerCase()));
    }, [selectedType, products]);

    const responsive = [
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 600, settings: { slidesToShow: 2 } },
    ];

    return (
        <Container
            sx={{
                zIndex: 4,
                position: "relative",
                mb: isMobile ? "clamp(2vw, 4rem, 40vw)" : "clamp(1vw, 4rem, 30vw)",
                height: "100%",
                mt: isMobile ? -6 : 6,
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: isMobile ? "start" : "space-between",
                    alignItems: isMobile ? "start" : "center",
                    width: "100%",
                    mb: 4,
                    gap: 2,
                }}
            >
                <Box display={'flex'} flexDirection={'column'} textAlign={isMobile ? "center" : "start"} width={"100%"}>
                    <Typography
                        variant="h3"
                        component="h1"
                        color={"primary.main"}
                        sx={{
                            fontFamily: "GYMER",
                            lineHeight: 1,
                        }}
                    >
                        Our products
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        gap: 4,
                        paddingY: 2,
                        mb: 2,
                        overflowX: 'scroll',
                        '&::-webkit-scrollbar': { height: '2px' }, // para Chrome
                    }}>
                        {types.map((type) => (
                            <Typography
                                key={type}
                                onClick={() => setSelectedType(type)}
                                sx={{
                                    cursor: 'pointer',
                                    fontWeight: selectedType === type ? 700 : 500,
                                    color: selectedType === type ? 'primary.main' : 'gray',
                                    borderBottom: selectedType === type ? '2px solid #CA0b0b' : 'none',
                                    pb: 0.5,
                                    transition: 'all 0.2s',
                                }}
                            >
                                {type}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Carousel slidesToShow={4} responsive={responsive} arrowStyles={{ top: "40%" }}>
                {filteredProducts.map((product) => (
                    <ProductCard8 key={product.id} product={product} active={true} />
                ))}
            </Carousel>
        </Container>
    );
}
