"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
import { useTranslations } from "next-intl";
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
  const t = useTranslations('ProductTabs');
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
  <Tab className="inner-tab" label={t('tabs.description')} />
  {hasInfluencer ? <></> : <Tab className="inner-tab" label={t('tabs.pricing')} />}
  <Tab className="inner-tab" label={t('tabs.sizeTable')} />
  <Tab className="inner-tab" label={t('tabs.shippingWorldwide')} />
  <Tab className="inner-tab" label={t('tabs.reviews')} />
      </StyledTabs>

      <Box mb={6}>
        {selectedOption === 0 &&
          <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} width={'100%'} height={'100%'} alignItems={'start'}>
            <Box width={{ xs: '100%', md: '50%' }} p={2} display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'space-around'} gap={2}>

              <Typography variant="body1" paragraph fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '14px', md: '14px' }}>POW FLICK</Typography> {t('description.intro1')}
              </Typography>

              <Typography variant="body1" paragraph fontWeight={500} fontSize={{ xs: '14px', md: '14px' }} >
                {t('description.intro2')}
              </Typography>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '14px', md: '14px' }}>
                    {" "}{t('description.bullet1.title')}
                  </Typography>
                  {" "}{t('description.bullet1.body')}
                </Typography>
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '14px', md: '14px' }}>
                    {" "}{t('description.bullet2.title')}
                  </Typography>
                  {" "}{t('description.bullet2.body')}
                </Typography>
              </Box>

              <Box >
                <Typography variant="body1" fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                  -
                  <Typography component="span" fontWeight="bold" color="primary.main" fontSize={{ xs: '14px', md: '14px' }}>
                    {" "}{t('description.bullet3.title')}
                  </Typography>
                  {t('description.bullet3.body')}
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
                    <Typography fontWeight={'600'} fontSize={{ xs: '4vw', md: '1.5vw' }}>{t('description.techniques.heatPress')}</Typography>
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
                    <Typography fontWeight={'600'} fontSize={{ xs: '4vw', md: '1.5vw' }}>{t('description.techniques.stitchEmbroidery')}</Typography>
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
              {t('size.englishTitle')}
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
              {t('size.spanishTitle')}
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
                  {t('shipping.heading')}
                </Typography>
                <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                  {t.rich('shipping.lead', { brand: () => <strong style={{ color: '#CA0B0B' }}>POW FLICK</strong> })}
                </Typography>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '14px', md: '14px' }}>- {t('shipping.productionTitle')}</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>{t('shipping.productionBody')}</Typography>
                </Box>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '14px', md: '14px' }}>- {t('shipping.intlDeliveryTitle')}</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>{t('shipping.intlDeliveryBody')}</Typography>
                </Box>

                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '14px', md: '14px' }}>- {t('shipping.estimatedTitle')}</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                    {t('shipping.estimated.naeu')}
                  </Typography>

                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                    {t('shipping.estimated.latam')}
                  </Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                    {t('shipping.estimated.asia')}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Columna derecha */}
            <Grid item xs={12} md={6} textAlign={{ xs: 'center', md: 'left' }} display={'flex'}>
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'} height={'100%'} gap={{ xs: '50px', md: '106px' }}>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                  <Typography variant="subtitle1" color="primary.main" fontWeight={800} fontSize={{ xs: '14px', md: '14px' }}>- {t('shipping.trackingTitle')}</Typography>
                  <Typography fontWeight={500} fontSize={{ xs: '14px', md: '14px' }}>
                    {t('shipping.trackingBody')}
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
