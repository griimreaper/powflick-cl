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
import ProductComment from "./product-comment";
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

export default function ProductTabs({ productPrice, reviews }: { productPrice: number, reviews: Review[] }) {
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

      </Box >
    </>
  );
}
