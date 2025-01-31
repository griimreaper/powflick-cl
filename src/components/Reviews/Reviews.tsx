"use client";
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Container,
  Fade,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import Slider, { Settings } from "react-slick";
import { Carousel } from "components/carousel";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
  borderRadius: "16px",
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
    animation: `${pulse} 1s ease-in-out`,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 70,
  height: 70,
  border: "3px solid #fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
}));

const ProductImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: 300,
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
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <StyledAvatar src={review.avatar} alt={review.name} />
            <Box ml={2}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                {review.user.firstName} {review.user.lastName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#7f8c8d", fontWeight: "bold" }}
              >
                {review.title}
              </Typography>
            </Box>
          </Box>
          <StyledRating
            value={review.rating}
            readOnly
            precision={0.5}
            sx={{ mb: 2 }}
          />
          <ProductImage src={review.image} alt="Product" />

          <Typography
            variant="body1"
            sx={{
              color: "#34495e",
              lineHeight: 1.6,
              fontStyle: "italic",
              "&::before": {
                content: '"\u201C"',
                fontSize: "1.5em",
                marginRight: "4px",
                color: "#3498db",
              },
              "&::after": {
                content: '"\u201D"',
                fontSize: "1.5em",
                marginLeft: "4px",
                color: "#3498db",
              },
            }}
          >
            {review.review}
          </Typography>
        </CardContent>
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
    { breakpoint: 1200, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } },
    { breakpoint: 426, settings: { slidesToShow: 1 } }
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
      bgcolor="#1A1A1A"
      mb={"10rem"}
      sx={{
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40px",
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
          zIndex: 1,
        },
      }}
    >

      <Container className="mt-4" sx={{ position: "relative", zIndex: 4 }}>
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
            People Love Us
          </Typography>
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
            arrowStyles={{ backgroundColor: "white", top: "34%" }}
          >
            {reviews.slice(0, 3).map((review) => (
              <Box key={review.id} padding={2}>
                <ReviewCard key={review.id} review={review} />
              </Box>
            ))}
          </Carousel>
        ) : (
          <Grid container spacing={3}>
            {reviews.map((review) => (
              <React.Fragment key={review.id}>
                {review.type === "ORDER" && (
                  <Grid item xs={12} sm={6} md={4}>
                    <ReviewCard review={review} />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        )}
      </Container>
    </Box>

  );
};

export default Reviews;
