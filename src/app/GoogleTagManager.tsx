"use client";

import Script from "next/script";

const GoogleTagManager = () => {
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
    if (!GTM_ID) return null;

    return (
        <>
            {/* Script de Google Tag Manager */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
                async
            />

            {/* Fallback para navegadores sin JavaScript */}
            <noscript>
                <iframe
                    src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                ></iframe>
            </noscript>
        </>
    );
};

export default GoogleTagManager;
