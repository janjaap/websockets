import { ApolloError } from '@apollo/client';

export interface ActionProps {
  callId: string;
  isDisabled?: boolean;
  onError: (error?: ApolloError) => void;
}
