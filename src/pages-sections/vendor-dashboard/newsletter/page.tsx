"use client";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
} from "@mui/material";

interface NewsletterSubscriber {
    id: string;
    email: string;
    createdAt: string;
}

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/brevo/subscribers`)
            .then((res) => res.json())
            .then((data) => {
                setSubscribers(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <Box sx={{ p: { xs: 1, md: 3 } }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" fontWeight={700} mb={2}>
                        Newsletter Subscribers
                    </Typography>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 700 }}>Date Subscribed</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(Array.isArray(subscribers) ? subscribers : []).map((subscriber) => (
                                        <TableRow key={subscriber.id}>
                                            <TableCell>{subscriber.email}</TableCell>
                                            <TableCell>
                                                {new Date(subscriber.createdAt).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {subscribers.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={2} align="center">
                                                No subscribers found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
