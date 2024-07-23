const { gql } = require('apollo-server');

const schema = gql`
  interface Node {
    id: ID!
    name: String!
  }

  type Call implements Node {
    id: ID!
    name: String!
    dateCreated: Float!
    status: Status!
    participants: [User!]
  }

  type User implements Node {
    id: ID!
    name: String!
    role: Role!
  }

  enum Role {
    CALLER
    RECEIVER
  }

  enum Status {
    PENDING
    IN_PROGRESS
    COMPLETED
  }

  type Query {
    calls: [Call!]!
    call(id: ID!): Call
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createCall(name: String!): Call
    endCall(id: ID!): Call
    joinCall(id: ID!, userId: ID!): Call
    leaveCall(id: ID!, userId: ID!): Call
    updateCall(id: ID!, status: Status!): Call
  }
`;

module.exports = schema;
