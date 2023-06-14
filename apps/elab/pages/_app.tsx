import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import Footer from '../components/Footer';
import { Overpass } from 'next/font/google';

const baseFount = Overpass({
  subsets: ['latin'],
  variable: '--font-base',
});
1;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${baseFount.variable} font-sans`}>
      <Component {...pageProps} />

      <Footer />
    </div>
  );
}
