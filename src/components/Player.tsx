import { Box, Flex, Icon, IconButton, Image, Text, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react';
import AudioPlayer from 'react-h5-audio-player';
import {
  RiArrowUpLine,
  RiPauseLine,
  RiPlayLine,
  RiRewindLine,
  RiSpeedLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';
import { useStore } from '../hooks';

const Player = () => {
  const { playerStore } = useStore();
  const { colorMode } = useColorMode();

  const { currentPodcast } = playerStore;

  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <Flex
      as={motion.div}
      position='fixed'
      zIndex={1}
      bottom={0}
      left={0}
      right={0}
      bgColor={colorMode === 'light' ? 'gray.50' : 'gray.700'}
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
        '.rhap_main-controls': {
          flex: 3,
        },
        '.rhap_main-controls-button': {
          color: 'var(--chakra-colors-chakra-body-text)',
        },
        '.rhap_repeat-button': {
          display: 'none',
        },
        '.rhap_progress-indicator': {
          bg: 'var(--chakra-colors-chakra-body-text)',
          w: '16px',
          h: '16px',
          top: '-6px',
          marginLeft: '-8px',
        },
        '.rhap_progress-bar-show-download': {
          bgColor: 'gray.500',
        },
        '.rhap_volume-controls': {
          flex: 1,
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
          display: 'none',
        },
      }}
    >
      <Box
        position='absolute'
        right={4}
        zIndex={11}
        bgColor={colorMode === 'light' ? 'gray.50' : 'gray.700'}
        p={2}
        borderWidth='1px'
        borderBottomWidth={0}
        borderTopLeftRadius='lg'
        borderTopRightRadius='lg'
        transform='translateY(-100%)'
      >
        <IconButton
          aria-label='Back to the top'
          onClick={scrollToTop}
          backdropFilter='blur(10px)'
          transition='0.2s linear'
          size='sm'
        >
          <Icon as={RiArrowUpLine} fontSize={20} />
        </IconButton>
      </Box>
      {!!currentPodcast?.itunes?.image?.length && !!currentPodcast?.title?.length && (
        <Image
          display={{ base: 'none', md: 'initial' }}
          h='92px'
          width='92px'
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
          layout='horizontal'
          src={currentPodcast?.enclosure?.url}
          style={{
            background: 'transparent',
            padding: 0,
          }}
          progressJumpSteps={{ backward: 30000, forward: 30000 }}
          customAdditionalControls={[]}
          customIcons={{
            play: <RiPlayLine />,
            pause: <RiPauseLine />,
            rewind: <RiRewindLine />,
            forward: <RiSpeedLine />,
            volume: <RiVolumeUpLine />,
            volumeMute: <RiVolumeMuteLine />,
          }}
        />
      </Flex>
    </Flex>
  );
};

export default observer(Player);
