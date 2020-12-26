import { LinearProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const Home = () => {
  const [{ ui, topPodcasts }, { getTopPodcasts }] = usePodcastsContext();

  useEffect(() => {
    if (!topPodcasts.length) getTopPodcasts();
  }, []);

  if (ui.requesting && !topPodcasts.length)
    return <LinearProgress className="screen-loader" />;

  return (
    <div className="screen">
      <div className="screen-title">Top 100 Podcasts</div>
      <div className="podcast-list">
        {topPodcasts.map((podcast) => (
          <PodcastCard
            key={podcast.id}
            id={podcast.id}
            title={podcast.title}
            author={podcast.author}
            image={podcast.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
