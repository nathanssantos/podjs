import type { NextPage } from 'next';
import Head from 'next/head';
import { observer } from 'mobx-react';
import { Flex, SimpleGrid, Spinner, Text, useColorMode } from '@chakra-ui/react';
import { useStore } from '../hooks';
import CollectionCard from '../components/CollectionCard';
import Search from '../components/Search';
import EmptyState from '../components/EmptyState';
import { useEffect, useState } from 'react';

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
        listContent = <Spinner />;
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
        <Flex borderBottomWidth='1px' pb={3}>
          <Text fontSize='2xl' lineHeight={1}>
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
        return <Spinner />;
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
      <Flex direction='column'>
        <Flex
          justifyContent='flex-end'
          position='sticky'
          top={0}
          right={4}
          zIndex={1000}
          py={3}
          px={6}
          backdropFilter='blur(10px)'
          borderBottomWidth='1px'
          bgColor={
            colorMode === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(13, 17, 23, 0.75)'
          }
        >
          <Search
            showCountry
            onChange={onSearch}
            initialValue={{ term: listSearchTerm, country: listSearchCountry }}
            placeholder='Search podcasts'
          />
        </Flex>

        <Flex direction='column' as='main' px={6} pt={12} pb={36}>
          {renderList()}

          <Flex direction='column' gap={3} mb={12}>
            <Flex borderBottomWidth='1px' pb={3}>
              <Text fontSize='2xl' lineHeight={1}>
                Top Podcasts
              </Text>
            </Flex>

            {renderTopList()}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default observer(Home);
