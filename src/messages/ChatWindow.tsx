import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import MessageInput from './MessageInput';

const messages = [
  { sender: 'stmanicarmel', text: 'Hello!', time: '22:48' },
  { sender: 'ubot', text: 'Hi!', time: '21:12' },
  // Add more messages as needed
];

const ChatWindow: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
        {messages.map((msg, index) => (
          <Paper key={index} sx={{ p: 2, mb: 1, backgroundColor: '#f1f1f1' }}>
            <Typography variant="body1">
              <strong>{msg.sender}</strong>: {msg.text}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {msg.time}
            </Typography>
          </Paper>
        ))}
      </Box>
      <MessageInput />
    </Box>
  );
};

export default ChatWindow;
