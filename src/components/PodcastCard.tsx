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
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      onClick={playPodcast}
    >
      <Image src={image} alt={title} w={150} h={150} minW={150} objectFit='cover' />

      <Flex direction='column' p='3' alignItems='flex-start'>
        <Text mb='1' fontWeight='semibold' lineHeight='tight'>
          {title}
        </Text>
        <Flex mb='1' h='64px' overflow='hidden'>
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
