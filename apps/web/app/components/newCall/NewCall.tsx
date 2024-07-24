import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { ApolloError, MutationHookOptions } from '@apollo/client';
import { clientSocket } from 'app/lib/clientSocket';
import { Call, CallFragmentDoc, useCreateCallMutation } from 'types/graphql';
import css from './newCall.module.css';

interface Props {
  onError: (error?: ApolloError) => void;
}

type Update = MutationHookOptions['update'];

const update: Update = (cache, { data }) => {
  if (!data) return;

  const { createCall } = data;

  cache.modify<{ calls: Array<Call> }>({
    fields: {
      calls(existingCallRefs, { readField }) {
        const newCallRef = cache.writeFragment({
          data: createCall,
          fragment: CallFragmentDoc,
        });

        if (!newCallRef) {
          return existingCallRefs;
        }

        const id = cache.identify(newCallRef);

        if (existingCallRefs.some((ref) => readField('id', ref) === id)) {
          return existingCallRefs;
        }

        return [...existingCallRefs, newCallRef];
      },
    },
  });
};

export const NewCall = ({ onError }: Props) => {
  const [callLabel, setCallLabel] = useState('');
  const [createCall, createCallResult] = useCreateCallMutation({
    update,
  });

  const { loading, data, error } = createCallResult;

  useEffect(() => {
    if (loading || !data) return;

    const { createCall } = data;

    clientSocket.emit('message', 'call:start', createCall);
  }, [data, loading]);

  useEffect(() => {
    if (!error) return;

    onError(error);
  }, [error]);

  function onChangeCallLabel(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;

    setCallLabel(value);
  }

  async function onClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!callLabel) return;

    await createCall({ variables: { callLabel } });
  }

  return (
    <div>
      <h2>Start a call</h2>

      <form className={css.newCallForm} action="">
        <label htmlFor="callName">Call label</label>
        <input
          disabled={loading}
          id="callName"
          onChange={onChangeCallLabel}
          type="text"
          value={callLabel}
        />
        <button disabled={loading} type="submit" onClick={onClick}>
          Start call
        </button>
      </form>
    </div>
  );
};
