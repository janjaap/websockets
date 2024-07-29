import { clientSocket } from 'app/lib/clientSocket';
import { useEffect } from 'react';
import { usePauseCallMutation } from 'types/graphql';
import { ActionProps } from './action';
import { Action } from './Action';

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

    clientSocket.emit('message', 'call:pause', call);
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
