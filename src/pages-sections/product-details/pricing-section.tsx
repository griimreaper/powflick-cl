import { Box, Grid, Typography, Paper, Button, Divider } from '@mui/material';
import { useState } from 'react';

const PricingSection = () => {
    const tiers = ['10>20', '21>50', '51>100', '101>250', '250+'];

    type Tier =
        | '10>20'
        | '21>50'
        | '51>100'
        | '101>250'
        | '250+';

    // Simulación de precios por tier
    const prices: Record<Tier, number> = {
        '10>20': 30,
        '21>50': 28,
        '51>100': 26,
        '101>250': 24,
        '250+': 22,
    };

    const tierMinQuantity: Record<Tier, number> = {
        '10>20': 10,
        '21>50': 21,
        '51>100': 51,
        '101>250': 101,
        '250+': 251,
    };

    const PricingCard = ({ title }: { title: string }) => {
        const [quantity, setQuantity] = useState(10);
        const [selectedTier, setSelectedTier] = useState<Tier>('10>20');

        const handleQuantityChange = (delta: number) => {
            const newQty = Math.max(1, quantity + delta);
            setQuantity(newQty);

            // Ajustar el tier automáticamente en base a la cantidad
            if (newQty <= 20) setSelectedTier('10>20');
            else if (newQty <= 50) setSelectedTier('21>50');
            else if (newQty <= 100) setSelectedTier('51>100');
            else if (newQty <= 250) setSelectedTier('101>250');
            else setSelectedTier('250+');
        };

        const handleTierClick = (tier: Tier) => {
            setSelectedTier(tier);
            setQuantity(tierMinQuantity[tier]);
        };

        return (
            <Paper elevation={5} sx={{ p: 2 }}>
                <Typography variant="h6" color="primary.main" fontWeight="700" textAlign={{ xs: 'center', md: 'left' }} mb={2}>
                    {title}
                </Typography>

                <Divider
                    orientation="horizontal"
                    sx={{
                        mb: 2,
                        borderBottomWidth: '2px', // Grosor de la línea
                    }}
                />

                <Box display="flex" justifyContent="space-between" flexDirection={{ xs: 'column', md: 'row' }} height={'100%'} mb={2}>
                    <Box display="flex" justifyContent="space-between" flexDirection={'column'} mb={2} width={{ xs: '100%', md: '70%' }}>
                        <Box display="flex" justifyContent="space-between" mb={2} width={'100%'} gap={2}>
                            {tiers.map((tier, idx) => (
                                <Typography
                                    key={idx}
                                    fontWeight={tier === selectedTier ? 'bold' : 'normal'}
                                    color={tier === selectedTier ? 'primary' : 'textPrimary'}
                                    borderBottom={tier === selectedTier ? '2px solid' : '2px solid'}
                                    sx={{ cursor: 'pointer' }}
                                    fontSize={{ xs: '4vw', md: '1vw' }}
                                    onClick={() => handleTierClick(tier as Tier)}
                                >
                                    {tier}
                                </Typography>
                            ))}
                        </Box>

                        <Box width={'100%'} display="flex" justifyContent={{ xs: "center", md: 'start' }} alignItems="center">
                            <Box
                                display="flex"
                                alignItems="center"
                                border="1px solid black"
                                borderRadius="4px"
                                width="fit-content"
                                mt={1}
                            >
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => handleQuantityChange(-1)}
                                    sx={{ minWidth: '32px', color: 'black' }}
                                >
                                    –
                                </Button>
                                <Box px={2}>
                                    <Typography>{quantity}</Typography>
                                </Box>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => handleQuantityChange(1)}
                                    sx={{ minWidth: '32px', color: 'black' }}
                                >
                                    +
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Divider orientation={'vertical'} sx={{ border: '2', height: { xs: '0', md: '100px' }, mx: 2, color: 'black' }}></Divider>
                    <Box display="flex" width={{ xs: '100%', md: '35%' }} justifyContent="space-between" alignItems="center">
                        <Box textAlign={{ xs: 'center', md: 'left' }} width={'100%'}>
                            <Typography variant="body2" fontWeight={600} fontSize={{ xs: '4vw', md: '1vw' }}>
                                Unit price for {quantity} pcs: <strong>${prices[selectedTier]}</strong>
                            </Typography>
                            <Typography color="textSecondary" fontSize={{ xs: '3vw', md: '0.8vw' }}>
                                Price includes shipping, excludes customization
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper >
        );
    };

    return (
        <Box p={4}>
            <Typography
                variant="h5"
                color="primary.main"
                fontWeight="700"
                textAlign="center"
            >
                PRICING INFORMATION:
            </Typography>

            <Grid container spacing={4} mt={{ xs: 2, md: 4 }}>
                {/* Texto izquierdo */}
                <Grid item xs={12} md={5} display={'flex'} flexDirection="column" justifyContent="center" gap={2} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography color="primary.main" fontWeight="700" fontSize={{ xs: '4vw', md: '1.2rem' }}>
                        Flexible Pricing. Team-Friendly Rates.
                    </Typography>
                    <Typography paragraph fontSize={{ xs: '4vw', md: '1.2rem' }}>
                        At POW FLICK, we offer competitive pricing for custom sports uniforms, designed to fit
                        teams of all sizes and budgets.
                    </Typography>

                    <Typography color="primary.main" fontWeight="700" fontSize={{ xs: '4vw', md: '1.2rem' }}>
                        Transparent Price Range
                    </Typography>
                    <Typography paragraph fontSize={{ xs: '4vw', md: '1.2rem' }}>
                        Our prices vary based on the product type, customization level, and quantity ordered.
                        Whether you’re ordering for a small team or an entire club, we’ll tailor the offer to
                        match your needs.
                    </Typography>

                    <Typography color="primary.main" fontWeight="700" fontSize={{ xs: '4vw', md: '1.2rem' }}>
                        Bulk Order Discounts
                    </Typography>
                    <Typography paragraph fontSize={{ xs: '4vw', md: '1.2rem' }}>
                        The more you order, the better the rate. We offer tiered pricing, so teams placing
                        larger orders enjoy lower per-unit costs — ideal for clubs, schools, or resellers.
                    </Typography>
                </Grid>

                {/* Tarjetas de precios */}
                <Grid item xs={12} md={7}>
                    <Box mb={3}>
                        <PricingCard title="TOP:" />
                    </Box>
                    <PricingCard title="UNIFORM (JERSEY + PANTS):" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PricingSection;
