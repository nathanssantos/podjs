import { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';
import LazyLoad, { forceCheck } from 'react-lazyload';
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useStore } from '../../hooks';
import PodcastCard from '../../components/PodcastCard';
import Search from '../../components/Search';
import { ParsedUrlQuery } from 'querystring';
import EmptyState from '../../components/EmptyState';
import { RiArrowLeftLine, RiArrowLeftSLine, RiHomeLine } from 'react-icons/ri';

const CollectionDetail: NextPage = () => {
  const router = useRouter();
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();

  const { detail, detailStatus, detailSearchResult, getDetail, search } = collectionStore;

  const handleSearch = (payload: { term: string }) => {
    const { term } = payload;
    search(term);
  };

  const renderDetail = () => {
    switch (detailStatus) {
      case 'fetching': {
        return <Spinner />;
      }

      case 'empty': {
        return <EmptyState variant='not-found' />;
      }

      case 'error': {
        return <EmptyState />;
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
                top='72px'
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
                    <Text fontSize='2xl' lineHeight={1} mb={2} fontWeight='semibold'>
                      {collectionName}
                    </Text>
                    <Text fontSize='lg' mb={4} fontWeight={300} color='gray.500'>
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
                    <Text fontSize='13px' color='gray.500'>
                      {`${!copyright.includes('©') ? `© ${copyright}` : `${copyright}`}`}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Flex direction='column' gap={{ base: 12, md: 6 }} flex={1}>
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
        return null;
      }
    }
  };

  const init = async (query: ParsedUrlQuery) => {
    const { id } = query;
    if (id && String(detail?.collectionId) !== id) await getDetail({ id });
  };

  useEffect(() => {
    forceCheck();
  }, [detailSearchResult]);

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
      <Flex direction='column'>
        <Flex
          justifyContent='flex-end'
          position='sticky'
          top={0}
          right={4}
          zIndex={1000}
          backdropFilter='blur(10px)'
          borderBottomWidth='1px'
          bgColor={
            colorMode === 'light' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(13, 17, 23, 0.85)'
          }
        >
          <Container
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            py={2}
            px={{ base: 3, md: 6 }}
            w='100%'
            maxW='container.xl'
          >
            <Flex>
              {!!detail?.collectionName?.length && (
                <Breadcrumb
                  separator={<Icon as={RiArrowLeftSLine} color='gray.500' />}
                  sx={{
                    'span, ol': {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink onClick={() => router.push('/')}>
                      <Flex align='center' gap={2}>
                        <Icon as={RiHomeLine} color='gray.500' fontSize='20px' />
                        <Text>Home</Text>
                      </Flex>
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink
                      as='div'
                      _hover={{ textDecoration: 'none' }}
                      cursor='initial'
                    >
                      <Flex align='center'>
                        <Text>{detail.collectionName}</Text>
                      </Flex>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              )}
            </Flex>
            <Search onChange={handleSearch} placeholder='Search episodes' />
          </Container>
        </Flex>

        <Flex as='main'>
          <Container
            display='flex'
            px={{ base: 3, md: 6 }}
            pt={6}
            pb={36}
            w='100%'
            maxW='container.xl'
          >
            <Flex gap={12} direction={{ base: 'column', lg: 'row' }} w='100%'>
              {renderDetail()}
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </div>
  );
};

export default observer(CollectionDetail);
