import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Transition, Variants, motion } from 'framer-motion';
import { Favicon } from '../favicon';
import { TError } from '../query';
import { ErrorClass } from '..';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  error?: TError;
  transitions?: { variants: Variants; transition?: Transition };
};

const defaultPgTransitions = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

export const Layout = ({
  children,
  title,
  description,
  error,
  transitions,
}: Props): JSX.Element => {
  const variants =
    transitions && transitions.variants
      ? transitions.variants
      : defaultPgTransitions;
  const transition =
    transitions && transitions.transition
      ? transitions.transition
      : { type: 'linear' };
  let errorHelper =
    "Sorry, we're unable to retrieve content at this time due to a connection error. ";
  if (error) {
    if (error.class === ErrorClass.noconnection)
      errorHelper +=
        '🔌 It is most likely that the CMS is currently unavailable. Please try again.';
    else if (error.class === ErrorClass.syntax)
      errorHelper =
        'It looks like there is a syntax error in the query. 🐛 This is a bug in code.';
    else if (error.class === ErrorClass.empty)
      errorHelper = `One or more of the required content fields on this page is missing. "(${error.message})"`;
    else if (error.class === ErrorClass.client)
      errorHelper = `There is an error on the client query. 🐛 This is a bug in code. \n\n 💬 The API says: ${error.message}"`;
    else errorHelper += '. Please try again.  🤨 ';
  }
  return (
    <>
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
      {error && process.env.NODE_ENV !== 'production' ? (
        <div className="m-40 p-10 border-4 border-[#00ab9e]">
          <svg viewBox="0 0 50 50" className="max-w-[105px]">
            <circle style={{ fill: '#D75A4A' }} cx="25" cy="25" r="25" />
            <polyline
              style={{
                fill: 'none',
                stroke: '#FFFFFF',
                strokeWidth: 2,
                strokeLinecap: 'round',
                strokeMiterlimit: 10,
              }}
              points="16,34 25,25 34,16 
	"
            />
            <polyline
              style={{
                fill: 'none',
                stroke: '#FFFFFF',
                strokeWidth: 2,
                strokeLinecap: 'round',
                strokeMiterlimit: 10,
              }}
              points="16,16 25,25 34,34 
	"
            />
          </svg>
          <h2 className="text-4xl font-bold">Content Error</h2>
          {errorHelper}
          <hr />

          <img
            src="https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,f_auto,w_150/v1682526632/github/logo-api.png"
            className="max-w-[150px]"
          />
        </div>
      ) : (
        <motion.main
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={transition}
        >
          {children}
        </motion.main>
      )}
    </>
  );
};
