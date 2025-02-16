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

export default function Home() {
  const beforeImage = { imageUrl: "/DESIGN_MAN_1.png" }; // Ruta de la imagen antes
  const afterImage = { imageUrl: "/DESIGN_MAN_2.png" }; // Ruta de la imagen después

  return (
    <Container maxWidth={false} style={{ backgroundColor: "white" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: "56.25%", // 1920x1080 aspect ratio (1080/1920 = 0.5625)
          backgroundImage: "url('/DESIGN_BACKGROUND.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "5%",
            width: "50%",
            height: "100%",
          }}
        >
          <BeforeAfterSlider
            firstImage={beforeImage}
            secondImage={afterImage}
          />
        </div>
        <Box
          sx={{
            position: "absolute",
            top: "70%",
            left: "7%",
            transform: "translateY(-50%)",
          }}
        >
          <Button
            variant="contained"
            color="error"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              fontSize: {
                xs: "0.5rem",
                sm: "0.50rem",
                md: "1.5rem",
                xl: "2rem",
              },
              padding: { xs: "4px 8px", sm: "4px 8px", md: "8px 16px" },
            }}
          >
            Customize Now
          </Button>
        </Box>
      </Box>

      {/* Banner Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: "33.8%", // 1920x649 aspect ratio (649/1920 = 0.338)
          backgroundImage: "url('/DESIGN_INFERIOR.png')",
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
          paddingTop: "51.77%", // 1920x994 aspect ratio (994/1920 = 0.5177)
          backgroundImage: "url('/DESIGN_WORK.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "20%", // Ajusta la posición vertical del botón
            left: "50%",
            transform: "translateX(-50%)", // Centra el botón horizontalmente
          }}
        >
          <Button
            variant="contained"
            color="error"
            sx={{
              bgcolor: "primary.main",
              color: "white",
              fontSize: {
                xs: "0.5rem",
                sm: "0.50rem",
                md: "1.5rem",
                xl: "2rem",
              },
              padding: { xs: "4px 8px", sm: "4px 8px", md: "8px 16px" },
            }}
          >
            Customize Now
          </Button>
        </Box>
      </Box>

      {/* Form Section */}
      <Form />
    </Container>
  );
}
