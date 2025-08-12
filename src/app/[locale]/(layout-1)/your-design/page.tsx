"use client";

import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import Image from "next/image";
import BeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import Form from "./Form";
import { primary } from "theme/theme-colors";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Design - Pow Flick",
  alternates: {
    canonical: "https://www.powflick.com/en/your-design",
    languages: {
      en: "https://www.powflick.com/en/your-design",
      es: "https://www.powflick.com/es/your-design",
      "x-default": "https://www.powflick.com/en/your-design",
    },
  },
};

export default function Home() {
  const beforeImage = { imageUrl: "/assets/images/free-design/DESIGN_MAN_1.png" }; // Ruta de la imagen antes
  const afterImage = { imageUrl: "/assets/images/free-design/DESIGN_MAN_2.png" }; // Ruta de la imagen después

  return (
    <Box style={{ backgroundColor: "white" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: {
            xs: "178.13%", // 768x1370 aspect ratio (1370/768 = 1.7813)
            md: "56.25%", // 1920x1080 aspect ratio (1080/1920 = 0.5625)
          },
          backgroundImage: {
            xs: "url('/assets/images/free-design/DESIGN_BACKGROUND_MOBILE.png')", // Imagen para dispositivos móviles
            md: "url('/assets/images/free-design/DESIGN_BACKGROUND.png')", // Imagen para dispositivos no móviles
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            overflow: "hidden",
            top: { xs: "48%", md: 0 },
            right: { xs: 0, md: "5%" },
            width: { xs: "80%", md: "50%" },
            height: "100%",
          }}
        >
          <BeforeAfterSlider
            firstImage={beforeImage}
            secondImage={afterImage}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "", md: "block" },
            position: "absolute",
            top: {
              xs: "38%",
              md: "70%",
            },
            left: {
              xs: '11%',
              md: "7%"
            },
            transform: "translateY(-50%)",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              const section = document.getElementById("design-section");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            color="primary"
            sx={{
              fontSize: {
                xs: "0.5rem",
                sm: "1.0rem",
                md: "1.0rem",
                lg: "1.5rem",
                xl: "2rem",
              },
              fontStyle: "italic",
              padding: { xs: "8px 16px", sm: "8px 16px", md: "8px 16px" },
            }}
          >
            Start Your Design
          </Button>
        </Box>
      </Box>

      {/* Banner Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: {
            xs: "84.375%", // 768x648 aspect ratio (648/768 = 0.84375)
            md: "33.8%", // 1920x1080 aspect ratio (1080/1920 = 0.5625)
          },
          backgroundImage: {
            xs: "url('/assets/images/free-design/DESIGN_INFERIOR_MOBILE.png')",
            md: "url('/assets/images/free-design/DESIGN_INFERIOR.png')",
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Steps Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: {
            xs: "220.3125%", // 768x1690 aspect ratio (1690/768 = 2.203125)
            md: "51.77%", // 1920x994 aspect ratio (994/1920 = 0.5177)
          },
          backgroundImage: {
            xs: "url('/assets/images/free-design/DESIGN_WORK_MOBILE.png')",
            md: "url('/assets/images/free-design/DESIGN_WORK.png')",
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

      </Box>

      {/* Form Section */}
      <Form />
    </Box>
  );
}
