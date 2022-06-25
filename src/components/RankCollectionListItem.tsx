import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';

import { useStore } from '../hooks';
import ListItemActions from './ListItemActions';

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
  const { collectionStore, uiStore } = useStore();

  const { detail, setDetail } = collectionStore;
  const { toggleCollectionModal } = uiStore;

  const handleClick = () => {
    if (detail?.collectionId !== collectionId) setDetail(null);
    router.push(`/collections/${collectionId}`);
  };

  return (
    <Flex align='center' gap={{ base: 2, md: 6 }} role='group'>
      <Flex
        position='relative'
        minW={{ base: '34px', md: '56px' }}
        justifyContent='center'
        pb={6}
      >
        <Text fontSize={{ base: '30px', md: '50px' }} fontWeight={700}>
          {index + 1}
        </Text>
      </Flex>
      <Flex flex={1} borderBottomWidth='1px' pb={6}>
        <Flex
          w={{ base: '60px', md: '100px' }}
          h={{ base: '60px', md: '100px' }}
          maxW={{ base: '60px', md: '100px' }}
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'
          position='relative'
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
            onClick={handleClick}
            transition='all 150ms ease-in-out'
            cursor='pointer'
            _groupHover={{ filter: 'brightness(0.7) blur(5px)' }}
          />

          <ListItemActions
            showBtInfo
            onClickInfo={() => toggleCollectionModal({ id: String(collectionId), open: true })}
          />
        </Flex>

        <Flex
          align='flex-start'
          direction='column'
          justify='center'
          flex={1}
          onClick={handleClick}
          cursor='pointer'
          gap={1}
          pl={{ base: 2, md: 4 }}
        >
          <Text fontWeight='semibold' lineHeight='tight'>
            {collectionName}
          </Text>
          <Badge borderRadius='full' px={2} colorScheme='teal'>
            {primaryGenreName}
          </Badge>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(RankCollectionListItem);
