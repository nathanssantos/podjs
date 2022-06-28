import { useDisclosure } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { ReactElement } from 'react';

import AppLoader from './AppLoader';
import CollectionDetailModal from './CollectionDetailModal';
import Drawer from './Drawer';
import Header from './Header';
import PlayList from './PlayList';
import Player from './Player';

type LayoutProps = {
  children: ReactElement | ReactElement[];
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Player />
      <CollectionDetailModal />
      <PlayList />
      <Drawer />
      <AppLoader />
    </>
  );
};

export default observer(Layout);
