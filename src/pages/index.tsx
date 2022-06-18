import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
import CollectionCard from '../components/CollectionCard';

type HomeProps = {
  list: Collection[];
};

const Home: NextPage<HomeProps> = (props) => {
  const { list } = props;

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex direction='column' as='main' p={6} gap={3}>
        <SimpleGrid minChildWidth={240} gap={6}>
          {list.map((collection) => (
            <CollectionCard key={collection.collectionId} collection={collection} />
          ))}
        </SimpleGrid>
      </Flex>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const revalidate = 60 * 60 * 60; // 1 hour

  try {
    const response = await axios.get('http://localhost:3000/api/collections');

    console.log(response);
    const { status, data } = response;

    if (status !== 200 || !data?.results?.length) {
      return {
        props: {
          list: [],
        },
        revalidate,
      };
    }

    return {
      props: {
        list: data.results,
      },
      revalidate,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        list: [],
      },
      revalidate,
    };
  }
};

export default Home;
