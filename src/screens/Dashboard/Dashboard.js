import { LinearProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const DashBoard = () => {
  const [{ ui, topPodcasts }, { getTopPodcasts }] = usePodcastsContext();

  useEffect(() => {
    if (!topPodcasts.length) getTopPodcasts();
  }, []);

  if (ui.requesting && !topPodcasts.length)
    return <LinearProgress className="screen-loader" />;

  return (
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
  );
};

export default DashBoard;
