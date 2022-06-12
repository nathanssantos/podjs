import type { NextPage } from 'next';
import Head from 'next/head';
import { Button } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta name='description' content='PodJS' />
        <meta name='author' content='Nathan Silva Santos <nathansilvasantos@gmail.com>' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Button colorScheme='blue'>PodJS</Button>
      </main>
    </div>
  );
};

export default Home;
