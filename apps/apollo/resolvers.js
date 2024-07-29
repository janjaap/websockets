const { calls: callsInDb, users } = require('./data');
const transitionStatus = require('@websockets/utils/machine');

const calls = [...callsInDb];

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

const callIndex = (callId) => calls.findIndex(({ id }) => id === callId);

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

      calls.splice(callIndex(id), 1, call);

      return { ...call, status: 'COMPLETED', participants: [] };
    },
    joinCall: (_parent, { callId, userId }) => {
      const user = getUser(userId);
      const call = getCall(callId);

      if (call.participants.some((participant) => participant.id === user.id)) {
        // user already joined
        return call;
      }

      const joinedCall = {
        ...transitionStatus(call, 'JOIN'),
        participants: [...call.participants, user],
      };

      calls.splice(callIndex(call.id), 1, joinedCall);

      return joinedCall;
    },
    leaveCall: (_parent, { callId, userId }) => {
      const user = getUser(userId);
      const call = getCall(callId);

      const participants = call.participants.filter(
        (participant) => participant.id !== user.id
      );

      const callWithLessParticipants = {
        ...call,
        participants,
      };

      const leftCall = transitionStatus(callWithLessParticipants, 'LEAVE');

      calls.splice(callIndex(call.id), 1, leftCall);

      return leftCall;
    },
    pauseCall: (_parent, { id }) => {
      const call = getCall(id);

      const pausedCall = transitionStatus(call, 'ON_HOLD');

      calls.splice(callIndex(call.id), 1, pausedCall);

      return pausedCall;
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

      const unpausedCall = transitionStatus(call, 'IN_PROGRESS');

      calls.splice(callIndex(call.id), 1, unpausedCall);

      return unpausedCall;
    },
  },
};

module.exports = resolvers;
