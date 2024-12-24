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
import Slider from "react-slick";

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
  height: 400,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
  ).toFixed(1);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container>
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
          Customer Reviews
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Typography variant="h5" mr={2} sx={{ color: "#2c3e50" }}>
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
        </FormControl>
      </Box>
      {isMobile ? (
        <Slider {...sliderSettings}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Slider>
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
  );
};

export default Reviews;
