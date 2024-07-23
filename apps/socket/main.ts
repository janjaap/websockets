import { serve } from 'https://deno.land/std@0.220.1/http/server.ts';
import { Server } from 'https://deno.land/x/socket_io@0.2.0/mod.ts';

type Action = 'call:start' | 'call:end';
type Payload = { name: string };

interface ServerToClientEvents {
  'call:add': (payload: Payload) => void;
  'call:remove': (payload: Payload) => void;
}

interface ClientToServerEvents {
  message: (action: Action, payload: Payload) => void;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on('message', (message, payload) => {
    switch (message) {
      case 'call:start':
        socket.broadcast.emit('call:add', payload);
        break;
      case 'call:end':
        socket.broadcast.emit('call:remove', payload);
        break;
    }

    console.log({ message, payload });
  });

  socket.on('disconnect', (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

await serve(io.handler(), {
  port: 5000,
});
