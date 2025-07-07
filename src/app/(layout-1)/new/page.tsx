"use client"
import React from "react";
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Container, Link as MuiLink } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Section2 from "pages-sections/fashion-2/section-2";
import { useMediaQuery } from "@mui/material";

const creators = [
    {
        name: "@CLUBATLETICO",
        logo: "/assets/images/influencers/logos/logo.jpeg",
        link: "#",
    },
    {
        name: "@ARIELPILLO",
        logo: "/assets/images/influencers/logos/LOGO.png",
        link: "#",
    },
    {
        name: "@LANAVEDELMADRIDISMO",
        logo: "/assets/images/influencers/logos/LogoYHF Trans-White.png",
        link: "#",
    },
    {
        name: "@MIGHTYREDS_97",
        logo: "/assets/images/influencers/logos/logo2.png",
        link: "#",
    },
    {
        name: "YOHABLOFUTBOL",
        logo: "/creators/vikingovillarreal.png",
        link: "#",
    },
    {
        name: "@LOSDEROSA",
        logo: "/creators/clubamigos.png",
        link: "#",
    },

];

export default function PowFlickLanding() {
    const isMobile = useMediaQuery("(max-width:768px)", { noSsr: true });
    return (
        <Box sx={{ bgcolor: "#fff" }}>
            {/* Banner principal */}
            <Box
                sx={{
                    width: "100%",
                    minHeight: 480,
                    backgroundImage: 'url("/assets/images/influencers/landing/banner.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    py: { xs: 10, md: 16 },
                }}
            >
                <Box sx={{ textAlign: "center", color: "#fff", zIndex: 2 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ letterSpacing: 2, fontStyle: "italic" }}>
                        YOU&apos;RE NOT JUST A FAN.
                    </Typography>
                    <Typography variant="h2" fontWeight="bold" sx={{ letterSpacing: 2, mt: 1, fontStyle: "italic" }}>
                        YOU&apos;RE ON THE TEAM!
                    </Typography>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.35)",
                        zIndex: 1,
                    }}
                />
            </Box>

            {/* Support your favorite creator */}
            <Container sx={{ py: 6 }}>
                <Typography variant="h5" align="center" fontWeight="bold" color="error" gutterBottom>
                    SUPPORT YOUR FAVORITE CREATOR
                </Typography>
                <Typography align="center" sx={{ mb: 3 }}>
                    Shop a jersey from a top creator. Every sale supports your favorite influencer.
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {creators.map((c) => (
                        <Grid item xs={12} sm={6} md={4} key={c.name}>
                            <Card elevation={0} sx={{ alignItems: "center", boxShadow: "none", bgcolor: "#fafafa" }}>
                                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                                    <Image src={c.logo} alt={c.name} width={80} height={80} style={{ borderRadius: "50%" }} />
                                </Box>
                                <CardContent sx={{ textAlign: "center", pt: 0 }}>
                                    <Typography fontWeight="bold" fontSize={15}>{c.name}</Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        sx={{ mt: 1, fontWeight: 600, borderRadius: 2, px: 2 }}
                                        component={Link}
                                        href={c.link}
                                    >
                                        SHOP NOW
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>


            {/* TikTok section */}
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Image src="/tiktok-logo.svg" alt="TikTok" width={40} height={40} />
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                        THEIR STYLE, THEIR GAME.
                    </Typography>
                    <Typography sx={{ color: "#444", mb: 2 }}>
                        See our athletes in action! Straight from our fans and creators.
                    </Typography>
                </Box>
                {/* Widget oficial de TikTok para mostrar publicaciones de una cuenta */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <iframe
                        src="https://www.tiktok.com/embed/7507835328846204216"
                        width="325"
                        height="600"
                        style={{ border: "none", borderRadius: 12, maxWidth: "100%" }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="TikTok Video"
                    ></iframe>
                </Box>
            </Container>

            {/* Section 2 */}
            <Section2 className="section2" isMobile={isMobile} />

        </Box>
    );
}
