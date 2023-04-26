import '../styles/globals.css';

import React from 'react';
import type { AppProps } from 'next/app';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';

// import { ErrorBoundary } from 'react-error-boundary';
// import { AppErrorFallback } from '../components/ErrorBoundary';
// import Error from 'next/error';

function App({ Component, pageProps }: AppProps) {
  return (
    <main className="w-full mb-24 font-sans scroll-smooth">
      <Header />
      {/* <ErrorBoundary
        onError={(error, info) => {}}
        fallbackRender={(fallbackProps) => {
          return <AppErrorFallback {...fallbackProps} />;
        }}
      > */}
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
      {/* </ErrorBoundary> */}
      <Footer />
    </main>
  );
}

export default App;
