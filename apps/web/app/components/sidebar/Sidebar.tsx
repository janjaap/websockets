import { useGetUsersQuery } from 'types/graphql';
import { Login } from '../login/Login';
import { NewCall } from '../newCall/NewCall';
import css from './sidebar.module.css';

export const Sidebar = () => {
  const { data, error, loading } = useGetUsersQuery();

  console.log({ data, error, loading });

  return (
    <aside className={css.sidebar}>
      <NewCall onError={console.error} />
      <Login />
    </aside>
  );
};
