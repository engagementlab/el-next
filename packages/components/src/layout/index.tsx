import React, { ReactNode } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Modal, Box } from '@mui/material';
import { Favicon } from '../favicon';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  error?: {
    message: string;
  };
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
  if (error && error.message) {
    {
      if (error.message.indexOf('ECONNREFUSED') > -1)
        errorHelper +=
          'It is most likely that the CMS is currently unavailable. Please try again.';
      else if (error.message.toLowerCase().indexOf('syntax') > -1)
        errorHelper =
          'It is looks like there is a syntax error in the query. This is a bug in code.';
    }
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
