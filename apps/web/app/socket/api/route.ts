import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

export async function GET(_req: NextApiRequest, response: NextApiResponse) {
  const httpServer = response.socket?.server as unknown as Server;

  if (httpServer?.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');

    const io = new Server(httpServer, {
      path: '/socket/api',
    });

    httpServer.io = io;
  }

  return response;
}
