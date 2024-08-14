import React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Link, IconButton } from '@mui/material';
import { LinkedIn, GitHub, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#f8f8f8', py: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Round Image and Quote */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Round image */}
              <img 
                src="./vcv.jpg" // Replace with your image path
                alt="Your Name"
                style={{ 
                  borderRadius: '50%', 
                  width: '150px', 
                  height: '150px', 
                  objectFit: 'cover' 
                }}
              />
              {/* Short quote */}
              <Typography variant="h6" component="p" sx={{ mt: 2, textAlign: 'center' }}>
                "Believe in yourself and all that you are."
              </Typography>
            </Box>
          </Grid>

          {/* Menu Links */}
          <Grid item xs={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ 
    fontWeight: 'bold', // or use a specific number like 700
    fontStyle: 'italic' // or 'normal' for regular style
  }}>
              Other Projects
            </Typography>
            <Box>
              {['Discover All'].map((item) => (
                <Link href="#" key={item} display="block" color="inherit" sx={{ mb: 1 }}>
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Support Links */}
          <Grid item xs={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ 
    fontWeight: 'bold', // or use a specific number like 700
    fontStyle: 'italic' // or 'normal' for regular style
  }}>
              Support
            </Typography>
            <Box>
              {['Buy Me a Coffee'].map((item) => (
                <Link href="buymeacoffee.com/singh.digvijay
                " key={item} display="block" color="inherit" sx={{ mb: 1 }}>
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Social and Payment Icons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
        <Box>
  <IconButton aria-label="Facebook" color="inherit" component="a" href="https://www.linkedin.com/in/singh07digvijay/" target="_blank" rel="noopener noreferrer">
    <LinkedIn />
  </IconButton>
  <IconButton aria-label="GitHub" color="inherit" component="a" href="https://github.com/Digvijay2347" target="_blank" rel="noopener noreferrer">
    <GitHub />
  </IconButton>
  <IconButton aria-label="Instagram" color="inherit" component="a" href="https://www.instagram.com/panwar.digvijaysingh/" target="_blank" rel="noopener noreferrer">
    <Instagram />
  </IconButton>
</Box>

        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
