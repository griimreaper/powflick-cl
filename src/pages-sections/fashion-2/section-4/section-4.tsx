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
    <Container sx={{ zIndex: 4, position: 'relative', mb: isMobile ? "clamp(2vw, 25rem, 40vw)" : "clamp(1vw, 4rem, 30vw)", height: "100%", mt: isMobile ? -6 : 6 }}>
      <Box sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "start" : "space-between",
        width: '100%',
        mb: 4,
      }}
      >
        <Typography
          variant="h2"
          component="h1"
          color={'primary.main'}
          sx={{
            // fontWeight: "bold",
            fontSize: "1.3rem",
            // fontStyle: "italic",
            fontFamily: "GYMER", // Añadir la fuente GYMER
            lineHeight: 1,
          }}
        >
          Best Selling Products
        </Typography>
        <Paragraph
          color={isMobile ? 'white' : 'primary.main'}
          sx={{
            fontWeight: isMobile ? "600" : "400",
            lineHeight: 3,
            fontSize: isMobile ? "0.7rem" : '1rem',
            fontStyle: "italic",
          }}
        >
          All Sports
        </Paragraph>
      </Box>

      <Carousel
        slidesToShow={4}
        responsive={responsive}
        arrowStyles={{top: "40%" }}
      >
        {products?.map((product) => (
          <ProductCard8 key={product.id} product={product} active={true} />
        ))}
      </Carousel>
    </Container>
  );
}
