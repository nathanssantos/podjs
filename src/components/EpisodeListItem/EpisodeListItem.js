/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { Button, Text } from "..";

import Episode from "../../stores/models/Episode";

import { PlayArrow, PlaylistAdd } from "@material-ui/icons";

import "./styles.scss";

const EpisodeListItem = (props) => {
  const { episode, hightlighted, onClickPlay, onClickAddToPlaylist } = props;

  const { title, image, pubDate, link, content, mediaUrl, length } = episode;

  return (
    <div className={`episode-list__item${hightlighted ? " highlighted" : ""}`}>
      <div className="episode-list__item__display">
        <div className="episode-list__item__image">
          <img src={image} />
        </div>
        <div className="episode-list__item__actions">
          <Button onClick={onClickPlay}>
            <PlayArrow />
          </Button>
          <Button onClick={onClickAddToPlaylist}>
            <PlaylistAdd />
          </Button>
        </div>
      </div>
      <div className="episode-list__item__text">
        <Text className="episode-list__item__title" variant="h6">
          {title}
        </Text>
        <p
          className="episode-list__item__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

EpisodeListItem.propTypes = {
  episode: PropTypes.instanceOf(Episode),
  hightlighted: PropTypes.bool,
  onClickPlay: PropTypes.func,
  onClickAddToPlaylist: PropTypes.func,
};

export default observer(EpisodeListItem);
