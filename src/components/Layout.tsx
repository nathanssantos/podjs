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
import { useEffect, useState } from 'react';
import { RiArrowUpLine } from 'react-icons/ri';
import Header from './Header';

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [scrollingDown, setScrollingDown] = useState(false);

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
        aria-label='Voltar ao topo'
        position='fixed'
        right='6'
        bottom='6'
        onClick={scrollToTop}
        zIndex={11}
        // rounded='full'
        // size='lg'
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
    </>
  );
};

export default Layout;
