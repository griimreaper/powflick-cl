"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Typography, Slide } from "@mui/material";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTranslations } from "next-intl";

export default function TopBarSlider() {
    const t = useTranslations("TopBar");
    // Mensajes dependientes del locale
    const messages = [
        {
            text: t("exclusiveDesign"),
            icon: <DesignServicesIcon fontSize="small" sx={{ mr: 1 }} />,
            href: "/your-design",
        },
        {
            text: t("freeShipping"),
            icon: <LocalShippingIcon fontSize="small" sx={{ mr: 1 }} />,
            // sin href = mensaje sin link
        },
    ];
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShow(false);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % messages.length);
                setShow(true);
            }, 300);
        }, 10000);

        return () => clearInterval(interval);
    }, [messages.length]);

    const currentMessage = messages[index];

    const Content = (
        <Box
            display="flex"
            alignItems="center"
            position="absolute"
            sx={{
                textDecoration: "none",
                color: "inherit",
            }}
        >
            {currentMessage.icon}
            <Typography fontSize={14} whiteSpace="nowrap">
                {currentMessage.text}
            </Typography>
        </Box>
    );

    return (
        <Box
            sx={{
                width: "100%",
                height: 40,
                bgcolor: "black",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                zIndex: 2,
            }}
        >
            <Slide direction={show ? "right" : "left"} in={show} timeout={300} mountOnEnter unmountOnExit>
                {currentMessage.href ? (
                    <Link
                        href={currentMessage.href!}
                        passHref
                        style={{
                            display: 'flex',
                            position: "absolute",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        {currentMessage.icon}
                        <Typography fontSize={14} whiteSpace="nowrap">
                            {currentMessage.text}
                        </Typography>
                    </Link>
                ) : (
                    Content
                )}
            </Slide>
        </Box>
    );
}
