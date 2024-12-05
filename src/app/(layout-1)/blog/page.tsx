"use client";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled, keyframes } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import BlogItem from "./components/BlogItem";

// Datos mockeados
const mockBlogs = [
  {
    id: "1",
    title: "Blog Post 1",
    date: "2023-10-01",
    image: "/path/to/image1.jpg",
    description: "Description for blog post 1",
    tag: "Health",
    author: "Author 1",
    shortDesc: "Short description for blog post 1",
  },
  {
    id: "2",
    title: "Blog Post 2",
    date: "2023-10-02",
    image: "/path/to/image2.jpg",
    description: "Description for blog post 2",
    tag: "Health",
    author: "Author 2",
    shortDesc: "Short description for blog post 2",
  },
  {
    id: "3",
    title: "Blog Post 3",
    date: "2023-10-03",
    image: "/path/to/image3.jpg",
    description: "Description for blog post 3",
    tag: "Health",
    author: "Author 3",
    shortDesc: "Short description for blog post 3",
  },
];

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedBox = styled(Box)({
  animation: `${fadeIn} 2s ease-in-out`,
});

// Estilo para el título
const Title = styled(Typography)({
  fontWeight: "bold",
  // textTransform: "uppercase",
  letterSpacing: "2px",
});

const Background = styled(Box)({
  backgroundImage: 'url("/assets/images/newsletter/bg-100.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "100px 0",
});

export default function BlogPage() {
  const [blogs, setBlogs] = useState(mockBlogs);

  return (
    <Background>
      <Container>
        <Title variant="h2" align="center" color="black" gutterBottom>
          Latest Articles
        </Title>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {blogs.map((item) => (
                <Grid item md={4} xs={12} key={item.id}>
                  <AnimatedBox>
                    <BlogItem data={item} type="style-one" />
                  </AnimatedBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Background>
  );
}
