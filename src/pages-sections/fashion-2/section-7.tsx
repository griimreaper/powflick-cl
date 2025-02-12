"use client";

import Button from "@mui/material/Button";
import { useMediaQuery, useTheme, Box, Typography, styled } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H1, H3 } from "components/Typography";
// LOCAL CUSTOM COMPONENT

export const RootStyle = styled("div")({
  display: "flex",
  position: "relative",
  width: "100%",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  backgroundColor: "grey.500",
});

export default function Section7() {
  const isMobile = useMediaQuery(("(max-width: 768px)")); // Detecta pantallas menores a 600px (breakpoint "sm")

  // Determina la imagen según el tamaño de la pantalla
  const backgroundImage = !isMobile ? `/assets/images/landing/POWFLICK-19.png` : `/assets/images/landing/mobile/POWFLICK-19.png`;

  return (
    <Box sx={{
      display: "flex",
      position: "relative",
      width: "100%",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      backgroundColor: "transparent",
      objectFit:"cover",
    }}>
      {/* Imagen de fondo */}
      <img
        src={backgroundImage}
        alt="Promo Sports Banner"
        style={{
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
      />

      {/* Contenido */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-end" : "center",
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "end" : "right",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
          mb: isMobile ? 10 : 0,
          textWrap: 'nowrap',
          fontFamily: "GYMER",
          padding: "0 4rem",
        }}
      >

        <H3 fontSize={"clamp(8px, 2.2vw, 30px)"} fontWeight={100} lineHeight={1} mb={2} fontFamily={"sans-serif"} fontStyle="oblique">
          Got a design? We make it real
        </H3>

        <H1 fontSize="clamp(10px, 6vw, 120px)" lineHeight={1} mb={1}>
          SEND IT NOW AND
        </H1>
        <H1 fontSize="clamp(10px, 6vw, 120px)" lineHeight={1} mb={1} >
          GET YOUR UNIFORM.
        </H1>

        <Button variant="contained" size="large" href="/products"
          sx={{
            width: "clamp(280px, 30vw, 500px)", // Mínimo 150px, escalable con 30vw, máximo 300px
            minWidth: "150px", // Evita que sea demasiado pequeño
            maxWidth: "90%", // No ocupa más del 90% del contenedor
            height: isMobile ? '40px' : '60px',
            position: 'relative',
            top: isMobile ? "clamp(4px, 15vw, 16px)" : 40,
            padding: "clamp(8px, 15vw, 16px) clamp(16px, 4vw, 32px)", // Padding adaptable
            background: 'white',
            borderRadius: 1,
            "&:hover": { background: 'rgb(200,200,200)' },
          }}>
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "clamp(18px, 2vw, 120px)",
              fontWeight: 400,
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}
          >
            Send Your Design
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
