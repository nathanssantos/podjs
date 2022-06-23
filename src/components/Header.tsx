import { Container, Flex, Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiMenuLine } from 'react-icons/ri';

import Logo from './Logo';

type HeaderProps = {
  onOpenDrawer: () => void;
};

const Header = ({ onOpenDrawer }: HeaderProps) => {
  const { colorMode } = useColorMode();
  const router = useRouter();

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

        <IconButton aria-label='Menu' onClick={onOpenDrawer} size='sm'>
          <Icon as={RiMenuLine} fontSize='20px' />
        </IconButton>
      </Container>
    </Flex>
  );
};

export default observer(Header);
