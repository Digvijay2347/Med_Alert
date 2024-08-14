import React, { useState,useEffect } from 'react';
import { TextField, Button, Grid, Typography, Snackbar, Paper, Box, InputAdornment, Alert } from '@mui/material';
import { LocalHospital, AccessTime, Bloodtype, Update } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(145deg, #f0f0f0 0%, #ffffff 100%)',
  borderRadius: '15px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
  maxWidth: '600px',
  margin: '0 auto',
}));

function AddReminder({ supabase, user }) {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        setError('User not authenticated. Please log in again.');
      }
    };
    fetchUserId();
  }, [supabase.auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!medicineName || !dosage || !frequency || !time) {
      setError('All fields are required.');
      return;
    }

    if (!userId) {
      setError('User not authenticated. Please log in again.');
      return;
    }

    try {
      const { data, error } = await supabase
  .from('medicines')
  .insert([{ 
    name: medicineName, 
    dosage, 
    frequency, 
    time, 
    user_id: userId 
  }]);

      if (error) throw error;

      console.log('Reminder added successfully:', data);
      setSuccess('Reminder added successfully.');
      setMedicineName('');
      setDosage('');
      setFrequency('');
      setTime('');
    } catch (error) {
      console.error('Error adding reminder:', error);
      setError(`Error adding reminder: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h4" gutterBottom>
        Add New Reminder
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Medicine Name"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalHospital />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Dosage"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Bloodtype />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Update />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Reminder Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTime />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Reminder
            </Button>
          </Grid>
        </Grid>
      </form>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </StyledPaper>
  );
}

export default AddReminder;