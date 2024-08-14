// MedicineList.js
import React, { useState, useEffect, useCallback } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Button, Snackbar, Alert } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { scheduleNotification, showMissedReminders, showNotification } from '../utils/notifications';
import EditMedicineForm from './EditMedicineForm';

function MedicineList({ supabase, user }) {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchMedicines = useCallback(async () => {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      setError('Error fetching medicines');
      console.error('Error fetching medicines:', error);
    } else {
      setMedicines(data);
      scheduleNotification(data);
      showMissedReminders(data);
    }
  }, [supabase, user]);

  useEffect(() => {
    if (user) {
      fetchMedicines();
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(permission => {
        console.log(`Notification permission ${permission === "granted" ? "granted" : "denied"}.`);
      });
    }
  }, [user, fetchMedicines]);

  const deleteMedicine = useCallback(async (id) => {
    const { error } = await supabase
      .from('medicines')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      setError('Error deleting medicine');
      console.error('Error deleting medicine:', error);
    } else {
      fetchMedicines();
      setSuccess('Medicine deleted successfully');
    }
  }, [supabase, user, fetchMedicines]);

  const updateMedicine = useCallback(async (medicine) => {
    const { error } = await supabase
      .from('medicines')
      .update({
        name: medicine.name,
        dosage: medicine.dosage,
        frequency: medicine.frequency,
        time: medicine.time
      })
      .eq('id', medicine.id)
      .eq('user_id', user.id);

    if (error) {
      setError('Error updating medicine');
      console.error('Error updating medicine:', error);
    } else {
      fetchMedicines();
      setSuccess('Medicine updated successfully');
    }
  }, [supabase, user, fetchMedicines]);

  const handleEditClick = (medicine) => {
    setSelectedMedicine(medicine);
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
    setSelectedMedicine(null);
  };

  const handleSave = (updatedMedicine) => {
    updateMedicine(updatedMedicine);
    handleCloseEditForm();
  };

  const testNotification = () => {
    const testMedicine = {
      name: 'Test Medicine',
      dosage: 'Test Dosage',
      frequency: 'Daily',
      time: new Date().toTimeString().slice(0, 5),
    };
    showNotification(testMedicine);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Your Medicines</Typography>
      
      <List>
        {medicines.map((medicine) => (
          <ListItem key={medicine.id}>
            <ListItemText
              primary={medicine.name}
              secondary={`${medicine.dosage} - ${medicine.frequency} - ${medicine.time}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(medicine)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteMedicine(medicine.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="primary" onClick={testNotification}>
        Test Notification
      </Button>

      {selectedMedicine && (
        <EditMedicineForm
          open={isEditFormOpen}
          onClose={handleCloseEditForm}
          medicine={selectedMedicine}
          onSave={handleSave}
        />
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MedicineList;
