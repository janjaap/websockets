export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Call = Node & {
  __typename?: 'Call';
  dateCreated: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  participants?: Maybe<Array<User>>;
  status: Status;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCall?: Maybe<Call>;
  endCall?: Maybe<Call>;
  joinCall?: Maybe<Call>;
  leaveCall?: Maybe<Call>;
  updateCall?: Maybe<Call>;
};


export type MutationCreateCallArgs = {
  name: Scalars['String']['input'];
};


export type MutationEndCallArgs = {
  id: Scalars['ID']['input'];
};


export type MutationJoinCallArgs = {
  id: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLeaveCallArgs = {
  id: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationUpdateCallArgs = {
  id: Scalars['ID']['input'];
  status: Status;
};

export type Node = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  call?: Maybe<Call>;
  calls?: Maybe<Array<Maybe<Call>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCallArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export enum Role {
  Caller = 'CALLER',
  Receiver = 'RECEIVER'
}

export enum Status {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Role;
};
