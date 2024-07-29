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
    # Call has ended, no participants
    COMPLETED
    # Active call with one or more participants
    IN_PROGRESS
    # Paused, participants can join or leave
    ON_HOLD
    # New call, no participants
    PENDING
  }

  type Query {
    calls: [Call!]!
    call(id: ID!): Call!
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    "Create a new call, setting its status to PENDING"
    createCall(name: String!): Call!
    "End a call, setting its status to COMPLETED"
    endCall(id: ID!): Call!
    "Current user joins call"
    joinCall(callId: ID!, userId: ID!): Call!
    "Current user leaves call"
    leaveCall(callId: ID!, userId: ID!): Call!
    "Call is put on hold"
    pauseCall(id: ID!): Call!
    "Call is deleted"
    removeCall(id: ID!): Call!
    "Call becomes active"
    unpauseCall(id: ID!): Call!
  }
`;

module.exports = schema;
