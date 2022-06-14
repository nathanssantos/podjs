import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useStore } from '../hooks';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import CollectionCard from '../components/CollectionCard';

const Home: NextPage = () => {
  const store = useStore();

  const list = store.collectionStore.list;

  const renderList = () => {
    switch (store.collectionStore.listStatus) {
      case 'fetching': {
        return 'fetching';
      }

      case 'error': {
        return 'error';
      }

      case 'success': {
        if (list?.length) {
          return list.map((collection) => (
            <CollectionCard key={collection.collectionId} collection={collection} />
          ));
        }
      }

      default: {
        return 'empty';
      }
    }
  };

  useEffect(() => {
    if (!list?.length) store.collectionStore.getList();
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
