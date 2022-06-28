import { Container, Flex, SimpleGrid, Text, useColorMode } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

import CollectionListItem from '../components/CollectionListItem';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import RankCollectionListItem from '../components/RankCollectionListItem';
import Search from '../components/Search';
import { useStore } from '../hooks';

const Home: NextPage = () => {
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();

  const { rank, favorites, rankStatus, favoritesStatus, getRank, getList, loadFavoritesData } =
    collectionStore;

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
          <Text fontSize='xl' lineHeight={1}>
            Favorites
          </Text>
        </Flex>
        <SimpleGrid minChildWidth='200px' gap={3} pb={12} justifyContent='flex-start'>
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
    loadFavoritesData();
    if (!rank?.length) getRank({ country: '' });
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
                py={2}
                position='sticky'
                top={12}
                backdropFilter='blur(10px)'
                bgColor={
                  colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'
                }
                zIndex={98}
              >
                <Text fontSize='xl' lineHeight={1}>
                  Ranking
                </Text>
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
