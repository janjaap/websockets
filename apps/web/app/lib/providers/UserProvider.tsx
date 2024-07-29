import { createContext, PropsWithChildren, useContext } from 'react';
import { User } from 'types/graphql';

const UserContext = createContext<{ user: User | null }>({ user: null });

export const UserProvider = ({ children }: PropsWithChildren) => {
  const user = null;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
