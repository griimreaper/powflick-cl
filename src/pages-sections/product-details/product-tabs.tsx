"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
// LOCAL CUSTOM COMPONENTS
import { Review } from "models/types";
import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import PricingSection from "./pricing-section";
import DetailReviewList from "./DetailsReviewList";

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

export default function ProductTabs({ productPrice, reviews, hasInfluencer }: { productPrice: number, reviews: Review[], hasInfluencer?: boolean }) {
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
        {hasInfluencer ? <></> : <Tab className="inner-tab" label="Pricing Information" />}
        <Tab className="inner-tab" label={`Size Table`} />
        <Tab className="inner-tab" label={`Worldwide Shipping`} />
        <Tab className="inner-tab" label={`Reviews`} />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 &&
          <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} width={'100%'} height={'100%'} alignItems={'start'}>
            <Box width={{ xs: '100%', md: '50%' }} p={2} display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'space-around'} gap={2}>

              <Typography variant="body1" paragraph fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '14px', md: '14px' }}>POW FLICK</Typography> is a premium sportswear brand specializing in custom team uniforms for football, basketball, and more.
              </Typography>

              <Typography variant="body1" paragraph fontWeight={500} fontSize={{ xs: '14px', md: '14px' }} >
                We combine bold aesthetics, elite-level materials, and reliable production to help teams around the world stand out and perform at their best.
              </Typography>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '14px', md: '14px' }}>
                    {" "}Advanced Performance Fabrics
                  </Typography>
                  {" "}Our kits are crafted with lightweight, breathable, and sweat-wicking fabrics engineered for speed, comfort, and durability – field-tested by semi-pro athletes.
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '14px', md: '14px' }}>
                    {" "}Factory-Direct Supply
                  </Typography>
                  {" "}Chain With direct control over our manufacturing in Asia, we offer fast turnaround times, consistent quality, and competitive pricing with no middlemen.
                </Typography>
              </Box>

              <Box >
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '14px', md: '14px' }}>
                    {" "}Full Custom Design Support
                  </Typography>
                  {" From layout sketches to mockups and revisions, our creative team works side-by-side with clients to bring their team’s vision to life – no extra design fees, no limits on creativity. Whether you're a semi-pro club, a school team, or a growing brand, POW FLICK gives you the tools to compete with confidence and look the part."}
                </Typography>
              </Box>
            </Box>
            <Box width={{ xs: '100%', md: '50%' }} display={'flex'}>
              <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
                <Box width={{ xs: '100%', md: '50%' }} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'} gap={2} p={2} whiteSpace={'nowrap'} >
                  <Image
                    src="/assets/images/detail/description-image.png"
                    alt="description-image"
                    layout="responsive"
                    width={1000}
                    height={1000}
                  >
                  </Image>
                </Box>
                <Box width={{ xs: '100%', md: '50%' }} display={'flex'} flexDirection={{ xs: 'row', md: 'column' }} justifyContent={'space-between'} alignItems={'center'} gap={2} p={2} whiteSpace={'nowrap'} >
                  <Box width={{ xs: '45%', md: '60%' }} display={'flex'} flexDirection={'column'} gap={2} justifyContent={'center'} alignItems={'center'}>
                    <Typography fontWeight={'600'} fontSize={{ xs: '4vw', md: '1.5vw' }}>Heat Press Technique</Typography>
                    <Image
                      src="/assets/images/detail/description-image-element-1.png"
                      alt="description-image"
                      layout="responsive"
                      width={1000}
                      height={1000}
                    >
                    </Image>
                  </Box>
                  <Box width={{ xs: '45%', md: '60%' }} display={'flex'} flexDirection={'column'} gap={2} justifyContent={'center'} alignItems={'center'}>
                    <Typography fontWeight={'600'} fontSize={{ xs: '4vw', md: '1.5vw' }}>Stitch Embroidery</Typography>
                    <Image
                      src="/assets/images/detail/description-image-element-2.png"
                      alt="description-image"
                      layout="responsive"
                      width={1000}
                      height={1000}
                    >
                    </Image>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box >
        }
        {selectedOption === 2 &&
          <Box display='flex' flexDirection={{ xs: 'column' }} px={{ xs: 1, md: 4 }} justifyContent={'center'} width={'100%'} height={'100%'} alignItems={'center'} gap={2}>
            <Typography variant="h6" color="primary.main" fontWeight={800} mb={2} fontSize={{ xs: '4vw', md: '30px' }}>
              English Size Table
            </Typography>
            <Box display={'flex'} width={'60%'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'} justifyContent={'center'} gap={2}>
              <Box width={{ xs: '80%', md: '30%' }}>
                <Image
                  src="/assets/images/detail/size-table-english-mobile-1.png"
                  alt="size-image"
                  layout="responsive"
                  width={1000}
                  height={1000}
                />
              </Box>
              <Box width={{ xs: '100%', md: '70%' }}>
                <Image
                  src="/assets/images/detail/size-table-english.png"
                  alt="size-image-2"
                  layout="responsive"
                  width={1000}
                  height={1000}
                />
              </Box>
            </Box>
            <Typography variant="h6" color="primary.main" fontWeight={800} mb={2} fontSize={{ xs: '4vw', md: '30px' }}>
              Spanish Size Table
            </Typography>
            <Box display={'flex'} width={'60%'} flexDirection={{ xs: 'column', md: 'row' }} alignItems={'center'} justifyContent={'center'} gap={2}>
              <Box width={{ xs: '100%', md: '30%' }}>
                <Image
                  src="/assets/images/detail/size-table-spanish-mobile-1.png"
                  alt="size-image"
                  layout="responsive"
                  width={1000}
                  height={1000}
                />
              </Box>
              <Box width={{ xs: '100%', md: '70%' }}>
                <Image
                  src="/assets/images/detail/size-table-spanish.png"
                  alt="size-image-2"
                  layout="responsive"
                  width={1000}
                  height={1000}
                />
              </Box>
            </Box>
          </Box>
        }
        {selectedOption === 1 &&
          <Box display={'flex'} flexDirection={{ xs: 'column' }} justifyContent={'center'} width={'100%'} height={'100%'} alignItems={'center'}>
            <PricingSection price={productPrice} />
          </Box>
        }
        {
          selectedOption === 3 &&
          <Grid container spacing={4} p={4}>
            {/* Columna izquierda */}
            <Grid item xs={12} md={6} textAlign={{ xs: 'center', md: 'left' }} display={'flex'} flexDirection={'column'} gap={2} >
              <Box display={'flex'} flexDirection={'column'} textAlign={{ xs: 'center', md: 'left' }} justifyContent={'center'} height={'100%'} gap={{ xs: 5, md: 2 }}>
                <Typography variant="h6" color="primary.main" fontWeight={800} mb={2} fontSize={{ xs: '14px', md: '14px' }}>
                  Worldwide Express Shipping. Reliable. On Time.
                </Typography>
                <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                  At <strong style={{ color: '#CA0B0B' }}>POW FLICK</strong>{", we deliver custom sportswear to teams across the globe. Whether you're ordering from the U.S., Latin America, Europe, or beyond — we've got you covered."}
                </Typography>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '14px', md: '14px' }}>- Production & Processing Time</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>All custom uniforms are made-to-order. Our standard production timeline is
                    3-4 weeks, depending on the order size and complexity.</Typography>
                </Box>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '14px', md: '14px' }}>- International Express Delivery</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>We ship worldwide via trusted logistics partners (FedEx, DHL, etc.), ensuring
                    safe and timely delivery.</Typography>
                </Box>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '14px', md: '14px' }}>- Estimated Shipping Time</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                    North America & Europe: 5–10 business days
                  </Typography>

                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                    Latin America: 7–12 business days
                  </Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                    Asia & Oceania: 3–7 business days
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Columna derecha */}
            <Grid item xs={12} md={6} textAlign={{ xs: 'center', md: 'left' }} display={'flex'}>
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'} height={'100%'} gap={{ xs: '50px', md: '106px' }}>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '14px', md: '14px' }}>- Tracking</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                    {"Once your order is shipped, you'll receive a tracking number and real-time updates directly to your inbox.Need support with delivery or logistics? Contact us at support@powflick.com — our team is here to assist."}
                  </Typography>
                </Box>
                <Box width={'100%'} maxWidth={{ xs: '100%', md: '300px' }} height={'auto'} display={'flex'} flexDirection={{ xs: 'column' }} justifyContent={'center'} alignItems={'center'} gap={6} px={{ xs: 0, sm: 6 }}>
                  <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} gap={6}>
                    <Image
                      src="/assets/images/detail/worldwide_1.png"
                      alt="size-image-2"
                      layout="responsive"
                      width={1000}
                      height={1000}
                    />
                    <Image
                      src="/assets/images/detail/worldwide_2.png"
                      alt="size-image-2"
                      layout="responsive"
                      width={1000}
                      height={1000}
                    />
                  </Box>
                  <Box width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} gap={6} >
                    <Image
                      src="/assets/images/detail/worldwide_3.png"
                      alt="size-image-2"
                      layout="responsive"
                      width={1000}
                      height={1000}
                    />
                    <Image
                      src="/assets/images/detail/worldwide_4.png"
                      alt="size-image-2"
                      layout="responsive"
                      width={1000}
                      height={1000}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

        }
        {
          selectedOption === 4 &&
          <DetailReviewList reviews={reviews} />
        }
      </Box >
    </>
  );
}
