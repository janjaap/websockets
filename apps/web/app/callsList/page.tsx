import { CallsTable } from 'app/components/callsTable/CallsTable';
import { clientSocket } from 'app/lib/clientSocket';
import { useEffect } from 'react';
import { SocketMessageEffect } from 'socket/types';
import { Call, useGetCallsQuery, useGetUsersLazyQuery } from 'types/graphql';

export default function CallsList() {
  const { data, error, loading, updateQuery } = useGetCallsQuery();
  const [getUsers] = useGetUsersLazyQuery();

  const listener = (message: string, call: Call) => {
    switch (message) {
      case 'call:ended':
      case 'call:paused':
      case 'call:unpaused': {
        updateQuery(({ calls }) => {
          const callIndex = calls.findIndex(({ id }) => call.id === id);

          return {
            calls: calls.toSpliced(callIndex, 1, call),
          };
        });
      }
    }
  };

  useEffect(() => {
    getUsers();

    clientSocket.onAny(listener);

    clientSocket.on(SocketMessageEffect.STARTED, (call: Call) => {
      console.log('call:started', call);
      updateQuery(({ calls }) => ({ calls: [...calls, call] }));
    });

    clientSocket.on(SocketMessageEffect.REMOVED, (call: Call) => {
      console.log('call:removed', call);
      updateQuery(({ calls }) => ({
        calls: calls.filter(({ id }) => id !== call.id),
      }));
    });

    // clientSocket.on('call:ended', (call) => {
    //   console.log('call:ended', call);

    //   updateQuery(({ calls }) => {
    //     const callIndex = calls.findIndex(({ id }) => call.id === id);

    //     return {
    //       calls: calls.toSpliced(callIndex, 1, call),
    //     };
    //   });
    // });

    return () => {
      clientSocket.off(SocketMessageEffect.STARTED);
      clientSocket.off(SocketMessageEffect.REMOVED);
      // clientSocket.off('call:ended');
      clientSocket.offAny(listener);
    };
  }, []);

  if (loading || !data) return null;

  if (error) {
    throw error;
  }

  return (
    <>
      <header>
        <h1>Calls ({data.calls.length})</h1>
      </header>

      <CallsTable calls={data.calls} />
    </>
  );
}
