import { useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react';
import { ReactElement, useEffect, useState } from 'react';

import AppLoader from './AppLoader';
import CollectionDetailModal from './CollectionDetailModal';
import Drawer from './Drawer';
import Header from './Header';
import MotionBox from './MotionBox';
import PlayList from './PlayList';
import Player from './Player';

type LayoutProps = {
  children: ReactElement | ReactElement[];
};

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Header onOpenDrawer={onOpen} />
      {children}
      <Player />
      <CollectionDetailModal />
      <PlayList />
      <Drawer isOpen={isOpen} onClose={onClose} />
      <AppLoader />
    </>
  );
};

export default observer(Layout);
