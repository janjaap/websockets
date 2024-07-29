const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  stopOnTerminationSignals: true,
});

const port = 4000;

server.listen({ port }, () =>
  console.log(`Apollo server runs at: http://localhost:${port}`)
);
