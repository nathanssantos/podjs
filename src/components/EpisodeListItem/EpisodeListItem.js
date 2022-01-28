/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { PlayArrow, PlaylistAdd } from "@material-ui/icons";

import { Button } from "..";

import Episode from "../../stores/models/Episode";

import { useStore } from "../../hooks";

import "./styles.scss";

const EpisodeListItem = (props) => {
  const store = useStore();

  const { episode, onClickPlay, onClickAddToPlaylist } = props;

  const { title, image, pubDate, link, content, mediaUrl, duration } = episode;

  const highlighted = store.PlayerStore.currentEpisode?.title === title;

  return (
    <div className={`episode-list__item${highlighted ? " highlighted" : ""}`}>
      <div className="episode-list__item__display">
        <div className="episode-list__item__image">
          <img src={image} />
        </div>
      </div>
      <div className="episode-list__item__text">
        <div className="episode-list__item__title">{title}</div>
        <div className="episode-list__item__duration">{duration}</div>
        {/* <p
          className="episode-list__item__content"
          dangerouslySetInnerHTML={{ __html: content }}
        /> */}
      </div>
      <div className="episode-list__item__actions">
        <Button onClick={onClickAddToPlaylist}>
          <PlaylistAdd />
        </Button>
        <Button onClick={onClickPlay}>
          <PlayArrow />
        </Button>
      </div>
    </div>
  );
};

EpisodeListItem.propTypes = {
  episode: PropTypes.instanceOf(Episode),
  onClickPlay: PropTypes.func,
  onClickAddToPlaylist: PropTypes.func,
};

export default observer(EpisodeListItem);
