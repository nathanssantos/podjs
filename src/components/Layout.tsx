import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { RiArrowUpLine } from 'react-icons/ri';
import { useStore } from '../hooks';
import Header from './Header';
import Player from './Player';
import Drawer from './Drawer';
import PlayList from './PlayList';

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { playerStore } = useStore();

  const { currentPodcast } = playerStore;

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <>
      <Header onOpenDrawer={onOpen} />
      <IconButton
        aria-label='Back to the top'
        position='fixed'
        right={6}
        bottom={!currentPodcast?.enclosure ? 6 : 36}
        onClick={scrollToTop}
        zIndex={11}
        backdropFilter='blur(10px)'
        borderWidth='1px'
        transition='0.2s linear'
      >
        <Icon as={RiArrowUpLine} fontSize={24} />
      </IconButton>
      <Drawer isOpen={isOpen} onClose={onClose} />
      <PlayList />
      <Player />
    </>
  );
};

export default observer(Layout);
