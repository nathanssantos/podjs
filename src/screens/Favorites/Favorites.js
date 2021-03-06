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
    <div className="screen">
      {favorites.length === 1 ? (
        <div className="screen-title">{`${favorites.length} podcast favorito`}</div>
      ) : (
        <div className="screen-title">{`${favorites.length} podcasts favoritos`}</div>
      )}
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
    </div>
  );
};

export default Favorites;
