import { calls, users } from './data';
import resolvers from './resolvers';

jest.mock('./data', () => ({
  ...jest.requireActual('./data'),
  users: [
    {
      id: 'b2b3f9a0-7a7c-4d1a-8c0d-0b2b3d9b7b3c',
      name: 'Alice',
    },
    {
      id: 'b2b3f9a0-7a7c-4d1a-8c0d-0b2b3d9b7b3d',
      name: 'Bob',
    },
  ],
}));

describe('resolvers', () => {
  describe('Call', () => {
    it('returns the call id', () => {
      const call = { id: '1' };
      const result = resolvers.Call.id(call);

      expect(result).toBe('1');
    });

    it('returns the call name', () => {
      const call = { name: 'Call 1' };
      const result = resolvers.Call.name(call);

      expect(result).toBe('Call 1');
    });

    it('returns the call status', () => {
      const call = { status: 'PENDING' };
      const result = resolvers.Call.status(call);

      expect(result).toBe('PENDING');
    });

    it('returns the call date created', () => {
      const call = { dateCreated: 1234567890 };
      const result = resolvers.Call.dateCreated(call);

      expect(result).toBe(1234567890);
    });

    it('returns the call participants', () => {
      const call = { participants: ['1', '2'] };
      const result = resolvers.Call.participants(call);

      expect(result).toEqual(['1', '2']);
    });
  });

  describe('User', () => {
    it('returns the user id', () => {
      const user = { id: '1' };
      const result = resolvers.User.id(user);

      expect(result).toBe('1');
    });

    it('returns the user name', () => {
      const user = { name: 'User 1' };
      const result = resolvers.User.name(user);

      expect(result).toBe('User 1');
    });

    it('returns the user sessionId', () => {
      const user = { sessionId: 'foo_123' };
      const result = resolvers.User.sessionId(user);

      expect(result).toBe('foo_123');
    });
  });

  describe('Query', () => {
    it('returns a call by id', () => {
      const call = calls[1];
      const result = resolvers.Query.call(null, call);

      expect(result).toEqual(call);
    });

    it('returns a user by id', () => {
      const user = users[1];
      const result = resolvers.Query.user(null, user);

      expect(result).toEqual(user);
    });
  });

  describe('Mutation', () => {
    const containsCall = (call, expectedStatus = 'PENDING') =>
      resolvers.Query.calls().find(
        ({ id, status }) => id === call.id && status === expectedStatus
      ) !== undefined;

    it('creates a call', () => {
      const name = 'Call #3';
      const result = resolvers.Mutation.createCall(null, { name });

      const newCall = {
        dateCreated: expect.any(Number),
        id: expect.any(String),
        name,
        participants: [],
        status: 'PENDING',
      };

      expect(result).toMatchObject(newCall);

      expect(containsCall(result)).toBe(true);
    });

    it('ends a call', () => {
      const callToComplete = resolvers.Query.calls()[2];

      expect(containsCall(callToComplete, 'COMPLETED')).toBe(false);

      const result = resolvers.Mutation.endCall(null, callToComplete);

      expect(result).toMatchObject({
        id: callToComplete.id,
        status: 'COMPLETED',
      });

      expect(containsCall(callToComplete, 'COMPLETED')).toBe(true);
    });

    it('joins a call', () => {
      const callToJoin = resolvers.Query.calls().find(
        (call) => call.status !== 'COMPLETED'
      );
      const user = users[0];

      expect(callToJoin.participants).not.toContain(user);

      const joinArgs = { callId: callToJoin.id, userId: user.id };
      const joinedCall = resolvers.Mutation.joinCall(null, joinArgs);

      expect(joinedCall.participants).toContain(user);
      expect(joinedCall.participants.length).toBeGreaterThan(
        callToJoin.participants.length
      );

      const numJoined = joinedCall.participants.length;

      // join again
      resolvers.Mutation.joinCall(null, joinArgs);

      expect(joinedCall.participants.length).toEqual(numJoined);
    });

    it('leaves a call', () => {
      const joinedCall = resolvers.Query.calls().find(
        (call) => call.participants.length > 0
      );
      const user = joinedCall.participants[0];

      const leftCall = resolvers.Mutation.leaveCall(null, {
        callId: joinedCall.id,
        userId: user.id,
      });

      expect(leftCall.participants).not.toContain(user);
    });

    it('pauses call', () => {
      // join a call first, to make sure it's in progress
      const callToJoin = resolvers.Query.calls().find(
        (call) => call.status !== 'COMPLETED'
      );

      users.forEach((user) => {
        resolvers.Mutation.joinCall(null, {
          callId: callToJoin.id,
          userId: user.id,
        });
      });

      const callToPause = resolvers.Query.calls().find(
        (call) => call.status === 'IN_PROGRESS'
      );

      const result = resolvers.Mutation.pauseCall(null, callToPause);

      expect(result).toMatchObject({
        id: callToPause.id,
        status: 'ON_HOLD',
      });
    });

    it('removes call', () => {
      const callToRemove = resolvers.Query.calls()[0];
      const result = resolvers.Mutation.removeCall(null, callToRemove);

      expect(result).toBe(callToRemove);
      expect(containsCall(callToRemove)).toBe(false);
    });

    it('logs a user in', () => {
      const name = 'Kees';
      const result = resolvers.Mutation.login(null, { name });

      const newUser = {
        id: expect.any(String),
        name,
      };

      expect(result).toMatchObject(newUser);
    });

    it('logs a user out', () => {
      const numUsers = resolvers.Query.users().length;
      const user = users[0];
      const result = resolvers.Mutation.logout(null, user);

      expect(result).toBe(user);

      expect(resolvers.Query.users().length).toBe(numUsers - 1);
    });
  });
});
