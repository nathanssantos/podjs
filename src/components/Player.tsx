import {
  Container,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react';
import { ChangeEvent, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import {
  RiArrowUpLine,
  RiOrderPlayLine,
  RiPauseLine,
  RiPlayLine,
  RiRepeatLine,
  RiRewindLine,
  RiSkipBackLine,
  RiSkipForwardLine,
  RiSpeedLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';

import { useStore } from '../hooks';

const Player = () => {
  const { playerStore, uiStore } = useStore();
  const { colorMode } = useColorMode();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const { currentPodcast, next, previous, loadPlayerData, storeCurrentTime } = playerStore;
  const { playListIsOpen, drawerIsOpen } = uiStore;

  const scrollToTop = () => window.scrollTo(0, 0);

  const storeTime = (event: ChangeEvent<HTMLAudioElement> | any) => {
    if (event?.target?.currentTime) storeCurrentTime(event.target.currentTime);
  };

  useEffect(() => {
    loadPlayerData();
  }, []);

  return (
    <Flex
      as={motion.div}
      position='fixed'
      zIndex={9999}
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
        '.rhap_controls-section': {
          pr: 2,
        },
        '.rhap_main-controls-button': {
          color: 'var(--chakra-colors-chakra-body-text)',
        },
        '.rhap_progress-indicator': {
          bg: 'var(--chakra-colors-chakra-body-text)',
          w: 4,
          h: 4,
          top: '-6px',
          marginLeft: -2,
        },
        '.rhap_progress-bar-show-download': {
          bgColor: 'gray.600',
        },
        '.rhap_progress-filled': {
          bgColor: 'gray.200',
        },
        '.rhap_download-progress': {
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
        '.rhap_repeat-button': {
          color: 'var(--chakra-colors-chakra-body-text)',
        },
      }}
      w='100%'
    >
      <Container
        display='flex'
        w='100%'
        maxW='container.xl'
        px={{ base: 3, md: 6 }}
        position='relative'
      >
        {!playListIsOpen && !drawerIsOpen && (
          <IconButton
            position='absolute'
            right={{ base: 3, md: 6 }}
            zIndex={11}
            aria-label='Back to the top'
            onClick={scrollToTop}
            size='sm'
            transform={{
              base: 'translateY(calc(-100% - 16px))',
              md: 'translateY(calc(-100% - 24px))',
            }}
            bg='teal.300'
            _hover={{ bg: 'teal.200' }}
          >
            <Icon as={RiArrowUpLine} fontSize='20px' />
          </IconButton>
        )}

        {!!currentPodcast?.itunes?.image?.length && !!currentPodcast?.title?.length && (
          <Image
            display={{ base: 'none', md: 'initial' }}
            h='96px'
            w='96px'
            alt={currentPodcast.title}
            src={currentPodcast.itunes.image}
          />
        )}
        <Flex direction='column' py={2} pl={{ base: 0, md: 4 }} gap={2} flex='1' w='100%'>
          <Flex overflow='hidden' w='100%'>
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
          </Flex>
          <AudioPlayer
            autoPlayAfterSrcChange
            showSkipControls
            layout={isLargerThan768 ? 'horizontal' : 'stacked'}
            src={currentPodcast?.enclosure?.url}
            style={{
              background: 'transparent',
              padding: 0,
            }}
            progressJumpSteps={{ backward: 30000, forward: 30000 }}
            customIcons={{
              play: <RiPlayLine />,
              pause: <RiPauseLine />,
              rewind: <RiRewindLine />,
              forward: <RiSpeedLine />,
              next: <RiSkipForwardLine />,
              previous: <RiSkipBackLine />,
              volume: <RiVolumeUpLine />,
              volumeMute: <RiVolumeMuteLine />,
              loop: <RiRepeatLine />,
              loopOff: <RiOrderPlayLine />,
            }}
            onClickPrevious={previous}
            onClickNext={next}
            onListen={storeTime}
            onEnded={next}
          />
        </Flex>
      </Container>
    </Flex>
  );
};

export default observer(Player);
