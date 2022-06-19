import type { NextPage } from 'next';
import Head from 'next/head';
import { observer } from 'mobx-react';
import { Box, Flex, SimpleGrid, Spinner, useColorMode } from '@chakra-ui/react';
import { useStore } from '../hooks';
import CollectionCard from '../components/CollectionCard';
import Search from '../components/Search';

const Home: NextPage = () => {
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();

  const { list, listStatus, listSearchTerm, getList } = collectionStore;

  const onSearch = (term: string) => {
    getList({ term });
  };

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

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction='column' as='main' p={6} pt={20} gap={6}>
        <Flex
          bg='gray.900'
          justifyContent='flex-end'
          position='fixed'
          top='63px'
          right={4}
          ml={4}
          zIndex={1000}
          bgColor={colorMode === 'light' ? '#fff' : 'gray.700'}
          p={2}
          borderWidth='1px'
          borderTopWidth={0}
          borderBottomLeftRadius='lg'
          borderBottomRightRadius='lg'
        >
          <Box maxW={80} alignSelf='flex-end'>
            <Search onChange={onSearch} initialValue={listSearchTerm} />
          </Box>
        </Flex>

        <SimpleGrid minChildWidth={200} gap={3}>
          {renderList()}
        </SimpleGrid>
      </Flex>
    </div>
  );
};

export default observer(Home);
