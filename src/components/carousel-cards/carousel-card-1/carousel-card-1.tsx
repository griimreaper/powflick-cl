import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
// GLOBAL CUSTOM COMPONENTS
import SportZoneImage from "components/SportZoneImage";
import { Paragraph } from "components/Typography";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
import { Box, Typography } from "@mui/material";
import BannerTop from "components/BannerTop";
import Image from "next/image";
import Link from "next/link";

// ==================================================
interface Props {
  title?: string;
  imgUrl: string;
  buttonLik?: string;
  buttonText?: string;
  description?: string;
  buttonColor?: "dark" | "primary";
}
// ==================================================

export default function CarouselCard1({
  title,
  imgUrl,
  buttonLik,
  buttonText,
  description,
  buttonColor = "primary",
}: Props) {
  return (
    <>
      {/* <Grid item className="grid-item" xl={4} md={5} sm={6} xs={12}>
            <Box mb={4} sx={{ textAlign: "left" }}>
              <Typography
                className="title"
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
                {title}
              </Typography>
            </Box>
            <Paragraph color="secondary.main" mb={2.7}>
              {description}
            </Paragraph>

            <a href={buttonLik}>
              <Button
                size="large"
                disableElevation
                color={buttonColor}
                variant="contained"
                className="button-link"
                sx={{ height: 44, borderRadius: "4px" }}
              >
                {buttonText}
              </Button>
            </a>
          </Grid> */}
      <Link href={'/products'}>
        <Image
          src={`/${imgUrl}`}
          alt="image slider"
          layout="responsive"
          width={700}
          height={400}
          style={{
            margin: "auto",
            display: "block",
            maxWidth: "100%",
          }}
        />
      </Link>
    </>
  );
}
