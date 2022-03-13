import Container from "@mui/material/Container";
import { Button, FadeInContainer, PodcastCard } from "../../components";
import Styles from "./Styles";

interface PodcastsProps {
  list?: Podcast[];
}

const Podcasts = (props: PodcastsProps) => {
  const { list } = props;

  console.log(list);

  if (!list) return null;

  return (
    <Styles id="Podcasts">
      <Container maxWidth="lg">
        <div className="content">
          <header>
            <FadeInContainer lazyLoad>
              <h2>My Open Source Podcasts</h2>
            </FadeInContainer>
          </header>
          <div className="card-list">
            {list.map(
              ({
                collectionId,
                collectionName,
                artistName,
                description,
                feedUrl,
                artworkUrl600,
              }) => (
                <FadeInContainer lazyLoad key={`${collectionId}`}>
                  <PodcastCard
                    collectionId={collectionId}
                    collectionName={collectionName}
                    artistName={artistName}
                    description={description}
                    feedUrl={feedUrl}
                    artworkUrl600={artworkUrl600}
                  />
                </FadeInContainer>
              )
            )}
          </div>
        </div>
      </Container>
    </Styles>
  );
};

export default Podcasts;
