import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { RiArrowUpLine } from 'react-icons/ri';
import { useStore } from '../hooks';
import Header from './Header';
import Player from './Player';

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { playerStore } = useStore();
  const [scrollingDown, setScrollingDown] = useState(false);

  const { currentPodcast } = playerStore;

  const scrollToTop = () => window.scrollTo(0, 0);

  let lastScrollTop = 0;

  const detectScrollDirection = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 16) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', detectScrollDirection, false);

    return () => {
      window.removeEventListener('scroll', detectScrollDirection, false);
    };
  }, []);

  return (
    <>
      <Header visible={!scrollingDown} onOpenDrawer={onOpen} />
      <IconButton
        as={motion.button}
        aria-label='Back to the top'
        position='fixed'
        right='6'
        bottom={!currentPodcast?.enclosure ? '6' : '36'}
        onClick={scrollToTop}
        zIndex={11}
        backdropFilter='blur(10px)'
        borderWidth='1px'
        transition='0.2s linear'
        animate={
          !scrollingDown
            ? {
                opacity: 1,
                transform: 'scale(1)',
              }
            : {
                opacity: 0,
                transform: 'scale(0)',
              }
        }
      >
        <Icon as={RiArrowUpLine} fontSize={24} />
      </IconButton>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>PodJS</DrawerHeader>

          <DrawerBody>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Player />
    </>
  );
};

export default observer(Layout);
