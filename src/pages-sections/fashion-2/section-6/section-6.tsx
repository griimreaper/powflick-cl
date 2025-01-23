import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { H2 } from "components/Typography";
import { Carousel } from "components/carousel";
import ProductCard8 from "components/product-cards/product-card-8";
import { DataStructure } from "models/types";
// API FUNCTIONS


export default async function Section6({ products }: { products: DataStructure['landing']['collections']['discountProducts'] }) {
  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } }
  ];

  return (
    <Box
      component="section"
      bgcolor="#1A1A1A"
      mb={{ sm: 0, xs: 7 }}
      sx={{
        position: "relative",
        overflow: "hidden",
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
      <Container className="mt-4" sx={{ position: "relative", zIndex: 2 }}>
        <Box mb={4} sx={{ textAlign: "" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              // fontWeight: "bold",
              background: "#A30E0E",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "1rem",
              // fontStyle: "italic",
              fontFamily: "GYMER",
            }}
          >
            Discount Products
          </Typography>
        </Box>

        <Carousel
          slidesToShow={4}
          responsive={responsive}
          arrowStyles={{ backgroundColor: "dark.main", top: "34%" }}
        >
          {products?.map((product) => (
            <ProductCard8 key={product.id} product={product} active={true} />
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
