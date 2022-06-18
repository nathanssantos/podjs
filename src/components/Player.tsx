import { Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react';
import AudioPlayer from 'react-h5-audio-player';
import { useStore } from '../hooks';

const Player = () => {
  const { playerStore } = useStore();
  const { colorMode } = useColorMode();

  const { currentPodcast } = playerStore;

  return (
    <Flex
      as={motion.div}
      position='fixed'
      bottom={0}
      left={0}
      right={0}
      bgColor={colorMode === 'light' ? '#fff' : 'gray.700'}
      borderTopWidth='1px'
      animate={{
        transform: `translate3d(0, ${
          playerStore?.currentPodcast?.enclosure ? '0' : '100%'
        }, 0)`,
      }}
      sx={{
        '.rhap_container': {
          boxShadow: 'none',
        },
        '.rhap_time': {
          color: 'gray.500',
        },
        '.rhap_main-controls-button': {
          color: 'var(--chakra-colors-chakra-body-text)',
        },
        '.rhap_repeat-button': {
          display: 'none',
        },
        '.rhap_progress-indicator': {
          bg: 'var(--chakra-colors-chakra-body-text)',
        },
        '.rhap_progress-bar-show-download': {
          bgColor: 'gray.500',
        },
        '.rhap_volume-button': {
          color: 'var(--chakra-colors-chakra-body-text)',
        },
        '.rhap_volume-indicator': {
          bg: 'var(--chakra-colors-chakra-body-text)',
        },
        '.rhap_volume-bar': {
          bg: 'gray.500',
        },
        '.rhap_additional-controls': {
          display: { base: 'none', sm: 'flex' },
          pl: { md: '32px' },
        },
      }}
    >
      {!!currentPodcast?.itunes?.image?.length && !!currentPodcast?.title?.length && (
        <Image
          display={{ base: 'none', sm: 'initial' }}
          h='121px'
          width='121px'
          alt={currentPodcast.title}
          src={currentPodcast.itunes.image}
        />
      )}
      <Flex direction='column' py={2} px={3} gap={2} flex='1'>
        {!!currentPodcast?.title?.length && (
          <Text
            mb={1}
            fontWeight='semibold'
            lineHeight='tight'
            overflow='hidden'
            textOverflow='ellipsis'
            whiteSpace='nowrap'
            w={{ base: 'calc(100vw - 46px)', sm: 'calc(100vw - 161px)' }}
          >
            {currentPodcast.title}
          </Text>
        )}
        <AudioPlayer
          autoPlayAfterSrcChange
          src={currentPodcast?.enclosure?.url}
          style={{
            background: 'transparent',
            padding: 0,
          }}
          progressJumpSteps={{ backward: 30000, forward: 30000 }}
        />
      </Flex>
    </Flex>
  );
};

export default observer(Player);
