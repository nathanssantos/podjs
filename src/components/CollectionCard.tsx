import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';
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
        <Image src={artworkUrl600} alt={collectionName} objectFit='cover' />

        <Flex align='flex-start' direction='column' p={3} flex={1}>
          <Box flex={1} mb={3}>
            <Text fontWeight='semibold' lineHeight='tight'>
              {collectionName}
            </Text>
          </Box>
          <Badge borderRadius='full' px={2} colorScheme='teal' mb={2}>
            {primaryGenreName}
          </Badge>
        </Flex>
      </Flex>
    </Link>
  );
};

export default CollectionCard;
