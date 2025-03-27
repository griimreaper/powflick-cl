"use client";
import React from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Rating,
  Container,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";
import { Paragraph } from "components/Typography";
import Image from "next/image";
import { Carousel } from "components/carousel";
import { Review } from "models/types";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  padding: 8,
  position: 'relative',
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
  borderRadius: "8px",
  width: "min(500px, 100%)",
  minHeight: "300px", // Ajusta esto según el contenido
  height: "auto",
  overflow: "visible", // Evita que se corte el contenido
}));


const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: "clamp(30px, 4vw, 100px)",  // Tamaño responsivo para el avatar
  height: "clamp(30px, 4vw, 100px)",  // Ajusta la altura también
  border: "3px solid #fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: "#FFD700",
  },
  "& .MuiRating-iconHover": {
    color: "#FFD700",
  },
}));

export const ReviewCard = ({ review }: { review: Review | any }) => {
  return (
    <Fade in timeout={1000}>
      <StyledCard>
        <Box display="flex" alignItems="center" mb={1} justifyContent={'start'}>
          <StyledAvatar src={review.user.image} alt={review.user.email} />
          <Box ml={1}>
            <Typography
              component="div"
              sx={{ fontWeight: "bold", color: "#2c3e50", fontSize: "clamp(8px,1vw,10vw)", whiteSpace: "nowrap" }}
            >
              {review.user.firstName} {review.user.lastName}
            </Typography>
            <Typography variant="body2" sx={{ color: "#7f8c8d", fontSize: "clamp(7px,0.8vw,100%)" }}>
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#7f8c8d", fontWeight: "bold", fontSize: "clamp(7px,0.8vw,100%)" }}
            >
              {review.title}
            </Typography>
          </Box>
        </Box>
        <StyledRating
          value={Number(review.rating)}
          readOnly
          precision={0.5}
          sx={{ mb: 1, fontSize: "clamp(1vw, 1.5vw, 100%)" }}
        />
        {review.image && review.image.split('//').shift()?.includes('http') &&
          <Image
            src={review.image || ''}
            alt="Product"
            width={500}
            height={0}
            layout="responsive"
            loading="lazy"
            style={{
              width: "min(500px,100%)",
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "16px",
            }} />
        }
        <Typography
          variant="body1"
          sx={{
            color: "#34495e",
            lineHeight: 1.6,
            fontStyle: "italic",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "wrap",  // Este asegura que el texto no se divida
            fontSize: "clamp(8px,0.8vw,2vw)"
          }}
        >
          {review.review}
        </Typography>
      </StyledCard>
    </Fade>
  );
};

interface ReviewsProps {
  review: Review[];
  isMobile?: boolean;
}

export const Reviews: React.FC<ReviewsProps> = ({ review, isMobile }) => {
  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 4 } },
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } }
  ];

  return (
    review?.length > 0 &&
    <Box
      component="section"
      mb={isMobile ? "clamp(2vw, 4rem, 40vw)" : "clamp(1vw, 4rem, 30vw)"}
      sx={{
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
          zIndex: 1,
        },
      }}
    >

      <Container sx={{ position: "relative", zIndex: 4 }}>
        <Box sx={{
          textAlign: "center",
          display: "flex",
          my: 6,
          flexDirection: isMobile ? "column" : "row",
          width: '100%',
          alignItems: "center",
          justifyContent: isMobile ? "flex-start" : "space-between",
        }}
        >
          <Typography
            variant="h3"
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
            PEOPLE LOVE US
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
            Customer Reviews
          </Paragraph>
        </Box>
        {isMobile ? (
          <Carousel
            slidesToShow={4}
            responsive={responsive}
            arrowStyles={{ backgroundColor: "white", top: "45%" }}
          >
            {review.slice(0, 3).map((review) => (
              <Box key={review.id} padding={0.2}>
                <ReviewCard review={review} />
              </Box>
            ))}
          </Carousel>
        ) : (
          <Carousel
            slidesToShow={4}
            responsive={responsive}
            spaceBetween={20}
            arrowStyles={{ backgroundColor: "white", top: "50%" }}
            useCSS
          >
            {[...review, ...review].filter(r => r.type === "ORDER").map((review, id) => (
              <Box key={id}>
                <ReviewCard review={review} />
              </Box>
            ))}
          </Carousel>
        )}
      </Container>
    </Box>

  );
};
