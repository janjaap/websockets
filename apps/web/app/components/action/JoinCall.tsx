import { useJoinCallMutation } from 'types/graphql';
import { Action } from './Action';
import { ActionProps } from './types';

export const JoinCall = (props: ActionProps) => {
  const { callId, isDisabled, onError } = props;
  const [mutate, { loading, data, error }] = useJoinCallMutation();

  const userId = 'foo';

  function onClick() {
    mutate({ variables: { callId, userId } });
  }

  return <Action label="Join" onClick={onClick} isDisabled={isDisabled} />;
};
