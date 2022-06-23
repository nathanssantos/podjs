import { Flex, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import MotionBox from './MotionBox';

type PodcastListItemLoaderProps = {
  index?: number;
  animate?: boolean;
};

const PodcastListItemLoader = ({ index = 0, animate = false }: PodcastListItemLoaderProps) => {
  const { colorMode } = useColorMode();
  const transition = {
    repeat: Infinity,
    duration: 1.5,
    ease: 'linear',
    delay: (index + 1) * 0.15,
  };

  return (
    <Flex
      overflow='hidden'
      direction={{ base: 'column', sm: 'row' }}
      align={{ base: 'center', sm: 'flex-start' }}
      borderBottomWidth='1px'
      pb={6}
      key={index}
      gap={4}
    >
      <Flex
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        w={{ base: '100%', sm: '180px' }}
        minW={'180px'}
        h={{ base: 'initial', sm: '180px' }}
      >
        <MotionBox
          w='100%'
          as={motion.div}
          bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
          animate={
            animate && {
              opacity: [0, 1, 0],
            }
          }
          transition={transition}
          padding='50%'
        />
      </Flex>

      <Flex
        direction='column'
        align={{ base: 'center', sm: 'flex-start' }}
        textAlign={{ base: 'center', sm: 'left' }}
        w='100%'
      >
        <MotionBox
          w='100%'
          as={motion.div}
          bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
          animate={
            animate && {
              opacity: [0, 1, 0],
            }
          }
          transition={transition}
          minH={6}
          mb={2}
        />
        <Flex align='center' gap={2} mb={2} w='100%'>
          <MotionBox
            w={20}
            as={motion.div}
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            animate={
              animate && {
                opacity: [0, 1, 0],
              }
            }
            transition={transition}
            minH={6}
          />
          <MotionBox
            w={16}
            as={motion.div}
            bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
            animate={
              animate && {
                opacity: [0, 1, 0],
              }
            }
            transition={transition}
            minH={6}
          />
        </Flex>
        <Flex flex={1} w='100%' direction={{ base: 'column', sm: 'row' }} gap={4}>
          <Flex direction='column' flex={1}>
            <MotionBox
              h='116px'
              w='100%'
              as={motion.div}
              bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
              animate={
                animate && {
                  opacity: [0, 1, 0],
                }
              }
              transition={transition}
            />
          </Flex>
          <Flex direction='column' alignItems='flex-end' justify='flex-end'>
            <MotionBox
              h={8}
              w={8}
              as={motion.div}
              bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
              animate={
                animate && {
                  opacity: [0, 1, 0],
                }
              }
              transition={transition}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PodcastListItemLoader;
