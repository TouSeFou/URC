import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ChatWindow: React.FC = () => {
  const user_id = sessionStorage.getItem('selectedUserId');
  const username = sessionStorage.getItem('selectedUserUsername');
  const usernameYou = sessionStorage.getItem('username');
  const senderId = sessionStorage.getItem('externalId');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!user_id) return;

    const fetchMessages = async () => {
      try {
        console.log("Fetching messages for userId:", user_id);
        const response = await fetch(`/api/messages?userId=${user_id}`, {
          method: 'GET', // Use GET to fetch messages
          headers: {
            'Authentication': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Messages fetched:", data.messages);
          setMessages(data.messages || []); // Assuming the API returns `messages`
        } else {
          console.error('Erreur lors de la récupération des messages:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
      }
    };

    fetchMessages();
  }, [user_id, token]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      console.log("Sending message:", newMessage);
      const response = await fetch(`/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${token}`, // Add Authorization for sending messages
        },
        body: JSON.stringify({ recipientId: user_id, message: newMessage }),
      });

      if (response.ok) {
        const { message: sentMessage } = await response.json(); // API returns the saved message
        console.log("Message sent successfully:", sentMessage);
        setMessages([...messages, sentMessage]);
        setNewMessage('');
      } else {
        console.error('Erreur lors de l\'envoi du message:', await response.json());
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as HH:MM
  };

  return (
    <Box sx={{ padding: 2 , width: '100%'}}>
      {!user_id ? (
        <Typography variant="h6" color="error">
          Aucun conversation sélectionnée
        </Typography>
      ) : (
        <>
          <Typography variant="h6">
            Conversation avec {username==usernameYou?"Vous":username}
          </Typography>
          <Box
            sx={{
              maxHeight: '400px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              padding: 1,
              marginTop: 2,
            }}
          >
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: 1,
                    textAlign: message.sender === username ? 'left' : 'right',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'inline-block',
                      padding: 1,
                      borderRadius: 1,
                      backgroundColor:
                        message.sender === username ? '#e3f2fd' : '#f1f1f1',
                    }}
                  >
                    {message.text}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'gray', marginTop: 0.5 }}
                  >
                    {formatTimestamp(message.timestamp)}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="textSecondary">Aucun message pour le moment</Typography>
            )}
          </Box>

          <TextField
            fullWidth
            label="Votre message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <Button
            onClick={handleSendMessage}
            sx={{ marginTop: 2 }}
            variant="contained"
            disabled={!newMessage.trim()}
          >
            Envoyer
          </Button>
        </>
      )}
    </Box>
  );
};

export default ChatWindow;