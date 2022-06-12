import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useStore } from '../hooks';

const Home: NextPage = () => {
  const store = useStore();

  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Flex direction='column' gap='2'>
          <Flex direction='column'>
            <Text>{store.authStore.user?.name}</Text>
            <Text>{store.authStore.user?.email}</Text>
          </Flex>
          <Button colorScheme='blue' alignSelf='flex-start'>
            PodJS
          </Button>
        </Flex>
      </main>
    </div>
  );
};

export default Home;
