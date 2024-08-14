import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';

function Notifications() {
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    const checkPermission = async () => {
      if ('Notification' in window) {
        const result = await Notification.requestPermission();
        setPermission(result);
      }
    };
    checkPermission();
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      {permission === 'granted' ? (
        <Typography>
          Notifications are enabled. You will receive reminders for your medicines.
        </Typography>
      ) : (
        <div>
          <Typography gutterBottom>
            Notifications are currently {permission}. Please enable them to receive medicine reminders.
          </Typography>
          <Button variant="contained" color="primary" onClick={requestPermission}>
            Enable Notifications
          </Button>
        </div>
      )}
    </div>
  );
}

export default Notifications;