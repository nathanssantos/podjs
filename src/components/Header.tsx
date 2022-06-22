import { Flex, Box, Icon, Text, IconButton, useColorMode, Container } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { RiDiscLine, RiMenuLine } from 'react-icons/ri';

type HeaderProps = {
  onOpenDrawer: () => void;
};

const Header = ({ onOpenDrawer }: HeaderProps) => {
  const { colorMode } = useColorMode();

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
        <Flex gap={3}>
          <Link href='/' passHref>
            <Flex cursor='pointer' align='center' gap={1}>
              <Icon as={RiDiscLine} fontSize='32px' />
              <Text fontSize={20} fontWeight='semibold'>
                PodJS
              </Text>
            </Flex>
          </Link>
        </Flex>

        <IconButton aria-label='Menu' onClick={onOpenDrawer} size='sm'>
          <Icon as={RiMenuLine} fontSize={20} />
        </IconButton>
      </Container>
    </Flex>
  );
};

export default observer(Header);
