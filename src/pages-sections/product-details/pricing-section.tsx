import { Box, Grid, Typography, Paper, Button, Divider, TextField } from '@mui/material';
import { useState } from 'react';

const PricingSection = ({ price }: { price: number }) => {
    const tiers = ['10-20', '21-50', '51-100', '101-250', '250+'];

    type Tier =
        | '10-20'
        | '21-50'
        | '51-100'
        | '101-250'
        | '250+';

    const getTieredPricesTop = (basePrice: number): Record<Tier, number> => {
        const fixedDiscounts: Record<Tier, number> = {
            '10-20': 0,
            '21-50': 1,
            '51-100': 2,
            '101-250': 3,
            '250+': 6,
        };

        return {
            '10-20': +(basePrice - fixedDiscounts['10-20']).toFixed(2),
            '21-50': +(basePrice - fixedDiscounts['21-50']).toFixed(2),
            '51-100': +(basePrice - fixedDiscounts['51-100']).toFixed(2),
            '101-250': +(basePrice - fixedDiscounts['101-250']).toFixed(2),
            '250+': +(basePrice - fixedDiscounts['250+']).toFixed(2),
        };
    };

    const getTieredPricesUniform = (basePrice: number): Record<Tier, number> => {
        const fixedDiscounts: Record<Tier, number> = {
            '10-20': 0,
            '21-50': 2,
            '51-100': 4,
            '101-250': 6,
            '250+': 8,
        };

        return {
            '10-20': +(basePrice - fixedDiscounts['10-20']).toFixed(2),
            '21-50': +(basePrice - fixedDiscounts['21-50']).toFixed(2),
            '51-100': +(basePrice - fixedDiscounts['51-100']).toFixed(2),
            '101-250': +(basePrice - fixedDiscounts['101-250']).toFixed(2),
            '250+': +(basePrice - fixedDiscounts['250+']).toFixed(2),
        };
    };

    const pricesTop = getTieredPricesTop(26.99 - 10);
    const pricesUniform = getTieredPricesUniform(26.99);

    const tierMinQuantity: Record<Tier, number> = {
        '10-20': 10,
        '21-50': 21,
        '51-100': 51,
        '101-250': 101,
        '250+': 251,
    };

    const PricingCard = ({ title, prices }: { title: string; prices: Record<Tier, number> }) => {
        const [quantity, setQuantity] = useState(10);
        const [selectedTier, setSelectedTier] = useState<Tier>('10-20');
        const [inputValue, setInputValue] = useState('10'); // 👈 nuevo estado string

        // actualiza ambos estados y el tier
        const updateQuantity = (newQty: number) => {
            setQuantity(newQty);
            setInputValue(String(newQty));
            if (newQty <= 20) setSelectedTier('10-20');
            else if (newQty <= 50) setSelectedTier('21-50');
            else if (newQty <= 100) setSelectedTier('51-100');
            else if (newQty <= 250) setSelectedTier('101-250');
            else setSelectedTier('250+');
        };

        const handleQuantityChange = (delta: number) => {
            const newQty = Math.max(1, quantity + delta);
            setQuantity(newQty);
            setInputValue(String(newQty)); // 👈 actualizar inputValue también

            // Ajustar el tier automáticamente en base a la cantidad
            if (newQty <= 20) setSelectedTier('10-20');
            else if (newQty <= 50) setSelectedTier('21-50');
            else if (newQty <= 100) setSelectedTier('51-100');
            else if (newQty <= 250) setSelectedTier('101-250');
            else setSelectedTier('250+');
        };

        const handleTierClick = (tier: Tier) => {
            const newQty = tierMinQuantity[tier];
            setSelectedTier(tier);
            setQuantity(newQty);
            setInputValue(String(newQty));
        };
        return (
            <Paper elevation={5} sx={{ p: 2, borderRadius: 4, }}>
                <Typography variant="h6" color="primary.main" fontWeight="bold" textAlign={{ xs: 'center', md: 'left' }} mb={2}>
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
                        <Box display="flex" justifyContent="space-around" mb={2} width={'100%'} gap={'8px'}>
                            {tiers.map((tier, idx) => (
                                <Typography
                                    key={idx}
                                    sx={{
                                        position: 'relative',
                                        cursor: 'pointer',
                                        fontWeight: tier === selectedTier ? 'bold' : 'normal',
                                        fontSize: '14px',
                                        pb: '2px', // Padding bottom para hacer espacio al borde
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            width: '70%',
                                            height: '3px',
                                            backgroundColor: tier === selectedTier ? '#ca0b0b' : '#ccc',
                                            transition: 'background-color 0.3s ease'
                                        },
                                    }}
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
                                justifyContent={'space-between'}
                                border="1px solid #ccc"
                                width={{ xs: "50%", md: "40%" }}
                                maxWidth={"150px"}
                                height={'30px'}
                                mt={1}
                                ml={{ xs: 0, md: 2 }}
                            >
                                <Button
                                    variant="text"
                                    onClick={() => handleQuantityChange(-1)}
                                    sx={{
                                        width: '30%',
                                        color: 'white',
                                        backgroundColor: 'black',
                                        borderRadius: '0px',
                                        height: '30px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'black', // mismo color que normal para quitar efecto
                                            boxShadow: 'none',        // opcional, quitar sombra si la hay
                                        },
                                    }}
                                >
                                    –
                                </Button>
                                <Box px={2} width={'72%'}>
                                    <TextField
                                        value={inputValue}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            // Evitar que se ingresen más de 4 dígitos
                                            if (value.length > 4) return;

                                            setInputValue(value);

                                            const parsed = parseInt(value, 10);
                                            if (!isNaN(parsed) && parsed > 0) {
                                                setQuantity(parsed);
                                                if (parsed <= 20) setSelectedTier('10-20');
                                                else if (parsed <= 50) setSelectedTier('21-50');
                                                else if (parsed <= 100) setSelectedTier('51-100');
                                                else if (parsed <= 250) setSelectedTier('101-250');
                                                else setSelectedTier('250+');
                                            }
                                        }}
                                        type="number"
                                        inputProps={{ min: 1, maxLength: 4 }}
                                        variant="standard"
                                        sx={{
                                            input: {
                                                textAlign: 'center',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                width: '100%',
                                                padding: 0,
                                                border: 'none',
                                                boxSizing: 'border-box',
                                            },
                                            '& .MuiInput-underline:before': {
                                                borderBottom: 'none',
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottom: 'none',
                                            },
                                            '& .MuiInput-root': {
                                                '&:hover:not(.Mui-disabled):before': {
                                                    borderBottom: 'none',
                                                },
                                            },
                                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                                WebkitAppearance: 'none',
                                                margin: 0
                                            }
                                        }}
                                    />

                                </Box>
                                <Button
                                    variant="text"
                                    onClick={() => handleQuantityChange(+1)}
                                    sx={{
                                        width: '30%',
                                        color: 'white',
                                        backgroundColor: 'black',
                                        borderRadius: '0px',
                                        height: '30px',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'black', // mismo color que normal para quitar efecto
                                            boxShadow: 'none',        // opcional, quitar sombra si la hay
                                        },
                                    }}
                                >
                                    +
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    <Divider orientation={'vertical'} sx={{ border: '2', height: { xs: '0', md: '60px' }, mx: 2, borderColor: 'black' }}></Divider>
                    <Box display="flex" width={{ xs: '100%', md: '35%' }} justifyContent="space-between" alignItems="start">
                        <Box textAlign={{ xs: 'center', md: 'left' }} width={'100%'}>
                            <Typography variant="body2" fontWeight={'bold'} fontSize={'14px'}>
                                Unit price for {quantity} pcs: <strong>${prices[selectedTier].toFixed(2)}</strong>
                            </Typography>
                            <Typography color="textSecondary" fontSize={'10px'}>
                                Price includes shipping, excludes customization
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper >
        );
    };

    return (
        <Box>
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
                    <Typography color="primary.main" fontWeight="700" fontSize={'14px'}>
                        Flexible Pricing. Team-Friendly Rates.
                    </Typography>
                    <Typography paragraph fontSize={'14px'}>
                        At POW FLICK, we offer competitive pricing for custom sports uniforms, designed to fit
                        teams of all sizes and budgets.
                    </Typography>

                    <Typography color="primary.main" fontWeight="700" fontSize={'14px'}>
                        Transparent Price Range
                    </Typography>
                    <Typography paragraph fontSize={'14px'}>
                        Our prices vary based on the product type, customization level, and quantity ordered.
                        Whether you’re ordering for a small team or an entire club, we’ll tailor the offer to
                        match your needs.
                    </Typography>

                    <Typography color="primary.main" fontWeight="700" fontSize={'14px'}>
                        Bulk Order Discounts
                    </Typography>
                    <Typography paragraph fontSize={'14px'}>
                        The more you order, the better the rate. We offer tiered pricing, so teams placing
                        larger orders enjoy lower per-unit costs — ideal for clubs, schools, or resellers.
                    </Typography>
                </Grid>

                {/* Tarjetas de precios */}
                <Grid item xs={12} md={7}>
                    <Box mb={3}>
                        <PricingCard title="TOP:" prices={pricesTop} />
                    </Box>
                    <PricingCard title="UNIFORM (JERSEY + SHORTS):" prices={pricesUniform} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PricingSection;
