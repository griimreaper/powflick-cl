"use client";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useState, useMemo } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import ProductCard8 from "components/product-cards/product-card-8";
import { DataStructure } from "models/types";

export default function DesignYourGameSection({
    collections,
    isMobile,
}: {
    collections: DataStructure["landing"]["collections"]["designYourGameSection"];
    isMobile: boolean;
}) {
    const [selectedType, setSelectedType] = useState("Top Picks");

    // Extraer tipos únicos (puede cambiar según la propiedad real)
    const types = collections?.collections;

    const filteredProducts = useMemo(() => {
        if (selectedType === "Top Picks") return collections?.allProducts?.filter((p) => p.featured === true);

        return collections.allProducts.filter((p) =>
            p.collections?.some((col) => col.title === selectedType)
        );
    }, [selectedType, collections]);

    const responsive = [
        { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
        { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 3 } },
        { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } }, // Mobile
    ];

    const maxSlidesToShow = Math.max(...responsive.map((r) => r.settings.slidesToShow));

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
                    gap: 2,
                }}
            >
                <Box display={'flex'} flexDirection={'column'} textAlign={"center"} width={"100%"}>
                    <Box width="100%" position="relative">
                        {/* Capa del borde rojo desplazado */}
                        <Typography
                            variant="h2"
                            component="h1"
                            position="absolute"
                            top="5px"
                            width={"100%"}
                            left="5px"
                            zIndex={-1}
                            whiteSpace={'nowrap'}
                            fontSize={{ xs: '9vw', sm: '10vw', md: '8vw', lg: '6vw' }}
                            color="transparent"
                            sx={{
                                fontFamily: "GYMER",
                                lineHeight: 1,
                                textTransform: "uppercase",
                                WebkitTextStroke: {xs: "1px #CA0b0b", md: "2px #CA0b0b" },
                            }}
                        >
                            Design Your Game.
                        </Typography>

                        {/* Capa principal blanca */}
                        <Typography
                            variant="h2"
                            component="h1"
                            color="white"
                            whiteSpace={'nowrap'}
                            fontSize={{ xs: '9vw', sm: '10vw', md: '8vw', lg: '6vw' }}
                            sx={{
                                fontFamily: "GYMER",
                                lineHeight: 1,
                                textTransform: "uppercase",
                            }}
                        >
                            Design Your Game.
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        component="h1"
                        color="primary.main"
                        fontStyle={'italic'}
                        fontSize={{ xs: '4vw', sm: '3vw', md: '2vw', lg: '1.2vw' }}
                        fontWeight={500}
                    >
                        Find your perfect match - modern icons, retro classics, and styles made for her.
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 4,
                        justifyContent: isMobile ? 'start' : 'center',
                        padding: 2,
                        my: 2,
                        overflowX: 'scroll',
                        '&::-webkit-scrollbar': { height: '2px' }, // para Chrome
                    }}>
                        {types?.map((type) => (
                            <Typography
                                key={type}
                                onClick={() => setSelectedType(type)}
                                fontSize={{ xs: '4vw', sm: '3vw', md: '2vw', lg: '1.2vw' }}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer',
                                    fontWeight: selectedType === type ? 700 : 500,
                                    color: selectedType === type ? 'white' : 'gray',
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

            <Carousel
                slidesToShow={4}         // base para escritorio
                slidesToScroll={4}       // base para escritorio
                responsive={responsive}
                arrowStyles={{ top: "40%" }}
                dots
                dotColor="#CA0b0b"
            >
                {filteredProducts?.map((product) => (
                    <ProductCard8 key={product.id} product={product} active={true} />
                ))}
            </Carousel>
        </Container >
    );
}
