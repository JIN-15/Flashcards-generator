'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { CircularProgress, Container, Typography, Box } from "@mui/material";


const ResultPage = () => {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");

    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if (!session_id) return;

            try {
                const res = await fetch(
                    `/api/checkout_session?session_id = ${session_id}`
                );
                const sessionData = await res.json();

                if (res.ok) {
                    setSession(sessionData);
                } else {
                    setError(setSession.error);
                }
            } catch (err) {
                setError("An Error Occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutSession();
    }, [session_id]);

    if (loading) {
        return (
            <Container
                maxWidth="100vw"
                sx={{
                    textAlign: "center",
                    mt: 4,
                }}
            >
                <CircularProgress />
                <Typography variant="h6">Loading... </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container
                maxWidth="100vw"
                sx={{
                    textAlign: "center",
                    mt: 4,
                }}
            >
                <Typography variant="h6">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth= "100vw" sx = {{
            textAlign: 'center',
            mt: 4,
        }}>
            {session?.payment_status === 'paid' ? (
                    <>
                        <Typography variant="h4">Thank you for Purchasing</Typography>
                        <Box sx = {{mt: 22}}>
                            <Typography variant="h6" >Session ID: {session_id}</Typography>
                            <Typography variant="body1">
                                We have received your payment. You Will receive an email with order detail shortly. 
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography variant="h4">Payment Failed</Typography>
                        <Box sx = {{mt: 22}}>
                            <Typography variant="body1">
                                Your Payment was not sucessfull. Please try Again.
                        </Typography>
                        </Box>
                    </>
                )
            }
        </Container>
    )
}

export default ResultPage