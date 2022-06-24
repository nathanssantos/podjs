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
      <Flex position='relative' minW='56px' justifyContent='center' pb={6}>
        <Text fontSize='50px' fontWeight={700}>
          {index + 1}
        </Text>
      </Flex>
      <Flex
        cursor='pointer'
        onClick={handleClick}
        flex={1}
        borderBottomWidth='1px'
        pb={6}
        gap={4}
        align='center'
      >
        <Flex
          w='100px'
          h='100px'
          maxW='100px'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
        >
          <Image
            w='100%'
            h='100%'
            src={artworkUrl600 || artworkUrl100}
            alt={collectionName}
            objectFit='cover'
            fallback={
              <Flex w='100%' padding='calc(50% - 12px)' align='center' justify='center'>
                <Spinner />
              </Flex>
            }
          />
        </Flex>

        <Flex align='flex-start' direction='column' flex={1}>
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
