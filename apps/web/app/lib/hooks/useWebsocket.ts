import { useEffect } from 'react';
import { clientSocket } from '../clientSocket';

export const useWebsocket = () => {
  if (socket.connected) {
    console.log('connected');
  }

  function onConnect() {
    console.log('socket connected');
  }

  function onDisconnect() {
    console.log('socket disconnected');
  }

  function sendMessage(message: string) {
    clientSocket.emit('message', message);
  }

  useEffect(() => {
    clientSocket.on('connect', onConnect);
    clientSocket.on('disconnect', onDisconnect);

    return () => {
      clientSocket.off('connect', onConnect);
      clientSocket.off('disconnect', onDisconnect);
    };
  }, []);

  return { sendMessage };
};
