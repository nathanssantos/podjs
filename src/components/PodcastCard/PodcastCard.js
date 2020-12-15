/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '190px',
    display: 'flex',
    flexDirection: 'column',
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
}));

const PodcastCard = ({ title, author, image }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.cover} image={image} title={title} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h6">
              {title}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {author}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default PodcastCard;
