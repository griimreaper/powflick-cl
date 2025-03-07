"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// LOCAL CUSTOM COMPONENT
import LogoSection from "./components/logo";
import AboutLinks from "./components/about-links";
import SocialLinks from "./components/social-links";
import CustomerCareLinks from "./components/customer-care-links";
// GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
// STYLED COMPONENTS
import { Heading } from "./styles";
import CategoriesLinks from "./components/categories-links";
import { DataStructure } from "models/types";

export default function Footer1({ data }: { data: DataStructure["navbar"] }) {
  return (
    <Box
      component="footer"
      bgcolor="#1A1A1A"
      mb={{ sm: 0, xs: 7 }}
      sx={{
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50px",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
          zIndex: 1,
        },
      }}
    >
      <Box
        component={Container}
        color="white"
        py={{ sm: 10, xs: 4 }}
        position="relative"
        zIndex={2}
      >
        <Grid container spacing={4}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <LogoSection />
          </Grid>

          {/* ABOUT US LINKS */}
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <AboutLinks />
          </Grid>

          {/* CUSTOMER CARE LINKS */}
          <Grid item lg={2} md={2} sm={6} xs={12}>
            <CustomerCareLinks />
          </Grid>

          {/* Categories LINKS */}
          <Grid item lg={2} md={4} sm={6} xs={12}>
            <CategoriesLinks list={data?.categories} />
          </Grid>

          {/* CONTACT & SOCIAL LINKS */}
          <Grid item lg={2} md={4} sm={6} xs={12}>
            {/* CONTACT INFORMATION */}
            <Heading style={{ color: "#A30E0E" }}>Contact Us</Heading>

            <Paragraph py={0.6} color="grey.500">
              B15-280, Xia Nan Yi Heng Base Section, Guicheng Subdistrict, Nanhai District, Foshan City, Guangdong Province, China.
            </Paragraph>

            <Paragraph py={0.6} color="grey.500">
              Email: info@powflick.com
            </Paragraph>

            <Paragraph py={0.6} mb={2} color="grey.500">
              Phone: +86 159 2011 0846
            </Paragraph>

            {/* SOCIAL LINKS WITH ICON */}
            <SocialLinks />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
