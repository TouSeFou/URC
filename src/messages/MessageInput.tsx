import React, { useState } from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Handle sending message logic here
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 1, borderTop: '1px solid #ddd' }}>
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ mr: 1 }}
      />
      <IconButton color="primary" aria-label="upload image" component="label">
        <input hidden accept="image/*" type="file" />
        <ImageIcon />
      </IconButton>
      <Button variant="contained" color="primary" onClick={handleSendMessage}>
        Envoyer
      </Button>
    </Box>
  );
};

export default MessageInput;
