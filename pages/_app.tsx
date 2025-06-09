import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { recipesData } from '@/data/recipes';
import { loadInitialData } from '@/store/recipeSlice';
import { SnackbarProvider } from 'notistack';

function Initializer() {
  useEffect(() => {
    store.dispatch(loadInitialData(recipesData));
  }, []);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
      >
        <Head>
          <title>Cook Book</title>
          <meta name="description" content="cook book app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Initializer />
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  );
}
