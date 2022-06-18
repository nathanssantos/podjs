import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import LazyLoad from 'react-lazyload';
import { Badge, Box, Flex, Image, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
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
              <Flex gap='6'>
                <Flex borderWidth='1px' borderRadius='lg' overflow='hidden'>
                  <Image src={artworkUrl600} alt={collectionName} w={300} objectFit='cover' />
                </Flex>
                <Flex direction='column'>
                  <Flex flex='1' direction='column' alignItems='flex-start'>
                    <Text fontSize='4xl'>{collectionName}</Text>
                    <Text fontSize='xl' mb='2'>
                      {artistName}
                    </Text>
                    <Text mb='2'>{description}</Text>
                    <Flex mt='2' alignItems='center' gap='2'>
                      <Badge borderRadius='full' px='2' colorScheme='teal'>
                        {primaryGenreName}
                      </Badge>
                      <Box
                        color='gray.500'
                        fontWeight='semibold'
                        letterSpacing='wide'
                        fontSize='xs'
                        textTransform='uppercase'
                      >
                        {genres
                          ?.filter((genre) => genre !== 'Podcasts')
                          .map(
                            (genre, index) =>
                              `${genre}${
                                index <
                                genres.filter((genre) => genre !== 'Podcasts').length - 1
                                  ? ' | '
                                  : ''
                              }`,
                          )}
                      </Box>
                    </Flex>
                  </Flex>
                  <Text fontSize='14px'>{`${managingEditor} - ${copyright}`}</Text>
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
      <Flex as='main' direction='column' p='6' gap='6'>
        {renderDetail()}
      </Flex>
    </div>
  );
};

export default observer(CollectionDetail);
