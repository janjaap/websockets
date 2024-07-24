import { Action } from 'app/components/action/Action';
import { clientSocket } from 'app/lib/clientSocket';
import { useEffect } from 'react';
import { Status, useGetCallsQuery } from 'types/graphql';

export default function CallsList() {
  const { data, error, loading } = useGetCallsQuery();

  useEffect(() => {
    clientSocket.on('call:started', (call) => {
      console.log('call:started', call);
    });

    clientSocket.on('call:removed', (call) => {
      console.log('call:removed', call);
    });

    return () => {
      clientSocket.off('call:started');
      clientSocket.off('call:removed');
    };
  }, []);

  if (loading || !data) return null;

  if (error) {
    throw error;
  }

  return (
    <header>
      <h1>Calls ({data.calls.length})</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {data.calls.map(({ id, name, status }) => (
            <tr key={id}>
              <td>{name}</td>
              <td width="80">{status.toString()}</td>
              <td>
                <Action.Pause
                  callId={id}
                  onError={console.error}
                  disabled={status !== Status.InProgress}
                />
                <Action.End
                  callId={id}
                  onError={console.error}
                  disabled={status === Status.Completed}
                />
                <Action.Remove
                  callId={id}
                  onError={console.error}
                  disabled={status !== Status.Completed}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </header>
  );
}
