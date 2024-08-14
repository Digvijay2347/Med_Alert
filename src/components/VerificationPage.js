import React from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  maxWidth: '400px',
  margin: '0 auto',
  marginTop: theme.spacing(8),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const VerificationPage = () => {
  return (
    <StyledPaper elevation={3}>
      <IconWrapper>
        <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
      </IconWrapper>
      <Typography component="h1" variant="h5">
        Check Your Email
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        A confirmation link has been sent to your email address. Please check your inbox and confirm your email to complete the registration process.
      </Typography>
      <Box mt={2}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          sx={{ marginRight: 1 }}
        >
          Back to Login
        </Button>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="primary"
        >
          Go to Home
        </Button>
      </Box>
    </StyledPaper>
  );
};

export default VerificationPage;
