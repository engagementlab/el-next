import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen mb-24 font-sans scroll-smooth">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
