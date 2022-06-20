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
    if (currentPodcast?.enclosure?.url === podcast?.enclosure?.url) setCurrentPodcast(null);
  };

  return (
    <Flex
      overflow='hidden'
      direction={{ base: 'column', sm: 'row' }}
      align={{ base: 'center', sm: 'flex-start' }}
      borderBottomWidth='1px'
      pb={6}
      _last={{ borderBottomWidth: 0 }}
    >
      <Flex
        borderColor={currentPodcast?.enclosure?.url === url ? 'teal.300' : ''}
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
        align={{ base: 'center', sm: 'flex-start' }}
        textAlign={{ base: 'center', sm: 'left' }}
        w='100%'
      >
        <Text
          mb={4}
          fontWeight='semibold'
          lineHeight='tight'
          onClick={playPodcast}
          cursor='pointer'
          color={currentPodcast?.enclosure?.url === url ? 'teal.300' : ''}
        >
          {title}
        </Text>
        <Flex w='100%' align='flex-end' justify='space-between' gap={3}>
          <Badge borderRadius='full' px={2} colorScheme='teal'>
            {duration}
          </Badge>
          <IconButton
            aria-label='Menu'
            onClick={removeFromPlayList}
            backdropFilter='blur(10px)'
            size='sm'
          >
            <Icon as={RiDeleteBinLine} fontSize={20} />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(PlayListItem);
