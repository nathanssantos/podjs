import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Flex,
  Icon,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiHomeLine } from 'react-icons/ri';
import LazyLoad, { forceCheck } from 'react-lazyload';

import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import PodcastListItem from '../../components/PodcastListItem';
import Search from '../../components/Search';
import { useStore } from '../../hooks';

const CollectionDetail: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { collectionStore } = useStore();
  const { colorMode } = useColorMode();

  const { detail, detailStatus, detailSearchResult, getDetail, search } = collectionStore;

  const renderDetail = () => {
    switch (detailStatus) {
      case 'fetching': {
        return <Loader variant='list' />;
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
                  w={{ base: '100%', md: '240px' }}
                  minW={240}
                  maxW={{ base: '400px', md: '240px' }}
                  h={{ md: '240px' }}
                >
                  <Image
                    src={artworkUrl600}
                    alt={collectionName}
                    objectFit='cover'
                    w='100%'
                    h='100%'
                  />
                </Flex>
                <Flex direction='column' gap={2} textAlign={{ base: 'center', md: 'left' }}>
                  <Flex
                    flex={1}
                    direction='column'
                    align={{ base: 'center', md: 'flex-start' }}
                  >
                    <Text fontSize='2xl' lineHeight={1} mb={1} fontWeight='semibold'>
                      {collectionName}
                    </Text>
                    <Text fontSize='lg' mb={2} fontWeight={300} color='gray.500'>
                      {artistName}
                    </Text>
                    {!!description?.length && (
                      <Text mb={2} dangerouslySetInnerHTML={{ __html: description }} />
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
                      height={205}
                      offset={1024}
                      unmountIfInvisible
                      resize
                    >
                      <PodcastListItem podcast={podcast} imageFallback={artworkUrl600} />
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

  const init = async (id: string) => {
    if (String(detail?.collectionId) !== id) await getDetail({ id });
  };

  useEffect(() => {
    forceCheck();
  }, [detailSearchResult]);

  useEffect(() => {
    if (mounted) return;

    const { id } = router.query;

    if (id?.length) {
      init(id as string);
      setMounted(true);
    }
  }, [router.query]);

  return (
    <>
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
                <Flex display={{ base: 'none', md: 'flex' }}>
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
                </Flex>
              )}
            </Flex>
            <Search onChange={search} placeholder='Filter episodes' redirectOnSearch={false} />
          </Container>
        </Flex>

        <Flex as='main'>
          <Container
            display='flex'
            px={{ base: 3, md: 6 }}
            pt={12}
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
    </>
  );
};

export default observer(CollectionDetail);
