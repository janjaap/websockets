import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import path from 'path';
import resolvers from './resolvers';

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf-8',
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  stopOnTerminationSignals: true,
});

const port = 4000;

server.listen({ port }, () =>
  console.log(`Apollo server runs at: http://localhost:${port}`)
);
