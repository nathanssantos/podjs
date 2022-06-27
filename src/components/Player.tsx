import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react';
import { ChangeEvent, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import {
  RiArrowUpLine,
  RiInformationLine,
  RiMore2Fill,
  RiOrderPlayLine,
  RiPauseLine,
  RiPlayLine,
  RiRepeatLine,
  RiRepeatOneLine,
  RiRewindLine,
  RiSkipBackLine,
  RiSkipForwardLine,
  RiSpeedLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';

import { useStore } from '../hooks';
import PodcastDetailModal from './PodcastDetailModal';

const Player = () => {
  const { playerStore } = useStore();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

  const { currentPodcast, next, previous, loadPlayerData, storeCurrentTime } = playerStore;

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
          bgColor: 'gray.50',
        },
        '.rhap_progress-filled': {
          bgColor: 'gray.500',
        },
        '.rhap_download-progress': {
          bgColor: 'gray.300',
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
        <Flex direction='column' py={2} pl={{ base: 0, md: 4 }} gap={2} flex='1' w='100%'>
          <Flex align='center' justify='space-between' w='100%'>
            <Flex overflow='hidden'>
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
            <Flex pl={{ base: 3, md: 6 }}>
              {currentPodcast && (
                <>
                  <Menu placement='left'>
                    <MenuButton
                      as={IconButton}
                      aria-label='Options'
                      icon={<Icon as={RiMore2Fill} fontSize='20px' />}
                      variant='ghost'
                      size='sm'
                    />
                    <MenuList
                      sx={{
                        span: {
                          display: 'flex',
                        },
                      }}
                    >
                      <MenuItem
                        icon={<Icon as={RiInformationLine} fontSize='20px' />}
                        onClick={onOpen}
                      >
                        Information
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <PodcastDetailModal
                    podcast={currentPodcast}
                    isOpen={isOpen}
                    onClose={onClose}
                  />
                </>
              )}
            </Flex>
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
            onListen={(event) => storeTime(event)}
          />
        </Flex>
      </Container>
    </Flex>
  );
};

export default observer(Player);
