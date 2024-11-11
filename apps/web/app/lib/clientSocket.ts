'use client';

import { ClientToServerEvents, ServerToClientEvents } from 'socket';
import { io, Socket } from 'socket.io-client';

export const clientSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(process.env.NEXT_PUBLIC_SOCKET_URL!);
