import { Flex, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export default function Home() {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'}>
      <IconButton aria-label={'Heart'} icon={<StarIcon />} />
    </Flex>
  );
}
