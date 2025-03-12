"use client";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import React, { useEffect, useState } from "react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 86400,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        },
    },
});

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [localStoragePersister, setLocalStoragePersister] = useState<
        ReturnType<typeof createSyncStoragePersister> | null
    >(null);

    useEffect(() => {
        // Inicializa el persister solo en el cliente
        setLocalStoragePersister(
            createSyncStoragePersister({
                storage: window.localStorage,
            })
        );
    }, []);

    if (!localStoragePersister) {
        // Retorna un estado de carga mientras se inicializa el persister
        return <div></div>;
    }

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: localStoragePersister }}
        >
            {children}
        </PersistQueryClientProvider>
    );
};

export default ClientProviders;
