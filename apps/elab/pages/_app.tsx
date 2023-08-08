import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import localFont from 'next/font/local';

const Font = localFont({
  src: '../public/overpass.ttf',
  variable: '--font-base',
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${Font.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
