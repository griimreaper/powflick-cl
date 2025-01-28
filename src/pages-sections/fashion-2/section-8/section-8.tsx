"use client";

import Button from "@mui/material/Button";
import { useMediaQuery, useTheme, Box, Typography } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H1, H3 } from "components/Typography";
import { RootStyle } from "../section-7/styles";
// LOCAL CUSTOM COMPONENT

export default function Section7() {
  const isMobile = useMediaQuery(("(max-width: 768px)")); // Detecta pantallas menores a 600px (breakpoint "sm")

  // Determina la imagen según el tamaño de la pantalla
  const backgroundImage = !isMobile ? `/assets/images/landing/POWFLICK_BANNER-INFERIOR.png` : `/assets/images/landing/mobile/HOME_BANNER-SEASON.png`;

  return (
    <RootStyle>
      {/* Imagen de fondo */}
      <img
        src={backgroundImage}
        alt="Promo Sports Banner"
        style={{
          width: "100%",
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
          alignItems: isMobile ? "center" : "flex-start",
          textAlign: isMobile ? "end" : "right",
          width: "100%",
          mt: isMobile ? 20 : 0,
          height: "100%",
          position: "relative",
          zIndex: 2,
          mb: isMobile ? 10 : 0,
          textWrap: 'nowrap',
          fontFamily: "GYMER",
          padding: "0 4rem",
        }}
      >

        <H1 fontSize={isMobile ? 45 : 120} lineHeight={1} mb={1}>
          PREPARE
        </H1>
        <H1 fontSize={isMobile ? 45 : 120} lineHeight={1} mb={1} >
          YOUR SEASON
        </H1>

        <H3 fontSize={isMobile ? 15 : 40} fontWeight={100} lineHeight={1} mb={isMobile ? 2 : 4} fontFamily={"sans-serif"} fontStyle="oblique">
          WITH THE BEST
        </H3>

        <Button variant="contained" size="large" color="primary" href="/products" sx={{ borderRadius: 1 }}>
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 400,
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}
          >
            Shop Now
          </Typography>
        </Button>
      </Box>
    </RootStyle>
  );
}
