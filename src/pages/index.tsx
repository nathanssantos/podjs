import {
  Button,
  Container,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RiSettingsLine, RiStarLine, RiTrophyLine } from 'react-icons/ri';

import CollectionListItem from '../components/CollectionListItem';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import RankCollectionListItem from '../components/RankCollectionListItem';
import Search from '../components/Search';
import countries from '../constants/countries';
import { useStore } from '../hooks';

const Home: NextPage = () => {
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const {
    rank,
    favorites,
    rankStatus,
    rankCountry,
    getRank,
    getList,
    loadStoredData,
    setRankCountry,
  } = collectionStore;

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRankCountry(event.target.value);
    getRank();
  };

  const renderFavorites = () => {
    if (!favorites?.length) return null;

    return (
      <Flex direction='column' gap={6} flex={1}>
        <Flex
          borderBottomWidth='1px'
          py={2}
          position='sticky'
          top={12}
          backdropFilter='blur(10px)'
          bgColor={
            colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'
          }
          zIndex={98}
        >
          <Flex gap={2}>
            <Icon as={RiStarLine} fontSize='20px' />
            <Text fontSize='xl' lineHeight={1}>
              Favorites
            </Text>
          </Flex>
        </Flex>
        <SimpleGrid minChildWidth='154px' gap={3} pb={12} justifyContent='flex-start'>
          {favorites.map((collection) => (
            <CollectionListItem key={collection.collectionId} collection={collection} />
          ))}
        </SimpleGrid>
      </Flex>
    );
  };

  const renderRank = () => {
    switch (rankStatus) {
      case 'fetching': {
        return <Loader variant='rank' />;
      }

      case 'empty': {
        return <EmptyState variant='not-found' />;
      }

      case 'error': {
        return <EmptyState />;
      }

      case 'success': {
        if (rank?.length) {
          return (
            <Flex direction='column' gap={6} pb={12} flex={1}>
              {rank.map((collection, index) => (
                <RankCollectionListItem
                  key={collection.collectionId}
                  collection={collection}
                  index={index}
                />
              ))}
            </Flex>
          );
        }
      }

      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    loadStoredData();
    if (!rank?.length) getRank();
  }, []);

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Flex
        position='sticky'
        top={0}
        right={0}
        zIndex={99}
        backdropFilter='blur(10px)'
        borderBottomWidth='1px'
        bgColor={colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'}
      >
        <Container
          display='flex'
          alignItems='center'
          justifyContent={{ md: 'flex-end' }}
          py={2}
          px={{ base: 3, md: 6 }}
          w='100%'
          maxW='container.xl'
        >
          <Search showCountry placeholder='Search podcasts' onChange={getList} />
        </Container>
      </Flex>

      <Flex as='main'>
        <Container
          display='flex'
          w='100%'
          maxW='container.xl'
          flexDirection='column'
          px={{ base: 3, md: 6 }}
          pt={10}
          pb={36}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'initial', md: 'flex-start' }}
            gap={12}
          >
            {renderFavorites()}
            <Flex
              direction='column'
              gap={6}
              flex={1}
              maxW={{ md: favorites?.length ? '460px' : 'initial' }}
            >
              <Flex
                borderBottomWidth='1px'
                pt={1}
                position='sticky'
                top={12}
                backdropFilter='blur(10px)'
                bgColor={
                  colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'
                }
                zIndex={98}
                align='center'
                justifyContent='space-between'
              >
                <Flex gap={2}>
                  <Icon as={RiTrophyLine} fontSize='20px' />
                  <Text fontSize='xl' lineHeight={1}>
                    Ranking
                  </Text>
                </Flex>
                <IconButton
                  aria-label='Options'
                  icon={<Icon as={RiSettingsLine} fontSize='20px' />}
                  size='sm'
                  variant='ghost'
                  onClick={onOpen}
                />
                <Modal
                  onClose={onClose}
                  finalFocusRef={btnRef}
                  isOpen={isOpen}
                  scrollBehavior='outside'
                  size='sm'
                >
                  <ModalOverlay backdropFilter='auto' backdropBlur='10px' />
                  <ModalContent>
                    <ModalHeader>Ranking settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex maxW={32} flex={1}>
                        <Select
                          value={rankCountry}
                          placeholder='Country'
                          onChange={handleCountryChange}
                          size='sm'
                        >
                          {countries.map(({ name, code }) => (
                            <option value={code.toLowerCase()} key={code}>
                              {name}
                            </option>
                          ))}
                        </Select>
                      </Flex>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>
              {renderRank()}
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </div>
  );
};

export default observer(Home);
