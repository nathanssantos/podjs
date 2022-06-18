import { Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
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
      bottom='0'
      backgroundColor={colorMode === 'light' ? '#fff' : theme.colors.gray[700]}
      borderTopWidth='1px'
    >
      {!!currentPodcast?.itunes?.image?.length && !!currentPodcast?.title?.length && (
        <Image
          h='121px'
          width='121px'
          alt={currentPodcast.title}
          src={currentPodcast.itunes.image}
        />
      )}
      <Flex direction='column' flex='1' p='2' pr='3' gap='2'>
        {!!currentPodcast?.title?.length && (
          <Flex>
            <Text
              mb='1'
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
            backgroundColor: 'transparent',
            padding: 0,
          }}
          progressJumpSteps={{ backward: 30000, forward: 30000 }}
        />
      </Flex>
    </Flex>
  );
};

export default observer(Player);
