import { Box, Flex, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import MotionBox from './MotionBox';

type CollectionGridItemLoaderProps = {
  index: number;
  animate?: boolean;
};

const CollectionListItemLoader = ({
  index,
  animate = false,
}: CollectionGridItemLoaderProps) => {
  const transition = { repeat: Infinity, duration: 1.5, delay: index * 0.15, ease: 'linear' };
  const { colorMode } = useColorMode();

  return (
    <Flex direction='column' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <MotionBox
        w='100%'
        padding='50%'
        as={motion.div}
        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
        animate={
          animate && {
            opacity: [0, 1, 0],
          }
        }
        transition={transition}
      />
      <Flex align='flex-start' direction='column' p={3} flex={1} minH='78px' gap={1}>
        <MotionBox
          as={motion.div}
          minH={6}
          bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
          w='80%'
          animate={
            animate && {
              opacity: [0, 1, 0],
            }
          }
          transition={transition}
        />
        <MotionBox
          as={motion.div}
          minH={6}
          bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
          w='50%'
          animate={
            animate && {
              opacity: [0, 1, 0],
            }
          }
          transition={transition}
        />
      </Flex>
    </Flex>
  );
};

export default CollectionListItemLoader;
