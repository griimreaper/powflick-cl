"use client";

import Button from "@mui/material/Button";
import { useMediaQuery, useTheme, Box, Typography } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H1, H3 } from "components/Typography";
// LOCAL CUSTOM COMPONENT
import { RootStyle } from "./styles";

export default function Section7() {
  const isMobile = useMediaQuery(("(max-width: 768px)")); // Detecta pantallas menores a 600px (breakpoint "sm")

  // Determina la imagen según el tamaño de la pantalla
  const backgroundImage = !isMobile ? `/assets/images/landing/POWFLICK-19.png` : `/assets/images/landing/mobile/POWFLICK-19.png`;

  return (
    <RootStyle>
      {/* Imagen de fondo */}
      <img
        src={backgroundImage}
        alt="Promo Sports Banner"
        style={{
          width: "100%",
          height: "fit-content",
          position: "absolute",
          zIndex: 0,
        }}
      />

      {/* Contenido */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-end" : "center",
          alignItems: isMobile ? "center" : "flex-end",
          textAlign: isMobile ? "end" : "right",
          mt: isMobile ? 10 : 0,
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 2,
          textWrap: 'nowrap',
          mb: isMobile ? 10 : 0,
          fontFamily: "GYMER",
          padding: "0 4rem",
        }}
      >
        <H3 fontSize={{ xs: 10, sm: 15, md: 15, lg: 20 }} lineHeight={1} mb={isMobile ? 2 : 4} fontFamily={"sans-serif"} fontStyle="italic">
          Innovation with Artificial intelligence
        </H3>

        <H1 fontSize={{ xs: 25, sm: 55, md: 80, lg: 120 }} lineHeight={1} mb={1}>
          POWERED
        </H1>
        <H1 fontSize={{ xs: 25, sm: 55, md: 80, lg: 120 }} lineHeight={1} mb={1}>
          CUSTOMIZATION
        </H1>

        <Button variant="contained" size="large" color="primary" href="/products" sx={{ borderRadius: 1 }}>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "0.7rem", md: "1rem", sm: "1.2rem" },
              fontWeight: 400,
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}
          >
            Customize Now
          </Typography>
        </Button>
      </Box>
    </RootStyle>
  );
}
