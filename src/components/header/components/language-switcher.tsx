"use client";

import { useState, MouseEvent, useMemo } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import TranslateIcon from "@mui/icons-material/Translate";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Variant = "button" | "icon";

interface Props {
    variant?: Variant;
}

/**
 * LanguageSwitcher
 * - Cambia entre EN y ES preservando la ruta y query actual.
 * - Usa next/navigation para construir la URL con prefijo /{locale}.
 */
export default function LanguageSwitcher({ variant = "button" }: Props) {
    const locale = (useLocale?.() as string) || "en";
    const pathname = usePathname() || "/en";
    const searchParams = useSearchParams();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const current = locale === "es" ? "ES" : "EN";

    const queryString = useMemo(() => {
        const s = searchParams?.toString();
        return s ? `?${s}` : "";
    }, [searchParams]);

    const buildPathFor = (targetLocale: "en" | "es") => {
        // Remueve el prefijo /en o /es de la ruta actual y agrega el nuevo
        const base = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
        // Garantiza que base empiece con '/'
        const normalized = base.startsWith("/") ? base : `/${base}`;
        return `/${targetLocale}${normalized}${queryString}`;
    };

    const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const switchTo = (targetLocale: "en" | "es") => {
        handleClose();
        if (!pathname) return;
        const href = buildPathFor(targetLocale);
        // Evita errores de WonderPush durante transiciones SPA forzando navegación dura
        if (typeof window !== "undefined") {
            window.location.assign(href);
        } else {
            router.replace(href);
        }
    };

    if (variant === "icon") {
        return (
            <>
                <IconButton
                    aria-label="Change language"
                    onClick={handleOpen}
                    sx={{ color: "#FEFCFC", ml: 1 }}
                >
                    <TranslateIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose} keepMounted>
                    <MenuItem selected={locale === "en"} onClick={() => switchTo("en")}>
                        {locale === "en" && (
                            <ListItemIcon>
                                <CheckIcon fontSize="small" />
                            </ListItemIcon>
                        )}
                        <ListItemText>English</ListItemText>
                    </MenuItem>
                    <MenuItem selected={locale === "es"} onClick={() => switchTo("es")}>
                        {locale === "es" && (
                            <ListItemIcon>
                                <CheckIcon fontSize="small" />
                            </ListItemIcon>
                        )}
                        <ListItemText>Español</ListItemText>
                    </MenuItem>
                </Menu>
            </>
        );
    }

    // Default variant: compact outlined button with current locale label
    return (
        <>
            <Button
                size="small"
                variant="outlined"
                onClick={handleOpen}
                aria-label="Language selector"
                sx={{
                    ml: 1,
                    color: "#FEFCFC",
                    borderColor: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 1.25,
                    minWidth: 56,
                    '&:hover': {
                        borderColor: "#ffffff",
                        backgroundColor: "rgba(255,255,255,0.08)",
                    },
                }}
                startIcon={<TranslateIcon sx={{ color: "#FEFCFC" }} />}
            >
                {current}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} keepMounted>
                <MenuItem selected={locale === "en"} onClick={() => switchTo("en")}>
                    {locale === "en" && (
                        <ListItemIcon>
                            <CheckIcon fontSize="small" />
                        </ListItemIcon>
                    )}
                    <ListItemText>English</ListItemText>
                </MenuItem>
                <MenuItem selected={locale === "es"} onClick={() => switchTo("es")}>
                    {locale === "es" && (
                        <ListItemIcon>
                            <CheckIcon fontSize="small" />
                        </ListItemIcon>
                    )}
                    <ListItemText>Español</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}

