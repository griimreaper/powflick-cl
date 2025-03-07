"use client";

import Button from "@mui/material/Button";
import { Box } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H1, H3 } from "components/Typography";
import { RootStyle } from "./section-7";
import Image from "next/image";
// LOCAL CUSTOM COMPONENT

export default function Section8({ isMobile }: { isMobile: boolean }) {
  // Determina la imagen según el tamaño de la pantalla
  const backgroundImage = !isMobile ? `/assets/images/landing/POWFLICK_BANNER-INFERIOR.png` : `/assets/images/landing/mobile/HOME_BANNER-SEASON.png`;

  return (
    <RootStyle>
      {/* Imagen de fondo */}
      <Image
        src={backgroundImage}
        alt="Promo Sports Banner"
        layout="responsive" // Se adapta al tamaño original manteniendo la relación de aspecto
        width={1920} // Ajusta según el tamaño real de tu imagen
        height={1080} // Ajusta según el tamaño real de tu imagen
        loading="lazy"
        quality={80} // Reduce el peso sin perder calidad
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1920px"
        style={{
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

        <H1 fontSize="clamp(10px, 6vw, 120px)" lineHeight={1} mb={1}>
          PREPARE
        </H1>
        <H1 fontSize="clamp(10px, 6vw, 120px)" lineHeight={1} mb={1} >
          YOUR SEASON
        </H1>

        <H3 fontSize={"clamp(8px, 2.2vw, 30px)"} fontWeight={100} lineHeight={1} mb={isMobile ? 2 : 4} fontFamily={"sans-serif"} fontStyle="oblique">
          WITH THE BEST
        </H3>

        <Button variant="contained" size="large" color="primary" href="/products"
          style={{
            width: "clamp(140px, 17vw, 500px)",
            borderRadius: 1,
            whiteSpace: "nowrap",
            fontWeight: 400,
            fontSize: "clamp(12px, 2vw, 120px)",
            fontStyle: "italic",
          }}>
          Shop Now
        </Button>
      </Box>
    </RootStyle>
  );
}
