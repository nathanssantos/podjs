import { Flex, Box, Icon, Text, IconButton, useColorMode, useTheme } from '@chakra-ui/react';
import Link from 'next/link';
import { RiMenuLine } from 'react-icons/ri';

type HeaderProps = {
  onOpenDrawer: () => void;
};

const Header = ({ onOpenDrawer }: HeaderProps) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  return (
    <Flex
      as='header'
      align='center'
      justify='space-between'
      position='sticky'
      top='0'
      left='0'
      right='0'
      py={2}
      px={6}
      backdropFilter='blur(10px)'
      zIndex={99}
      transition='0.2s linear'
      backgroundColor={colorMode === 'light' ? '#fff' : theme.colors.gray[700]}
      borderBottomWidth='1px'
    >
      <Link href='/' passHref>
        <Box display='flex' cursor='pointer'>
          <Text fontSize={22} letterSpacing='tight' fontWeight='bold'>
            PodJS
          </Text>
        </Box>
      </Link>
      <IconButton
        aria-label='Menu'
        onClick={onOpenDrawer}
        borderWidth='1px'
        backdropFilter='blur(10px)'
      >
        <Icon as={RiMenuLine} fontSize={24} />
      </IconButton>
    </Flex>
  );
};

export default Header;
