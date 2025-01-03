'use client';
import ProgressBar from "components/progress";
import RTL from "components/rtl";
import CartProvider from "contexts/CartContext";
import ClientProviders from "contexts/ClientProviders";
import { NavbarProvider } from "contexts/NavBarContext";
import SettingsProvider from "contexts/SettingContext";
import { SessionProvider } from "next-auth/react";
import React from "react";
import ThemeProvider from "theme/theme-provider";

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ClientProviders>
            <CartProvider>
                <NavbarProvider >
                    <SettingsProvider>
                        <ThemeProvider>
                            <SessionProvider>
                                <ProgressBar />
                                <RTL>
                                    {children}
                                </RTL>
                            </SessionProvider>
                        </ThemeProvider>
                    </SettingsProvider>
                </NavbarProvider>
            </CartProvider>
        </ClientProviders>
    )
}