import { Flex, SimpleGrid, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import CollectionGridItemLoader from './CollectionListItemLoader';
import MotionBox from './MotionBox';
import PodcastListItemLoader from './PodcastListItemLoader';

type LoaderProps = {
  variant?: 'grid' | 'list';
};

const Loader = ({ variant = 'grid' }: LoaderProps) => {
  const transition = { repeat: Infinity, duration: 1.5 };
  const { colorMode } = useColorMode();

  switch (variant) {
    case 'list': {
      return (
        <>
          <Flex
            gap={4}
            position={{ lg: 'sticky' }}
            direction={{ base: 'column', md: 'row', lg: 'column' }}
            alignSelf={{ base: 'center', md: 'flex-start' }}
            align={{ base: 'center', md: 'initial' }}
            top='72px'
            maxW={{ lg: 60 }}
          >
            <Flex
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
              w={{ base: '100%', md: '240px' }}
              minW='240px'
              maxW={{ base: '100%', md: '240px' }}
              h={{ md: '240px' }}
            >
              <MotionBox
                w='100%'
                as={motion.div}
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{ ...transition, ease: 'linear' }}
                p='50%'
              />
            </Flex>
            <Flex direction='column' gap={4} alignItems={{ base: 'center', md: 'flex-start' }}>
              <Flex flex={1} direction='column' align={{ base: 'center', md: 'flex-start' }}>
                <MotionBox
                  w={40}
                  as={motion.div}
                  bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{ ...transition, ease: 'linear' }}
                  minH={6}
                  mb={2}
                />
                <MotionBox
                  w={32}
                  as={motion.div}
                  bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{ ...transition, ease: 'linear' }}
                  minH={6}
                  mb={4}
                />
                <MotionBox
                  w={56}
                  as={motion.div}
                  bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{ ...transition, ease: 'linear' }}
                  minH={6}
                  mb={4}
                />
                <MotionBox
                  w={24}
                  as={motion.div}
                  bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{ ...transition, ease: 'linear' }}
                  minH={6}
                  mb={4}
                />
              </Flex>
              <MotionBox
                w={56}
                as={motion.div}
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{ ...transition, ease: 'linear' }}
                minH={6}
              />
            </Flex>
          </Flex>
          <Flex direction='column' gap={{ base: 12, md: 6 }} flex={1}>
            {new Array(6).fill('').map((item, index) => (
              <PodcastListItemLoader index={index} key={index} animate />
            ))}
          </Flex>
        </>
      );
    }

    default: {
      return (
        <SimpleGrid minChildWidth={200} gap={3} mb={12}>
          {new Array(20).fill('').map((item, index) => (
            <CollectionGridItemLoader key={index} index={index} animate />
          ))}
        </SimpleGrid>
      );
    }
  }
};

export default Loader;
