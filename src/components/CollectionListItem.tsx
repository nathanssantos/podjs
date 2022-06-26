import { Badge, Box, Flex, Image, Spinner, Text, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useStore } from '../hooks';
import ListItemActions from './ListItemActions';

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
  const { collectionStore, uiStore } = useStore();

  const { detail, setDetail } = collectionStore;
  const { toggleCollectionModal } = uiStore;

  const handleClick = () => {
    if (detail?.collectionId !== collectionId) setDetail(null);
    router.push(`/collections/${collectionId}`);
  };

  return (
    <Flex
      direction='column'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      maxW='411px'
      role='group'
    >
      <Flex position='relative'>
        <Image
          src={artworkUrl600 || artworkUrl100}
          alt={collectionName}
          objectFit='cover'
          fallback={
            <Flex w='100%' padding='calc(50% - 12px)' align='center' justify='center'>
              <Spinner />
            </Flex>
          }
          transition='all 150ms ease-in-out'
          cursor='pointer'
          onClick={handleClick}
        />
        <ListItemActions
          showBtInfo
          onClickInfo={() => toggleCollectionModal({ id: String(collectionId), open: true })}
        />
      </Flex>

      <Flex
        align='flex-start'
        direction='column'
        p={3}
        flex={1}
        cursor='pointer'
        onClick={handleClick}
        gap={1}
      >
        <Text fontWeight='semibold' lineHeight='tight'>
          {collectionName}
        </Text>
        <Badge borderRadius='full' px={2} colorScheme='teal'>
          {primaryGenreName}
        </Badge>
      </Flex>
    </Flex>
  );
};

export default CollectionListItem;
