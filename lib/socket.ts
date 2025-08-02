// lib/socket.ts
import { Server } from "socket.io";
import { NextApiResponse } from "next";

let io: Server | null = null;

export const getIOInstance = (res?: NextApiResponse): Server => {
  if (!io) {
    // Use the same server across all API calls
    io = new Server({
      cors: {
        origin: "*", // or your frontend domain
        methods: ["GET", "POST"],
      },
    });

    // Optional: log new connections
    io.on("connection", (socket) => {
      console.log("New WebSocket connection:", socket.id);
    });
  }

  return io;
};
