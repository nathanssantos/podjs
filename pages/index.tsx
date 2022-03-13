import axios from "axios";
import type { NextPage } from "next";
import { Hero, Podcasts } from "../sections";

interface HomeProps {
  podcasts?: Podcast[];
}

const Home: NextPage<HomeProps> = (props) => {
  const { podcasts } = props;

  console.log(podcasts);

  return (
    <div className="home">
      {/* <Hero /> */}
      {podcasts?.length && <Podcasts list={podcasts} />}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      "https://itunes.apple.com/search?country=br&entity=podcast&media=podcast&limit=200&term=nerd"
    );

    return {
      props: { podcasts: response.data.results },
    };
  } catch (error) {
    return {
      props: { podcasts: [] },
    };
  }
}

export default Home;
