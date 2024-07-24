import {
  useEndCallMutation,
  usePauseCallMutation,
  useRemoveCallMutation,
} from 'types/graphql';

import { ApolloError, MutationHookOptions } from '@apollo/client';
import { clientSocket } from 'app/lib/clientSocket';
import { useEffect } from 'react';
import css from './action.module.css';

interface Props {
  callId: string;
  disabled?: boolean;
  emit: 'call:end' | 'call:pause' | 'call:remove';
  label: string;
  mutation:
    | typeof useRemoveCallMutation
    | typeof useEndCallMutation
    | typeof usePauseCallMutation;
  onError: (error?: ApolloError) => void;
  onMutate?: MutationHookOptions['update'];
}

export const Action = (props: Props) => {
  const { callId, disabled, emit, label, mutation, onError, onMutate } = props;
  const [mutate, { loading, data, error }] = mutation({
    update: onMutate,
  });

  useEffect(() => {
    if (loading || !data) return;

    let call;

    if ('endCall' in data) {
      call = data.endCall;
    } else if ('pauseCall' in data) {
      call = data.pauseCall;
    } else if ('removeCall' in data) {
      call = data.removeCall;
    }

    if (!call) return;

    clientSocket.emit('message', emit, call);
  }, [loading, data]);

  useEffect(() => {
    if (error) {
      onError(error);
    }
  }, []);

  function onClick() {
    mutate({ variables: { callId } });
  }

  return (
    <button
      className={css.button}
      disabled={loading || disabled}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};

type ActionProps = Pick<Props, 'callId' | 'onError' | 'disabled'>;

Action.Pause = (props: ActionProps) => (
  <Action
    emit="call:pause"
    label="Pause"
    mutation={usePauseCallMutation}
    {...props}
  />
);

Action.End = (props: ActionProps) => (
  <Action
    emit="call:end"
    label="End"
    mutation={useEndCallMutation}
    {...props}
  />
);

Action.Remove = (props: ActionProps) => {
  const onMutate: MutationHookOptions['update'] = (cache, { data }) => {
    if (!data) return;

    const id = cache.identify(data.removeCall);

    cache.evict({ id });

    cache.gc();
  };

  return (
    <Action
      emit="call:remove"
      label="Remove"
      onMutate={onMutate}
      mutation={useRemoveCallMutation}
      {...props}
    />
  );
};
