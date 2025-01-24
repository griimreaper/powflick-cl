import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { H2, Paragraph } from "components/Typography";
import CategoryCard1 from "components/category-cards/category-card-1";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Carousel } from "components/carousel";

const sportsCategories = [
  {
    id: 1,
    title: "Soccer",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-SOCCER.png",
    link: "/products?category=Custom%Soccer%20Jerseys"
  },
  {
    id: 2,
    title: "Basketball",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-BASKETBALL.png",
    link: "/products?category=Custom%20Basketball%20Jerseys"
  },
  {
    id: 3,
    title: "Running",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-RUNNING.png",
    link: "/products?category=Running%20Clothes"
  },
  {
    id: 4,
    title: "Gamer",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-GAMING.png",
    link: "/products?category=Gamer%20Shirts"
  },
  {
    id: 5,
    title: "Baseball",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-BASEBALL.png",
    link: "/products?category=Custom%20Baseball%20Jerseys"
  },
  {
    id: 6,
    title: "Hockey",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-HOCKEY.png",
    link: "/products?category=Custom%20Hockey%20Jerseys"
  },
];

export default async function Section3({ className }: { className: string }) {
  const isMobile = useMediaQuery("(max-width: 600px)"); // Detecta si es móvil

  return (
    <Container className={`mt-2 ${className}`} sx={{ overflow: "visible", position: "relative" }}>
      {isMobile ? (
        <Box sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
                "white",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // fontStyle: "italic",
              fontFamily: "GYMER", // Añadir la fuente GYMER
              lineHeight: 1,
            }}
          >
            CATEGORIES
          </Typography>
          <Paragraph
            sx={{
              fontWeight: "bold",
              color: "darkred",
              lineHeight: 1,
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
            sx={{
              // fontWeight: "bold",
              background:
                "white",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              // fontStyle: "italic",
              fontFamily: "GYMER", // Añadir la fuente GYMER
            }}
          >
            CATEGORIES
          </Typography>
        </Box>
      )
      }

      <Carousel slidesToShow={isMobile ? 2 : 4} >
        {sportsCategories.map((item) => (
          <Box sx={{ position: "relative", mb:8 }}>
          <CategoryCard1 key={item.title} image={item.image} title={item.title} link={item.link} />
          </Box>
        ))}
      </Carousel>
    </Container >
  );
}
