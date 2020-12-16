/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardContent,
  CardMedia,
  Typography,
  Card,
  CardActionArea,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '190px',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '190px',
    height: '190px',
  },
  title: {
    fontSize: '16px',
    marginBottom: '5px',
  },
}));

const PodcastCard = ({ id, title, author, image }) => {
  const classes = useStyles();

  return (
    <Link to={`podjs/podcast/${id}`}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.cover} image={image} title={title} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h6" className={classes.title}>
                {title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {author}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default PodcastCard;
