import { clientSocket } from 'app/lib/clientSocket';
import { useEffect } from 'react';
import { ClientEvents, SocketMessageCause } from 'socket/types';
import { usePauseCallMutation } from 'types/graphql';
import { Action } from './Action';
import { ActionProps } from './types';

export const PauseCall = (props: ActionProps) => {
  const { callId, isDisabled, onError } = props;
  const [mutate, { loading, data, error }] = usePauseCallMutation();

  function onClick() {
    mutate({ variables: { callId } });
  }

  useEffect(() => {
    if (loading || !data) return;

    const call = data.pauseCall;

    if (!call) return;

    clientSocket.emit(ClientEvents.MUTATE, SocketMessageCause.PAUSE, call);
  }, [loading, data]);

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, []);

  return (
    <Action
      isDisabled={loading || isDisabled}
      label="Pause"
      onClick={onClick}
    />
  );
};
