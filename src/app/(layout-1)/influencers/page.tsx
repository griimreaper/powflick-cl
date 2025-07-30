"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, Container, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Section2 from "pages-sections/fashion-2/section-2";
import { getInfluencers } from "services/Influencers";

export default function PowFlickLanding() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [influencers, setInfluencers] = useState<any[]>([]);

    useEffect(() => {
        getInfluencers().then(setInfluencers);
    }, []);




    return (
        <Box sx={{ bgcolor: "#fff" }}>
            {/* Banner principal */}
            <Box
                sx={{
                    width: "100%",
                    minHeight: "680",
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
                    <Typography variant="h3" fontWeight="bold" sx={{ letterSpacing: 2, fontStyle: "italic" }}>
                        YOU&apos;RE NOT JUST A FAN
                    </Typography>
                    <Typography variant="h1" fontWeight="bold" fontStyle="italic" sx={{ letterSpacing: 2, mt: 1, fontStyle: "italic" }}>
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
                <Typography
                    variant="h3"
                    align="center"
                    fontWeight="bold"
                    color="primary"
                    gutterBottom
                    sx={{ fontStyle: "italic", textTransform: "uppercase", letterSpacing: 1 }}
                >
                    SUPPORT YOUR FAVORITE CREATOR
                </Typography>
                <Typography
                    align="center"
                    sx={{
                        mb: 3,
                        color: "#222",
                        fontSize: 16,
                        mx: "auto",
                        fontWeight: 400,
                        lineHeight: 1.4,
                    }}
                >
                    These jerseys are more than just designs. They&apos;re a way to directly support your favorite influencer.<br />
                    Get your creator&apos;s official kit and wear it with pride—on and off the pitch.
                </Typography>
                <div style={{ maxWidth: 1000, margin: "auto" }}>
                    <Grid container justifyContent="center">
                        {influencers?.map((c: any) => (
                            <Grid item xs={12} sm={6} md={4} key={c.id}>
                                <Card elevation={0} sx={{ alignItems: "center", boxShadow: "none", }}>
                                    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                                        <Image
                                            src={c.logo}
                                            alt={c.label}
                                            width={120}
                                            height={120}
                                            style={{ objectFit: "contain" }}
                                        />
                                    </Box>
                                    <CardContent sx={{ textAlign: "center", pt: 0 }}>
                                        <Typography fontWeight="bold" fontSize={15}>{c.name}</Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{ mt: 1, fontWeight: 600, borderRadius: 2, px: 2 }}
                                            component={Link}
                                            href={`/influencers/${c.label}`}
                                        >
                                            SHOP NOW
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>


            {/* TikTok section */}
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                    <Image src="/assets/images/influencers/landing/tiktok.webp" alt="TikTok" width={150} height={100} />
                    <Typography variant="h6" fontWeight="bold" fontStyle="italic" sx={{ mt: 1 }}>
                        THEIR STYLE, THEIR GAME.
                    </Typography>
                    <Typography sx={{ color: "#444", mb: 2 }}>
                        See our athletes in action! Real inspiration from our creators.
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
            <Section2 className="section2" isMobile={false} />

        </Box>
    );
}
