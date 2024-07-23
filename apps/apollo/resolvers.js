const { calls, users } = require('./data');

const updateStatus = (call, newStatus) => {
  switch (call.status) {
    case 'PENDING':
    case 'IN_PROGRESS':
      return { ...call, status: newStatus };

    case 'COMPLETED':
      return call;
  }
};

const resolvers = {
  Call: {
    id: ({ id }) => id,
    name: ({ name }) => name,
    status: ({ status }) => status,
    dateCreated: ({ dateCreated }) => dateCreated,
    participants: ({ participants }) => participants,
  },

  User: {
    id: ({ id }) => id,
    name: ({ name }) => name,
    role: ({ role }) => role,
  },

  Query: {
    calls: () => calls,
    call: (_parent, { id }) => calls.find((call) => call.id === id),
    users: () => users,
    user: (_parent, { id }) => users.find((user) => user.id === id),
  },

  Mutation: {
    createCall: (_parent, { name }) => {
      const newCall = {
        id: crypto.randomUUID(),
        name,
        status: 'PENDING',
        dateCreated: Date.now(),
        participants: [],
      };

      calls.push(newCall);

      return newCall;
    },
    joinCall: (_parent, { id, userId }) => {
      const user = users.find((user) => user.id === userId);
      const call = calls.find((call) => call.id === id);

      if (!user) {
        throw new Error('User does not exist.');
      }

      if (!call) {
        throw new Error('Call does not exist.');
      }

      return { ...call, participants: [...call.participants, user] };
    },
    leaveCall: (_parent, { id, userId }) => {
      const user = users.find((user) => user.id === userId);
      const call = calls.find((call) => call.id === id);

      if (!user) {
        throw new Error('User does not exist.');
      }

      if (!call) {
        throw new Error('Call does not exist.');
      }

      return {
        ...call,
        participants: call.participants.filter(
          (participant) => participant.id !== userId
        ),
      };
    },
    updateCall: (_parent, { id, status }) => {
      const call = calls.find((call) => call.id === id);

      if (!call) {
        throw new Error('Call does not exist.');
      }

      return updateStatus(call, status);
    },
    endCall: (_parent, { id }) => {
      const call = calls.find((call) => call.id === id);

      if (!call) {
        throw new Error('Call does not exist.');
      }

      return { ...call, status: 'COMPLETED', participants: [] };
    },
  },
};

module.exports = resolvers;
