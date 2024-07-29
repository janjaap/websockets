import { Call, CallFragmentDoc, useCreateCallMutation } from 'types/graphql';

export const useCreateCall = () =>
  useCreateCallMutation({
    update: (cache, { data }) => {
      if (!data) return;

      const { createCall } = data;

      cache.modify<{ calls: Array<Call> }>({
        fields: {
          calls(existingCallRefs, { readField }) {
            const newCallRef = cache.writeFragment({
              data: createCall,
              fragment: CallFragmentDoc,
            });

            if (!newCallRef) {
              return existingCallRefs;
            }

            const id = cache.identify(newCallRef);

            if (existingCallRefs.some((ref) => readField('id', ref) === id)) {
              return existingCallRefs;
            }

            return [...existingCallRefs, newCallRef];
          },
        },
      });
    },
  });
