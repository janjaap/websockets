'use client';

import { clientSocket } from "app/lib/clientSocket";
import { getCalls } from "app/lib/getCalls";


export default function Sidebar() {
  const { data, error, isLoading } = getCalls();

  if (isLoading) return null;

  if (error) {
    throw error;
  }

  clientSocket.on('start-call', () => {
    console.log(data.calls.length + 1);
  });

  return (
    <header>
      <h1>Calls ({data.calls.length})</h1>

    </header>
  );
};
