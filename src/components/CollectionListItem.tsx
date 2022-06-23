import { Badge, Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useStore } from '../hooks';

type CollectionListItemProps = {
  collection: Collection;
};

const CollectionListItem = (props: CollectionListItemProps) => {
  const {
    collection: {
      collectionId,
      collectionName,
      artworkUrl600,
      artworkUrl100,
      primaryGenreName,
      genres,
    },
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
      maxW='411px'
    >
      <Image
        src={artworkUrl600 || artworkUrl100}
        alt={collectionName}
        objectFit='cover'
        fallback={
          <Flex w='100%' padding='calc(50% - 12px)' align='center' justify='center'>
            <Spinner />
          </Flex>
        }
      />

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

export default CollectionListItem;
