import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import de useNavigate

interface room {
  room_id: string;
  name: string;
  created_on: string;
}

const roomsList: React.FC = () => {
  const [rooms, setrooms] = useState<room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchrooms = async () => {
      try {
        const response = await fetch('/api/rooms', {
          headers: {
            'Authentication': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setrooms(data); // Met à jour l'état avec les salons récupérés
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchrooms();
  }, [token]);

  const handleroomselect = (roomId: string,name = "") => {
    // Mise à jour de l'URL avec l'ID de l'utilisateur sélectionné
    navigate(`/messages/room/${roomId}`);
    sessionStorage.setItem('selectedroomId', roomId);
    sessionStorage.setItem('selectedroomname', name);
    sessionStorage.removeItem('selectedUserId');
    sessionStorage.removeItem('selectedUserUsername');   // Stocke le salon sélectionné
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Erreur: {error}</Typography>
      </Box>
    );
  }

  return (
    <List>
  {rooms.map((room) => (
    <ListItem key={room.room_id} sx={{ padding: 1, borderBottom: '1px solid #ddd' }}>
      <ListItemButton onClick={() => handleroomselect(room.room_id,room.name)}>
        <ListItemText
          primary={room.name}
          secondary={`Dernière connexion: ${room.created_on}`}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>
  );
};


export default roomsList;
