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
// MATERIAL UI ICONS
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useMediaQuery } from "@mui/material";

export default function Footer1({ data }: { data: DataStructure["navbar"] }) {
  const isMobile = useMediaQuery("(max-width:768px)");
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
        pt={{ xs: 4, sm: 10 }}
        pb={{ xs: 6, sm: 8, md: 4 }}
        position="relative"
        zIndex={2}

      >
        <Grid
          container
          spacing={4}
        >
          {/* LOGO SOLO EN MOBILE/TABLET */}
          <Grid
            item
            xs={12}
            display={{ xs: "flex", lg: "none" }}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb={{ xs: 4, lg: 0 }} // margin bottom solo en mobile/tablet
          >
            <LogoSection />

          </Grid>

          {/* CONTENIDO PRINCIPAL EN UNA SOLA FILA EN DESKTOP */}
          <Grid item xs={12}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="flex-start"
            >
              {/* LOGO EN DESKTOP */}
              <Grid
                item
                md={3}
                lg={2}
                display={{ xs: "none", lg: "flex" }}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mr={{ xs: 0, lg: 16 }} // margin right solo en desktop

              >
                <LogoSection />
                {/* Texto debajo del logo */}
                {/* <Box
                  mt={2}
                  mb={2}
                  sx={{
                    fontWeight: 700,
                    fontStyle: "italic",
                    color: "white",
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    textAlign: "center",
                    whiteSpace: "nowrap", // fuerza una sola línea
                    pl: 10,
                  }}
                >
                  FOR TEAM BEHIND THE DREAM
                </Box> */}
              </Grid>
              {/* ABOUT US LINKS */}
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                display="flex"
                flexDirection="column"
                alignItems={{ xs: "center", lg: "flex-start" }}
                justifyContent="center"
              >
                <AboutLinks />
              </Grid>
              {/* CUSTOMER CARE LINKS */}
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                display="flex"
                flexDirection="column"
                alignItems={{ xs: "center", lg: "flex-start" }}
                justifyContent="center"
              >
                <CustomerCareLinks />
              </Grid>
              {/* Categories LINKS */}
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                display="flex"
                flexDirection="column"
                alignItems={{ xs: "center", lg: "flex-start" }}
                justifyContent="center"
              >
                <CategoriesLinks list={data?.categories} />
              </Grid>
              {/* CONTACT & SOCIAL LINKS */}
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                display="flex"
                flexDirection="column"
                alignItems={{ xs: "center", lg: "flex-start" }}
                justifyContent="center"
              >
                {/* CONTACT INFORMATION */}
                <Heading style={{ color: "#CA0B0B", marginBottom: "24px" }}>Contact Us</Heading>

                <Paragraph py={0.6} color="grey.500">
                  <LocationOnIcon
                    sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }}
                  />
                  RM C, 6/F, WORLD TRUST TOWER, 50 STANLEY STREET, CENTRAL HK
                </Paragraph>

                <Paragraph py={0.6} color="grey.500">
                  Registered Office (Legal Entity):
                  CL 28 #113 57, Cali – Valle, Colombia
                  NIT: 1231234

                </Paragraph>

                <Paragraph py={0.6} color="grey.500">
                  <EmailIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
                  Email: support@powflick.com
                </Paragraph>

                <Paragraph py={0.6} mb={2} color="grey.500">
                  <PhoneIcon sx={{ fontSize: 18, verticalAlign: "middle", mr: 1 }} />
                  Phone: +86 13590635129
                </Paragraph>


              </Grid>
            </Grid>
          </Grid>
          {/* FOOTER BOTTOM */}
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent={{ xs: "center", md: "space-between" }}
              width="100%"
              textAlign={{ xs: "center", md: "left" }}
              gap={2}
              px={{ xs: 0, md: 3, lg: 6 }} // 32px padding horizontal solo en desktop
            >
              <Box>

                {/* Tarjetas de pago */}
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  mb={2}
                  width="100%"
                >
                  <img src="/assets/images/payment-methods/visa.png" alt="Visa" height={isMobile ? 28 : 36} style={{ background: "#fff", borderRadius: 4 }} />
                  <img src="/assets/images/payment-methods/paypal.png" alt="PayPal" height={isMobile ? 28 : 36} style={{ background: "#fff", borderRadius: 4 }} />
                  <img src="/assets/images/payment-methods/amex.png" alt="American Express" height={isMobile ? 28 : 36} style={{ background: "#016FD0", borderRadius: 4 }} />
                  <img src="/assets/images/payment-methods/discover.png" alt="discover" height={isMobile ? 28 : 36} style={{ background: "#fff", borderRadius: 4 }} />
                  <img src="/assets/images/payment-methods/master-card.png" alt="master-card" height={isMobile ? 28 : 36} style={{ background: "#016FD0", borderRadius: 4 }} />
                </Box>
                {/* SOCIAL LINKS WITH ICON */}
                <Paragraph
                  color="white"
                  sx={{ fontSize: { lg: "1.1rem" }, fontStyle: "italic" }}
                >
                  Copyright © 2025 All rights reserved by Powflick.
                </Paragraph>
              </Box>
              <SocialLinks />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
}
