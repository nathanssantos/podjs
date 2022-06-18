import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { Badge, Box, Flex, Image, SimpleGrid, Spinner, Text, useTheme } from '@chakra-ui/react';
import { useStore } from '../../hooks';
import PodcastCard from '../../components/PodcastCard';

const CollectionDetail: NextPage = () => {
  const router = useRouter();
  const { collectionStore } = useStore();

  const { detail, detailStatus, getDetail } = collectionStore;

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
                gap='4'
                position={{ base: 'initial', lg: 'sticky' }}
                direction={{ base: 'row', lg: 'column' }}
                alignSelf='flex-start'
                top='81px'
              >
                <Flex borderWidth='1px' borderRadius='lg' overflow='hidden'>
                  <Image
                    src={artworkUrl600}
                    alt={collectionName}
                    w={240}
                    minW={200}
                    objectFit='cover'
                  />
                </Flex>
                <Flex direction='column' gap='4'>
                  <Flex flex='1' direction='column' alignItems='flex-start'>
                    <Text fontSize='3xl' lineHeight='1'>
                      {collectionName}
                    </Text>
                    <Text fontSize='lg' mb='4' fontWeight={100} color='gray.500'>
                      {artistName}
                    </Text>
                    <Text mb='4'>{description}</Text>
                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                      {primaryGenreName}
                    </Badge>
                  </Flex>
                  {!!copyright?.length && <Text fontSize='14px'>{copyright}</Text>}
                </Flex>
              </Flex>
              <Flex direction='column' gap='3'>
                {items.map((podcast) => (
                  <LazyLoad height={150} key={`${podcast.title}${podcast.isoDate}`}>
                    <PodcastCard podcast={podcast} />
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

  useEffect(() => {
    const { id } = router.query;
    if (id && String(detail?.collectionId) !== id) getDetail({ id });
  }, [router.query]);

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex as='main' p='6' gap='6' direction={{ base: 'column', lg: 'row' }}>
        {renderDetail()}
      </Flex>
    </div>
  );
};

export default observer(CollectionDetail);
