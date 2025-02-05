'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query'; // Importamos useQuery
import { getLanding } from 'services/Landing'; // Función que hace la llamada a la API
import { DataStructure } from 'models/types';

// Contexto para la barra de navegación
interface NavBarContextProps {
    children: ReactNode;
}

interface NavbarContextType {
    navbarData: DataStructure['navbar'];
}

const NavbarContext = createContext<NavbarContextType | null>(null);

// Función para obtener los datos de la barra de navegación
const fetchNavbar = async (): Promise<DataStructure['navbar']> => {
    const { navbar } = await getLanding(); // Llamada a la API para obtener los datos
    return navbar;
};

// NavbarProvider usando React Query
export function NavbarProvider({ children }: NavBarContextProps) {
    const { data: navbarData, isLoading, error, isSuccess } = useQuery({
        queryKey: ['navbarData'],   // Clave de la consulta
        queryFn: fetchNavbar,       // Función para obtener los datos
        staleTime: 86400,     // 1 día en milisegundos
        enabled: !localStorage.getItem('navbarData'),
        initialData: () => {
            // Intentar obtener los datos de localStorage al iniciar
            const cachedNavbar = localStorage.getItem('navbarData');
            return cachedNavbar ? JSON.parse(cachedNavbar) : { categories: [], collection: [], recent: [] };
        },
        // Aquí se usa un hook separado para manejar la respuesta después de la carga

    });

    if (isSuccess) {
        localStorage.setItem('navbarData', JSON.stringify(navbarData));
    }

    // Si los datos están cargando, puedes mostrar un cargador
    if (isLoading) {
        return <></>;
    }

    // Si hubo un error, puedes mostrar un mensaje de error
    if (error instanceof Error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <NavbarContext.Provider value={{ navbarData }}>
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
