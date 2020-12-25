import { LinearProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const Favorites = () => {
  const [{ ui, favorites }, { getFavorites }] = usePodcastsContext();

  useEffect(() => {
    getFavorites();
  }, []);

  if (ui.requesting && !favorites.length)
    return <LinearProgress className="screen-loader" />;

  if (!ui.requesting && !favorites.length)
    return (
      <div className="empty-state">Sua lista de favoritos está vazia.</div>
    );

  return (
    <div className="podcast-list">
      {favorites.map((podcast) => (
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

export default Favorites;
