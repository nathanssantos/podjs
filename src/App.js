import React from 'react';
import DarkThemeProvider from './components/DarkThemeProvider/DarkThemeProvider';
import Navigator from './components/Navigator/Navigator';
import TopPodcastsProvider from './contexts/TopPodcasts/provider';

const App = () => (
  <div className="App">
    <TopPodcastsProvider>
      <DarkThemeProvider>
        <Navigator />
      </DarkThemeProvider>
    </TopPodcastsProvider>
  </div>
);

export default App;
