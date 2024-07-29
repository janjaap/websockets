import { StoreObject } from '@apollo/client';
import { clientSocket } from 'app/lib/clientSocket';
import { useEffect } from 'react';
import { useRemoveCallMutation } from 'types/graphql';
import { ActionProps } from './action';
import { Action } from './Action';

export const RemoveCall = (props: ActionProps) => {
  const { callId, isDisabled, onError } = props;
  const [mutate, { loading, data, error }] = useRemoveCallMutation({
    update: (cache) => {
      const call = { __typename: 'Call', id: callId } as StoreObject;

      const id = cache.identify(call);

      cache.evict({ id });

      cache.gc();

      clientSocket.emit('message', 'call:remove', call);
    },
  });

  function onClick() {
    mutate({ variables: { callId } });
  }

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, []);

  return (
    <Action
      isDisabled={loading || isDisabled}
      label="Remove"
      onClick={onClick}
    />
  );
};
