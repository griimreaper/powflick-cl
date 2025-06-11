"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
// LOCAL CUSTOM COMPONENTS
import { Review } from "models/types";
import { H3, H4 } from "components/Typography";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaApplePay, FaGooglePay } from "react-icons/fa";
import ProductComment from "./product-comment";
import { Reviews } from "components/Reviews/Reviews";
import { Grid, Typography, Zoom } from "@mui/material";
import Image from "next/image";
import PricingSection from "./pricing-section";


// STYLED COMPONENT
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize"
  }
}));

interface Props {
  content: string,
  reviews: Review[],
  paymentMethods: { text: string },
  shippingTypes: string
}

export default function ProductTabs({ paymentMethods, shippingTypes }: Props) {
  const [selectedOption, setSelectedOption] = useState(0);
  const handleOptionClick = (_: any, value: number) => setSelectedOption(value);

  return (
    <>
      <StyledTabs
        textColor="primary"
        value={selectedOption}
        indicatorColor="primary"
        onChange={handleOptionClick}
        variant='scrollable'
      >
        <Tab className="inner-tab" label="Description" />
        <Tab className="inner-tab" label={`Size Table`} />
        <Tab className="inner-tab" label={`Worldwide Shipping`} />
        <Tab className="inner-tab" label={`Pricing Information`} />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 &&
          <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} width={'100%'} height={'100%'} alignItems={'center'}>
            <Box width={{ xs: '100%', md: '50%' }} p={2} display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'space-around'} gap={2}>

              <Typography variant="body1" paragraph fontWeight={500} fontSize={{ xs: '4vw', md: '1.2vw' }}>
                <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '4vw', md: '1.2vw' }}>POW FLICK</Typography> is a premium sportswear brand specializing in custom team uniforms for football, basketball, and more.
              </Typography>

              <Typography variant="body1" paragraph fontWeight={500} fontSize={{ xs: '4vw', md: '1.2vw' }} >
                We combine bold aesthetics, elite-level materials, and reliable production to help teams around the world stand out and perform at their best.
              </Typography>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '4vw', md: '1.2vw' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '4vw', md: '1.2vw' }}>
                    {" "}Advanced Performance Fabrics
                  </Typography>
                  {" "}Our kits are crafted with lightweight, breathable, and sweat-wicking fabrics engineered for speed, comfort, and durability – field-tested by semi-pro athletes.
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '4vw', md: '1.2vw' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '4vw', md: '1.2vw' }}>
                    {" "}Factory-Direct Supply
                  </Typography>
                  {" "}Chain With direct control over our manufacturing in Asia, we offer fast turnaround times, consistent quality, and competitive pricing with no middlemen.
                </Typography>
              </Box>

              <Box >
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '4vw', md: '1.2vw' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '4vw', md: '1.2vw' }}>
                    {" "}Full Custom Design Support
                  </Typography>
                  {" From layout sketches to mockups and revisions, our creative team works side-by-side with clients to bring their team’s vision to life – no extra design fees, no limits on creativity. Whether you're a semi-pro club, a school team, or a growing brand, POW FLICK gives you the tools to compete with confidence and look the part."}
                </Typography>
              </Box>
            </Box>
            <Box width={'50%'} display={{ xs: 'none', md: 'block' }}>
              <Image
                src="/assets/images/detail/description-image.png"
                alt="description-image"
                layout="responsive"
                width={1000}
                height={1000}
              >
              </Image>
            </Box>
            <Box width={'100%'} display={{ xs: 'block', md: 'none' }} mt={2}>
              <Image
                src="/assets/images/detail/description-image-mobile.png"
                alt="description-image"
                layout="responsive"
                width={1000}
                height={1000}
              >
              </Image>
            </Box>
          </Box>
        }
        {selectedOption === 1 &&
          <>
            <Box display={{ xs: 'none', md: 'flex' }} flexDirection={{ xs: 'column' }} justifyContent={'center'} width={'100%'} height={'100%'} alignItems={'center'} gap={2}>
              <Image
                src="/assets/images/detail/size-table-english.png"
                alt="size-image"
                layout="responsive"
                width={1000}
                height={1000}
              />
              <Image
                src="/assets/images/detail/size-table-spanish.png"
                alt="size-image-2"
                layout="responsive"
                width={1000}
                height={1000}
              />
            </Box>
            <Box display={{ md: 'none', xs: 'flex' }} flexDirection={{ xs: 'column' }} justifyContent={'center'} width={'100%'} height={'100%'} alignItems={'center'} gap={2}>
              <Image
                src="/assets/images/detail/size-table-english-mobile-1.png"
                alt="size-image"
                layout="responsive"
                width={1000}
                height={1000}
              />
              <Image
                src="/assets/images/detail/size-table-english-mobile-2.png"
                alt="size-image-2"
                layout="responsive"
                width={1000}
                height={1000}
              />
              <Image
                src="/assets/images/detail/size-table-spanish-mobile-1.png"
                alt="size-image"
                layout="responsive"
                width={1000}
                height={1000}
              />
              <Image
                src="/assets/images/detail/size-table-spanish-mobile-2.png"
                alt="size-image-2"
                layout="responsive"
                width={1000}
                height={1000}
              />
            </Box>
          </>
        }
        {selectedOption === 2 &&
          <Grid container spacing={4} p={4}>
            {/* Columna izquierda */}
            <Grid item xs={12} md={6} textAlign={{ xs: 'center', md: 'left' }} display={'flex'} flexDirection={'column'} gap={2} >
              <Box display={'flex'} flexDirection={'column'} textAlign={{ xs: 'center', md: 'left' }} justifyContent={'center'} height={'100%'} gap={{ xs: 5, md: 2 }}>                <Typography variant="h6" color="primary.main" fontWeight={800} mb={2} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>
                Worldwide Express Shipping. Reliable. On Time.
              </Typography>
                <Typography fontWeight={500} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>
                  At <strong style={{ color: '#CA0B0B' }}>POW FLICK</strong>{", we deliver custom sportswear to teams across the globe. Whether you're ordering from the U.S., Latin America, Europe, or beyond — we've got you covered."}
                </Typography>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>- Production & Processing Time</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>All custom uniforms are made-to-order. Our standard production timeline is
                    3-4 weeks, depending on the order size and complexity.</Typography>
                </Box>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>- International Express Delivery</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>We ship worldwide via trusted logistics partners (FedEx, DHL, etc.), ensuring
                    safe and timely delivery.</Typography>
                </Box>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>- Estimated Shipping Time</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>
                    North America & Europe: 5–10 business days
                  </Typography>

                  <Typography fontWeight={500} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>
                    Latin America: 7–12 business days
                  </Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>
                    Asia & Oceania: 3–7 business days
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Columna derecha */}
            <Grid item xs={12} md={6} textAlign={{ xs: 'center', md: 'left' }}>
              <Box display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'space-between'} height={'100%'} gap={2}>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>- Tracking</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '3.5vw', md: '1.2vw' }}>
                    {"Once your order is shipped, you'll receive a tracking number and real-time updates directly to your inbox.Need support with delivery or logistics? Contact us at support@powflick.com — our team is here to assist."}
                  </Typography>
                </Box>
                <Image
                  src="/assets/images/detail/worldwide-image.png"
                  alt="size-image-2"
                  layout="responsive"
                  width={1000}
                  height={1000}
                />
              </Box>
            </Grid>
          </Grid>

        }
        {selectedOption === 3 &&
          <Box display={'flex'} flexDirection={{ xs: 'column' }} justifyContent={'center'} width={'100%'} height={'100%'} alignItems={'center'} gap={2}>
            <PricingSection />
          </Box>
        }
      </Box >
    </>
  );
}
