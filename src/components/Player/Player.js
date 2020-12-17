/* eslint-disable react/prop-types */
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import usePodcastsContext from '../../hooks/usePodcastsContext';
import './styles.scss';

const PodcastCard = () => {
  const [{ player }] = usePodcastsContext();

  return (
    <div className="player-wrapper">
      <AudioPlayer
        autoPlay
        src={player.playing}
        onPlay={() => console.log('onPlay')}
        preload="metadata"
      />
    </div>
  );
};

export default PodcastCard;
