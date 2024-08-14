const NOTIFICATION_SOUND_URL = '/rs.mp3'; // Ensure this file exists in your public folder

let scheduledNotifications = {};
let missedRemindersShown = false;
let userInteracted = false;

// Detect user interaction
document.addEventListener('click', () => userInteracted = true);
document.addEventListener('keydown', () => userInteracted = true);

export function scheduleNotification(medicines) {
  if (!Array.isArray(medicines)) {
    console.error('Invalid data format for medicines:', medicines);
    return;
  }

  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notification');
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  // Check if the current path is the home page, and skip scheduling notifications if true
  if (window.location.pathname.includes('/home')) {
    console.log('Notifications are not scheduled on the home page');
    return;
  }

  medicines.forEach(medicine => {
    const [hours, minutes] = medicine.time.split(':');
    const now = new Date();
    const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));

    if (notificationTime < now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    if (scheduledNotifications[medicine.time]) {
      scheduledNotifications[medicine.time].medicines.push(medicine);
    } else {
      scheduledNotifications[medicine.time] = {
        medicines: [medicine],
        timeout: setTimeout(() => {
          showNotification(scheduledNotifications[medicine.time].medicines);
          scheduleNotification([medicine]); // Reschedule for the next day
        }, timeUntilNotification)
      };
    }
  });
}

export function showNotification(medicines) {
  if (!Array.isArray(medicines)) {
    medicines = [medicines]; // Convert single object to array
  }

  if (Notification.permission === "granted") {
    const medicineNames = medicines.map(m => m.name).join(', ');
    const medicineDetails = medicines.map(m => `${m.name}: ${m.dosage}`).join('\n');

    const notification = new Notification(`Time to take medication`, {
      body: medicineDetails,
      icon: '/capsules.png', // Ensure this file exists in your public folder
      requireInteraction: true,
    });

    // Play notification sound only if not on the home page and the user has interacted
    if (!window.location.pathname.includes('/home') && userInteracted) {
      const audio = new Audio(NOTIFICATION_SOUND_URL);
      audio.play().catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }

    console.log('Notification shown for:', medicineNames);

    notification.onclick = function() {
      window.focus();
      notification.close();
    };

    setTimeout(() => notification.close(), 30000);
  } else {
    console.log('Notification permission not granted');
    alert(`Time to take medication:\n${medicines.map(m => `${m.name}: ${m.dosage}`).join('\n')}`);
  }
}

export function showMissedReminders(medicines) {
  if (!Array.isArray(medicines)) {
    console.error('Invalid data format for medicines:', medicines);
    return;
  }

  // Skip showing missed reminders if they have already been shown
  if (missedRemindersShown) {
    return;
  }

  const now = new Date();
  const missedMedicines = {};

  medicines.forEach(medicine => {
    const [hours, minutes] = medicine.time.split(':');
    const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));

    if (reminderTime < now && now - reminderTime < 24 * 60 * 60 * 1000) { // Within last 24 hours
      if (missedMedicines[medicine.time]) {
        missedMedicines[medicine.time].push(medicine);
      } else {
        missedMedicines[medicine.time] = [medicine];
      }
    }
  });

  if (Object.keys(missedMedicines).length > 0) {
    Object.values(missedMedicines).forEach(medicines => {
      showNotification(medicines.map(m => ({ ...m, name: `Missed: ${m.name}` })));
    });
    missedRemindersShown = true; // Mark missed reminders as shown
  }
}

// Function to clear all scheduled notifications
export function clearScheduledNotifications() {
  Object.values(scheduledNotifications).forEach(notification => {
    clearTimeout(notification.timeout);
  });
  scheduledNotifications = {};
  missedRemindersShown = false; // Reset missed reminders shown status when clearing
}
