import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { Login as LoginIcon } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  margin: '0 auto',
  marginTop: theme.spacing(8),
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function LoginForm({ supabase }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          navigate('/home', { replace: true });
        }
      };
      checkUser();
    }, [supabase, navigate]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);
  
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
  
        navigate('/home', { replace: true });
      } catch (error) {
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <StyledPaper elevation={3}>
      <LoginIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <SubmitButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </SubmitButton>
        <Box textAlign="center">
          <Typography variant="body2">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </StyledForm>
    </StyledPaper>
  );
}

export default LoginForm;
