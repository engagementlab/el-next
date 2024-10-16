import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import localFont from 'next/font/local';
import Script from 'next/script';

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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-D6D88X0NF6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-D6D88X0NF6');
        `}
      </Script>

      <Component {...pageProps} />
    </div>
  );
}
