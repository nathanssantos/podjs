/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import H5AudioPlayer from "react-h5-audio-player";

import * as Theme from "../../constants/Theme";

import "./styles.scss";

const AudioPlayer = (props) => {
  // const { icon, title, description, button } = props;

  const audioPlayerClassNames = () => {
    let classNames = "audio-player";
    return classNames;
  };

  return (
    <div className={audioPlayerClassNames()}>
      <div className="audio-player__image">
        <img src="https://is5-ssl.mzstatic.com/image/thumb/Podcasts115/v4/24/70/f4/2470f4fb-0157-9b11-9e05-7646f0f8eb0b/mza_15146351891494261154.jpg/600x600bb.jpg" />
      </div>
      <div className="audio-player__player">
        <H5AudioPlayer
          // autoPlay
          src="https://nerdcast.jovemnerd.com.br/mamicas_38.mp3"
          showFilledVolume
          autoPlayAfterSrcChange
          onPlay={(e) => console.log("onPlay")}
        />
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

export default AudioPlayer;
