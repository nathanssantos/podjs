import {
  Badge,
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { RiInformationLine, RiMore2Fill, RiStarFill, RiStarLine } from 'react-icons/ri';

import { useStore } from '../hooks';

type CollectionListItemProps = {
  collection: Collection;
};

const CollectionListItem = (props: CollectionListItemProps) => {
  const { collection } = props;
  const router = useRouter();
  const { collectionStore, uiStore } = useStore();

  const {
    collectionId,
    collectionName,
    artworkUrl600,
    artworkUrl100,
    primaryGenreName,
    genres,
  } = collection;
  const {
    detail,
    favorites,
    setDetail,
    addCollectionToFavorites,
    removeCollectionFromFavorites,
  } = collectionStore;
  const { toggleCollectionModal } = uiStore;

  const handleClick = () => {
    if (detail?.collectionId !== collectionId) setDetail();
    router.push(`/collections/${collectionId}`);
  };

  const addToFavorites = () => {
    addCollectionToFavorites(collection);
  };

  const removeFromFavorites = () => {
    removeCollectionFromFavorites(collection);
  };

  return (
    <Flex
      direction='column'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      role='group'
      maxW={{ sm: '326px' }}
      cursor='pointer'
      onClick={handleClick}
    >
      <Flex>
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
        />
      </Flex>

      <Flex flex={1}>
        <Flex align='flex-start' direction='column' w='100%' gap={2}>
          <Flex w='100%'>
            <Flex overflow='hidden' flex={1}>
              <Text fontWeight='semibold' lineHeight='tight' flex={1} pl={3} pt={3} pr={3}>
                {collectionName}
              </Text>
            </Flex>
          </Flex>
          <Flex flex={1} align='flex-start' pl={3} pr={3} w='100%'>
            <Badge borderRadius='full' px={2} colorScheme='teal'>
              {primaryGenreName}
            </Badge>
          </Flex>
        </Flex>
      </Flex>

      <Flex alignSelf='flex-end' pr={1} pb={1}>
        <Flex onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<Icon as={RiMore2Fill} fontSize='20px' />}
              size='sm'
              variant='ghost'
            />
            <MenuList
              sx={{
                span: {
                  display: 'flex',
                },
              }}
            >
              <MenuItem
                icon={<Icon as={RiInformationLine} fontSize='20px' />}
                onClick={() => toggleCollectionModal({ id: String(collectionId), open: true })}
              >
                Information
              </MenuItem>
              {favorites.find((favorite) => favorite.collectionId === collectionId) ? (
                <MenuItem
                  icon={<Icon as={RiStarLine} fontSize='20px' />}
                  onClick={removeFromFavorites}
                >
                  Remove from favorites
                </MenuItem>
              ) : (
                <MenuItem
                  icon={<Icon as={RiStarFill} fontSize='20px' />}
                  onClick={addToFavorites}
                >
                  Add to favorites
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(CollectionListItem);
