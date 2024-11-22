import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // For redirection
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import ChatRoom from './chatRoom';

const ChatApp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // React Router hook for navigation
  const username = sessionStorage.getItem('username');
  const handleLogout = () => {
    try {
      setLoading(true);

      // Clear any session data from localStorage, sessionStorage, or cookies
      localStorage.removeItem('userToken');  // Example: remove stored token
      sessionStorage.clear();  // Clear session storage if applicable

      // Optionally, clear any authentication cookies
      // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

      // Redirect to the login page after logout
      navigate('/' , { replace: true });  // Assuming you have a '/login' route for the login page
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            UBO Relay Chat
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User : {username}
          </Typography>
          <Button color="inherit" onClick={handleLogout} disabled={loading}>
            {loading ? 'Déconnexion...' : 'Déconnexion'}
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar />
        {sessionStorage.getItem('selectedroomId')?<ChatRoom/>:<ChatWindow />}
      </Box>
    </Box>
  );
};

export default ChatApp;
