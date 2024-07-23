import useSWR from 'swr';
import { Call } from 'types/graphql';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function getCalls() {
  return useSWR<{ calls: ReadonlyArray<Call> }>('/calls', fetcher);
  // const response = await fetch('/calls/api', {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error('Failed to fetch data');
  // }

  // const body = await response.json();

  // return body;
}
