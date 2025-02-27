"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Rating,
  Container,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { Settings } from "react-slick";
import { Carousel } from "components/carousel";
import { Paragraph } from "components/Typography";

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

const ProductImage = styled("img")(() => ({
  width: "min(500px,100%)",
  aspectRatio: "1 / 1",
  objectFit: "cover",
  borderRadius: "8px",
  marginBottom: "16px",
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: "#FFD700",
  },
  "& .MuiRating-iconHover": {
    color: "#FFD700",
  },
}));

const ReviewCard = ({ review }: any) => {
  return (
    <Fade in timeout={1000}>
      <StyledCard>
        <Box display="flex" alignItems="center" mb={1} justifyContent={'start'}>
          <StyledAvatar src={review.avatar} alt={review.name} />
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
        <ProductImage src={review.image} alt="Product" />

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
  review: any[];
}

const Reviews: React.FC<ReviewsProps> = ({ review }) => {
  const [sortBy, setSortBy] = useState("date");
  const [reviews, setReviews] = useState(review);
  const theme = useTheme();
  const isMobile = useMediaQuery(("(max-width: 768px)"));
  const responsive = [
    { breakpoint: 1024, settings: { slidesToShow: 4 } },
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 600, settings: { slidesToShow: 2 } }
  ];
  const handleSortChange = (event: any) => {
    const value = event.target.value;
    setSortBy(value);
    let sortedReviews = [...reviews];

    if (value === "date") {
      sortedReviews.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (value === "rating") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    }

    setReviews(sortedReviews);
  };

  const averageRating = reviews?.length
    ? (
      reviews.reduce((acc, curr) => Number(acc) + Number(curr.rating), 0) /
      reviews.length
    ).toFixed(1)
    : "0";

  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: true,
  };

  return (
    reviews.length > 0 &&
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

      <Container sx={{ position: "relative", zIndex: 4, mt: 6 }}>
        <Box sx={{
          textAlign: "center",
          display: "flex",
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
        <Box mb={4} sx={{ textAlign: "" }}>
          {/* <Typography
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
            People Love Us
          </Typography> */}
          {/* <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Typography variant="h5" mr={2} sx={{ color: "#2c3e50"}}>
            Average Rating: {averageRating}
          </Typography>
          <StyledRating
            value={parseFloat(averageRating)}
            readOnly
            precision={0.1}
            size="large"
          />
        </Box>
        <FormControl
          sx={{
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            },
          }}
        >
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="date">Sort by Date</MenuItem>
            <MenuItem value="rating">Sort by Rating</MenuItem>
          </Select>
        </FormControl> */}
        </Box>
        {isMobile ? (
          <Carousel
            slidesToShow={4}
            responsive={responsive}
            arrowStyles={{ backgroundColor: "white", top: "45%" }}
          >
            {reviews.slice(0, 3).map((review) => (
              <Box key={review.id} padding={0.2}>
                <ReviewCard key={review.id} review={review} />
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
            {[...reviews, ...reviews].filter(r => r.type === "ORDER").map((review) => (
              <React.Fragment key={review.id}>
                <ReviewCard review={review} />
              </React.Fragment>
            ))}
          </Carousel>
        )}
      </Container>
    </Box>

  );
};

export default Reviews;
