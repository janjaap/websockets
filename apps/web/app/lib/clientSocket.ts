'use client';

import { io } from 'socket.io-client';

export const clientSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
