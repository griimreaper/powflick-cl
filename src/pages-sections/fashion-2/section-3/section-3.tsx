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
    title: "Football",
    image: "/assets/images/categories/new/CATEGORIAS_SOCCER.png",
  },
  {
    id: 2,
    title: "Basketball",
    image: "/assets/images/categories/new/CATEGORIAS_BASKETBALL.png",
  },
  {
    id: 3,
    title: "Running",
    image: "/assets/images/categories/new/CATEGORIAS_RUNNING.png",
  },
  {
    id: 4,
    title: "Baseball",
    image: "/assets/images/categories/new/CATEGORIAS_BASEBALL.png",
  },
];

export default async function Section3() {
  return (
    <Container className="mt-4">
      <Box mb={4} sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background:
              "linear-gradient(45deg, #2c3e50 30%,rgb(219, 52, 52) 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem",
          }}
        >
          Categories
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
