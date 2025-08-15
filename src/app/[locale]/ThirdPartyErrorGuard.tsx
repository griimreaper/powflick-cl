'use client';

import { useEffect } from 'react';

/**
 * Evita que errores de scripts de terceros (p.ej. WonderPush) tiren el overlay de error en dev.
 * No altera la lógica del app, solo previene burbujeo/overlay de errores conocidos.
 */
export default function ThirdPartyErrorGuard() {
    useEffect(() => {
        const onError = (event: ErrorEvent) => {
            const src = event?.filename || '';
            if (src.includes('cdn.by.wonderpush.com') || src.includes('wonderpush.min.js')) {
                event.preventDefault?.();
                return true;
            }
            return false;
        };

        const onUnhandled = (event: PromiseRejectionEvent) => {
            const msg = String(event?.reason || '');
            if (msg.includes('WonderPush') || msg.includes('InternalRPCTargetClosedError')) {
                event.preventDefault?.();
            }
        };

        window.addEventListener('error', onError as unknown as EventListener, true);
        window.addEventListener('unhandledrejection', onUnhandled as unknown as EventListener, true);
        return () => {
            window.removeEventListener('error', onError as unknown as EventListener, true);
            window.removeEventListener('unhandledrejection', onUnhandled as unknown as EventListener, true);
        };
    }, []);

    return null;
}
