import { Container, Flex, SimpleGrid, Text, useColorMode } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import CollectionListItem from '../../components/CollectionListItem';
import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import Search from '../../components/Search';
import { useStore } from '../../hooks';

const SearchScreen: NextPage = () => {
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();

  const { list, listStatus, listSearchTerm, listSearchCountry, getList } = collectionStore;

  const handleSearch = (payload: { term: string; country: string }) => {
    getList(payload);
  };

  const renderList = () => {
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
            <CollectionListItem key={collection.collectionId} collection={collection} />
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
        {!!listSearchTerm?.length && (
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
              {`${
                !!list?.length ? `${list.length} ` : ''
              }Search results for "${listSearchTerm}":`}
            </Text>
          </Flex>
        )}
        <SimpleGrid minChildWidth={200} gap={3}>
          {listContent}
        </SimpleGrid>
      </Flex>
    );
  };

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
        </Container>
      </Flex>
    </div>
  );
};

export default observer(SearchScreen);
