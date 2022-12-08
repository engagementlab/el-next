'use client'; 

import '../styles/globals.scss'
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head'

import { Work_Sans, Overpass } from '@next/font/google'

import { Favicon } from '@el-next/components/favicon';

import Header from '../components/Header'
import Footer from '../components/Footer';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AnimatePresence } from 'framer-motion';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
})

const overpass = Overpass({
  subsets: ['latin'],
  variable: '--font-overpass',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <div>
        <Head>
          <title>Social Justice + Media Symposium</title>
          {/* Block indexing on non-prod */}
          {process.env.NODE_ENV !== 'production' && <meta name="robots" content="noindex" />}
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Social Justice + Media Symposium annually convenes students, faculty, activists, scholars, and storytellers to explore how media pedagogies and practices can support more just and equitable civic futures. The symposium provides space for emerging storytellers from universities around the world to create networks that advocate for the media and civic systems that best reflect equitable and vibrant societies. Each spring, SJ+M presents the transformative media literacy scholar award, which provides support for social justice media projects, and access to networks of fellow practitioners and teachers. " />
          <Favicon />
        </Head>
      </div>
      <main className={`w-full mb-24 ${workSans.variable} ${overpass.variable} font-sans`}>
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
