import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import Section2 from './section-2'
import Section3 from './section-3'

export default function MainSection() {
    const isMobile = useMediaQuery(("(max-width: 768px)")); // Detecta pantallas menores a 600px (breakpoint "sm")

    const backgroundImage = isMobile ?
        "assets/images/landing/mobile/POWFLICK-_BANNER-SUPERIOR.png"
        : "assets/images/landing/POWFLICK_BANNER_SUPERIOR.png";

    return (
        <Box
            className="banner-container"
            style={{
                display: "flex",
                position: "relative",
                marginBottom: 90,
                flexDirection: "column",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <img
                src={backgroundImage}
                alt="Banner"
                style={{
                    width: "100%",
                    height: "auto",
                    position: 'relative',
                    objectFit: "cover", // Asegura que la imagen mantenga proporciones
                    objectPosition: "top", // Ajusta la posición de la imagen
                    zIndex: 0
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center", // Centra verticalmente
                    alignItems: "center", // Centra horizontalmente
                    textAlign: "center",
                    top: isMobile ? "clamp(13rem,200vw,23%)" : "clamp(15rem,28vw,23%)",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    zIndex: 2,
                    fontFamily: "GYMER",
                }}
            >
                <Button
                    color="primary"
                    variant="contained"
                    href="/products"
                    sx={{
                        width: "clamp(160px, 30vw, 500px)",
                        aspectRatio: 4 / 1,
                        marginBottom: isMobile ? "12%" : "3%",
                        padding: "clamp(8px, 15vw, 16px) clamp(16px, 4vw, 32px)",
                        background: (theme) => theme.palette.primary.main,
                        borderRadius: 1,
                        "&:hover": { background: (theme) => theme.palette.primary.dark },
                        color: "white",
                        fontWeight: 400,
                        fontSize: "clamp(24px, 2vw, 120px)",
                        fontStyle: "italic",
                    }}
                >
                    Shop Now
                </Button>

                <Section2 className="section2" />
                <Section3 className="section3" />
            </Box>

        </Box>
    )
}
