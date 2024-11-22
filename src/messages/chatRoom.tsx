import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const ChatRoom: React.FC = () => {
  const room_id = sessionStorage.getItem('selectedroomId');
  const username = sessionStorage.getItem('selectedUserUsername');
  const usernameYou = sessionStorage.getItem('username');
  const nameRoom = sessionStorage.getItem('selectedroomname');
  const senderId = sessionStorage.getItem('externalId');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const token = sessionStorage.getItem('token');

  // Ref for the messages box
  const messagesBoxRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the messages box
  const scrollToBottom = () => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  };

  // Fetch messages on mount or when room_id changes
  useEffect(() => {
    if (!room_id) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messagesRoom?roomId=${room_id}`, {
          method: 'GET',
          headers: {
            'Authentication': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        } else {
          console.error('Erreur lors de la récupération des messages:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur réseau:', error);
      }
    };

    fetchMessages();
  }, [room_id, token]);

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await fetch(`/api/messagesRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${token}`,
        },
        body: JSON.stringify({ roomId: room_id, message: newMessage }),
      });

      if (response.ok) {
        const { message: sentMessage } = await response.json();
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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Full viewport height
        width: '100%',
        boxSizing: 'border-box',
        padding: 2,
      }}
    >
      {!room_id ? (
        <Typography variant="h6" color="error">
          Aucun conversation sélectionnée
        </Typography>
      ) : (
        <>
          {/* Header */}
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Conversation Dans le Salon {nameRoom}
          </Typography>

          {/* Scrollable Messages Section */}
          <Box
            ref={messagesBoxRef} // Attach the ref here
            sx={{
              maxHeight: '320px', // Limit the height of the messages box
              flex: 1,
              overflowY: 'auto', // Enables scrolling for the messages box
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: 1,
              marginBottom: 2,
              
            }}
          >
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: 1,
                    textAlign: message.sender === usernameYou ? 'right' : 'left',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'inline-block',
                      padding: 1,
                      borderRadius: 1,
                      backgroundColor:
                        message.sender === usernameYou ?  '#f1f1f1' : '#e3f2fd' ,
                    }}
                  >
                    {message.text}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'gray', marginTop: 0.5 }}
                  >
                    {message.sender}({formatTimestamp(message.timestamp)})
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="textSecondary">Aucun message pour le moment</Typography>
            )}
          </Box>

          {/* Fixed Input Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid #ccc',
              paddingTop: 1,
            }}
          >
            <TextField
              fullWidth
              label="Votre message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button
              onClick={handleSendMessage}
              sx={{ marginLeft: 1 }}
              variant="contained"
              disabled={!newMessage.trim()}
            >
              Envoyer
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChatRoom;
