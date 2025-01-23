import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { H2 } from "components/Typography";
import CategoryCard1 from "components/category-cards/category-card-1";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";
import { Box, Typography } from "@mui/material";

const sportsCategories = [
  {
    id: 1,
    title: "Soccer",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-SOCCER.png",
  },
  {
    id: 2,
    title: "Basketball",
    image:
      "/assets/images/landing/categories/POWFLICK_CATEGORIA-BASKETBALL.png",
  },
  {
    id: 3,
    title: "Running",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-RUNNING.png",
  },
  {
    id: 4,
    title: "Gamer",
    image: "/assets/images/landing/categories/POWFLICK_CATEGORIA-GAMING.png",
  },
];

export default async function Section3({ className }: { className: string }) {
  return (
    <Container className={`mt-4 ${className}`}>
      <Box mb={4} sx={{ textAlign: "" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            // fontWeight: "bold",
            background:
              "white",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
            // fontStyle: "italic",
            fontFamily: "GYMER", // Añadir la fuente GYMER
          }}
        >
          CATEGORIES
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sportsCategories.map((item) => (
          <Grid item md={3} sm={6} xs={12} key={item.id}>
            <CategoryCard1 image={item.image} title={item.title} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
