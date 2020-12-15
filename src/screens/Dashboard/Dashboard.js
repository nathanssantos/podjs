import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import useTopPodcastsContext from '../../hooks/useTopPodcastsContext';
import './styles.scss';

const DashBoard = () => {
  const [{ ui, topPodcasts }, { getTopPodcasts }] = useTopPodcastsContext();

  useEffect(() => {
    getTopPodcasts();
  }, []);

  if (ui.requesting) return <CircularProgress />;

  return (
    <div className="podcast-list">
      {topPodcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          title={podcast.title}
          author={podcast.author}
          image={podcast.image}
        />
      ))}
    </div>
  );
};

export default DashBoard;
