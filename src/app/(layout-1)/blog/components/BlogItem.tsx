
"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardMedia, Typography, Chip, Box, Divider } from "@mui/material";

interface BlogProps {
  data: {
    id: string;
    image: string;
    title: string;
    date: string;
    tag: string;
    author: string;
    shortDesc: string;
  };
  type: string;
}

const BlogItem: React.FC<BlogProps> = ({ data, type }) => {
  const router = useRouter();
  const handleBlogClick = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  return (
    <>
      {type === "style-one" ? (
        <Card className="blog-item style-one" onClick={() => handleBlogClick(data.id)} sx={{ cursor: "pointer", height: "100%" }}>
          <CardMedia component="img" image={data.image} alt="blog-img" sx={{ borderRadius: 2 }} />
          <CardContent>
            <Chip label="Health" color="primary" sx={{ mb: 2 }} />
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {data.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                {data.author}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" color="text.secondary">
                {data.date}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : type === "style-list" ? (
        <Card className="blog-item style-list" onClick={() => handleBlogClick(data.id)} sx={{ cursor: "pointer", height: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
          <CardMedia component="img" image={data.image} alt="blog-img" sx={{ borderRadius: 2, flexShrink: 0, width: { md: "50%" } }} />
          <CardContent>
            <Chip label={data.tag} color="primary" sx={{ mb: 2 }} />
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {data.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                by {data.author}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" color="text.secondary">
                {data.date}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {data.shortDesc}
            </Typography>
            <Typography variant="body2" color="primary" sx={{ mt: 2, textDecoration: "underline" }}>
              Read More
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card className="blog-item style-default" onClick={() => handleBlogClick(data.id)} sx={{ cursor: "pointer", height: "100%", pb: 2, borderBottom: 1, borderColor: "divider" }}>
          <CardMedia component="img" image={data.image} alt="blog-img" sx={{ borderRadius: 2 }} />
          <CardContent>
            <Chip label={data.tag} color="primary" sx={{ mb: 2 }} />
            <Typography variant="h6" component="div" sx={{ mb: 1 }}>
              {data.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                by {data.author}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" color="text.secondary">
                {data.date}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {data.shortDesc}
            </Typography>
            <Typography variant="body2" color="primary" sx={{ mt: 2, textDecoration: "underline" }}>
              Read More
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BlogItem;