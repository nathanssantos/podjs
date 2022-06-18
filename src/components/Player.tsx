import { Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import AudioPlayer from 'react-h5-audio-player';
import { useStore } from '../hooks';

const Player = () => {
  const { playerStore } = useStore();
  const { colorMode } = useColorMode();
  const theme = useTheme();

  const { currentPodcast } = playerStore;

  if (!currentPodcast?.enclosure) return null;

  return (
    <Flex
      w='100%'
      position='fixed'
      bottom={0}
      bgColor={colorMode === 'light' ? '#fff' : theme.colors.gray[700]}
      borderTopWidth='1px'
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
          color: 'var(--chakra-colors-chakra-body-text)',
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
      }}
    >
      {!!currentPodcast?.itunes?.image?.length && !!currentPodcast?.title?.length && (
        <Image
          h='121px'
          width='121px'
          alt={currentPodcast.title}
          src={currentPodcast.itunes.image}
        />
      )}
      <Flex direction='column' flex={1} py={2} px={3} gap={2}>
        {!!currentPodcast?.title?.length && (
          <Flex>
            <Text
              mb={1}
              fontWeight='semibold'
              lineHeight='tight'
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
              width='100%'
            >
              {currentPodcast.title}
            </Text>
          </Flex>
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
