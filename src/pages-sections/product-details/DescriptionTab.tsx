import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function DescriptionTab() {
    return (
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
    )
}
