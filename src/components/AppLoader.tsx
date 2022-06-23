import { Flex } from '@chakra-ui/react';
import Logo from './Logo';

const AppLoader = () => (
  <Flex
    position='fixed'
    align='center'
    justify='center'
    left={0}
    right={0}
    top={0}
    bottom={0}
    bg='gray.700'
    zIndex={9999}
  >
    <Logo size='lg' />
  </Flex>
);

export default AppLoader;
