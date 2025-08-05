import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function SizeTableTab() {
    return (
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
    )
}
