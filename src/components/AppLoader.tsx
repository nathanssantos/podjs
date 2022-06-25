import { Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Logo from './Logo';
import MotionBox from './MotionBox';

const AppLoader = () => {
  const [appIsLoading, setAppIsLoading] = useState(true);
  const [loaderIsVisible, setLoaderIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoaderIsVisible(false);
    }, 1000);
    setTimeout(() => {
      setAppIsLoading(false);
    }, 1500);
  }, []);

  if (!appIsLoading) return null;

  return (
    <MotionBox
      as={motion.div}
      animate={{ opacity: loaderIsVisible ? 1 : 0 }}
      transition={{
        duration: 0.5,
        ease: 'linear',
      }}
    >
      <Flex
        position='fixed'
        align='center'
        justify='center'
        left={0}
        right={0}
        top={0}
        bottom={0}
        bg='gray.700'
        zIndex={9999}
      >
        <Logo size='lg' />
      </Flex>
    </MotionBox>
  );
};

export default AppLoader;
