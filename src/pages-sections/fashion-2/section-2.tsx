import { Box, Container } from "@mui/material";
import Image from "next/image";

export default function Section2({ className, isMobile, detail = false }: { className: string, isMobile: boolean, detail?: boolean }) {
  return (
    <Container
      className={className}
      sx={{
        height: isMobile ? "30%" : "25%", // Contenedor con una altura relativa
        position: "relative", // Necesario si usas layout="fill"
        py: detail ? 1 : 0,
      }}
    >
      {isMobile ? (
        // Renderiza dos imágenes para mobile
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Image
            draggable={false}
            src="/assets/images/landing/mobile/POWFLICK-_PROMESA-36.png"
            alt="Mobile Image 1"
            layout="responsive" // Para mantener la proporción
            width={500} // Ajuste adecuado
            height={300} // Ajuste adecuado
            quality={80}
            priority
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 1000px"
            style={{
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
              borderRadius: 6,
              objectFit: "cover",
            }}
          />
          <Image
            draggable={false}
            src="/assets/images/landing/mobile/POWFLICK-_PROMESA-37.png"
            alt="Mobile Image 2"
            layout="responsive" // Para mantener la proporción
            width={500} // Ajuste adecuado
            height={300} // Ajuste adecuado
            quality={80}
            priority
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 1000px"
            style={{
              boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
              borderRadius: 6,
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
          layout="responsive"
          width={1200}
          height={600}
          sizes="(min-width: 769px) 100vw, 1000px"
          style={{
            boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.1)",
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
