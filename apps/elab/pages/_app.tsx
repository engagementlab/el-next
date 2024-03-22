import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import localFont from 'next/font/local';

const Font = localFont({
  src: [
    { path: '../public/overpass.ttf' },
    { path: '../public/overpass-italic.ttf', style: 'italic' },
  ],
  variable: '--font-base',
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${Font.variable} font-sans list-disc list-inside`}>
      <Component {...pageProps} />
    </div>
  );
}
