import transitionStatus from '@websockets/utils/machine';
import { calls as callsInDb, users } from './data';
import { Call, Status, User } from './types/graphql';

const calls = [...callsInDb];

type ID = Call['id'] | User['id'];

function getCall(id: ID) {
  const call = calls.find((call) => call.id === id);

  if (!call) {
    throw new Error('Call does not exist.');
  }

  return call;
}

function getUser(id: ID) {
  const user = users.find((user) => user.id === id);

  if (!user) {
    throw new Error('User does not exist.');
  }

  return user;
}

const findIndex = (id: ID, collection: Array<User | Call>) =>
  collection.findIndex((item) => item.id === id);

const userIndex = (userId: ID) => findIndex(userId, users);
const callIndex = (callId: ID) => findIndex(callId, calls);

export default {
  Call: {
    id: ({ id }: Call) => id,
    name: ({ name }: Call) => name,
    status: ({ status }: Call) => status,
    dateCreated: ({ dateCreated }: Call) => dateCreated,
    participants: ({ participants }: Call) => participants,
  },

  User: {
    id: ({ id }: User) => id,
    name: ({ name }: User) => name,
    sessionId: ({ sessionId }: User) => sessionId,
  },

  Query: {
    calls: () => calls,
    call: (_parent: unknown, { id }: Call) =>
      calls.find((call) => call.id === id),
    users: () => users,
    user: (_parent: unknown, { id }: User) =>
      users.find((user) => user.id === id),
  },

  Mutation: {
    createCall: (_parent: unknown, { name }: Call) => {
      const newCall: Call = {
        id: crypto.randomUUID(),
        name,
        status: Status.Pending,
        dateCreated: Date.now(),
        participants: [],
      };

      calls.push(newCall);

      return newCall;
    },
    endCall: (_parent: unknown, { id }: Call) => {
      const call = getCall(id);
      const completed = {
        ...transitionStatus(call, Status.Completed),
        participants: [],
      };

      calls.splice(callIndex(id), 1, completed);

      return completed;
    },
    joinCall: (
      _parent: unknown,
      { callId, userId }: { callId: ID; userId: ID }
    ) => {
      const user = getUser(userId);
      const call = getCall(callId);

      if (
        call.participants &&
        call.participants.some((participant) => participant.id === user.id)
      ) {
        // user already joined
        return call;
      }

      const joinedCall = {
        ...transitionStatus(call, 'JOIN'),
        participants: [...(call.participants ?? []), user],
      };

      calls.splice(callIndex(call.id), 1, joinedCall);

      return joinedCall;
    },
    leaveCall: (
      _parent: unknown,
      { callId, userId }: { callId: ID; userId: ID }
    ) => {
      console.log({ _parent });
      const user = getUser(userId);
      const call = getCall(callId);

      const participants =
        call.participants?.filter(
          (participant) => participant.id !== user.id
        ) ?? [];

      const callWithLessParticipants = {
        ...call,
        participants,
      };

      const leftCall = transitionStatus(callWithLessParticipants, 'LEAVE');

      calls.splice(callIndex(call.id), 1, leftCall);

      return leftCall;
    },
    pauseCall: (_parent: unknown, { id }: Call) => {
      const call = getCall(id);

      const pausedCall = transitionStatus(call, 'PAUSE');

      calls.splice(callIndex(call.id), 1, pausedCall);

      return pausedCall;
    },
    removeCall: (_parent: unknown, { id }: Call) => {
      const callToBeRemoved = getCall(id);

      const [call] = calls.splice(callIndex(callToBeRemoved.id), 1);

      return call;
    },
    unpauseCall: (_parent: unknown, { id }: Call) => {
      const call = getCall(id);

      const unpausedCall = transitionStatus(call, 'UNPAUSE');

      calls.splice(callIndex(call.id), 1, unpausedCall);

      return unpausedCall;
    },
    login: (_parent: unknown, { name }: User) => {
      const id = crypto.randomUUID();
      const newUser: User = {
        id,
        name,
        sessionId: `${id}_${Date.now()}`,
      };

      users.push(newUser);

      return newUser;
    },
    logout: (_parent: unknown, { id }: User) => {
      const user = getUser(id);

      users.splice(userIndex(user.id), 1);

      return user;
    },
  },
};
