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
import { observer } from 'mobx-react-lite';
import { RiPlayListAddLine } from 'react-icons/ri';
import { useStore } from '../hooks';

type PodcastCardProps = {
  podcast: Podcast;
  imageFallback: string;
};

const PodcastCard = (props: PodcastCardProps) => {
  const { podcast, imageFallback } = props;
  const { playerStore } = useStore();
  const { colorMode } = useColorMode();

  const { currentPodcast, setCurrentPodcast, addPodcastToPlayList } = playerStore;

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
    addPodcastToPlayList(podcast);
  };

  const addToPlayList = () => {
    addPodcastToPlayList(podcast);
    if (!currentPodcast?.enclosure.url) playPodcast();
  };

  return (
    <Flex
      overflow='hidden'
      direction={{ base: 'column', sm: 'row' }}
      alignItems={{ base: 'center', sm: 'flex-start' }}
    >
      <Flex
        borderWidth='1px'
        borderRadius='lg'
        borderColor={currentPodcast?.enclosure.url === url ? 'teal.200' : ''}
        overflow='hidden'
        w={{ base: '100%', sm: '150px' }}
        minW={'150px'}
        h={{ h: 'initial', sm: '150px' }}
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
          mb={1}
          fontWeight='semibold'
          lineHeight='tight'
          color={currentPodcast?.enclosure.url === url ? 'teal.200' : ''}
        >
          {title}
        </Text>
        <Flex mb={1} h='72px' overflow='hidden'>
          <Text
            fontSize='14px'
            color='gray.500'
            dangerouslySetInnerHTML={{ __html: summary?.length ? summary : content }}
          />
        </Flex>
        <Box
          bgGradient={`linear(to-b, transparent, ${
            colorMode === 'light' ? '#fff' : 'gray.800'
          })`}
          h='40px'
          w='100%'
          mt='-40px'
          mb='1'
        />
        <Flex w='100%' alignItems='flex-end' justifyContent='space-between' gap={3}>
          <Badge borderRadius='full' px={2} colorScheme='teal'>
            {duration}
          </Badge>
          <IconButton
            aria-label='Menu'
            onClick={addToPlayList}
            borderWidth='1px'
            backdropFilter='blur(10px)'
          >
            <Icon as={RiPlayListAddLine} fontSize={24} />
          </IconButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(PodcastCard);
