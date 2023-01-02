import { Flex, IconButton, useToast } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useCount } from '~/hooks/useCount';
import { useCallback, useRef } from 'react';

export default function Home() {
  const { data, isLoading, mutate } = useCount({
    dedupingInterval: 10000,
  });
  const countIncrementFetcher: () => Promise<void> = useCallback(async () => {
    await fetch('/api/increment', {
      method: 'POST',
    });
  }, []);
  const lastMutatedAt = useRef(new Date().getTime());
  const toast = useToast();
  return (
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'} gap={4}>
      <IconButton
        aria-label={'Heart'}
        icon={<StarIcon />}
        isDisabled={isLoading || !data}
        onClick={async () => {
          try {
            const optimisticData = {
              count: data!.count + 1,
            };
            const isRevalidate = new Date().getTime() - lastMutatedAt.current > 10000;
            await mutate(
              async () => {
                await countIncrementFetcher();
                if (isRevalidate) {
                  lastMutatedAt.current = new Date().getTime();
                }
                return optimisticData;
              },
              {
                optimisticData,
                rollbackOnError: true,
                revalidate: new Date().getTime() - lastMutatedAt.current > 10000,
                throwOnError: true,
              }
            );
          } catch (e) {
            console.error(e);
            toast({
              status: 'error',
              title: 'incrementに失敗しました',
            });
          }
        }}
      />
      {data?.count ?? 'Loading!'}
    </Flex>
  );
}
