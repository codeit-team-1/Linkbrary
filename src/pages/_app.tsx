import { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Layout } from '@/components';
import { AuthProvider, ModalProvider } from '@/lib/context';

import '@/styles/globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ThumbnailImage from '@/assets/images/sharingDefaultImage.png';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>Linkbrary</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="나만의 링크를 관리하는 Linkbrary" />
        <meta property="og:title" content="Linkbrary" />
        <meta
          property="og:description"
          content="나만의 링크를 관리하는 Linkbrary"
        />
        <meta property="og:image" content={ThumbnailImage.src} />
        <meta property="og:url" content="" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ModalProvider>
            <AuthProvider>
              <Layout>
                <div className="min-h-custom-footer-height">
                  <Component {...pageProps} />
                </div>
              </Layout>
            </AuthProvider>
          </ModalProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
};

export default App;
