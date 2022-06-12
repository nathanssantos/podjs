import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useStore } from '../../hooks';

const CollectionDetail: NextPage = () => {
  const router = useRouter();
  const store = useStore();

  const init = async () => {
    flowResult(store.collectionStore.getList());
  };

  const renderList = () => {
    switch (store.collectionStore.status) {
      case 'fetching': {
        return 'loading';
      }

      case 'success': {
        if (store.collectionStore.list?.length) return router.query.id;
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
      <Box as='main' p='3'>
        <SimpleGrid minChildWidth={240}>{renderList()}</SimpleGrid>
      </Box>
    </div>
  );
};

export default observer(CollectionDetail);
