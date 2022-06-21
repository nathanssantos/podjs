import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useStore } from '../hooks';

type CollectionCardProps = {
  collection: Collection;
};

const CollectionCard = (props: CollectionCardProps) => {
  const {
    collection: { collectionId, collectionName, artworkUrl600, primaryGenreName, genres },
  } = props;
  const router = useRouter();
  const { collectionStore } = useStore();

  const { detail, setDetail } = collectionStore;

  const handleClick = () => {
    if (detail?.collectionId !== collectionId) setDetail(null);
    router.push(`/collections/${collectionId}`);
  };

  return (
    <Flex
      cursor='pointer'
      direction='column'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      onClick={handleClick}
    >
      <Image src={artworkUrl600} alt={collectionName} objectFit='cover' />

      <Flex align='flex-start' direction='column' p={3} flex={1}>
        <Box flex={1} mb={3}>
          <Text fontWeight='semibold' lineHeight='tight'>
            {collectionName}
          </Text>
        </Box>
        <Badge borderRadius='full' px={2} colorScheme='teal'>
          {primaryGenreName}
        </Badge>
      </Flex>
    </Flex>
  );
};

export default CollectionCard;
