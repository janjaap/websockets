'use client';

import { RemoveCall } from 'app/components/removeCall/RemoveCall';
import { clientSocket } from 'app/lib/clientSocket';
import { useEffect, useState } from 'react';
import { useGetCallsLazyQuery } from 'types/graphql';

export default function CallsList() {
  const [getCalls, { data, error, loading }] = useGetCallsLazyQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'network-only',
  });
  const [numberOfCalls, setNumberOfCalls] = useState(0);

  useEffect(() => {
    clientSocket.on('call:add', (call) => {
      console.log('call added:', call);
      setNumberOfCalls((amount) => amount + 1);
      getCalls();
    });

    return () => {
      clientSocket.off('call:add');
    };
  }, []);

  useEffect(() => {
    if (loading || !data) return;

    setNumberOfCalls(data.calls.length);
  }, [data, loading]);

  useEffect(() => {
    getCalls();
  }, []);

  if (loading || !data) return null;

  if (error) {
    throw error;
  }

  console.log({ loading, data, error });

  return (
    <header>
      <h1>Calls ({numberOfCalls})</h1>
      <ul>
        {data.calls.map((call) => (
          <li key={call.id}>
            <p>
              {call.name} ({call.status.toString()})
              <RemoveCall callId={call.id} />
            </p>
          </li>
        ))}
      </ul>
    </header>
  );
}
