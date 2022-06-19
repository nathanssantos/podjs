import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { Badge, Box, Flex, Image, Spinner, Text, useColorMode } from '@chakra-ui/react';
import { useStore } from '../../hooks';
import PodcastCard from '../../components/PodcastCard';
import Search from '../../components/Search';
import { ParsedUrlQuery } from 'querystring';

const CollectionDetail: NextPage = () => {
  const router = useRouter();
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();

  const { detail, detailStatus, detailSearchResult, getDetail, search } = collectionStore;

  const renderDetail = () => {
    switch (detailStatus) {
      case 'fetching': {
        return <Spinner />;
      }

      case 'error': {
        return 'error';
      }

      case 'success': {
        if (detail) {
          const {
            artistName,
            collectionId,
            collectionName,
            artworkUrl100,
            artworkUrl600,
            description,
            managingEditor,
            language,
            copyright,
            lastBuildDate,
            primaryGenreName,
            genres,
            feedUrl,
            trackCount,
            country,
            items,
          } = detail;

          return (
            <>
              <Flex
                gap={4}
                position={{ lg: 'sticky' }}
                direction={{ base: 'column', md: 'row', lg: 'column' }}
                alignSelf={{ base: 'center', md: 'flex-start' }}
                align={{ base: 'center', md: 'initial' }}
                top='88px'
                maxW={{ lg: 60 }}
              >
                <Flex
                  borderWidth='1px'
                  borderRadius='lg'
                  overflow='hidden'
                  w={{ base: '100%', md: 240 }}
                  minW={240}
                  maxW={{ base: '100%', md: 240 }}
                  h={{ md: 240 }}
                >
                  <Image
                    src={artworkUrl600}
                    alt={collectionName}
                    objectFit='cover'
                    w='100%'
                    h='100%'
                  />
                </Flex>
                <Flex direction='column' gap={4} textAlign={{ base: 'center', md: 'left' }}>
                  <Flex
                    flex={1}
                    direction='column'
                    align={{ base: 'center', md: 'flex-start' }}
                  >
                    <Text fontSize='2xl' lineHeight={1} mb={2}>
                      {collectionName}
                    </Text>
                    <Text fontSize='lg' mb={4} fontWeight={100} color='gray.500'>
                      {artistName}
                    </Text>
                    {!!description?.length && (
                      <Text mb={4} dangerouslySetInnerHTML={{ __html: description }} />
                    )}
                    <Badge borderRadius='full' px={2} colorScheme='teal'>
                      {primaryGenreName}
                    </Badge>
                  </Flex>
                  {!!copyright?.length && (
                    <Text fontSize='12px' color='gray.500'>
                      {`${!copyright.includes('©') ? `© ${copyright}` : `${copyright}`}`}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Flex direction='column' gap={{ base: 12, md: 6 }}>
                {detailSearchResult &&
                  detailSearchResult.map((podcast) => (
                    <LazyLoad
                      key={`${podcast.title}${podcast.isoDate}`}
                      height={150}
                      offset={2048}
                      unmountIfInvisible
                    >
                      <PodcastCard podcast={podcast} imageFallback={artworkUrl600} />
                    </LazyLoad>
                  ))}
              </Flex>
            </>
          );
        }
      }

      default: {
        return 'empty';
      }
    }
  };

  const init = async (query: ParsedUrlQuery) => {
    const { id } = query;
    if (id && String(detail?.collectionId) !== id) await getDetail({ id });
    search();
  };

  useEffect(() => {
    init(router.query);
  }, [router.query]);

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction='column' as='main' p={6} pt={20} pb={36} gap={6}>
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
          <Box maxW={80}>
            <Search onChange={search} />
          </Box>
        </Flex>
        <Flex gap={12} direction={{ base: 'column', lg: 'row' }}>
          {renderDetail()}
        </Flex>
      </Flex>
    </div>
  );
};

export default observer(CollectionDetail);
