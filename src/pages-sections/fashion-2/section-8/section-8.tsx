import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// GLOBAL CUSTOM COMPONENTS
import { H2 } from "components/Typography";
// Local CUSTOM COMPONENT
import BlogCard from "./blog-card";
// API FUNCTIONS
import api from "utils/__api__/fashion-2";
import { Box, Typography } from "@mui/material";

export default async function Section8() {
  const blogs = await api.getBlogs();

  return (
    <Container className="mt-4">
      {/* <H2 textAlign="center" mb={4}>
        Latest Articles
      </H2> */}
      <Box mb={4} sx={{ textAlign: "center" }}>

       <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: "bold",
            background: "linear-gradient(45deg, #2c3e50 30%,rgb(219, 52, 52) 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1rem"
          }}
        >
          Latest Articles
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {blogs.map((item) => (
          <Grid item md={4} xs={12} key={item.id}>
            <BlogCard
              title={item.title}
              date={item.createdAt}
              image={item.thumbnail}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
