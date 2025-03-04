"use client";
import Container from "@mui/material/Container";
// API FUNCTIONS
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Section2({ className }: { className: string }) {
  // Media query breakpoints
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detecta si es móvil

  return (
    <Container
      className={`${className}`}
      sx={{ height: isMobile ? "30%" : "25%" }}
    >
      {isMobile ? (
        // Renderiza dos imágenes para mobile
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Image
            draggable={false}
            src="/assets/images/landing/mobile/POWFLICK-_PROMESA-36.png"
            alt="Mobile Image 1"
            width={18} // Ajustar a un valor numérico adecuado
            height={18} // Ajustar a un valor numérico adecuado
            priority
            quality={80}
            sizes="(max-width: 769px) 100vw, 1000px"
            style={{
              borderRadius: 6,
              width: "100%",
              height: "auto",
              objectFit: "cover",
              marginBottom: "8px", // Espaciado entre imágenes
            }}
          />
          <Image
            draggable={false}
            src="/assets/images/landing/mobile/POWFLICK-_PROMESA-37.png"
            alt="Mobile Image 2"
            width={18} // Ajustar a un valor numérico adecuado
            height={18} // Ajustar a un valor numérico adecuado
            quality={80}
            sizes="(max-width: 769px) 100vw, 1000px"
            priority
            style={{
              borderRadius: 6,
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Box>
      ) : (
        // Renderiza una sola imagen para desktop
        <Image
          draggable={false}
          src="/assets/images/landing/POWFLICK_PROMESAS-DE-MARCA.png"
          alt="Desktop Image"
          quality={80}
          priority
          width={18} // Ajustar a un valor numérico adecuado
          height={18} // Ajustar a un valor numérico adecuado
          sizes="(min-width: 769px) 100vw, 1000px"
          style={{
            width: "100%",
            borderRadius: 6,
            height: "auto",
            objectFit: "cover",
          }}
        />
      )}
    </Container>
  );
}
