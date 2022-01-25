/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import H5AudioPlayer from "react-h5-audio-player";
import { observer } from "mobx-react";

import { Text } from "..";

import * as Theme from "../../constants/Theme";

import { useStore } from "../../hooks";

import "./styles.scss";

const AudioPlayer = () => {
  const store = useStore();
  const currentEpisode = store.PlayerStore.currentEpisode;

  const audioPlayerClassNames = () => {
    let classNames = "audio-player";
    if (currentEpisode) classNames += " open";
    return classNames;
  };

  const previous = () => {
    store.PlayerStore.playPreviousPlaylistEpisode();
  };

  const next = () => {
    store.PlayerStore.playNextPlaylistEpisode();
  };

  return (
    <div className={audioPlayerClassNames()}>
      {currentEpisode?.image ? (
        <div className="audio-player__image">
          <img src={currentEpisode?.image} />
        </div>
      ) : null}
      <div className="audio-player__body">
        <div className="audio-player__title">
          <Text>{currentEpisode?.title}</Text>
        </div>
        <div className="audio-player__player">
          <H5AudioPlayer
            src={currentEpisode?.mediaUrl}
            onClickPrevious={previous}
            onClickNext={next}
            showFilledVolume
            showSkipControls
            autoPlayAfterSrcChange
          />
        </div>
      </div>
    </div>
  );
};

// AudioPlayer.propTypes = {
//   icon: PropTypes.node,
//   title: PropTypes.string,
//   description: PropTypes.string,
//   button: PropTypes.node,
// };

// AudioPlayer.defaultProps = {
//   icon: <EmptyStateSearchIcon />,
//   title: "Nenhum evento foi encontrado.",
//   description: "",
//   button: null,
// };

export default observer(AudioPlayer);
