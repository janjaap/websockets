import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,

  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       calls: {
    //         merge: (_, incoming) => incoming,
    //       },
    //     },
    //   },
    // },
  }),

  connectToDevTools: true,
});
