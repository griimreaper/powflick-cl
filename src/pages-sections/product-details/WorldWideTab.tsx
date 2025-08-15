import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function WorldWideTab() {
    return (
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
                    <Box width={'100%'} maxWidth={{ xs: '50%', md: '300px' }} height={'auto'} display={'flex'} flexDirection={{ xs: 'column' }} justifyContent={'center'} alignItems={'center'} gap={6} px={{ xs: 0, sm: 6 }}>
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
    )
}
