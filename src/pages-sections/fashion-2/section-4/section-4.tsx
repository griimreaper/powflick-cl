import { Box, Typography, useMediaQuery } from "@mui/material";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { H2, Paragraph } from "components/Typography";
import { Carousel } from "components/carousel";
import ProductCard8 from "components/product-cards/product-card-8";
import { DataStructure } from "models/types";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";

export default async function Section4({ products }: { products: DataStructure['landing']['collections']['mostSoldProducts'] }) {
  const isMobile = useMediaQuery(("(max-width: 768px)")); // Detecta pantallas menores a 600px (breakpoint "sm")

  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 2 } }
  ];

  return (
    <Container sx={{ zIndex: 4, position: 'relative', mb: isMobile ? "12rem" : 0, height: "100%", mt: isMobile ? -6 : 6 }}>
      {isMobile ? (
        <Box sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
          justifyContent: "flex-start",
        }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              // fontWeight: "bold",
              fontSize: "1.3rem",
              background:
                "#A30E0E",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // fontStyle: "italic",
              fontFamily: "GYMER", // Añadir la fuente GYMER
              lineHeight: 1,
            }}
          >
            Best Selling Products
          </Typography>
          <Paragraph
            sx={{
              fontWeight: "600",
              color: "white",
              lineHeight: 3,
              fontSize: "0.7rem",
              fontStyle: "italic",
            }}
          >
            All Sports
          </Paragraph>
        </Box>
      ) : (
        <Box mb={4}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              // fontWeight: "bold",
              background: "#A30E0E",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // fontStyle: "italic",
              fontFamily: "GYMER", // Añadir la fuente GYMER
            }}
          >
            Best Selling Products
          </Typography>
        </Box>
      )
      }

      <Carousel
        slidesToShow={4}
        responsive={responsive}
      >
        {products?.map((product) => (
          <ProductCard8 key={product.id} product={product} active={true} />
        ))}
      </Carousel>
    </Container>
  );
}
