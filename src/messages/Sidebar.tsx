import React from 'react';
import { Box, List, ListItem, ListItemText, Typography , ListItemButton} from '@mui/material';
import UsersList from './UsersList';
import RoomsList from './RoomList';



const Sidebar: React.FC = () => {
  return (
    <>
    <Box sx={{ width: 250, borderRight: '1px solid #ddd', p: 2 ,overflowY: 'auto'}}>
        <Typography variant="h6" gutterBottom>
          Utilisateurs
        </Typography>
      <UsersList/>
      <Typography variant="h6" gutterBottom>
        Salons
      </Typography>
      <RoomsList/>
    </Box>

    {/* <Box sx={{ width: 250, borderRight: '1px solid #ddd', p: 2 }}>
      

  </Box> */}
  </>
  );
};

export default Sidebar;
