"use client";
import Container from "@mui/material/Container";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";
import { useEffect, useState } from "react";
import Service from "models/Service.model";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";

export default function Section2({ className }: { className: string }) {
  const [services, setServices] = useState<Service[]>([]);

  // Media query breakpoints
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detecta si es móvil

  useEffect(() => {
    const fetchServices = async () => {
      const services = await api.getServices();
      setServices(services);
    };

    fetchServices();
  }, []);

  return (
    <Container className={`mt-2 ${className}`}>
      {isMobile ? (
        // Renderiza dos imágenes para mobile
        <Box display={'flex'} flexDirection={'column'} gap={2} px={4}>
          <img
            src="assets/images/landing/mobile/POWFLICK-_PROMESA-36.png"
            alt="Mobile Image 1"
            style={{
              borderRadius: 6,
              width: "100%",
              height: "auto",
              objectFit: "cover",
              marginBottom: "8px", // Espaciado entre imágenes
            }}
          />
          <img
            src="assets/images/landing/mobile/POWFLICK-_PROMESA-37.png"
            alt="Mobile Image 2"
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
        <img
          src="assets/images/landing/POWFLICK_PROMESAS DE MARCA.png"
          alt="Desktop Image"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      )}
    </Container>
  );
}
