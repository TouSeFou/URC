import { getConnecterUser } from "/home/dosi/TP React/urc/lib/session.js";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async (req, res) => {
  try {
    console.log("Request method:", req.method);

    const user = await getConnecterUser(req);
    console.log("Connected user:", user);

    if (!user) {
      console.log("User not connected, returning 401");
      return res.status(401).json({ error: "User not connected" });
    }

    if (req.method === 'GET') {
      const { roomId } = req.query; // Use query parameter
      if (!roomId) {
        return res.status(400).json({ error: "room ID is required" });
      }
    
      
      const messages = await redis.lrange(`conversation:${roomId}`, 0, -1);
    
      // Log raw messages to check their format
      console.log('Raw messages from Redis:', messages);
    
      // Directly return the messages (no need to parse since they are already objects)
      return res.status(200).json({ messages });
    }
    
    

    if (req.method === 'POST') {
      const { roomId, message } = req.body;
      console.log("POST request, received data:", { roomId, message });

      if (!roomId || !message) {
        console.log("Invalid request data, returning 400");
        return res.status(400).json({ error: "Invalid request data" });
      }

      
      

      const newMessage = {
        text: message,
        sender: user.username,
        timestamp: new Date().toISOString(),
      };
      console.log("New message:", newMessage);

      const serializedMessage = JSON.stringify(newMessage);
      console.log("Serialized message:", serializedMessage);

      await redis.rpush(`conversation:${roomId}`, serializedMessage);
      console.log("Message pushed to Redis");

      return res.status(201).json({ success: true, message: newMessage });
    }

    console.log("Method not allowed, returning 405");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

