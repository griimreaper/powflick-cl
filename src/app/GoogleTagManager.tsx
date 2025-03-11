// components/GoogleTagManager.tsx
'use client';
import { useEffect } from "react";

const GoogleTagManager = () => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

    useEffect(() => {
        if (gtmId === undefined) return;

        const handleGTM = () => {
            // Insert the <noscript> element before any other body content
            const noScript = document.createElement('noscript');
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
            iframe.height = "0";
            iframe.width = "0";
            iframe.style.display = "none";
            iframe.style.visibility = "hidden";
            noScript.appendChild(iframe);

            // Insert <noscript> into the body at the start
            const body = document.body;
            if (body.firstChild) {
                body.insertBefore(noScript, body.firstChild);
            } else {
                body.appendChild(noScript);
            }

            // Create and insert the GTM script
            const gtmScript = document.createElement('script');
            gtmScript.async = true;
            gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
            document.head.appendChild(gtmScript);

            // Push GTM start event to dataLayer
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
            });
        };

        handleGTM();
    }, [gtmId]);

    return null;
};

export default GoogleTagManager;