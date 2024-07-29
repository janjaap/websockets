import { useLogInMutation, User, UserFragmentDoc } from 'types/graphql';

export const useLogin = () =>
  useLogInMutation({
    update: (cache, { data }) => {
      if (!data) return;

      const { login } = data;

      cache.modify<{ users: Array<User> }>({
        fields: {
          users(existingUserRefs, { readField }) {
            const newUserRef = cache.writeFragment({
              data: login,
              fragment: UserFragmentDoc,
            });

            if (!newUserRef) {
              return existingUserRefs;
            }

            const id = cache.identify(newUserRef);

            if (existingUserRefs.some((ref) => readField('id', ref) === id)) {
              return existingUserRefs;
            }

            return [...existingUserRefs, newUserRef];
          },
        },
      });
    },
  });
