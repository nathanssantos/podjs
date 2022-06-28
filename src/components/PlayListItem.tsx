import {
  Badge,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { RiDeleteBinLine, RiInformationLine, RiMore2Fill } from 'react-icons/ri';

import { useStore } from '../hooks';
import { formatDuration } from '../utils';
import PodcastDetailModal from './PodcastDetailModal';

type PlayListItemProps = {
  podcast: Podcast;
  imageFallback: string;
};

const PlayListItem = (props: PlayListItemProps) => {
  const { podcast, imageFallback } = props;
  const { playerStore } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  };

  return (
    <Flex
      overflow='hidden'
      align={{ base: 'center', sm: 'flex-start' }}
      gap={4}
      w='100%'
      pb={6}
    >
      <Flex
        flex={1}
        direction={{ base: 'column', sm: 'row' }}
        align={{ base: 'center', sm: 'initial' }}
      >
        <Flex
          borderColor={currentPodcast?.enclosure?.url === url ? 'teal.300' : ''}
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          w={{ base: '100%', sm: '82px' }}
          minW='82px'
          h={{ base: 'initial', sm: '82px' }}
          maxW='240px'
          onClick={playPodcast}
          cursor='pointer'
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

        <Flex
          direction='column'
          align={{ base: 'center', sm: 'flex-start', justify: 'center' }}
          textAlign='left'
          flex={1}
        >
          <Flex justify='space-between'>
            <Text
              fontWeight='semibold'
              lineHeight='tight'
              color={currentPodcast?.enclosure?.url === url ? 'teal.300' : ''}
              pb={2}
              pr={4}
              onClick={playPodcast}
              cursor='pointer'
              pt={{ base: 4, sm: 0 }}
              pl={{ base: 0, sm: 4 }}
              flex={1}
            >
              {title}
            </Text>
            <Flex direction='column'>
              <Flex h={{ base: 3, sm: 0 }} onClick={playPodcast} />
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
                  <MenuItem
                    icon={<Icon as={RiInformationLine} fontSize='20px' />}
                    onClick={onOpen}
                  >
                    Information
                  </MenuItem>
                  <MenuItem
                    icon={<Icon as={RiDeleteBinLine} fontSize='20px' />}
                    onClick={removeFromPlayList}
                  >
                    Remove from playlist
                  </MenuItem>
                </MenuList>
              </Menu>
              <Flex flex={1} cursor='pointer' />
            </Flex>
          </Flex>

          <Flex
            w='100%'
            align='flex-start'
            onClick={playPodcast}
            cursor='pointer'
            pl={{ base: 0, sm: 4 }}
            flex={1}
          >
            <Flex align='center' gap={2}>
              {currentPodcast?.enclosure?.url === url && (
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
              <Badge borderRadius='full' px={2} colorScheme='teal'>
                {formatDuration(duration)}
              </Badge>
              <Text fontSize='14px'>{new Date(isoDate).toLocaleDateString('pt-BR')}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <PodcastDetailModal podcast={podcast} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default observer(PlayListItem);
