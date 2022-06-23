import { Container, Flex, Text, useColorMode } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';
import RankCollectionListItem from '../components/RankCollectionListItem';
import Search from '../components/Search';
import { useStore } from '../hooks';

const Home: NextPage = () => {
  const router = useRouter();
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();

  const {
    rank,
    rankStatus,
    listSearchTerm,
    listSearchCountry,
    getRank,
    setListSearchTerm,
    setListSearchCountry,
  } = collectionStore;

  const handleSearch = (payload: { country: string; term: string }) => {
    const { country, term } = payload;

    if (!term?.length) return;

    setListSearchTerm(term);
    let route = `/search?term=${term}`;
    if (country) {
      setListSearchCountry(country);
      route += `&country=${country}`;
    }

    router.push(route);
  };

  const renderRank = () => {
    switch (rankStatus) {
      case 'fetching': {
        return <Loader />;
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
            <Flex direction='column' gap={3} mb={12}>
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
        justifyContent='flex-end'
        position='sticky'
        top={0}
        right={0}
        zIndex={1000}
        backdropFilter='blur(10px)'
        borderBottomWidth='1px'
        bgColor={colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'}
      >
        <Container
          display='flex'
          alignItems='center'
          justifyContent='flex-end'
          py={2}
          px={{ base: 3, md: 6 }}
          w='100%'
          maxW='container.xl'
        >
          <Search
            showCountry
            onChange={handleSearch}
            placeholder='Search podcasts'
            initialValue={{ term: listSearchTerm, country: listSearchCountry }}
          />
        </Container>
      </Flex>

      <Flex as='main'>
        <Container
          display='flex'
          w='100%'
          maxW='container.xl'
          flexDirection='column'
          px={{ base: 3, md: 6 }}
          pt={6}
          pb={36}
          gap={3}
          mb={12}
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
            zIndex={1}
          >
            <Text fontSize='xl' lineHeight={1}>
              Podcast Ranking
            </Text>
          </Flex>

          {renderRank()}
        </Container>
      </Flex>
    </div>
  );
};

export default observer(Home);
