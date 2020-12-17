import React from 'react';
import DarkThemeProvider from './components/DarkThemeProvider/DarkThemeProvider';
import Navigator from './components/Navigator/Navigator';
import Player from './components/Player/Player';
import PodcastsProvider from './contexts/Podcasts/provider';

const App = () => (
  <div className="App">
    <PodcastsProvider>
      <DarkThemeProvider>
        <Navigator />
        <Player />
      </DarkThemeProvider>
    </PodcastsProvider>
  </div>
);

export default App;
