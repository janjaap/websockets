const { calls: callsInDb, users } = require('./data');

const calls = [...callsInDb];

const updateStatus = (call, newStatus) => {
  switch (call.status) {
    case 'PENDING':
    case 'IN_PROGRESS':
      return { ...call, status: newStatus };

    case 'COMPLETED':
      return call;
  }
};

function getCall(id) {
  const call = calls.find((call) => call.id === id);

  if (!call) {
    throw new Error('Call does not exist.');
  }

  return call;
}

function getUser(id) {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new Error('User does not exist.');
  }

  return user;
}

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
    endCall: (_parent, { id }) => {
      const call = getCall(id);

      return { ...call, status: 'COMPLETED', participants: [] };
    },
    joinCall: (_parent, { id, userId }) => {
      const user = getUser(userId);
      const call = getCall(id);

      return { ...call, participants: [...call.participants, user] };
    },
    leaveCall: (_parent, { id, userId }) => {
      const user = getUser(userId);
      const call = getCall(id);

      return {
        ...call,
        participants: call.participants.filter(
          (participant) => participant.id !== userId
        ),
      };
    },
    pauseCall: (_parent, { id }) => {
      const call = getCall(id);

      return updateStatus(call, 'ON_HOLD');
    },
    removeCall: (_parent, { id }) => {
      const callIndex = calls.findIndex((call) => call.id === id);

      if (callIndex === -1) {
        throw new Error('Call does not exist.');
      }

      const [call] = calls.splice(callIndex, 1);

      return call;
    },
    unpauseCall: (_parent, { id }) => {
      const call = getCall(id);

      return updateStatus(call, 'IN_PROGRESS');
    },
    updateCall: (_parent, { id, status }) => {
      const call = getCall(id);

      return updateStatus(call, status);
    },
  },
};

module.exports = resolvers;
