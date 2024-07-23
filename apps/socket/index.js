const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();

const port = 5000;

const io = new Server(httpServer, {
  // options
  transports: ['websocket'],
});

io.on('connection', (socket) => {
  console.log('websocket connecting established');

  socket.on('message', (message) => {
    console.log({ message });
  });

  socket.on('close', () => {
    console.log('websocket connection closed');
  });

  socket.on('error', (err) => {
    console.error(err);
  });
});

httpServer
  .once('error', (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen({ port }, () =>
    console.log(`Socket.io server runs at: http://localhost:${port}`)
  );
