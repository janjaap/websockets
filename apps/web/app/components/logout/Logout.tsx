import { useGetAdmin } from 'app/lib/hooks/useGetAdmin';
import { useLogout } from 'app/lib/hooks/useLogout';

export const Logout = () => {
  const adminQuery = useGetAdmin();
  const [logout, { loading, error }] = useLogout();

  const onClick = () => {
    if (!adminQuery.admin) return;

    logout({ variables: { id: adminQuery.admin.id } });
  };

  if (!adminQuery.admin || adminQuery.loading) return null;

  return (
    <>
      <button disabled={loading} type="button" onClick={onClick}>
        Log out
      </button>
      {error && <p>{error.message}</p>}
    </>
  );
};
