import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const PodcastDetail = () => {
  const [{ ui, podcastDetail }, { getPodcastDetail }] = usePodcastsContext();
  const { id } = useParams();

  useEffect(() => {
    getPodcastDetail(id);
  }, []);

  if (ui.requesting) return <CircularProgress />;

  if (
    !ui.requesting &&
    !ui.error &&
    podcastDetail.artworkUrl600 &&
    podcastDetail.collectionName &&
    podcastDetail.artistName &&
    podcastDetail.items &&
    podcastDetail.items.length
  ) {
    return (
      <div className="podcast-detail">
        <Card className="podcast-detail__card">
          <CardMedia
            className="podcast-detail__image"
            image={podcastDetail.artworkUrl600}
            title={podcastDetail.collectionName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
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

        {podcastDetail.items.map((item) => (
          <Card className="podcast-detail__item-card" key={item.title}>
            <CardContent>
              <Typography gutterBottom variant="h6">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.itunes.summary && item.itunes.summary.length
                  ? item.itunes.summary
                  : item.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return null;
};

export default PodcastDetail;
