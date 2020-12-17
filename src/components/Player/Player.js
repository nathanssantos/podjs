/* eslint-disable react/prop-types */
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const PodcastCard = () => {
  const [{ player }] = usePodcastsContext();

  const imageSize = () => (player.playing.image.length ? '100px' : '0px');

  return (
    <div className="player-wrapper">
      <div
        className="player-image-wrapper"
        style={{
          width: imageSize(),
          minWidth: imageSize(),
        }}
      >
        <img src={player.playing.image} alt="" className="player-image" />
      </div>

      <AudioPlayer
        autoPlay
        src={player.playing.src}
        // onPlay={() => console.log('onPlay')}
        preload="metadata"
      />
    </div>
  );
};

export default PodcastCard;
