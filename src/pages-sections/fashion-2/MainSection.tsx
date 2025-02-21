import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import Section2 from "./section-2";
import Section3 from "./section-3";
import Image from "next/image";

export default function MainSection() {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detecta pantallas menores a 600px (breakpoint "sm")

  const backgroundImage = isMobile
    ? "/assets/images/landing/mobile/POWFLICK-_BANNER-SUPERIOR.png"
    : "/assets/images/landing/POWFLICK_BANNER_SUPERIOR.png";

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
      <Image
        src={backgroundImage}
        alt="Banner"
        priority
        width={1920} // Ajustar a un valor numérico adecuado
        height={1080} // Ajustar a un valor numérico adecuado
        style={{
          width: "100%",
          height: "auto",
          position: "relative",
          objectFit: "cover", // Asegura que la imagen mantenga proporciones
          objectPosition: "top", // Ajusta la posición de la imagen
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end", // Centra verticalmente
          alignItems: "center", // Centra horizontalmente
          textAlign: "center",
          width: "100%",
          height: "100%",
          gap: isMobile ? 2 : 3,
          position: "absolute",
          zIndex: 2,
          fontFamily: "GYMER",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          href="/products"
          style={{
            width: "clamp(140px, 17vw, 500px)",
            borderRadius: 1,
            color: "white",
            whiteSpace: "nowrap",
            fontWeight: 400,
            fontSize: "clamp(12px, 2.5vw, 120px)",
            fontStyle: "italic",
          }}
        >
          Shop Now
        </Button>

        <Box
          style={{
            position: "relative",
            width: "100%",
            height: "50%",
            flexDirection: "column",
            alignItems: "center",
            top: isMobile ? "clamp(0px,5%,200px)" : "clamp(0px,8%,200px)",
            display: "flex",
            gap: 5,
          }}
        >
          <Section2 className="section2" />
          <Section3 className="section3" />
        </Box>
      </Box>
    </Box>
  );
}
