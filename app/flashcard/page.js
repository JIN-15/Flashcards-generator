// flashcard.js for showing cards loaaded from database
'use client'
import { useEffect, useState } from "react"
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { CardActionArea, Card, CardContent, Container, Grid, Typography, Box, AppBar, Toolbar, Link, Button } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import '../globals.css';

import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import { LinkedIn } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})

    const searchParams = useSearchParams()
    const search = searchParams.get('id')
    const collectionName = searchParams.get('name')

    useEffect(() => {
        async function getFlashcard() {
            if (!user || !search) return

            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcardsArray = []

            docs.forEach((doc) => {
                flashcardsArray.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcardsArray)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
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
                            letterSpacing: '0.08em',
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
                        {collectionName}
                    </Typography>
                </Box>
            </Container>

            <Container maxWidth='lg' sx={{
                        marginTop: '20px',
                        fontFamily: "'Poppins', sans-serif", // Modern font
                        color: '#333', // Dark grey color for text
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        border: '2px solid #d3d3d3', // Light grey border
                        borderRadius: '8px', // Rounded corners
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
                        backgroundColor: '#fff', // White background for better contrast
                        marginBottom: '20px',
                    }}>
                <Grid container spacing={3} sx={{ mb: 4, mt:1 }}>
                    {flashcards.map((flashcard) => (
                        <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                            <Card
                                sx={{
                                    height: '250px',
                                    display: 'flex',
                                    perspective: '1000px',
                                    '&:hover': {
                                        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                                        transform: 'translateY(-5px)',
                                        transition: 'all 0.3s ease-in-out',
                                    }
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleCardClick(flashcard.id)}
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box sx={{
                                        width: '100%',
                                        height: '100%',
                                        transition: 'transform 0.6s',
                                        transformStyle: 'preserve-3d',
                                        position: 'relative',
                                        transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                    }}>
                                        <CardContent sx={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 2,
                                            boxSizing: 'border-box',
                                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                            color: 'white',
                                            overflow: 'auto',
                                        }}>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    textAlign: 'center',
                                                    wordWrap: 'break-word',
                                                    maxHeight: '100%',
                                                }}
                                            >
                                                {flashcard.front}
                                            </Typography>
                                        </CardContent>
                                        <CardContent sx={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            backfaceVisibility: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: 2,
                                            boxSizing: 'border-box',
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            color: 'white',
                                            transform: 'rotateY(180deg)',
                                            overflow: 'auto',
                                        }}>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    textAlign: 'center',
                                                    wordWrap: 'break-word',
                                                    maxHeight: '100%',
                                                }}
                                            >
                                                {flashcard.back}
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

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
    );
}