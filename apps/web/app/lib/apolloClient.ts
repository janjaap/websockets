import { ApolloClient, InMemoryCache } from '@apollo/client';
import { User } from 'types/graphql';

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,

  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          calls: {
            merge: (_, incoming) => incoming,
          },
        },
      },
      User: {
        fields: {
          isLoggedIn: {
            read(_, { readField }) {
              return (
                (JSON.parse(localStorage.getItem('user') ?? '{}') as User)
                  .id === readField('id')
              );
            },
          },
        },
      },
    },
  }),

  connectToDevTools: true,
});
