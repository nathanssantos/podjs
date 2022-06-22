import type { NextPage } from 'next';
import Head from 'next/head';
import { observer } from 'mobx-react';
import { Container, Flex, SimpleGrid, Spinner, Text, useColorMode } from '@chakra-ui/react';
import { useStore } from '../hooks';
import CollectionCard from '../components/CollectionCard';
import Search from '../components/Search';
import EmptyState from '../components/EmptyState';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Home: NextPage = () => {
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();

  const {
    list,
    topList,
    listStatus,
    topListStatus,
    listSearchTerm,
    listSearchCountry,
    getList,
    getTopList,
  } = collectionStore;

  const onSearch = (payload: { term: string; country: string }) => {
    getList(payload);
  };

  const renderList = () => {
    if (!listSearchTerm?.length) return null;

    let listContent = null;

    switch (listStatus) {
      case 'fetching': {
        listContent = <Loader />;
        break;
      }

      case 'empty': {
        listContent = <EmptyState variant='not-found' />;
        break;
      }

      case 'error': {
        listContent = <EmptyState />;
        break;
      }

      case 'success': {
        if (list?.length) {
          listContent = list.map((collection) => (
            <CollectionCard key={collection.collectionId} collection={collection} />
          ));
        }
        break;
      }

      default: {
        listContent = null;
      }
    }

    return (
      <Flex direction='column' gap={3} mb={12}>
        <Flex
          borderBottomWidth='1px'
          position='sticky'
          top={12}
          py={2}
          backdropFilter='blur(10px)'
          bgColor={
            colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'
          }
        >
          <Text fontSize='xl' lineHeight={1}>
            {`Search results for "${listSearchTerm}":`}
          </Text>
        </Flex>
        <SimpleGrid minChildWidth={200} gap={3}>
          {listContent}
        </SimpleGrid>
      </Flex>
    );
  };

  const renderTopList = () => {
    switch (topListStatus) {
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
        if (topList?.length) {
          return (
            <SimpleGrid minChildWidth={200} gap={3} mb={12}>
              {topList.map((collection) => (
                <CollectionCard key={collection.collectionId} collection={collection} />
              ))}
            </SimpleGrid>
          );
        }
      }

      default: {
        return null;
      }
    }
  };

  useEffect(() => {
    if (!topList?.length) getTopList({ country: listSearchCountry });
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
            onChange={onSearch}
            initialValue={{ term: listSearchTerm, country: listSearchCountry }}
            placeholder='Search podcasts'
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
        >
          {renderList()}

          <Flex direction='column' gap={3} mb={12}>
            <Flex
              borderBottomWidth='1px'
              py={2}
              position='sticky'
              top={12}
              backdropFilter='blur(10px)'
              bgColor={
                colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'
              }
            >
              <Text fontSize='xl' lineHeight={1}>
                Top Podcasts
              </Text>
            </Flex>

            {renderTopList()}
          </Flex>
        </Container>
      </Flex>
    </div>
  );
};

export default observer(Home);
