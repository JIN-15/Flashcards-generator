'use client'
import { useEffect, useState } from 'react';
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from "@mui/material";
import Head from "next/head";
import './globals.css';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import { LinkedIn } from "@mui/icons-material";
import { GitHub } from "@mui/icons-material";
import Link from "next/link";

export default function Home() {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('features-section');
      if (section && section.getBoundingClientRect().top < window.innerHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check visibility on mount
    onScroll();

    // Add scroll event listener
    window.addEventListener('scroll', onScroll);

    // Clean up event listener on unmount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async () => {

    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }


  }

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>FlashMaster</title>
        <meta name="description" content="Create flashcard form your text" />
      </Head>

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

      <Box sx={{
        textAlign: 'center',
        my: 4,
      }}>
        <Typography variant="h2"><span className="font-family-design">Welcome to FlashMaster, the Flashcard SaaS</span></Typography>
        <Typography variant="h5">
          {' '}
          Effortlessly Create Flashcards from Your Text
        </Typography>
        <Link href="/generate" passHref>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Get Started
          </Button>
        </Link>
      </Box>

      <Box sx={{ my: 6 }} id="features-section">
        <Typography
          variant="h4"
          sx={{ my: 5, textAlign: 'center', fontWeight: 'bold' }}
          className={isVisible ? 'fadeIn' : ''}
        >
          Features
        </Typography>
        <Grid container spacing={3}>
          {[{
            title: 'Easy Text Input',
            description: 'Just enter your text, and our tool will handle the rest. Flashcard creation made simpler than ever.',
          }, {
            title: 'Intelligent Flashcards',
            description: 'Our AI seamlessly transforms your text into bite-sized flashcards, optimized for effective studying.',
          }, {
            title: 'Always Within Reach',
            description: 'Access your flashcards anytime, anywhere, from any device. Study effortlessly on the go.',
          }].map((feature, index) => (
            <Grid item xs={12} md={4} key={index} className={isVisible ? 'slideUp' : ''}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 3,
                  background: 'linear-gradient(135deg, #1E88E5 0%, #BBDEFB 100%)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                    background: 'linear-gradient(135deg, #2979FF 0%, #BBDEFB 100%)',
                  },
                  animation: 'pulse 2s infinite',
                }}
                className="mainBox"
              >
                <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: 'white' }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{ my: 5, textAlign: 'center', fontWeight: 'bold' }}
          className={isVisible ? 'fadeIn' : ''}
        >
          Pricing
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className={isVisible ? 'slideUp' : ''}>
          <Box sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              background: 'linear-gradient(135deg, #B3E5FC 0%, #2979FF 100%)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
                background: 'linear-gradient(135deg, #B3E5FC 0%, #1E88E5 100%)',
              },
              animation: 'pulse 2s infinite',
            }} className='mainBox2'>

              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                <span className="font-family-design-small">Basic</span>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                $5 / month
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Access to basic flashcard Features & Limited Storage.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                className="pulse"
              >
                Choose Basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} className={isVisible ? 'slideUp' : ''}>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              background: 'linear-gradient(135deg, #2979FF 0%, #B3E5FC 100%)',
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
                background: 'linear-gradient(135deg, #1E88E5 0%, #B3E5FC 100%)',
              },
              animation: 'pulse 2s infinite',
            }} className='mainBox2'>

              <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                <span className="font-family-design-small">Pro</span>
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                $10 / month
              </Typography>
              <Typography sx={{ color: 'white' }}>
                Unlimited Access to flashcard Features & Storage, with priority Support.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                className="pulse"
                onClick={handleSubmit}
              >
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
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
