/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import StarIcon from '@material-ui/icons/StarOutlined';

import Dashboard from '../../screens/Dashboard/Dashboard';
import PodcastDetail from '../../screens/PodcastDetail/PodcastDetail';
import Favorites from '../../screens/Favorites/Favorites';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#2a2a2a',
    opacity: '0.97',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
  },
  title: {
    fontWeight: '100',
    fontSize: '18px',
    letterSpacing: '2px',
    color: '#868686',
    flex: 1,
  },
  homeButton: {
    marginRight: 36,
  },
  favoriteButton: {
    marginLeft: 36,
  },
}));

const Navigator = () => {
  const classes = useStyles();
  const location = useLocation();
  const isHome = location.pathname.split('/').length === 2;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isHome ? null : (
            <Link to="/podjs" className={classes.homeButton}>
              <IconButton color="inherit" aria-label="Home" edge="start">
                <HomeIcon />
              </IconButton>
            </Link>
          )}
          <Typography variant="h6" noWrap className={classes.title}>
            pod.js
          </Typography>
          <Link to="/podjs/favorites" className={classes.favoriteButton}>
            <IconButton color="inherit" aria-label="Home" edge="start">
              <StarIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/podjs/podcast/:id">
            <PodcastDetail />
          </Route>
          <Route path="/podjs/favorites">
            <Favorites />
          </Route>
          <Route path="/podjs">
            <Dashboard />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default Navigator;
