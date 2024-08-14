import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import { Close, Save, LocalHospital, AccessTime, Bloodtype, Update } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(1, 3),
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)',
  },
}));

function EditMedicineForm({ open, onClose, medicine, onSave }) {
  const [formData, setFormData] = useState(medicine || {});

  useEffect(() => {
    setFormData(medicine || {});
  }, [medicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <StyledDialogTitle>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Edit Medicine
        </Typography>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <StyledTextField
            label="Name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalHospital color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="Dosage"
            name="dosage"
            value={formData.dosage || ''}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Bloodtype color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="Frequency"
            name="frequency"
            value={formData.frequency || ''}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Update color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <StyledTextField
            label="Time"
            name="time"
            value={formData.time || ''}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2, justifyContent: 'center' }}>
        <StyledButton onClick={onClose} color="secondary" variant="outlined" startIcon={<Close />}>
          Cancel
        </StyledButton>
        <StyledButton onClick={handleSubmit} color="primary" variant="contained" startIcon={<Save />}>
          Save Changes
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}

export default EditMedicineForm;