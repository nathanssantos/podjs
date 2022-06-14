import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import { Badge, Box, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useStore } from '../../hooks';
import PodcastCard from '../../components/PodcastCard';

const CollectionDetail: NextPage = () => {
  const router = useRouter();
  const store = useStore();

  const collection = store.collectionStore.detail;

  const renderDetail = () => {
    switch (store.collectionStore.detailStatus) {
      case 'fetching': {
        return 'fetching';
      }

      case 'error': {
        return 'error';
      }

      case 'success': {
        if (collection) {
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
          } = collection;

          return (
            <Flex as='main' direction='column' px='6' py='3' gap='6'>
              <Flex gap='6'>
                <Flex borderWidth='1px' borderRadius='lg' overflow='hidden'>
                  <Image src={artworkUrl600} alt={collectionName} w={300} />
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
                  <PodcastCard key={`${podcast.title}${podcast.isoDate}`} podcast={podcast} />
                ))}
              </Flex>
            </Flex>
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
    if (id && !collection) store.collectionStore.getDetail({ id });
  }, [router.query]);

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {renderDetail()}
    </div>
  );
};

export default observer(CollectionDetail);
