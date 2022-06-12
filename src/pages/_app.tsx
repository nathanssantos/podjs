import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import RootStore, { RootStoreProvider } from '../stores/rootStore';
import theme from '../theme/theme';

const store = new RootStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootStoreProvider value={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RootStoreProvider>
  );
}

export default MyApp;
