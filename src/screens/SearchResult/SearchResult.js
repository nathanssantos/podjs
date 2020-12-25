import { LinearProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PodcastCard from '../../components/PodcastCard/PodcastCard';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const SearchResult = () => {
  const { key } = useParams();
  const [{ ui, searchResult }, { search }] = usePodcastsContext();

  const searchKey = async () => {
    await search(key);
  };

  useEffect(() => {
    searchKey();
  }, []);

  if (ui.requesting && !searchResult.length)
    return <LinearProgress className="screen-loader" />;

  if (!ui.requesting && !searchResult.length)
    return <div className="empty-state">Nenhum resultado para sua busca.</div>;

  return (
    <div className="podcast-list">
      {searchResult.map((podcast) => (
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

export default SearchResult;
