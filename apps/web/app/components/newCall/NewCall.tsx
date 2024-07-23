import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';

import { clientSocket } from 'app/lib/clientSocket';
import { useCreateCallMutation } from 'types/graphql';
import css from './newCall.module.css';

export const NewCall = () => {
  const [callLabel, setCallLabel] = useState('');
  const [createCall, { loading, data, error }] = useCreateCallMutation();

  useEffect(() => {
    if (loading || !data) return;

    const { createCall } = data;

    clientSocket.emit('message', 'call:start', createCall);
  }, [data, loading]);

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
