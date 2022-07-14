import {
  Badge,
  Box,
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
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { MouseEvent } from 'react';
import {
  RiDeleteBinLine,
  RiInformationLine,
  RiMenuLine,
  RiMore2Fill,
  RiPlayListAddLine,
} from 'react-icons/ri';

import { useStore } from '../hooks';
import { formatDuration } from '../utils';
import PodcastDetailModal from './PodcastDetailModal';

type PodcastListItemProps = {
  podcast: Podcast;
  imageFallback: string;
};

const PodcastListItem = (props: PodcastListItemProps) => {
  const { podcast, imageFallback } = props;
  const { playerStore } = useStore();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    currentPodcast,
    playList,
    setCurrentPodcast,
    addPodcastToPlayList,
    removePodcastFromPlaylist,
  } = playerStore;

  const { title, link, isoDate, enclosure, content, itunes } = podcast;

  const playPodcast = () => {
    setCurrentPodcast({ ...podcast, imageFallback });
    addPodcastToPlayList({ ...podcast, imageFallback });
  };

  const addToPlayList = () => {
    addPodcastToPlayList({ ...podcast, imageFallback });
    if (!currentPodcast?.enclosure?.url) playPodcast();
  };

  const removeFromPlayList = () => {
    removePodcastFromPlaylist(podcast);
  };

  const menu = (
    <Menu>
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
        <MenuItem icon={<Icon as={RiInformationLine} fontSize='20px' />} onClick={onOpen}>
          Information
        </MenuItem>
        {playList.find((podcast) => podcast.enclosure.url === enclosure.url) ? (
          <MenuItem
            icon={<Icon as={RiDeleteBinLine} fontSize='20px' />}
            onClick={removeFromPlayList}
          >
            Remove from playlist
          </MenuItem>
        ) : (
          <MenuItem
            icon={<Icon as={RiPlayListAddLine} fontSize='20px' />}
            onClick={addToPlayList}
          >
            Add to playlist
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );

  return (
    <Flex
      borderBottomWidth='1px'
      pb={6}
      position='relative'
      gap={4}
      onClick={playPodcast}
      cursor='pointer'
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        flex={1}
        alignItems={{ base: 'center', md: 'initial' }}
        gap={4}
      >
        <Flex
          borderWidth='1px'
          borderRadius='lg'
          borderColor={currentPodcast?.enclosure?.url === enclosure?.url ? 'teal.300' : ''}
          overflow='hidden'
          w={{ base: '100%', md: '180px' }}
          minW='180px'
          h={{ h: 'initial', md: '180px' }}
          maxW='320px'
          alignSelf={{ md: 'flex-start' }}
        >
          <Image
            src={itunes.image}
            alt={title}
            w='100%'
            h='100%'
            objectFit='cover'
            fallbackSrc={imageFallback}
          />
        </Flex>

        <Flex direction='column' flex={1} w={{ base: '100%', md: 'initial' }}>
          <Flex justify='space-between' gap={4}>
            <Text
              fontWeight='semibold'
              lineHeight='tight'
              color={currentPodcast?.enclosure?.url === enclosure?.url ? 'teal.300' : ''}
              flex={1}
            >
              {title}
            </Text>
            <Flex onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>{menu}</Flex>
          </Flex>
          <Flex direction='column' gap={2}>
            <Flex align='center' gap={2} w='100%'>
              {currentPodcast?.enclosure?.url === enclosure?.url && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20px'
                  height='20px'
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
              {!!itunes.duration && (
                <Badge borderRadius='full' px={2} colorScheme='teal'>
                  {formatDuration(itunes.duration)}
                </Badge>
              )}
              <Text fontSize='14px'>{new Date(isoDate).toLocaleDateString('pt-BR')}</Text>
            </Flex>
            <Flex direction='column' flex={1}>
              <Flex overflow='hidden' w='100%' h='119px'>
                <Text
                  fontSize='14px'
                  color='gray.500'
                  dangerouslySetInnerHTML={{
                    __html: itunes.summary?.length ? itunes.summary : content,
                  }}
                  sx={{
                    br: {
                      display: 'none',
                    },
                  }}
                />
              </Flex>
              <Box
                bgGradient={`linear(to-b, transparent, ${
                  colorMode === 'light' ? '#fff' : 'gray.800'
                })`}
                h='56px'
                w='100%'
                mt='-56px'
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <PodcastDetailModal podcast={podcast} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default observer(PodcastListItem);
