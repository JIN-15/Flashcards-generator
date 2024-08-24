'use client'

import { useUser } from "@clerk/nextjs"
import { AppBar, Link, Toolbar, Container, Box, Typography, TextField, Paper, Button, Grid, CardActionArea, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { doc, collection, setDoc, getDoc, writeBatch } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { db } from "@/firebase"
import '../globals.css';

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import { LinkedIn } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: text }), // Ensure that 'text' is properly formatted JSON
            });

            if (!response.ok) {
                // If the server returns a status other than 200-299
                const errorMessage = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
            }

            const data = await response.json(); // Attempt to parse JSON
            setFlashcards(data);
        } catch (error) {
            console.error('There was an error with the request:', error);
        }
    };


    const handleLoadClick = () => {
        if (isSignedIn) {
            router.push('/flashcards');
        } else {
            setError('Please sign in to load your saved flashcards.');
        }
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async () => {
        if (!name) {
            alert('Please enter Name')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const DocSnap = await getDoc(userDocRef)

        let collectionId = Date.now().toString() // Generate a unique ID

        if (DocSnap.exists()) {
            const collections = DocSnap.data().flashcards || []
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists.')
                return
            }
            else {
                collections.push({ name, id: collectionId }) // Add the ID to the collection
                batch.set(userDocRef, { flashcards: collections }, { merge: true })
            }
        }
        else {
            batch.set(userDocRef, { flashcards: [{ name, id: collectionId }] }) // Add the ID here too
        }

        const colRef = collection(userDocRef, collectionId) // Use the ID as the collection name
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return (
        <Container maxWidth="100vw" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link href="/" className="custom-link">
                            <span className="font-family">Flash<strong>Master</strong></span>
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
                    mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                    <Typography variant="h4">Generate Flashcards</Typography>
                    <Paper sx={{
                        p: 4,
                        width: '100%'
                    }}>
                        <TextField value={text} onChange={(e) => setText(e.target.value)}
                            label="Enter Text"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{
                                mb: 2,
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            fullWidth>
                            Submit
                        </Button>
                    </Paper>
                </Box>

                <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4">Load Saved Flashcards</Typography>
                    <Paper sx={{ p: 4, width: '100%' }}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleLoadClick}>
                            Load
                        </Button>
                        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                    </Paper>
                </Box>


                {flashcards.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" sx={{
                            mb: 3, textAlign: 'center', fontWeight: 'bold',
                            animation: 'fadeIn 1s ease-out',
                            '@keyframes fadeIn': {
                                from: { opacity: 0, transform: 'translateY(-20px)' },
                                to: { opacity: 1, transform: 'translateY(0)' }
                            }
                        }}>
                            Flashcards Preview
                        </Typography>
                        <Grid container spacing={3}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            height: 250,
                                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            '&:hover': {
                                                transform: 'translateY(-10px) rotateZ(2deg)',
                                                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                                            },
                                            animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                                        }}
                                    >
                                        <CardActionArea
                                            onClick={() => handleCardClick(index)}
                                            sx={{ height: '100%' }}
                                        >
                                            <CardContent sx={{ height: '100%', p: 0, position: 'relative' }}>
                                                <Box
                                                    sx={{
                                                        perspective: '1000px',
                                                        height: '100%',
                                                        transformStyle: 'preserve-3d',
                                                        transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                        transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            width: '100%',
                                                            height: '100%',
                                                            backfaceVisibility: 'hidden',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: 2,
                                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                            color: 'white',
                                                            overflow: 'auto',
                                                            borderRadius: '10px',
                                                        }}
                                                    >
                                                        <Typography variant="h6" component="div" sx={{
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                                        }}>
                                                            {flashcard.front}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            width: '100%',
                                                            height: '100%',
                                                            backfaceVisibility: 'hidden',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: 2,
                                                            background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
                                                            color: '#333',
                                                            transform: 'rotateY(180deg)',
                                                            overflow: 'auto',
                                                            borderRadius: '10px',
                                                        }}
                                                    >
                                                        <Typography variant="h6" component="div" sx={{
                                                            textAlign: 'center',
                                                            fontWeight: 'medium',
                                                        }}>
                                                            {flashcard.back}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleOpen}
                                sx={{
                                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    '&:hover': {
                                        transform: 'scale(1.1) rotate(5deg)',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                                    },
                                    animation: 'pulse 2s infinite',
                                    '@keyframes pulse': {
                                        '0%': { boxShadow: '0 0 0 0 rgba(156, 39, 176, 0.7)' },
                                        '70%': { boxShadow: '0 0 0 10px rgba(156, 39, 176, 0)' },
                                        '100%': { boxShadow: '0 0 0 0 rgba(156, 39, 176, 0)' },
                                    },
                                }}
                            >
                                Save Flashcards
                            </Button>
                        </Box>
                    </Box>
                )}

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please Enter the name for your Flashcards collection
                        </DialogContentText>
                        <TextField
                            autoFocus margin="dense" label="collection Name" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={saveFlashcards}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>


            <Box sx={{ py: 4, backgroundColor: 'primary.main', color: 'white', textAlign: 'center', mt: 'auto' }}>
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