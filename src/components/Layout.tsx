import { Flex, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

import AppLoader from './AppLoader';
import Drawer from './Drawer';
import Header from './Header';
import MotionBox from './MotionBox';
import PlayList from './PlayList';
import Player from './Player';

const Layout = () => {
  const [appIsLoading, setAppIsLoading] = useState(true);
  const [loaderIsVisible, setLoaderIsVisible] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      setLoaderIsVisible(false);
    }, 2000);
    setTimeout(() => {
      setAppIsLoading(false);
    }, 2600);
  }, []);

  return (
    <>
      <Header onOpenDrawer={onOpen} />
      <Player />
      <PlayList />
      <Drawer isOpen={isOpen} onClose={onClose} />
      {appIsLoading && (
        <MotionBox
          as={motion.div}
          animate={{ opacity: loaderIsVisible ? 1 : 0 }}
          transition={{
            duration: 0.5,
            ease: 'linear',
          }}
        >
          <AppLoader />
        </MotionBox>
      )}
    </>
  );
};

export default observer(Layout);
