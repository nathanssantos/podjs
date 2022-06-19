import {
  Badge,
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { RiDeleteBinLine, RiPlayListAddLine } from 'react-icons/ri';
import { useStore } from '../hooks';

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
    if (currentPodcast?.enclosure.url === podcast.enclosure.url) setCurrentPodcast(null);
  };

  return (
    <Flex
      overflow='hidden'
      direction={{ base: 'column', sm: 'row' }}
      alignItems={{ base: 'center', sm: 'flex-start' }}
    >
      <Flex
        borderColor={currentPodcast?.enclosure.url === url ? 'teal.200' : ''}
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        w={{ base: '100%', sm: '80px' }}
        minW={'80px'}
        h={{ h: 'initial', sm: '80px' }}
        mb={{ base: 3, sm: 0 }}
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
        pl={3}
        alignItems={{ base: 'center', sm: 'flex-start' }}
        textAlign={{ base: 'center', sm: 'left' }}
        w='100%'
      >
        <Text
          mb={3}
          fontWeight='semibold'
          lineHeight='tight'
          onClick={playPodcast}
          cursor='pointer'
          color={currentPodcast?.enclosure.url === url ? 'teal.200' : ''}
        >
          {title}
        </Text>
        <Flex w='100%' alignItems='flex-end' justifyContent='space-between' gap={3}>
          <Badge borderRadius='full' px={2} colorScheme='teal'>
            {duration}
          </Badge>
          <IconButton
            aria-label='Menu'
            onClick={removeFromPlayList}
            borderWidth='1px'
            backdropFilter='blur(10px)'
          >
            <Icon as={RiDeleteBinLine} fontSize={24} />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(PlayListItem);
