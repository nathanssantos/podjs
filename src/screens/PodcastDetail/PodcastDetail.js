import React, { useEffect, useState } from 'react';
import { CardActionArea, LinearProgress, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import usePodcastsContext from '../../hooks/usePodcastsContext';

import './styles.scss';

const PodcastDetail = () => {
  const [
    { ui, podcastDetail, favorites },
    { getPodcastDetail, playPodcastItem, addFavorite, removeFavorite },
  ] = usePodcastsContext();
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const loadDetail = async () => {
    await getPodcastDetail(id);
    setFetched(true);
  };

  const addFavoritePodcast = () => {
    setIsFavorite(true);
    addFavorite({
      id,
      title: podcastDetail.collectionName,
      author: podcastDetail.artistName,
      image: podcastDetail.artworkUrl600,
    });
    return null;
  };

  const removeFavoritePodcast = () => {
    removeFavorite(id);
    setIsFavorite(false);
    return null;
  };

  useEffect(() => {
    favorites.forEach((favorite) => {
      if (favorite.id === id) setIsFavorite(true);
    });
    loadDetail();
  }, []);

  if (ui.requesting) return <LinearProgress className="screen-loader" />;

  if (
    fetched &&
    !ui.requesting &&
    !ui.error &&
    podcastDetail.items &&
    podcastDetail.items.length
  ) {
    return (
      <div className="podcast-detail">
        <div className="podcast-detail__meta">
          <Card className="podcast-detail__card">
            <CardMedia
              className="podcast-detail__image"
              image={podcastDetail.artworkUrl600}
              title={podcastDetail.collectionName}
            />
            <CardContent>
              <Typography variant="h5">
                {podcastDetail.collectionName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {podcastDetail.artistName}
              </Typography>
              {isFavorite ? (
                <Button
                  color="default"
                  className="bt-favorite"
                  onClick={removeFavoritePodcast}
                >
                  <StarIcon className="bt-favorite__icon" />
                  Remover dos favoritos
                </Button>
              ) : (
                <Button
                  color="default"
                  className="bt-favorite"
                  onClick={addFavoritePodcast}
                >
                  <StarOutlineIcon className="bt-favorite__icon" />
                  Adicionar aos favoritos
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="podcast-detail__card description">
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {podcastDetail.description}
              </Typography>
            </CardContent>
          </Card>
        </div>

        <div className="podcast-detail__list">
          {podcastDetail.items.map((item) => (
            <Card
              className="podcast-detail__item-card"
              key={item.title}
              onClick={() => {
                playPodcastItem(item);
              }}
            >
              <CardActionArea className="podcast-detail__action-area">
                {item.itunes &&
                  item.itunes.image &&
                  item.itunes.image.length && (
                    <CardMedia
                      className="podcast-detail__item-image"
                      image={item.itunes.image}
                      title={item.title}
                    />
                  )}
                <CardContent>
                  <Typography gutterBottom>{item.title}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    dangerouslySetInnerHTML={{
                      __html:
                        item.itunes.summary && item.itunes.summary.length
                          ? item.itunes.summary
                          : item.content,
                    }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default PodcastDetail;
