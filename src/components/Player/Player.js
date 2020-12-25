/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import { LinearProgress } from '@material-ui/core';
import 'react-h5-audio-player/lib/styles.css';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const Player = () => {
  const [{ player }] = usePodcastsContext();
  const [loading, setLoading] = useState(false);

  const imageSize = () =>
    player.playing.image && player.playing.image.length ? '128px' : '0px';
  const imageMarginLeft = () => {
    if (window.innerWidth < 600) return '0px';
    return player.playing.image && player.playing.image.length
      ? '-20px'
      : '0px';
  };

  return (
    <div className="player-wrapper">
      <div
        className="player-image-wrapper"
        style={{
          width: imageSize(),
          minWidth: imageSize(),
          marginLeft: imageMarginLeft(),
        }}
      >
        <img src={player.playing.image} alt="" className="player-image" />
      </div>
      <div className="player-controls">
        <div className="player-title">{player.playing.title}</div>
        <AudioPlayer
          autoPlay
          src={player.playing.src}
          // onPlay={() => console.log('onPlay')}
          preload="metadata"
          onCanPlay={() => {
            setLoading(false);
          }}
          onPlay={() => {
            setLoading(true);
          }}
        />
        {loading ? (
          <div className="player-loader">
            <LinearProgress className="player-progress-bar" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Player;
