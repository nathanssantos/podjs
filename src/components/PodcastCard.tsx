import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';

type PodcastCardProps = {
  podcast: Podcast;
};

const PodcastCard = (props: PodcastCardProps) => {
  const { podcast } = props;

  const {
    title,
    link,
    isoDate,
    enclosure: { url, length, type },
    content,
    itunes: { summary, duration, image },
  } = podcast;

  return (
    <Flex cursor='pointer' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Image src={image} alt={title} w={150} h={150} />

      <Flex direction='column' p='3' alignItems='flex-start'>
        <Text mb='1' fontWeight='semibold' lineHeight='tight'>
          {title}
        </Text>
        <Flex mb='1' h='64px' overflow='hidden'>
          <Text fontSize='14px' lineHeight='17px' color='gray.500'>
            {summary?.length ? summary : content}
          </Text>
        </Flex>
        <Box
          bgGradient='linear(to-b, transparent, #1a202c)'
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
