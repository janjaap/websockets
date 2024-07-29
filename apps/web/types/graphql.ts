import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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

export enum Role {
  Caller = 'CALLER',
  Receiver = 'RECEIVER'
}

export enum Status {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  OnHold = 'ON_HOLD',
  Pending = 'PENDING'
}

export type User = Node & {
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly role: Role;
};

export type CallFragment = { readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null };

export type CreateCallMutationVariables = Exact<{
  callLabel: Scalars['String']['input'];
}>;


export type CreateCallMutation = { readonly createCall: { readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null } };

export type EndCallMutationVariables = Exact<{
  callId: Scalars['ID']['input'];
}>;


export type EndCallMutation = { readonly endCall: { readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null } };

export type GetCallQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCallQuery = { readonly call: { readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null } };

export type GetCallsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCallsQuery = { readonly calls: ReadonlyArray<{ readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null }> };

export type JoinCallMutationVariables = Exact<{
  callId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type JoinCallMutation = { readonly joinCall: { readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null } };

export type LeaveCallMutationVariables = Exact<{
  callId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type LeaveCallMutation = { readonly leaveCall: { readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null } };

export type PauseCallMutationVariables = Exact<{
  callId: Scalars['ID']['input'];
}>;


export type PauseCallMutation = { readonly pauseCall: { readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null } };

export type RemoveCallMutationVariables = Exact<{
  callId: Scalars['ID']['input'];
}>;


export type RemoveCallMutation = { readonly removeCall: { readonly dateCreated: number, readonly id: string, readonly name: string, readonly status: Status, readonly participants?: ReadonlyArray<{ readonly id: string, readonly name: string, readonly role: Role }> | null } };

export type UserFragment = { readonly id: string, readonly name: string, readonly role: Role };

export const CallFragmentDoc = gql`
    fragment callFragment on Call {
  dateCreated
  id
  name
  participants {
    id
    name
    role
  }
  status
}
    `;
export const UserFragmentDoc = gql`
    fragment userFragment on User {
  id
  name
  role
}
    `;
export const CreateCallDocument = gql`
    mutation CreateCall($callLabel: String!) {
  createCall(name: $callLabel) {
    ...callFragment
  }
}
    ${CallFragmentDoc}`;
export type CreateCallMutationFn = Apollo.MutationFunction<CreateCallMutation, CreateCallMutationVariables>;

/**
 * __useCreateCallMutation__
 *
 * To run a mutation, you first call `useCreateCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCallMutation, { data, loading, error }] = useCreateCallMutation({
 *   variables: {
 *      callLabel: // value for 'callLabel'
 *   },
 * });
 */
export function useCreateCallMutation(baseOptions?: Apollo.MutationHookOptions<CreateCallMutation, CreateCallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCallMutation, CreateCallMutationVariables>(CreateCallDocument, options);
      }
export type CreateCallMutationHookResult = ReturnType<typeof useCreateCallMutation>;
export type CreateCallMutationResult = Apollo.MutationResult<CreateCallMutation>;
export type CreateCallMutationOptions = Apollo.BaseMutationOptions<CreateCallMutation, CreateCallMutationVariables>;
export const EndCallDocument = gql`
    mutation EndCall($callId: ID!) {
  endCall(id: $callId) {
    ...callFragment
  }
}
    ${CallFragmentDoc}`;
export type EndCallMutationFn = Apollo.MutationFunction<EndCallMutation, EndCallMutationVariables>;

/**
 * __useEndCallMutation__
 *
 * To run a mutation, you first call `useEndCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endCallMutation, { data, loading, error }] = useEndCallMutation({
 *   variables: {
 *      callId: // value for 'callId'
 *   },
 * });
 */
export function useEndCallMutation(baseOptions?: Apollo.MutationHookOptions<EndCallMutation, EndCallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndCallMutation, EndCallMutationVariables>(EndCallDocument, options);
      }
export type EndCallMutationHookResult = ReturnType<typeof useEndCallMutation>;
export type EndCallMutationResult = Apollo.MutationResult<EndCallMutation>;
export type EndCallMutationOptions = Apollo.BaseMutationOptions<EndCallMutation, EndCallMutationVariables>;
export const GetCallDocument = gql`
    query GetCall($id: ID!) {
  call(id: $id) {
    ...callFragment
  }
}
    ${CallFragmentDoc}`;

/**
 * __useGetCallQuery__
 *
 * To run a query within a React component, call `useGetCallQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCallQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCallQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCallQuery(baseOptions: Apollo.QueryHookOptions<GetCallQuery, GetCallQueryVariables> & ({ variables: GetCallQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCallQuery, GetCallQueryVariables>(GetCallDocument, options);
      }
export function useGetCallLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCallQuery, GetCallQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCallQuery, GetCallQueryVariables>(GetCallDocument, options);
        }
export function useGetCallSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCallQuery, GetCallQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCallQuery, GetCallQueryVariables>(GetCallDocument, options);
        }
export type GetCallQueryHookResult = ReturnType<typeof useGetCallQuery>;
export type GetCallLazyQueryHookResult = ReturnType<typeof useGetCallLazyQuery>;
export type GetCallSuspenseQueryHookResult = ReturnType<typeof useGetCallSuspenseQuery>;
export type GetCallQueryResult = Apollo.QueryResult<GetCallQuery, GetCallQueryVariables>;
export const GetCallsDocument = gql`
    query GetCalls {
  calls {
    ...callFragment
  }
}
    ${CallFragmentDoc}`;

/**
 * __useGetCallsQuery__
 *
 * To run a query within a React component, call `useGetCallsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCallsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCallsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCallsQuery(baseOptions?: Apollo.QueryHookOptions<GetCallsQuery, GetCallsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCallsQuery, GetCallsQueryVariables>(GetCallsDocument, options);
      }
export function useGetCallsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCallsQuery, GetCallsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCallsQuery, GetCallsQueryVariables>(GetCallsDocument, options);
        }
export function useGetCallsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCallsQuery, GetCallsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCallsQuery, GetCallsQueryVariables>(GetCallsDocument, options);
        }
export type GetCallsQueryHookResult = ReturnType<typeof useGetCallsQuery>;
export type GetCallsLazyQueryHookResult = ReturnType<typeof useGetCallsLazyQuery>;
export type GetCallsSuspenseQueryHookResult = ReturnType<typeof useGetCallsSuspenseQuery>;
export type GetCallsQueryResult = Apollo.QueryResult<GetCallsQuery, GetCallsQueryVariables>;
export const JoinCallDocument = gql`
    mutation JoinCall($callId: ID!, $userId: ID!) {
  joinCall(callId: $callId, userId: $userId) {
    ...callFragment
  }
}
    ${CallFragmentDoc}`;
export type JoinCallMutationFn = Apollo.MutationFunction<JoinCallMutation, JoinCallMutationVariables>;

/**
 * __useJoinCallMutation__
 *
 * To run a mutation, you first call `useJoinCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCallMutation, { data, loading, error }] = useJoinCallMutation({
 *   variables: {
 *      callId: // value for 'callId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useJoinCallMutation(baseOptions?: Apollo.MutationHookOptions<JoinCallMutation, JoinCallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCallMutation, JoinCallMutationVariables>(JoinCallDocument, options);
      }
export type JoinCallMutationHookResult = ReturnType<typeof useJoinCallMutation>;
export type JoinCallMutationResult = Apollo.MutationResult<JoinCallMutation>;
export type JoinCallMutationOptions = Apollo.BaseMutationOptions<JoinCallMutation, JoinCallMutationVariables>;
export const LeaveCallDocument = gql`
    mutation LeaveCall($callId: ID!, $userId: ID!) {
  leaveCall(callId: $callId, userId: $userId) {
    ...callFragment
  }
}
    ${CallFragmentDoc}`;
export type LeaveCallMutationFn = Apollo.MutationFunction<LeaveCallMutation, LeaveCallMutationVariables>;

/**
 * __useLeaveCallMutation__
 *
 * To run a mutation, you first call `useLeaveCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCallMutation, { data, loading, error }] = useLeaveCallMutation({
 *   variables: {
 *      callId: // value for 'callId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useLeaveCallMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCallMutation, LeaveCallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCallMutation, LeaveCallMutationVariables>(LeaveCallDocument, options);
      }
export type LeaveCallMutationHookResult = ReturnType<typeof useLeaveCallMutation>;
export type LeaveCallMutationResult = Apollo.MutationResult<LeaveCallMutation>;
export type LeaveCallMutationOptions = Apollo.BaseMutationOptions<LeaveCallMutation, LeaveCallMutationVariables>;
export const PauseCallDocument = gql`
    mutation PauseCall($callId: ID!) {
  pauseCall(id: $callId) {
    ...callFragment
  }
}
    ${CallFragmentDoc}`;
export type PauseCallMutationFn = Apollo.MutationFunction<PauseCallMutation, PauseCallMutationVariables>;

/**
 * __usePauseCallMutation__
 *
 * To run a mutation, you first call `usePauseCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseCallMutation, { data, loading, error }] = usePauseCallMutation({
 *   variables: {
 *      callId: // value for 'callId'
 *   },
 * });
 */
export function usePauseCallMutation(baseOptions?: Apollo.MutationHookOptions<PauseCallMutation, PauseCallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PauseCallMutation, PauseCallMutationVariables>(PauseCallDocument, options);
      }
export type PauseCallMutationHookResult = ReturnType<typeof usePauseCallMutation>;
export type PauseCallMutationResult = Apollo.MutationResult<PauseCallMutation>;
export type PauseCallMutationOptions = Apollo.BaseMutationOptions<PauseCallMutation, PauseCallMutationVariables>;
export const RemoveCallDocument = gql`
    mutation RemoveCall($callId: ID!) {
  removeCall(id: $callId) {
    ...callFragment
  }
}
    ${CallFragmentDoc}`;
export type RemoveCallMutationFn = Apollo.MutationFunction<RemoveCallMutation, RemoveCallMutationVariables>;

/**
 * __useRemoveCallMutation__
 *
 * To run a mutation, you first call `useRemoveCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCallMutation, { data, loading, error }] = useRemoveCallMutation({
 *   variables: {
 *      callId: // value for 'callId'
 *   },
 * });
 */
export function useRemoveCallMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCallMutation, RemoveCallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCallMutation, RemoveCallMutationVariables>(RemoveCallDocument, options);
      }
export type RemoveCallMutationHookResult = ReturnType<typeof useRemoveCallMutation>;
export type RemoveCallMutationResult = Apollo.MutationResult<RemoveCallMutation>;
export type RemoveCallMutationOptions = Apollo.BaseMutationOptions<RemoveCallMutation, RemoveCallMutationVariables>;