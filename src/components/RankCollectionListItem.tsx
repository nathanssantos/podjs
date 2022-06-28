import {
  Badge,
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
import { RiInformationLine, RiMore2Fill, RiStarFill, RiStarLine } from 'react-icons/ri';

import { useStore } from '../hooks';

type RankCollectionListItemProps = {
  collection: Collection;
  index: number;
};

const RankCollectionListItem = (props: RankCollectionListItemProps) => {
  const { collection, index } = props;
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
    <Flex gap={{ base: 2, md: 6 }} role='group' position='relative'>
      <Flex
        position='relative'
        minW={{ base: '34px', md: '56px' }}
        align='center'
        justifyContent='center'
        pb={6}
      >
        <Text fontSize={{ base: '30px', md: '50px' }} fontWeight={700}>
          {index + 1}
        </Text>
      </Flex>
      <Flex flex={1} borderBottomWidth='1px' pb={6}>
        <Flex flex={1}>
          <Flex
            w={{ base: '60px', md: '102px' }}
            h={{ base: '60px', md: '102px' }}
            maxW={{ base: '60px', md: '102px' }}
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            position='relative'
            onClick={handleClick}
            cursor='pointer'
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
            <Flex w='100%'>
              <Text
                fontWeight='semibold'
                lineHeight='tight'
                flex={1}
                onClick={handleClick}
                cursor='pointer'
                pl={{ base: 2, md: 4 }}
                pr={4}
                pb={2}
              >
                {collectionName}
              </Text>
              <Flex direction='column'>
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
                      onClick={() =>
                        toggleCollectionModal({ id: String(collectionId), open: true })
                      }
                    >
                      Information
                    </MenuItem>
                    {favorites.find((favorite) => favorite.collectionId === collectionId) ? (
                      <MenuItem
                        icon={<Icon as={RiStarFill} fontSize='20px' />}
                        onClick={removeFromFavorites}
                      >
                        Remove from favorites
                      </MenuItem>
                    ) : (
                      <MenuItem
                        icon={<Icon as={RiStarLine} fontSize='20px' />}
                        onClick={addToFavorites}
                      >
                        Add to favorites
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
                <Flex onClick={handleClick} cursor='pointer' flex={1} />
              </Flex>
            </Flex>
            <Flex
              w='100%'
              onClick={handleClick}
              cursor='pointer'
              flex={1}
              pl={{ base: 2, md: 4 }}
              align='flex-start'
            >
              <Badge borderRadius='full' px={2} colorScheme='teal'>
                {primaryGenreName}
              </Badge>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default observer(RankCollectionListItem);
