/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { SwipeableDrawer } from "@material-ui/core";
import { observer } from "mobx-react";

import { Menu, Button, EpisodeListItem } from "..";

import { useStore } from "../../hooks";

import { MenuIcon } from "../svg";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const Playlist = (props) => {
  const store = useStore();

  return (
    <div className="playlist">
      <SwipeableDrawer
        anchor={"right"}
        open={store.PlayerStore.playlistIsOpen}
        onClose={() => store.PlayerStore.closePlaylist()}
      >
        <div className="playlist__content">
          {store.PlayerStore.playlist.map((episode) => (
            <div
              key={episode.title}
              onClick={() => store.PlayerStore.loadEpisode({ episode })}
            >
              <EpisodeListItem
                episode={episode}
                hightlighted={
                  store.PlayerStore.currentEpisode?.title === episode.title
                }
              />
            </div>
          ))}
        </div>
      </SwipeableDrawer>
    </div>
  );
};

Playlist.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.number,
    name: PropTypes.string,
    avatar_url: PropTypes.string,
  }),
};

export default observer(Playlist);
