import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
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
      bgColor={colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'}
      borderTopWidth='1px'
      backdropFilter='blur(10px)'
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
          w: 4,
          h: 4,
          top: '-6px',
          marginLeft: -2,
        },
        '.rhap_progress-bar-show-download': {
          bgColor: 'gray.50',
        },
        '.rhap_progress-filled': {
          bgColor: 'gray.500',
        },
        '.rhap_download-progress': {
          bgColor: 'gray.300',
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
      <Container
        display='flex'
        w='100%'
        maxW='container.xl'
        px={{ base: 3, md: 6 }}
        position='relative'
      >
        <Box
          position='absolute'
          right={{ base: 1, md: 4 }}
          zIndex={11}
          bgColor={
            colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'
          }
          p={2}
          backdropFilter='blur(10px)'
          borderWidth='1px'
          borderRadius='lg'
          transform={{
            base: 'translateY(calc(-100% - 8px))',
            md: 'translateY(calc(-100% - 16px))',
          }}
        >
          <IconButton
            aria-label='Back to the top'
            onClick={scrollToTop}
            backdropFilter='blur(10px)'
            size='sm'
          >
            <Icon as={RiArrowUpLine} fontSize='20px' />
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
        <Flex direction='column' py={2} pl={{ base: 0, md: 4 }} gap={2} flex='1'>
          {!!currentPodcast?.title?.length && (
            <Text
              fontWeight='semibold'
              lineHeight='tight'
              overflow='hidden'
              whiteSpace='nowrap'
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
      </Container>
    </Flex>
  );
};

export default observer(Player);
