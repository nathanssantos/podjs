import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Flex, SimpleGrid, useColorMode } from '@chakra-ui/react';
import { useStore } from '../hooks';
import { useEffect } from 'react';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import CollectionCard from '../components/CollectionCard';

const Home: NextPage = () => {
  const store = useStore();
  const { colorMode, toggleColorMode } = useColorMode();

  const init = async () => {
    flowResult(store.collectionStore.getList());
  };

  const renderList = () => {
    switch (store.collectionStore.status) {
      case 'fetching': {
        return 'loading';
      }

      case 'success': {
        if (store.collectionStore.list?.length)
          return store.collectionStore.list.map((collection) => (
            <CollectionCard key={collection.collectionId} collection={collection} />
          ));
        return 'empty';
      }

      default: {
        return '';
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction='column' as='main' p='6' gap='3'>
        <SimpleGrid minChildWidth={240} gap='3'>
          {renderList()}
        </SimpleGrid>
      </Flex>
    </div>
  );
};

export default observer(Home);
