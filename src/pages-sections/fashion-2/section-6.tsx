import { Box, Typography, useMediaQuery } from "@mui/material";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { H2, Paragraph } from "components/Typography";
import { Carousel } from "components/carousel";
import ProductCard8 from "components/product-cards/product-card-8";
import { DataStructure } from "models/types";
import Link from "next/link";
// API FUNCTIONS


export default async function Section6({ products }: { products: DataStructure['landing']['collections']['discountProducts'] }) {
  const isMobile = useMediaQuery(("(max-width: 768px)")); // Detecta pantallas menores a 600px (breakpoint "sm")
  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 2 } }
  ];

  return (
    <Box
      component="section"
      mb={{ sm: 0, xs: 7 }}
      sx={{
        position: "relative",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: isMobile ? "flex-start" : "space-between",
        backgroundImage: "url('assets/images/landing/POWFLICK-_FONDO-PRODUCTOS-41.png')", backgroundSize: "cover", backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50px",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
          zIndex: 1,
        },
      }}
    >
      <Container className="mt-4" sx={{ position: "relative", zIndex: 2, mb: 4 }}>
        <Box sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: '100%',
          mb: 4,
          alignItems: "center",
          justifyContent: isMobile ? "flex-start" : "space-between",
        }}
        >
          <Typography
            variant="h2"
            component="h1"
            color={'primary.main'}
            sx={{
              // fontWeight: "bold",
              fontSize: "1.3rem",
              background:
                "primary.main",
              // fontStyle: "italic",
              fontFamily: "GYMER", // Añadir la fuente GYMER
              lineHeight: 1,
            }}
          >
            Discount Products
          </Typography>
          <Link href={'/products?discount=true'}>
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
          </Link>
        </Box>

        <Carousel
          slidesToShow={4}
          responsive={responsive}
          arrowStyles={{ backgroundColor: "white", top: "40%" }}
        >
          {products?.map((product) => (
            <ProductCard8 key={product.id} product={product} active={true} />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
