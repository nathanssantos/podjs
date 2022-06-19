import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useStore } from '../hooks';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import CollectionCard from '../components/CollectionCard';

const Home: NextPage = () => {
  const { collectionStore } = useStore();

  const { list, listStatus, getList } = collectionStore;

  const renderList = () => {
    switch (listStatus) {
      case 'fetching': {
        return <Spinner />;
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
    if (!list?.length) getList();
  }, []);

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction='column' as='main' p={6} pb={36}>
        <SimpleGrid minChildWidth={240} gap={6}>
          {renderList()}
        </SimpleGrid>
      </Flex>
    </div>
  );
};

export default observer(Home);
