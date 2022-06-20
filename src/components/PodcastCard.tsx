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

  const { title, link, isoDate, enclosure, content, itunes } = podcast;

  const playPodcast = () => {
    setCurrentPodcast(podcast);
    addPodcastToPlayList(podcast);
  };

  const addToPlayList = () => {
    addPodcastToPlayList(podcast);
    if (!currentPodcast?.enclosure?.url) playPodcast();
  };

  return (
    <Flex
      overflow='hidden'
      direction={{ base: 'column', sm: 'row' }}
      align={{ base: 'center', sm: 'flex-start' }}
      borderBottomWidth='1px'
      pb={6}
    >
      <Flex
        borderWidth='1px'
        borderRadius='lg'
        borderColor={currentPodcast?.enclosure?.url === enclosure?.url ? 'teal.300' : ''}
        overflow='hidden'
        w={{ base: '100%', sm: '180px' }}
        minW={'180px'}
        h={{ h: 'initial', sm: '180px' }}
        mb={{ base: 3, sm: 0 }}
        onClick={playPodcast}
        cursor='pointer'
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

      <Flex
        direction='column'
        pl={3}
        align={{ base: 'center', sm: 'flex-start' }}
        textAlign={{ base: 'center', sm: 'left' }}
        w='100%'
      >
        <Text
          mb={1}
          fontWeight='semibold'
          lineHeight='tight'
          color={currentPodcast?.enclosure?.url === enclosure?.url ? 'teal.300' : ''}
        >
          {title}
        </Text>
        <Flex align='center' gap={2} mb={1}>
          <Text fontSize='14px'>{new Date(isoDate).toLocaleDateString('pt-BR')}</Text>
          <Badge borderRadius='full' px={2} colorScheme='teal'>
            {itunes.duration}
          </Badge>
        </Flex>
        <Flex flex={1} w='100%' direction={{ base: 'column', sm: 'row' }}>
          <Flex direction='column' flex={1}>
            <Flex mb={1} h='124px' overflow='hidden' w='100%'>
              <Text
                fontSize='14px'
                color='gray.500'
                dangerouslySetInnerHTML={{
                  __html: itunes.summary?.length ? itunes.summary : content,
                }}
              />
            </Flex>
            <Box
              bgGradient={`linear(to-b, transparent, ${
                colorMode === 'light' ? '#fff' : 'gray.800'
              })`}
              h='32px'
              w='100%'
              mt='-36px'
              mb='1'
            />
          </Flex>
          <Flex direction='column' alignItems='flex-end' justify='flex-end' pl={3}>
            <IconButton
              aria-label='Menu'
              onClick={addToPlayList}
              backdropFilter='blur(10px)'
              size='sm'
            >
              <Icon as={RiPlayListAddLine} fontSize={20} />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(PodcastCard);
