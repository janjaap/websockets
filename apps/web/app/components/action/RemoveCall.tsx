import { clientSocket } from 'app/lib/clientSocket';
import { useRemoveCall } from 'app/lib/hooks/useRemoveCall';
import { useEffect } from 'react';
import { ClientEvents, SocketMessageCause } from 'socket/types';
import { Action } from './Action';
import { ActionProps } from './types';

export const RemoveCall = (props: ActionProps) => {
  const { callId, isDisabled, onError } = props;
  const [mutate, { loading, data, error, called }] = useRemoveCall();

  function onClick() {
    mutate({ variables: { callId } });
  }

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, []);

  useEffect(() => {
    if (!called) return;

    if (loading || !data) return;

    const { removeCall } = data;

    clientSocket.emit(
      ClientEvents.MUTATE,
      SocketMessageCause.REMOVE,
      removeCall
    );
  }, [loading, data, called]);

  return (
    <Action
      isDisabled={loading || isDisabled}
      label="Remove"
      onClick={onClick}
    />
  );
};
