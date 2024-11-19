import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Redis
const redis = Redis.fromEnv();

// Define your conversation ID
const userId1 = '2'; // Example user ID 1
const userId2 = '1'; // Example user ID 2
const conversationId = [userId1, userId2].sort().join('-'); // Generate a unique conversation ID

// Define a new message
const newMessage = {
  text: 'Hello, how are you?',
  sender: 'User123', // Example sender username
  timestamp: new Date().toISOString(),
};

// Serialize the message object
const serializedMessage = JSON.stringify(newMessage);

// Push the serialized message to Redis
(async () => {
  try {
    // Store the message in the Redis list
    await redis.rpush(`conversation:${conversationId}`, serializedMessage);

    console.log(`Message pushed to Redis in conversation: ${conversationId}`);
  } catch (error) {
    console.error('Error pushing message to Redis:', error);
  }
})();
