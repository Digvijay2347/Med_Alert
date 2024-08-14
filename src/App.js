import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import { LocalHospital, AddCircle, Notifications as NotificationsIcon, Menu as MenuIcon, Login, Logout } from '@mui/icons-material';
import MedicineList from './components/MedicineList';
import AddReminder from './components/AddReminder';
import Notifications from './components/Notifications';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import VerificationPage from './components/VerificationPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/footer';
import './index.css';

// Initialize Supabase client
const supabaseUrl = 'https://axvhnfgejqbmwuexrysz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dmhuZmdlanFibXd1ZXhyeXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3ODAxNTAsImV4cCI6MjAzODM1NjE1MH0.bSMnuG_f5q0DWkWQu6pZcdfsjMgsSfGKKZSKvmBJ0J8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const navItems = [
    { text: 'Home', icon: <LocalHospital />, path: '/' },
    { text: 'Add Reminder', icon: <AddCircle />, path: '/add' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Update user state on logout
  };

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      {user ? (
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      ) : (
        <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
          <ListItemIcon><Login /></ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      )}
    </List>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <LocalHospital sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MedAlert
            </Typography>
            {!isMobile && (
              <>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                ))}
                {user ? (
                  <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
                    Logout
                  </Button>
                ) : (
                  <Button color="inherit" component={Link} to="/login" startIcon={<Login />}>
                    Login
                  </Button>
                )}
              </>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          {drawer}
        </Drawer>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<MedicineList supabase={supabase} user={user} />} user={user} />} />
            <Route path="/add" element={<ProtectedRoute element={<AddReminder supabase={supabase} user={user} />} user={user} />} />
            <Route path="/notifications" element={<ProtectedRoute element={<Notifications user={user} />} user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LoginForm supabase={supabase} />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpForm supabase={supabase} />} />
            <Route path="/verification" element={<VerificationPage />} />
          </Routes>
        </Container>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
