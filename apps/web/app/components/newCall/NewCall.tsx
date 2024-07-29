import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { ApolloError } from '@apollo/client';
import { clientSocket } from 'app/lib/clientSocket';
import { useCreateCall } from 'app/lib/hooks/useCreateCall';
import css from './newCall.module.css';

interface Props {
  onError: (error?: ApolloError) => void;
}

export const NewCall = ({ onError }: Props) => {
  const [callLabel, setCallLabel] = useState('');
  const [createCall, { loading, data, error }] = useCreateCall();

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
