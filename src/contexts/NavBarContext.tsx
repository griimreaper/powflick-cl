'use client';
// /context/NavbarContext.js
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { getLanding } from 'services/Landing';
import { DataStructure } from 'models/types';

interface NavBarContextProps {
    children: ReactNode;
    initialData: any;
}

interface NavbarContextType {
    navbarData: DataStructure['navbar'];
    triggerRefresh: () => Promise<void>;
}

const NavbarContext = createContext<NavbarContextType | null>(null);

export function NavbarProvider({ children, initialData }: NavBarContextProps) {
    const [navbarData, setNavbarData] = useState(initialData);

    // Función que se puede llamar manualmente para revalidar los datos
    const triggerRefresh = useCallback(async () => {
        const { navbar } = await getLanding();
        setNavbarData(navbar);
    }, []);

    return (
        <NavbarContext.Provider value={{ navbarData, triggerRefresh }}>
            {children}
        </NavbarContext.Provider>
    );
}

export function useNavbar() {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error("useNavbar debe usarse dentro de NavbarProvider");
    }
    return context;
}
