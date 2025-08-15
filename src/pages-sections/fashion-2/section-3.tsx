'use client';
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import CategoryCard1 from "components/category-cards/category-card-1";
// API FUNCTIONS
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Carousel } from "components/carousel";
import { LazyLoadSection } from "./LazyLoadSection";
import { useTranslations } from "next-intl";

const sportsCategories = (t: ReturnType<typeof useTranslations>) => [
  {
    id: 1,
    title: t("categorySoccer"),
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-SOCCER.png",
    link: "/products?category=Custom%20Soccer%20Jerseys"
  },
  {
    id: 2,
    title: t("categoryBasketball"),
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-BASKETBALL.png",
    link: "/products?category=Custom%20Basketball%20Jerseys"
  },
  {
    id: 3,
    title: t("categoryRunning"),
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-RUNNING.png",
    link: "/products?category=Running%20clothes"
  },
  {
    id: 4,
    title: t("categoryGamer"),
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-GAMING.png",
    link: "/products?category=Gamer%20Shirts"
  },
  {
    id: 5,
    title: t("categoryBaseball"),
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-BASEBALL.png",
    link: "/products?category=Custom%20Baseball%20Jerseys"
  },
  {
    id: 6,
    title: t("categoryHockey"),
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-HOCKEY.png",
    link: "/products?category=Custom%20Hockey%20Jerseys"
  },
];

export default function Section3({ className, isMobile }: { className: string, isMobile: boolean }) {
  const t = useTranslations("Home");
  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 4 } },
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } }
  ];

  return (
    <Container
      className={`${className}`}
      style={{
        display: "flex",
        height: isMobile ? "45%" : "50%",
        justifyContent: "flex-end",
        width: "100%",
        flexDirection: "column",
        marginTop: isMobile ? '4vw' : 0,
      }}
    >
      {isMobile ? (
        <Box
          sx={{
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
              color: 'white',
              // fontStyle: "italic",
              fontFamily: "GYMER", // Añadir la fuente GYMER
              lineHeight: 1,
            }}
          >
            {t("categories")}
          </Typography>
          <Link href={"/products"}>
            <Paragraph
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                lineHeight: 1,
                fontSize: "0.7rem",
                fontStyle: "italic",
              }}
            >
              {t("allSports")}
            </Paragraph>
          </Link>
        </Box>
      ) : (
        <Box mb={4} overflow={'visible'}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              textAlign: 'start',
              color: "white",
              fontFamily: "GYMER", // Añadir la fuente GYMER
            }}
          >
            {t("categories")}
          </Typography>
        </Box>
      )}

      <Carousel responsive={responsive}>
        {sportsCategories(t).map((item) => (
          <Box key={item.id} sx={{ position: "relative" }}>
            <CategoryCard1
              image={item.image}
              title={item.title}
              link={item.link}
            />
          </Box>
        ))}
      </Carousel>
    </Container>
  );
}
