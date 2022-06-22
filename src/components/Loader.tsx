import { Box, BoxProps, Container, Flex, SimpleGrid, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box);

type LoaderProps = {
  variant?: 'grid' | 'list';
};

const Loader = ({ variant = 'grid' }: LoaderProps) => {
  const transition = { repeat: Infinity, duration: 1.5 };

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
              w={{ base: '100%', md: 240 }}
              minW={240}
              maxW={{ base: '100%', md: 240 }}
              h={{ md: 240 }}
            >
              <MotionBox
                w='100%'
                as={motion.div}
                bg='gray.700'
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{ ...transition, ease: 'linear' }}
                p='50%'
              />
            </Flex>
            <Flex direction='column' gap={4} textAlign={{ base: 'center', md: 'left' }}>
              <Flex flex={1} direction='column' align={{ base: 'center', md: 'flex-start' }}>
                <MotionBox
                  w={40}
                  as={motion.div}
                  bg='gray.700'
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
                  bg='gray.700'
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
                  bg='gray.700'
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{ ...transition, ease: 'linear' }}
                  minH={6}
                  mb={4}
                />
                <MotionBox
                  w={32}
                  as={motion.div}
                  bg='gray.700'
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{ ...transition, ease: 'linear' }}
                  minH={6}
                  mb={4}
                />
              </Flex>
              <MotionBox
                w={24}
                as={motion.div}
                bg='gray.700'
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
              <Flex
                overflow='hidden'
                direction={{ base: 'column', sm: 'row' }}
                align={{ base: 'center', sm: 'flex-start' }}
                borderBottomWidth='1px'
                pb={6}
                key={index}
              >
                <Flex
                  borderWidth='1px'
                  borderRadius='lg'
                  overflow='hidden'
                  w={{ base: '100%', sm: '180px' }}
                  minW={'180px'}
                  h={{ base: 'initial', sm: '180px' }}
                  mb={{ base: 3, sm: 0 }}
                >
                  <MotionBox
                    w='100%'
                    as={motion.div}
                    bg='gray.700'
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
                  />
                </Flex>

                <Flex
                  direction='column'
                  pl={3}
                  align={{ base: 'center', sm: 'flex-start' }}
                  textAlign={{ base: 'center', sm: 'left' }}
                  w='100%'
                >
                  <MotionBox
                    w='100%'
                    as={motion.div}
                    bg='gray.700'
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
                    minH={6}
                    mb={2}
                  />
                  <Flex align='center' gap={2} mb={2} w='100%'>
                    <MotionBox
                      w={32}
                      as={motion.div}
                      bg='gray.700'
                      animate={{
                        opacity: [0, 1, 0],
                      }}
                      transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
                      minH={6}
                    />
                    <MotionBox
                      w={32}
                      as={motion.div}
                      bg='gray.700'
                      animate={{
                        opacity: [0, 1, 0],
                      }}
                      transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
                      minH={6}
                    />
                  </Flex>
                  <Flex flex={1} w='100%' direction={{ base: 'column', sm: 'row' }}>
                    <Flex direction='column' flex={1}>
                      <MotionBox
                        h='116px'
                        w='100%'
                        as={motion.div}
                        bg='gray.700'
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
                      />
                    </Flex>
                    <Flex direction='column' alignItems='flex-end' justify='flex-end' pl={2}>
                      <MotionBox
                        h={8}
                        w={8}
                        as={motion.div}
                        bg='gray.700'
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </>
      );
    }

    default: {
      return (
        <SimpleGrid minChildWidth={200} gap={3} mb={12}>
          {new Array(20).fill('').map((item, index) => (
            <Flex
              key={`${index}`}
              direction='column'
              borderWidth='1px'
              borderRadius='lg'
              overflow='hidden'
            >
              <MotionBox
                w='100%'
                padding='50%'
                as={motion.div}
                bg='gray.700'
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
              />
              <Flex align='flex-start' direction='column' p={3} flex={1} minH='102px'>
                <Box flex={1} mb={3} w='100%'>
                  <MotionBox
                    as={motion.div}
                    minH={6}
                    bg='gray.700'
                    w='80%'
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
                  />
                </Box>
                <MotionBox
                  as={motion.div}
                  minH={6}
                  bg='gray.700'
                  w='50%'
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{ ...transition, delay: index * 0.15, ease: 'linear' }}
                />
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      );
    }
  }
};

export default Loader;
