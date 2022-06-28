import { Container, Flex, Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { RiMenuLine } from 'react-icons/ri';

import { useStore } from '../hooks';
import Logo from './Logo';

const Header = () => {
  const { uiStore } = useStore();
  const { colorMode } = useColorMode();
  const router = useRouter();

  const { openDrawer } = uiStore;

  return (
    <Flex
      as='header'
      align='center'
      justify='space-between'
      position='sticky'
      top={-14}
      left='0'
      right='0'
      backdropFilter='blur(10px)'
      zIndex={99}
      transition='0.2s linear'
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.700'}
    >
      <Container
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        py={3}
        px={{ base: 3, md: 6 }}
        w='100%'
        maxW='container.xl'
      >
        <Flex cursor='pointer' onClick={() => router.push('/')}>
          <Logo />
        </Flex>

        <IconButton aria-label='Menu' onClick={openDrawer} size='sm'>
          <Icon as={RiMenuLine} fontSize='20px' />
        </IconButton>
      </Container>
    </Flex>
  );
};

export default observer(Header);
