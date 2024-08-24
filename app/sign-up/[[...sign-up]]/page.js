import { SignIn, SignUp } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import Link from "next/link";

import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import { LinkedIn } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";

export default function SignUpPage() {
    return (
        <Container maxWidth="100vw">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link href="/" className="custom-link" >
                            <span className="font-family">Flash<strong>Master</strong></span>
                        </Link>
                    </Typography>

                    <Button color="inherit">
                        <Link href="/sign-in" passHref className="custom-link">
                            LogIn
                        </Link>
                    </Button>

                    <Button color="inherit">
                        <Link href="/sign-up" passHref className="custom-link">
                            Sign Up
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box display="flex" flexDirection="column" alignItems="center" >
                <Typography variant="h4" sx={{ my: 4 }}>Sign Up</Typography>
                <SignUp />
            </Box>

            <Box sx={{ mt: 8, py: 4, backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}>
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