import { Badge, Box, Flex, Image, Text, useColorMode } from '@chakra-ui/react';
import { useStore } from '../hooks';

type PodcastCardProps = {
  podcast: Podcast;
};

const PodcastCard = (props: PodcastCardProps) => {
  const { podcast } = props;
  const { playerStore } = useStore();
  const { colorMode } = useColorMode();

  const { setCurrentPodcast } = playerStore;

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

  return (
    <Flex
      cursor='pointer'
      overflow='hidden'
      onClick={playPodcast}
      direction={{ base: 'column', sm: 'row' }}
      alignItems={{ base: 'center', sm: 'flex-start' }}
    >
      <Flex
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        w={{ base: '100%', sm: 150 }}
        minW={150}
        h={{ h: 'initial', sm: 150 }}
        mb={{ base: 3, sm: 0 }}
      >
        <Image src={image} alt={title} w='100%' h='100%' objectFit='cover' />
      </Flex>

      <Flex
        direction='column'
        px='3'
        alignItems={{ base: 'center', sm: 'flex-start' }}
        textAlign={{ base: 'center', sm: 'left' }}
      >
        <Text mb='1' fontWeight='semibold' lineHeight='tight'>
          {title}
        </Text>
        <Flex mb='1' h='88px' overflow='hidden'>
          <Text fontSize='14px' color='gray.500'>
            {summary?.length ? summary : content}
          </Text>
        </Flex>
        <Box
          bgGradient={`linear(to-b, transparent, ${
            colorMode === 'light' ? '#fff' : 'gray.800'
          })`}
          h='20px'
          w='100%'
          mt='-24px'
          mb='3'
        />
        <Badge borderRadius='full' px='2' colorScheme='teal'>
          {duration}
        </Badge>
      </Flex>
    </Flex>
  );
};

export default PodcastCard;
