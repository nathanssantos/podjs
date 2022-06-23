import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import 'react-h5-audio-player/lib/styles.css';

import Layout from '../components/Layout';
import RootStore, { RootStoreProvider } from '../stores/rootStore';
import theme from '../theme/theme';

const store = new RootStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootStoreProvider value={store}>
      <ChakraProvider theme={theme}>
        <ColorModeProvider>
          <Layout />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </RootStoreProvider>
  );
}

export default MyApp;
