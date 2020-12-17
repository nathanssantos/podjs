import React, { useEffect, useState } from 'react';
import { CardActionArea, LinearProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const PodcastDetail = () => {
  const [
    { ui, podcastDetail },
    { getPodcastDetail, playPodcastItem },
  ] = usePodcastsContext();
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);

  const loadDetail = async () => {
    await getPodcastDetail(id);
    setFetched(true);
  };

  useEffect(() => {
    loadDetail();
  }, []);

  if (ui.requesting) return <LinearProgress />;

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
            </CardContent>

            {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
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
