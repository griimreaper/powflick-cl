"use client";

import Button from "@mui/material/Button";
import { useMediaQuery, useTheme, Box, Typography } from "@mui/material";
// GLOBAL CUSTOM COMPONENTS
import { H1, H3 } from "components/Typography";
import { useTranslations } from "next-intl";
// LOCAL CUSTOM COMPONENT
import { RootStyle } from "./section-7";

export default function Section9() {
  const t = useTranslations("Home");
  const isMobile = useMediaQuery(("(max-width: 768px)")); // Detecta pantallas menores a 600px (breakpoint "sm")

  // Determina la imagen según el tamaño de la pantalla
  const backgroundImage = !isMobile ? `/assets/images/landing/POWFLICK-20.png` : `/assets/images/landing/mobile/POWFLICK-20.png`;

  return (
    <RootStyle>
      {/* Imagen de fondo */}
      <img
        src={backgroundImage}
        alt={t("promoSportsBannerAlt")}
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
        <H3 fontSize={
          "clamp(8px, 1.8vw, 30px)"
        } lineHeight={1} mb={isMobile ? 2 : 4} fontFamily={"sans-serif"} fontWeight={100} fontStyle="italic">
          {t("innovationAI")}
        </H3>

        <H1 fontSize="clamp(10px, 10vw, 120px)" lineHeight={1} mb={1}>
          {t("powered")}
        </H1>
        <H1 fontSize="clamp(10px, 10vw, 120px)" lineHeight={1} mb={1}>
          {t("customization")}
        </H1>

        <Button variant="contained" size="large" color="primary" href="/products" sx={{
          width: "clamp(160px, 30vw, 500px)", // Mínimo 150px, escalable con 30vw, máximo 300px
          minWidth: "150px", // Evita que sea demasiado pequeño
          maxWidth: "90%", // No ocupa más del 90% del contenedor
          padding: "clamp(8px, 15vw, 16px) clamp(16px, 4vw, 32px)", // Padding adaptable
          background: (theme) => theme.palette.primary.main,
          borderRadius: 1,
          "&:hover": { background: (theme) => theme.palette.primary.dark },
        }}>
          <Typography
            sx={{
              color: "white",
              fontSize: "clamp(12px, 2vw, 120px)",
              fontWeight: 400,
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}
          >
            {t("customizeNow")}
          </Typography>
        </Button>
      </Box>
    </RootStyle>
  );
}