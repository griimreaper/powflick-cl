'use client';
import ProgressBar from "components/progress";
import RTL from "components/rtl";
import CartProvider from "contexts/CartContext";
import { NavbarProvider } from "contexts/NavBarContext";
import SettingsProvider from "contexts/SettingContext";
import { SessionProvider } from "next-auth/react";
import React from "react";
import ThemeProvider from "theme/theme-provider";

export const GlobalProvider: React.FC<{ children: React.ReactNode, navbar: any }> = ({ children, navbar }) => {
    return (
        <CartProvider>
            <NavbarProvider initialData={navbar}>
                <SettingsProvider>
                    <ThemeProvider>
                        <SessionProvider>
                            <ProgressBar />
                            <RTL>{children}</RTL>
                        </SessionProvider>
                    </ThemeProvider>
                </SettingsProvider>
            </NavbarProvider>
        </CartProvider>
    )
}