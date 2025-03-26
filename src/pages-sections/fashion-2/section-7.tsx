"use client";

import Button from "@mui/material/Button";
import {
  Box,
  styled,
} from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H1, H3 } from "components/Typography";
import Image from "next/image";
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

export default function Section7({ isMobile }: { isMobile: boolean }) {
  // Determina la imagen según el tamaño de la pantalla
  const backgroundImage = !isMobile
    ? `/assets/images/landing/POWFLICK-19.png`
    : `/assets/images/landing/mobile/POWFLICK-19.png`;

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        backgroundColor: "transparent",
        objectFit: "cover",
      }}
    >
      {/* Imagen de fondo */}
      <Image
        src={backgroundImage}
        alt="Promo Sports Banner"
        layout="responsive"
        width={1920} // Ajusta según el tamaño real de tu imagen
        height={1080} // Ajusta según el tamaño real de tu imagen
        loading="lazy"
        quality={80} // Ajusta la calidad para optimizar el tamaño
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1920px"
        style={{
          zIndex: 0,
          position: "relative",
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
          textWrap: "nowrap",
          fontFamily: "GYMER",
          padding: "0 4rem",
        }}
      >
        <H3
          fontSize={"clamp(8px, 2.2vw, 30px)"}
          fontWeight={100}
          lineHeight={1}
          mb={2}
          fontFamily={"sans-serif"}
          fontStyle="oblique"
        >
          Got a design? We make it real
        </H3>

        <H1 fontSize="clamp(10px, 6vw, 120px)" lineHeight={1} mb={1}>
          SEND IT NOW AND
        </H1>
        <H1 fontSize="clamp(10px, 6vw, 120px)" lineHeight={1} mb={1}>
          GET YOUR UNIFORM.
        </H1>

        <Button
          variant="contained"
          size="large"
          href="/your-design"
          sx={{
            width: "clamp(140px, 17vw, 500px)",
            borderRadius: 1,
            whiteSpace: "nowrap",
            fontWeight: 400,
            fontSize: "clamp(12px, 2vw, 120px)",
            fontStyle: "italic",
            color: "primary.main",
            background: "white",
            "&:hover": { background: "rgb(200,200,200)" },
          }}
        >
          Send Your Design
        </Button>
      </Box>
    </Box>
  );
}
