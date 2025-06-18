'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FlexRowCenter } from 'components/flex-box';
import { H1 } from 'components/Typography';

interface Props {
    slug: string;
    productPassword: string;
}

export default function ProductPasswordForm({ slug, productPassword }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryPassword = searchParams!.get('password');

    const [password, setPassword] = useState(queryPassword || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (queryPassword === productPassword) {
            router.replace(`/products/${slug}?password=${queryPassword}`);
            router.refresh(); // fuerza render del layout con la contraseña válida
        }
    }, [queryPassword, productPassword, router, slug]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!password.trim()) {
            setError('Password is required');
            return;
        }

        router.replace(`/products/${slug}?password=${password}`);
    };

    return (
        <FlexRowCenter height="100vh">
            <Card sx={{ p: 4, textAlign: 'center', width: 360 }}>
                <H1 mb={2}>Product Locked</H1>

                <Typography variant="body2" mb={3}>
                    Please enter the password to view this product.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        error={!!error}
                        helperText={error}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Submit
                    </Button>
                </form>
            </Card>
        </FlexRowCenter>
    );
}
