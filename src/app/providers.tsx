'use client';
import { GlobalStyles } from "@mui/material";
import ProgressBar from "components/progress";
// import RTL from "components/rtl";
import CartProvider from "contexts/CartContext";
import ClientProviders from "contexts/ClientProviders";
import { NavbarProvider } from "contexts/NavBarContext";
// import SettingsProvider from "contexts/SettingContext";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { primary } from "theme/theme-colors";
import ThemeProvider from "theme/theme-provider";

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ClientProviders>
            <NavbarProvider>
                <CartProvider>
                    <ThemeProvider>
                        <SessionProvider>
                            <ProgressBar />
                            <GlobalStyles
                                styles={{
                                    "*::-webkit-scrollbar": {
                                        width: "8px",
                                        height: "8px",
                                    },
                                    "*::-webkit-scrollbar-thumb": {
                                        backgroundColor: primary.main,
                                    },
                                    "*::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: primary.main,
                                    },
                                    "*::-webkit-scrollbar-track": {
                                        backgroundColor: "#1A1A1A",
                                    },
                                }}
                            />
                            {children}
                        </SessionProvider>
                    </ThemeProvider>
                </CartProvider>
            </NavbarProvider>
        </ClientProviders>
    )
}