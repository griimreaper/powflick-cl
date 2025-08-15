"use client";

import { Button, Box } from "@mui/material";
import { useTranslations } from "next-intl";
import BeforeAfterSlider from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import Form from "./Form";

export default function YourDesignClient() {
    const t = useTranslations("YourDesign");
    const beforeImage = { imageUrl: "/assets/images/free-design/DESIGN_MAN_1.png" };
    const afterImage = { imageUrl: "/assets/images/free-design/DESIGN_MAN_2.png" };

    return (
        <Box style={{ backgroundColor: "white" }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 0,
                    paddingTop: {
                        xs: "178.13%",
                        md: "56.25%",
                    },
                    backgroundImage: {
                        xs: "url('/assets/images/free-design/DESIGN_BACKGROUND_MOBILE.png')",
                        md: "url('/assets/images/free-design/DESIGN_BACKGROUND.png')",
                    },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        overflow: "hidden",
                        top: { xs: "48%", md: 0 },
                        right: { xs: 0, md: "5%" },
                        width: { xs: "80%", md: "50%" },
                        height: "100%",
                    }}
                >
                    <BeforeAfterSlider firstImage={beforeImage} secondImage={afterImage} />
                </Box>
                <Box
                    sx={{
                        display: { xs: "", md: "block" },
                        position: "absolute",
                        top: { xs: "38%", md: "70%" },
                        left: { xs: "11%", md: "7%" },
                        transform: "translateY(-50%)",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => {
                            const section = document.getElementById("design-section");
                            section?.scrollIntoView({ behavior: "smooth" });
                        }}
                        color="primary"
                        sx={{
                            fontSize: {
                                xs: "0.5rem",
                                sm: "1.0rem",
                                md: "1.0rem",
                                lg: "1.5rem",
                                xl: "2rem",
                            },
                            fontStyle: "italic",
                            padding: { xs: "8px 16px", sm: "8px 16px", md: "8px 16px" },
                        }}
                    >{t("cta")}</Button>
                </Box>
            </Box>

            {/* Banner Section */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 0,
                    paddingTop: { xs: "84.375%", md: "33.8%" },
                    backgroundImage: {
                        xs: "url('/assets/images/free-design/DESIGN_INFERIOR_MOBILE.png')",
                        md: "url('/assets/images/free-design/DESIGN_INFERIOR.png')",
                    },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Steps Section */}
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: 0,
                    paddingTop: { xs: "220.3125%", md: "51.77%" },
                    backgroundImage: {
                        xs: "url('/assets/images/free-design/DESIGN_WORK_MOBILE.png')",
                        md: "url('/assets/images/free-design/DESIGN_WORK.png')",
                    },
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Form Section */}
            <Form />
        </Box>
    );
}
