import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import localFont from 'next/font/local';

const overpassFont = localFont({
  src: '../public/overpass.ttf',
  variable: '--font-base',
  //     style: 'normal',
  //   },
  //   {
  //     path: './overpass-italic.ttf',
  //     style: 'italic',
  //   },
  // ],
});
1;
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${overpassFont.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
