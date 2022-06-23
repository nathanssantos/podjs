import { Badge, Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useStore } from '../hooks';

type RankCollectionListItemProps = {
  collection: Collection;
  index: number;
};

const RankCollectionListItem = (props: RankCollectionListItemProps) => {
  const {
    collection: {
      collectionId,
      collectionName,
      artworkUrl600,
      artworkUrl100,
      primaryGenreName,
      genres,
    },
    index,
  } = props;
  const router = useRouter();
  const { collectionStore } = useStore();

  const { detail, setDetail } = collectionStore;

  const handleClick = () => {
    if (detail?.collectionId !== collectionId) setDetail(null);
    router.push(`/collections/${collectionId}`);
  };

  return (
    <Flex align='center' gap={6}>
      <Flex position='relative' minW='56px' justifyContent='center'>
        <Text fontSize='50px' fontWeight={700}>
          {index + 1}
        </Text>
      </Flex>
      <Flex
        cursor='pointer'
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        onClick={handleClick}
        flex={1}
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
          w='100px'
          h='100px'
        />

        <Flex align='flex-start' direction='column' p={3} flex={1}>
          <Box flex={1} mb={3}>
            <Text fontWeight='semibold' lineHeight='tight'>
              {collectionName}
            </Text>
            <Badge borderRadius='full' px={2} colorScheme='teal'>
              {primaryGenreName}
            </Badge>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RankCollectionListItem;
