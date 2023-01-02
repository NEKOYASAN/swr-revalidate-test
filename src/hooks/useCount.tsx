import { CountResponse } from '~/pages/api/count';
import { KeyedMutator, SWRConfiguration } from 'swr';
import useSWR from 'swr';
export type UseCount = {
  data?: CountResponse;
  error?: Error;

  isLoading: boolean;
  mutate: KeyedMutator<CountResponse>;
};
export const useCount = (swrConfig?: SWRConfiguration): UseCount => {
  const getCountFetcher = async () => {
    const response = await fetch('/api/count', { method: 'GET' });
    return response.json();
  };

  const { data, error, isLoading, mutate } = useSWR<CountResponse>(
    '/api/count',
    getCountFetcher,
    swrConfig
  );
  return { data, error, isLoading, mutate };
};
