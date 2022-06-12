import type { AppProps } from 'next/app';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import RootStore, { RootStoreProvider } from '../stores/rootStore';
import theme from '../theme/theme';
import Layout from '../components/Layout';

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
