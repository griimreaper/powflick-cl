"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import LoadingPageComponent from 'components/Loaders/LoaderPageComponent';
import { showErrorAlert } from 'utils/alerts';
import { validateToken } from 'services/Login';
import { ResetPasswordForm } from 'pages-sections/sessions/page-view/ResetPassword';

function ResetPasswordContent() {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        // Verifica si estamos en el cliente
        if (typeof window !== 'undefined') {
            setIsClient(true);
            setToken(searchParams.get('token'));
        }
    }, [searchParams]);

    useEffect(() => {
        if (!isClient || !token) {
            setLoading(false);
            return;
        }

        const asyncFetch = async () => {
            const { isValid } = await validateToken(String(token));
            if (isValid) {
                // Save the token in sessionStorage
                sessionStorage.setItem('resetPasswordToken', String(token));
                // Remove the token from the URL without reloading the page
                const urlWithoutToken = window.location.href.split('?')[0];
                window.history.replaceState({}, document.title, urlWithoutToken);
                setLoading(false);
            } else {
                showErrorAlert("Error!", 'Change password time expired');
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
                setLoading(false);
            }
        };

        asyncFetch();
    }, [isClient, token, router]);

    if (loading) {
        return <LoadingPageComponent />;
    }

    return <ResetPasswordForm />;
}

export default function ResetPassword() {
    return (
        <Suspense fallback={<LoadingPageComponent />}>
            <ResetPasswordContent />
        </Suspense>
    );
}