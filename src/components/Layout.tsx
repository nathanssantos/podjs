import { useEffect, useState } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import Header from './Header';
import Player from './Player';
import Drawer from './Drawer';
import PlayList from './PlayList';
import AppLoader from './AppLoader';
import { motion } from 'framer-motion';
import MotionBox from './MotionBox';

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
