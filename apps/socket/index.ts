import { createServer } from 'http';
import { Server, type Socket } from 'socket.io';
import {
  ClientEvents,
  ClientToServerEvents,
  ServerToClientEvents,
  SocketMessageCause,
  SocketMessageEffect,
} from './types';

const httpServer = createServer();
const port = 5000;
const sockets = new Set<Socket>();
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

io.on(
  'connection',
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    console.log(`socket ${socket.id} connected`);

    sockets.add(socket);

    socket.on(ClientEvents.MUTATE, (message, call) => {
      console.log({ message, call });

      switch (message) {
        case SocketMessageCause.START:
          socket.broadcast.emit(SocketMessageEffect.STARTED, call);
          break;
        case SocketMessageCause.END:
          socket.broadcast.emit(SocketMessageEffect.ENDED, call);
          break;
        case SocketMessageCause.REMOVE:
          socket.broadcast.emit(SocketMessageEffect.REMOVED, call);
          break;
        case SocketMessageCause.PAUSE:
          socket.broadcast.emit(SocketMessageEffect.PAUSED, call);
          break;
        case SocketMessageCause.UNPAUSE:
          socket.broadcast.emit(SocketMessageEffect.UNPAUSED, call);
          break;
      }
    });

    socket.on(ClientEvents.CLOSE, () => {
      console.log('websocket connection closed');
    });

    socket.on(ClientEvents.ERROR, (err) => {
      console.error(err);
    });

    socket.on(ClientEvents.DISCONNECT, (reason) => {
      console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });
  }
);

httpServer
  .once('error', (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen({ port }, () => {
    console.log(`Socket.io server runs at: http://localhost:${port}`);
  });

process.on('SIGINT', () => {
  for (const socket of sockets) {
    socket.disconnect();

    sockets.delete(socket);
  }

  io.close();
  process.exit(0);
});
