import { Flex, Box, Icon, Text, IconButton, useColorMode, useTheme } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { RiMenuLine, RiPlayListLine } from 'react-icons/ri';
import { useStore } from '../hooks';

type HeaderProps = {
  onOpenDrawer: () => void;
};

const Header = ({ onOpenDrawer }: HeaderProps) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { playerStore } = useStore();

  const { playList, openPlayList } = playerStore;

  return (
    <Flex
      as='header'
      align='center'
      justify='space-between'
      position='sticky'
      top='0'
      left='0'
      right='0'
      minH='64px'
      py={2}
      px={6}
      backdropFilter='blur(10px)'
      zIndex={99}
      transition='0.2s linear'
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.700'}
      borderBottomWidth='1px'
    >
      <Flex gap={3}>
        <IconButton
          aria-label='Menu'
          onClick={onOpenDrawer}
          backdropFilter='blur(10px)'
          size='sm'
        >
          <Icon as={RiMenuLine} fontSize={20} />
        </IconButton>
        <Link href='/' passHref>
          <Box display='flex' cursor='pointer'>
            <Text fontSize={20} fontWeight='semibold'>
              PodJS
            </Text>
          </Box>
        </Link>
      </Flex>

      <IconButton
        aria-label='Menu'
        onClick={openPlayList}
        backdropFilter='blur(10px)'
        color={playList?.length ? 'teal.300' : 'var(--chakra-colors-chakra-body-text)'}
        size='sm'
      >
        <Icon as={RiPlayListLine} fontSize={20} />
      </IconButton>
    </Flex>
  );
};

export default observer(Header);
