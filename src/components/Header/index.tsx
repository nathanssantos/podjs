import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { RiMenuLine } from 'react-icons/ri';
import Logo from './Logo';

type HeaderProps = {
  visible: boolean;
  onOpenDrawer: () => void;
};

const Header = ({ visible, onOpenDrawer }: HeaderProps) => {
  return (
    <Flex
      as={motion.header}
      align='center'
      justify='space-between'
      position='sticky'
      top='0'
      left='0'
      right='0'
      py='2'
      px='6'
      backdropFilter='blur(10px)'
      zIndex={99}
      transition='0.2s linear'
      animate={{
        transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)',
      }}
    >
      <Logo />
      <IconButton aria-label='Menu' onClick={onOpenDrawer} borderWidth='1px'>
        <Icon as={RiMenuLine} fontSize={24} />
      </IconButton>
    </Flex>
  );
};

export default Header;
