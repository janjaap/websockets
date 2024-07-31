import { Call, Status, User } from './types/graphql';

export const calls: Array<Call> = [
  {
    id: 'fb77e809-385e-446f-8714-cf2378ddf5f8',
    name: 'Call #1',
    status: Status.Pending,
    dateCreated: 1721217529380,
    participants: [],
  },
  {
    id: '892dc8af-caa7-46dd-a66b-1cf0783c6c9e',
    name: 'Call #2',
    status: Status.Completed,
    dateCreated: 1721217521380,
    participants: [],
  },
];

export const users: Array<User> = [
  // {
  //   id: 'b2b3f9a0-7a7c-4d1a-8c0d-0b2b3d9b7b3c',
  //   name: 'Alice',
  //   role: 'CALLER',
  // },
  // {
  //   id: 'b2b3f9a0-7a7c-4d1a-8c0d-0b2b3d9b7b3d',
  //   name: 'Bob',
  //   role: 'RECEIVER',
  // },
];
