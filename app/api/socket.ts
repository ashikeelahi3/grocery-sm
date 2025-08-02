import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";
import { getIOInstance } from "@/lib/socket";

// Extend NextApiResponse to include socket.server.io
type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = getIOInstance();
    res.socket.server.io = io;
    io.attach(res.socket.server);
    console.log("✅ Socket.io server attached");
  } else {
    console.log("🔄 Socket.io already running");
  }

  res.end();  // Now TypeScript knows about this method
}
