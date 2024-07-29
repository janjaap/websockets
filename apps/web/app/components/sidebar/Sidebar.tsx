import { Login } from '../login/Login';
import { NewCall } from '../newCall/NewCall';
import css from './sidebar.module.css';

export const Sidebar = () => {
  return (
    <aside className={css.sidebar}>
      <NewCall onError={console.error} />
      <Login />
    </aside>
  );
};
