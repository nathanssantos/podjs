import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PodJS</title>
        <meta
          name="description"
          content="PodJS is a open source podcast app built with Next.js, MobX and Chakra UI."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>PodJS</h1>
      </main>
    </div>
  );
};

export default Home;
