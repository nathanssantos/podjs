import { Badge, Box, filter, Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';

type CollectionCardProps = {
  collection: Collection;
};

const CollectionCard = (props: CollectionCardProps) => {
  const {
    collection: { collectionId, collectionName, artworkUrl600, primaryGenreName, genres },
  } = props;

  return (
    <Link href={`/collections/${collectionId}`} passHref>
      <Flex
        cursor='pointer'
        direction='column'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
      >
        <Image src={artworkUrl600} alt={collectionName} />

        <Box display='flex' alignItems='baseline' flexDir='column' p='3' flex='1'>
          <Badge borderRadius='full' px='2' colorScheme='teal' mb='2'>
            {primaryGenreName}
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            flex='1'
          >
            {genres
              ?.filter((genre) => genre !== 'Podcasts')
              .map(
                (genre, index) =>
                  `${genre}${
                    index < genres.filter((genre) => genre !== 'Podcasts').length - 1
                      ? ' | '
                      : ''
                  }`,
              )}
          </Box>
          <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
            {collectionName}
          </Box>
        </Box>
      </Flex>
    </Link>
  );
};

export default CollectionCard;
