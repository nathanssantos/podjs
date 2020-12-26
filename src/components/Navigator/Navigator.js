/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Paper,
  InputBase,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';

import Home from '../../screens/Home/Home';
import PodcastDetail from '../../screens/PodcastDetail/PodcastDetail';
import Favorites from '../../screens/Favorites/Favorites';
import SearchResult from '../../screens/SearchResult/SearchResult';
import useStyles from './styles';

const Navigator = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [searchKey, setSearchKey] = useState('');

  const isHome =
    location.pathname === '/podjs' || location.pathname === '/podjs/';
  const isFavorites = location.pathname.includes('favorites');

  const handleEnter = (event) => {
    if (event.key === 'Enter') history.push(`/podjs/search/${searchKey}`);
  };

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
          <Paper className={classes.search}>
            <InputBase
              onKeyDown={handleEnter}
              className={classes.searchInput}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              onInput={(event) => {
                setSearchKey(event.target.value);
              }}
            />
            <Link to={`/podjs/search/${searchKey}`}>
              <IconButton
                className={classes.searchIconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Link>
          </Paper>
          {isFavorites ? null : (
            <Link to="/podjs/favorites" className={classes.favoriteButton}>
              <IconButton color="inherit" aria-label="Home" edge="start">
                <StarIcon />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/podjs/podcast/:id">
            <PodcastDetail />
          </Route>
          <Route path="/podjs/search/:key">
            <SearchResult />
          </Route>
          <Route path="/podjs/favorites">
            <Favorites />
          </Route>
          <Route path="/podjs">
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default Navigator;
