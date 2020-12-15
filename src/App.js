import React from 'react';
import DarkThemeProvider from './components/DarkThemeProvider/DarkThemeProvider';
import Drawer from './layout/Drawer/Drawer';

const App = () => (
  <div className="App">
    <DarkThemeProvider>
      <Drawer />
    </DarkThemeProvider>
  </div>
);

export default App;
