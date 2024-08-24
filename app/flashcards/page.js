'use client'
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Box, CardActionArea, Card, CardContent, Container, Grid, Typography, AppBar, Toolbar, Button, Link } from "@mui/material"

import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import { LinkedIn } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";

import '../globals.css';

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return

            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || []
                console.log('Fetched flashcards:', collections) // Debug log
                setFlashcards(collections)
            } else {
                await setDoc(docRef, { flashcards: [] })
                console.log('Created new document with empty flashcards') // Debug log
            }
        }
        getFlashcards()
    }, [user])

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const handleCardClick = (id, name) => {
        router.push(`/flashcard?id=${id}&name=${encodeURIComponent(name)}`)
    }


    return (
        <Container maxWidth="100vw" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link href="/">
                            <span className="font-family custom-link">Flash<strong>Master</strong></span>
                        </Link>
                    </Typography>
                    <SignedOut>
                        <Button color="inherit" href="/sign-in">
                            {' '}
                            LogIn
                        </Button>
                        <Button color="inherit" href="/sign-up">
                            {' '}
                            Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md">
            <Box sx={{
                mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "'Poppins', sans-serif", // Modern font
                        color: '#ff6347', // Tomato color
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '5px',
                        borderBottom: '2px solid #ff6347', // Underline
                        paddingBottom: '10px',
                        animation: 'slideIn 1s ease-out, pulse 2s infinite',
                        '@keyframes slideIn': {
                            '0%': {
                                transform: 'translateX(-100%)',
                                opacity: 0,
                            },
                            '50%': {
                                transform: 'translateX(10%)',
                                opacity: 1,
                            },
                            '100%': {
                                transform: 'translateX(0%)',
                            },
                        },
                        '@keyframes pulse': {
                            '0%': {
                                transform: 'scale(1)',
                            },
                            '50%': {
                                transform: 'scale(1.1)',
                            },
                            '100%': {
                                transform: 'scale(1)',
                            },
                        },
                    }}
                >
                    Saved Flashcards
                </Typography>
            </Box>
        </Container>

            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transformOrigin: 'center',
                            '&:hover': {
                                transform: 'translateY(-10px) scale(1.05) rotateZ(3deg)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                background: 'linear-gradient(135deg, #42A5F5 0%, #BBDEFB 100%)',
                            },
                            animation: `fadeIn 0.8s ease-out ${index * 0.2}s both`,
                            background: 'linear-gradient(135deg, #64B5F6 0%, #E3F2FD 100%)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                            borderRadius: '15px',
                        }}>
                            <CardActionArea
                                onClick={() => handleCardClick(flashcard.id, flashcard.name)}
                                sx={{
                                    p: 2,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <Box sx={{ mt: 'auto', py: 4, backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
                <Container>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                About Us
                            </Typography>
                            <Typography variant="body2">
                                FlashMaster is your go-to platform for creating flashcards effortlessly.
                                Enhance your learning experience with our AI-driven tools.
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                Contact
                            </Typography>
                            <Typography variant="body2">
                                Email: hassanakramali@gmail.com
                            </Typography>
                            <Typography variant="body2">
                                Phone: +92 (302) 5016418
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                Follow Us
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                <Button href="https://www.facebook.com/profile.php?id=100037185180713" target="_blank" color="inherit" sx={{ color: 'white' }}>
                                    <Facebook />
                                </Button>
                                <Button href="https://twitter.com/AliHass76361768" target="_blank" color="inherit" sx={{ color: 'white' }}>
                                    <Twitter />
                                </Button>
                                <Button href="https://www.instagram.com/i_alihassan_15/" target="_blank" color="inherit" sx={{ color: 'white' }}>
                                    <Instagram />
                                </Button>
                                <Button href="https://www.linkedin.com/in/ali-hassan-08b306226" target="_blank" color="inherit" sx={{ color: 'white' }}>
                                    <LinkedIn />
                                </Button>
                                <Button href="https://github.com/JIN-15" target="_blank" color="inherit" sx={{ color: 'white' }}>
                                    <GitHub />
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography variant="body2">
                            &copy; {new Date().getFullYear()} FlashMaster. All rights reserved.
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Made by Ali Hassan - Creator & Developer
                        </Typography>
                    </Box>


                </Container>
            </Box>
        </Container>
    )
}