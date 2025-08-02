import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const useSocket = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket = io(); // assumes same origin (your frontend + backend)

    socket.on("connect", () => {
      console.log("🟢 Connected to WebSocket");
      setConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from WebSocket");
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket, connected };
};
