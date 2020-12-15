import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import useTopPodcastsContext from '../../hooks/useTopPodcastsContext';

const DashBoard = () => {
  const [{ ui, topPodcasts }, { getTopPodcasts }] = useTopPodcastsContext();

  useEffect(() => {
    getTopPodcasts();
  }, []);

  if (ui.requesting) return <CircularProgress />;

  return topPodcasts.map((podcast) => (
    <PodcastCard
      title={podcast.title}
      author={podcast.author}
      image={podcast.image}
    />
  ));
};

export default DashBoard;
