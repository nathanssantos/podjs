import { Badge, Flex, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { RiDeleteBinLine } from 'react-icons/ri';

import { useStore } from '../hooks';
import { formatDuration } from '../utils';

type PlayListItemProps = {
  podcast: Podcast;
  imageFallback: string;
};

const PlayListItem = (props: PlayListItemProps) => {
  const { podcast, imageFallback } = props;
  const { playerStore } = useStore();

  const { currentPodcast, setCurrentPodcast, removePodcastFromPlaylist } = playerStore;

  const {
    title,
    link,
    isoDate,
    enclosure: { url, length, type },
    content,
    itunes: { summary, duration, image },
  } = podcast;

  const playPodcast = () => {
    setCurrentPodcast(podcast);
  };

  const removeFromPlayList = () => {
    removePodcastFromPlaylist(podcast);
    if (currentPodcast?.enclosure?.url === podcast?.enclosure?.url) setCurrentPodcast(null);
  };

  return (
    <Flex
      overflow='hidden'
      direction={{ base: 'column', sm: 'row' }}
      align={{ base: 'center', sm: 'flex-start' }}
      borderBottomWidth='1px'
      pb={6}
      gap={4}
      _last={{ borderBottomWidth: 0 }}
    >
      <Flex onClick={playPodcast} cursor='pointer' flex={1} gap={4}>
        {!!currentPodcast?.enclosure?.url?.length && (
          <Flex
            borderColor={currentPodcast?.enclosure?.url === url ? 'teal.300' : ''}
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            w={{ base: '100%', sm: '80px' }}
            minW={'80px'}
            h={{ h: 'initial', sm: '80px' }}
            mb={{ base: 3, sm: 0 }}
          >
            <Image
              src={image}
              alt={title}
              w='100%'
              h='100%'
              objectFit='cover'
              fallbackSrc={imageFallback}
            />
          </Flex>
        )}

        <Flex
          direction='column'
          align={{ base: 'center', sm: 'flex-start' }}
          textAlign={{ base: 'center', sm: 'left' }}
          w='100%'
          gap={1}
        >
          <Flex gap={2}>
            {currentPodcast?.enclosure?.url === url && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24px'
                height='24px'
                viewBox='0 0 100 100'
                preserveAspectRatio='xMidYMid'
              >
                <g transform='rotate(180 50 50)'>
                  <rect x='15' y='15' width='10' height='40' fill='#4fd1c5'>
                    <animate
                      attributeName='height'
                      values='50;70;30;50'
                      keyTimes='0;0.33;0.66;1'
                      dur='1s'
                      repeatCount='indefinite'
                      calcMode='spline'
                      keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                      begin='-0.4s'
                    ></animate>
                  </rect>
                  <rect x='35' y='15' width='10' height='40' fill='#4fd1c5'>
                    <animate
                      attributeName='height'
                      values='50;70;30;50'
                      keyTimes='0;0.33;0.66;1'
                      dur='1s'
                      repeatCount='indefinite'
                      calcMode='spline'
                      keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                      begin='-0.2s'
                    ></animate>
                  </rect>
                  <rect x='55' y='15' width='10' height='40' fill='#4fd1c5'>
                    <animate
                      attributeName='height'
                      values='50;70;30;50'
                      keyTimes='0;0.33;0.66;1'
                      dur='1s'
                      repeatCount='indefinite'
                      calcMode='spline'
                      keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                      begin='-0.6s'
                    ></animate>
                  </rect>
                  <rect x='75' y='15' width='10' height='40' fill='#4fd1c5'>
                    <animate
                      attributeName='height'
                      values='50;70;30;50'
                      keyTimes='0;0.33;0.66;1'
                      dur='1s'
                      repeatCount='indefinite'
                      calcMode='spline'
                      keySplines='0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1'
                      begin='-1s'
                    ></animate>
                  </rect>
                </g>
              </svg>
            )}
            <Text
              fontWeight='semibold'
              lineHeight='tight'
              onClick={playPodcast}
              cursor='pointer'
              color={currentPodcast?.enclosure?.url === url ? 'teal.300' : ''}
            >
              {title}
            </Text>
          </Flex>

          <Flex w='100%' align='flex-end' justify='space-between' gap={3}>
            <Badge borderRadius='full' px={2} colorScheme='teal'>
              {formatDuration(duration)}
            </Badge>
          </Flex>
        </Flex>
      </Flex>
      <IconButton aria-label='Menu' onClick={removeFromPlayList} size='sm' variant='ghost'>
        <Icon as={RiDeleteBinLine} fontSize='20px' />
      </IconButton>
    </Flex>
  );
};

export default observer(PlayListItem);
