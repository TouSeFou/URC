import React from 'react';
import { Box, List, ListItem, ListItemText, Typography , ListItemButton} from '@mui/material';
import UsersList from './UsersList';



const Sidebar: React.FC = () => {
  return (
    <Box sx={{ width: 250, borderRight: '1px solid #ddd', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Utilisateurs
      </Typography>
    <UsersList/>

    </Box>
  );
};

export default Sidebar;
