import { Box, Flex, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import MotionBox from './MotionBox';

type CollectionGridItemLoaderProps = {
  index: number;
};

const CollectionGridItemLoader = ({ index }: CollectionGridItemLoaderProps) => {
  const transition = { repeat: Infinity, duration: 1.5, delay: index * 0.15, ease: 'linear' };
  const { colorMode } = useColorMode();

  return (
    <Flex direction='column' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <MotionBox
        w='100%'
        padding='50%'
        as={motion.div}
        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={transition}
      />
      <Flex align='flex-start' direction='column' p={3} flex={1} minH='78px'>
        <Box flex={1} mb={1} w='100%'>
          <MotionBox
            as={motion.div}
            minH={6}
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            w='80%'
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={transition}
          />
        </Box>
        <MotionBox
          as={motion.div}
          minH={6}
          bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
          w='50%'
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={transition}
        />
      </Flex>
    </Flex>
  );
};

export default CollectionGridItemLoader;
