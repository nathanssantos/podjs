import { useDisclosure } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import Header from './Header';
import Player from './Player';
import Drawer from './Drawer';
import PlayList from './PlayList';

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header onOpenDrawer={onOpen} />
      <Player />
      <PlayList />
      <Drawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default observer(Layout);
