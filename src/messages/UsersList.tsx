import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import de useNavigate

interface User {
  user_id: string;
  username: string;
  last_login: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users', {
          headers: {
            'Authentication': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); // Met à jour l'état avec les utilisateurs récupérés
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleUserSelect = (userId: string,username = "") => {
    // Mise à jour de l'URL avec l'ID de l'utilisateur sélectionné
    navigate(`/messages/user/${userId}`);
    sessionStorage.setItem('selectedUserId', userId);
    sessionStorage.setItem('selectedUserUsername', username);  // Stocke l'utilisateur sélectionné
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
  {users.map((user) => (
    <ListItem key={user.user_id} sx={{ padding: 2, borderBottom: '1px solid #ddd' }}>
      <ListItemButton onClick={() => handleUserSelect(user.user_id,user.username)}>
        <ListItemText
          primary={user.username}
          secondary={`Dernière connexion: ${user.last_login}`}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>
  );
};


export default UsersList;
