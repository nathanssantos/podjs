import React from 'react';
import DarkThemeProvider from './components/DarkThemeProvider/DarkThemeProvider';
import Navigator from './components/Navigator/Navigator';
import PodcastsProvider from './contexts/Podcasts/provider';

const App = () => (
  <div className="App">
    <PodcastsProvider>
      <DarkThemeProvider>
        <Navigator />
      </DarkThemeProvider>
    </PodcastsProvider>
  </div>
);

export default App;
