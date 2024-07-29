import { ChangeEvent, MouseEvent, useState } from 'react';

import { useLogin } from 'app/lib/hooks/useLogin';
import css from './login.module.css';

export const Login = () => {
  const [loginName, setLoginName] = useState('');
  const [login, { data, loading, error }] = useLogin();

  function onChangeLoginName(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;

    setLoginName(value);
  }

  async function onClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!loginName) return;

    await login({ variables: { name: loginName } });
  }

  console.log({ data });

  return (
    <div>
      <h2>Log in</h2>

      <form className={css.loginForm} action="">
        <label htmlFor="loginName">Username</label>
        <input
          disabled={loading}
          id="loginName"
          onChange={onChangeLoginName}
          type="text"
          value={loginName}
        />
        <button disabled={loading} type="submit" onClick={onClick}>
          Log in
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};
