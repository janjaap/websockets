import { clientSocket } from 'app/lib/clientSocket';
import { useEffect } from 'react';
import { useEndCallMutation } from 'types/graphql';

interface Props {
  callId: string;
}

export function RemoveCall({ callId }: Props) {
  const [removeCall, { loading, data, error }] = useEndCallMutation();

  useEffect(() => {
    if (loading || !data) return;

    const { endCall } = data;

    clientSocket.emit('message', 'call:remove', endCall);
  }, [loading]);

  async function onRemoveCall() {
    await removeCall({ variables: { callId } });
  }

  return (
    <button type="button" onClick={onRemoveCall} disabled={loading}>
      X
    </button>
  );
}
