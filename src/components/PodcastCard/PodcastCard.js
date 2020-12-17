/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  CardContent,
  CardMedia,
  Typography,
  Card,
  CardActionArea,
} from '@material-ui/core';
import './styles.scss';

const PodcastCard = ({ id, title, author, image }) => (
  <Link to={`/podjs/podcast/${id}`}>
    <Card className="podcast-card__root">
      <CardActionArea>
        <CardMedia
          className="podcast-card__cover"
          image={image}
          title={title}
        />
        <div className="podcast-card__details">
          <CardContent className="podcast-card__content">
            <Typography
              component="h5"
              variant="h6"
              className="podcast-card__title"
            >
              {title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className="podcast-card__subtitle"
            >
              {author}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  </Link>
);

export default PodcastCard;
