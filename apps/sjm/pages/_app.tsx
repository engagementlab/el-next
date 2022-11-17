'use client'; 

import '../styles/globals.scss'
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head'

import { Work_Sans } from '@next/font/google'

import { Favicon } from '@el-next/components/favicon';

import Header from '../components/Header'
import Footer from '../components/Footer';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence } from 'framer-motion';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div>
        <Head>
          {/* <title>Transforming Narratives of Gun Violence</title> */}
          {/* Block indexing on non-prod */}
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Transforming Narratives of Gun Violence is a multi-year initiative at Emerson in collaboration with the MGH Center for Gun Violence Prevention and the Louis D. Brown Peace Institute." />
          <Favicon />
        </Head>
      </div>
      <main className={`w-full mb-24 ${workSans.variable} font-sans`}>
        <Header />
        <ParallaxProvider>
          <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                    onExitComplete={() => window.scrollTo(0, 0)}>

            <Component {...pageProps} />
          </AnimatePresence>
        </ParallaxProvider>
      </main>
      <Footer />
    </div>
  )
}

export default App
