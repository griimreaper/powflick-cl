"use client";
import { Box, Container, Grid, Typography, Avatar } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const Background = styled(Box)({
  backgroundImage: 'url("/assets/images/newsletter/bg-100.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "100px 0",
});

const Title = styled(Typography)({
  fontWeight: "bold",
  // textTransform: "uppercase",
  letterSpacing: "2px",
});

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

const AboutUs = () => {
  return (
    <Background>
      <Container>
        <Title variant="h2" align="center" color="black" gutterBottom>
          About Us
        </Title>
        <Typography variant="h6" align="center" color="grey" paragraph>
          We are committed to providing the best products and services.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <AnimatedBox>
              <Avatar
                src="/assets/images/avatars/002-woman.svg"
                alt="Team Member 1"
                sx={{ width: 200, height: 200, margin: "auto" }}
              />
              <Typography variant="h5" align="center" color="black">
                John Doe
              </Typography>
              <Typography variant="body1" align="center" color="grey">
                CEO
              </Typography>
            </AnimatedBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <AnimatedBox>
              <Avatar
                src="/assets/images/avatars/001-man.svg"
                alt="Team Member 2"
                sx={{ width: 200, height: 200, margin: "auto" }}
              />
              <Typography variant="h5" align="center" color="black">
                Jane Smith
              </Typography>
              <Typography variant="body1" align="center" color="grey">
                CTO
              </Typography>
            </AnimatedBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <AnimatedBox>
              <Avatar
                src="/assets/images/avatars/002-girl.svg"
                alt="Team Member 3"
                sx={{ width: 200, height: 200, margin: "auto" }}
              />
              <Typography variant="h5" align="center" color="black">
                Mike Johnson
              </Typography>
              <Typography variant="body1" align="center" color="grey">
                CFO
              </Typography>
            </AnimatedBox>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Title variant="h4" align="center" color="black" gutterBottom>
            Our Mission
          </Title>
          <Typography variant="body1" align="center" color="grey" paragraph>
            Our mission is to deliver high-quality products that bring joy and
            convenience to our customers lives.
          </Typography>
          <AnimatedBox mt={4}>
            <img
              src="/assets/images/newsletter/bg-5.png"
              alt="Our Mission"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </AnimatedBox>
        </Box>
        <Box mt={8}>
          <Title variant="h4" align="center" color="black" gutterBottom>
            Our Vision
          </Title>
          <Typography variant="body1" align="center" color="grey" paragraph>
            Our vision is to be a global leader in the industry, known for our
            innovation and customer-centric approach.
          </Typography>
          <AnimatedBox mt={4}>
            <img
              src="/assets/images/newsletter/bg-4.png"
              alt="Our Vision"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </AnimatedBox>
        </Box>
        <Box mt={8}>
          <Title variant="h4" align="center" color="black" gutterBottom>
            Our Values
          </Title>
          <Typography variant="body1" align="center" color="grey" paragraph>
            We value integrity, excellence, and teamwork. We strive to create a
            positive impact on our community and the environment.
          </Typography>
          <AnimatedBox mt={4}>
            <img
              src="/assets/images/newsletter/bg-3.png"
              alt="Our Values"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </AnimatedBox>
        </Box>
      </Container>
    </Background>
  );
};

export default AboutUs;
