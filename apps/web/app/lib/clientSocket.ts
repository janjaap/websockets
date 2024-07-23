'use client';

import { io } from 'socket.io-client';

export const clientSocket = io('ws://' + process.env.SOCKET_URL!);

clientSocket.on('connect', () => {
  console.log('Connected to server');
});
