import { clientSocket } from 'app/lib/clientSocket';
import { useEffect } from 'react';
import { useEndCallMutation } from 'types/graphql';
import { ActionProps } from './action';
import { Action } from './Action';

export const EndCall = (props: ActionProps) => {
  const { callId, isDisabled, onError } = props;
  const [mutate, { loading, data, error }] = useEndCallMutation();

  function onClick() {
    mutate({ variables: { callId } });
  }

  useEffect(() => {
    if (loading || !data) return;

    const call = data.endCall;

    if (!call) return;

    clientSocket.emit('message', 'call:end', call);
  }, [loading, data]);

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, []);

  return (
    <Action isDisabled={loading || isDisabled} label="End" onClick={onClick} />
  );
};
