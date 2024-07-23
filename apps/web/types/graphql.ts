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
  readonly createCall?: Maybe<Call>;
  readonly endCall?: Maybe<Call>;
  readonly joinCall?: Maybe<Call>;
  readonly leaveCall?: Maybe<Call>;
  readonly updateCall?: Maybe<Call>;
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
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
};

export type Query = {
  readonly call?: Maybe<Call>;
  readonly calls: ReadonlyArray<Call>;
  readonly user?: Maybe<User>;
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
  Pending = 'PENDING'
}

export type User = Node & {
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly role: Role;
};

export type CreateCallMutationVariables = Exact<{
  callLabel: Scalars['String']['input'];
}>;


export type CreateCallMutation = { readonly createCall?: { readonly id: string, readonly name: string, readonly dateCreated: number } | null };

export type GetCallsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCallsQuery = { readonly calls: ReadonlyArray<{ readonly id: string, readonly name: string, readonly dateCreated: number, readonly status: Status }> };

export type EndCallMutationVariables = Exact<{
  callId: Scalars['ID']['input'];
}>;


export type EndCallMutation = { readonly endCall?: { readonly id: string, readonly name: string, readonly dateCreated: number, readonly status: Status } | null };


export const CreateCallDocument = gql`
    mutation CreateCall($callLabel: String!) {
  createCall(name: $callLabel) {
    id
    name
    dateCreated
  }
}
    `;
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
export const GetCallsDocument = gql`
    query getCalls {
  calls {
    id
    name
    dateCreated
    status
  }
}
    `;

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
export const EndCallDocument = gql`
    mutation endCall($callId: ID!) {
  endCall(id: $callId) {
    id
    name
    dateCreated
    status
  }
}
    `;
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