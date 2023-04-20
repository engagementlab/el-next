import React, { ReactNode } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Favicon } from '../favicon';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Layout = ({
  children,
  title,
  description,
}: Props): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      {/* Block indexing on non-prod */}
      {process.env.NODE_ENV !== 'production' && (
        <meta name="robots" content="noindex" />
      )}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <Favicon />
    </Head>

    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: 'linear' }}
    >
      {children}
    </motion.main>
  </div>
);
