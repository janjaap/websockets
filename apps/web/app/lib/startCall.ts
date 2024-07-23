import { clientSocket } from './clientSocket';

export async function startCall(name: string) {
  clientSocket.emit('message', 'start-call', { name });

  const response = await fetch('/calls', {
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const body = await response.json();

  return body;
}
