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
  readonly dateCreated: Scalars['Float']['output'];
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly participants?: Maybe<ReadonlyArray<User>>;
  readonly status: Status;
};

export type Mutation = {
  /** Create a new call, setting its status to PENDING */
  readonly createCall: Call;
  /** End a call, setting its status to COMPLETED */
  readonly endCall: Call;
  /** Current user joins call */
  readonly joinCall: Call;
  /** Current user leaves call */
  readonly leaveCall: Call;
  readonly login: User;
  readonly logout: User;
  /** Call is put on hold */
  readonly pauseCall: Call;
  /** Call is deleted */
  readonly removeCall: Call;
  /** Call becomes active */
  readonly unpauseCall: Call;
};


export type MutationCreateCallArgs = {
  name: Scalars['String']['input'];
};


export type MutationEndCallArgs = {
  id: Scalars['ID']['input'];
};


export type MutationJoinCallArgs = {
  callId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLeaveCallArgs = {
  callId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  name: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationPauseCallArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCallArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUnpauseCallArgs = {
  id: Scalars['ID']['input'];
};

export type Node = {
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
};

export type Query = {
  readonly call: Call;
  readonly calls: ReadonlyArray<Call>;
  readonly user: User;
  readonly users: ReadonlyArray<User>;
};


export type QueryCallArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export enum Status {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  OnHold = 'ON_HOLD',
  Pending = 'PENDING'
}

export type User = Node & {
  readonly id: Scalars['ID']['output'];
  readonly isLoggedIn?: Maybe<Scalars['Boolean']['output']>;
  readonly name: Scalars['String']['output'];
  readonly sessionId: Scalars['ID']['output'];
};
