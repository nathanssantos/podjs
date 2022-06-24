import { Flex, Text, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import MotionBox from './MotionBox';

type RankCollectionItemLoaderProps = {
  index?: number;
  animate?: boolean;
};

const RankCollectionItemLoader = ({
  index = 0,
  animate = false,
}: RankCollectionItemLoaderProps) => {
  const { colorMode } = useColorMode();
  const transition = {
    repeat: Infinity,
    duration: 1.5,
    ease: 'linear',
    delay: (index + 1) * 0.15,
  };

  return (
    <Flex align='center' gap='6'>
      <MotionBox
        as={motion.div}
        display='flex'
        position='relative'
        minW='56px'
        justifyContent='center'
        animate={
          animate && {
            opacity: [0, 1, 0],
          }
        }
        transition={transition}
        pb={6}
      >
        <Text
          fontSize='50px'
          fontWeight={700}
          color={colorMode === 'light' ? 'gray.100' : 'gray.700'}
        >
          {index + 1}
        </Text>
      </MotionBox>
      <Flex overflow='hidden' borderBottomWidth='1px' pb={6} gap={4} align='center' flex={1}>
        <Flex
          overflow='hidden'
          w='100px'
          h='100px'
          minW='100px'
          borderWidth='1px'
          borderRadius='lg'
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

        <Flex direction='column' w='100%'>
          <MotionBox
            w={64}
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
          <Flex gap={2} mb={2} w='100%'>
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
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RankCollectionItemLoader;
