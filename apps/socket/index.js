const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const port = 5000;
const sockets = new Set();
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`);

  sockets.add(socket);

  socket.on('message', (message, payload) => {
    console.log({ message });
    switch (message) {
      case 'call:start':
        socket.emit('call:add', payload);
        break;
      case 'call:end':
        socket.emit('call:remove', payload);
        break;
    }

    // console.log({ message, payload });
  });

  socket.on('close', () => {
    console.log('websocket connection closed');
  });

  socket.on('error', (err) => {
    console.error(err);
  });

  socket.on('disconnect', (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

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
