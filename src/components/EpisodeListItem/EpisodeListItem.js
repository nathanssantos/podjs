/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

import { Button } from "..";

import Episode from "../../stores/models/Episode";

import "./styles.scss";

const EpisodeListItem = (props) => {
  const { episode, onClick } = props;

  const { title, image, pubDate, link, content, mediaUrl, length } = episode;

  return (
    <Button className="episode-list__item" onClick={onClick}>
      <div className="episode-list__item__image">
        <img src={image} />
      </div>
      <div className="episode-list__item__text">
        <div className="episode-list__item__title">{title}</div>
        <p
          className="episode-list__item__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Button>
  );
};

EpisodeListItem.propTypes = {
  episode: PropTypes.instanceOf(Episode),
  onClick: PropTypes.func.isRequired,
};

export default observer(EpisodeListItem)
