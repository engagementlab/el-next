import React, { ReactNode } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Favicon } from '../favicon';
import { TError } from '../query';
import { ErrorClass } from '..';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  error?: TError;
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
  error,
}: Props): JSX.Element => {
  let errorHelper =
    "Sorry, we're unable to retrieve content at this time due to a connection error. ";
  if (error) {
    console.log(error);
    if (error.class === ErrorClass.noconnection)
      errorHelper +=
        'It is most likely that the CMS is currently unavailable. Please try again.';
    else if (error.class === ErrorClass.syntax)
      errorHelper =
        'It looks like there is a syntax error in the query. This is a bug in code.';
    else if (error.class === ErrorClass.empty)
      errorHelper = `One or more of the required content fields on this page is missing. "(${error.message})"`;
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
      {error ? (
        <div className="m-40">
          {/* <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box> */}
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
          {/* </Box>
        </Modal> */}
          {/* <Button onClick={resetErrorBoundary}>Reload the Page</Button> */}
        </div>
      ) : (
        <motion.main
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: 'linear' }}
        >
          {children}
        </motion.main>
      )}
    </>
  );
};
