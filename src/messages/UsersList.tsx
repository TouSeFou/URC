import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, CircularProgress } from '@mui/material';



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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        console.log(token);

        const response = await fetch('/api/users', {
          headers: {
            'Authentication': `Bearer ${token}`,  // Use backticks (`) for template literals
          },
        });
        
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); // Met à jour l'état avec les utilisateurs récupérés
      } catch (error: any) {
        setError(error.message); // Gère les erreurs
      } finally {
        setLoading(false); // Arrête le chargement une fois terminé
      }
    };

    fetchUsers();
  }, []);

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
              <ListItemText
                primary={user.username}
                secondary={`Dernière connexion: ${user.last_login}`}
              />
            </ListItem>
          ))}
        </List>
      
    
  );
};

export default UsersList;
