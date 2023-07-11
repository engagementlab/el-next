import React, { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Layout as SuperLayout } from '@el-next/components';
import { Breadcrumb, Theme } from '@/types';
import Header from './Header';
import { ParallaxProvider } from 'react-scroll-parallax';

type Props = {
  children: ReactNode;
  description?: string;
  title?: string;
  error?: any;
  theme?: Theme;
  breadcrumbs?: Breadcrumb[];
  fullBleed?: boolean;
  topBgElement?: JSX.Element;
};

const appName = 'Engagement Lab';
const defaultDescription = `${appName} is Emerson College's laboratory for collaborative learning, design, and research.`;

const Layout = ({
  children,
  title,
  description,
  error,
  theme,
  breadcrumbs,
  fullBleed,
  topBgElement,
}: Props): JSX.Element => {
  let currentBg =
    'bg-gradient-to-b from-red/[.2] via-green-blue/[.2] to-yellow/[.5]';
  if (theme === Theme.gunviolence)
    currentBg = 'bg-gradient-to-b from-[#E3BFFF] to-[#CC89FF]';
  if (theme === Theme.climate)
    currentBg = 'bg-gradient-to-b from-white to-green-blue';
  const BG = topBgElement ? topBgElement : <></>;

  return (
    <>
      <span
        className={`fixed top-0 bottom-0 w-1 md:w-16 ${currentBg} shadow-[inset_-14px_0_9px_-6px_rgba(0,0,0,0.1)]`}
        aria-hidden="true"
      ></span>
      {BG}
      <div className="relative md:mx-16">
        <Header theme={theme} />

        {/* Breadcrumbs layout */}
        {breadcrumbs && (
          <motion.div
            className="relative flex justify-center xl:justify-start mt-3 md:mx-14 lg:mx-16"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg width="100%" height="18" className="absolute">
              <rect y={6} width="100%" height="2" fill="#cbdce8" />
              <rect y={11} width="100%" height="2" fill="#cbdce8" />
              <rect y={16} width="100%" height="2" fill="#cbdce8" />
            </svg>
            <div className="absolute flex justify-center items-center px-6 xl:ml-6 bg-white">
              <svg viewBox="0 0 20 20" width="20" height="20" className="mr-1">
                <path
                  d="M 0 10 C 0 15.52 4.48 20 10 20 C 15.52 20 20 15.52 20 10 C 20 4.48 15.52 0 10 0 C 4.48 0 0 4.48 0 10 Z M 6.22 8.48 C 6.22 8.48 7.72 6.98 9.48 5.22 C 9.62 5.08 9.82 5 10 5 C 10.2 5 10.38 5.08 10.54 5.22 C 12.28 6.98 13.8 8.48 13.8 8.48 C 13.94 8.62 14 8.82 14 9 C 14 9.2 13.94 9.38 13.78 9.54 C 13.5 9.82 13.02 9.82 12.74 9.54 L 10.76 7.56 L 10.76 14.26 C 10.76 14.66 10.42 15 10 15 C 9.58 15 9.26 14.66 9.26 14.26 L 9.26 7.56 L 7.28 9.54 C 6.98 9.82 6.52 9.82 6.22 9.54 C 6.08 9.38 6 9.2 6 9 C 6 8.82 6.06 8.62 6.22 8.48 Z"
                  fill="#666666"
                ></path>
              </svg>
              {breadcrumbs?.map((breadcrumb) => {
                return (
                  <Link
                    href={breadcrumb.href}
                    key={breadcrumb.href}
                    className="text-lg"
                  >
                    {breadcrumb.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        <SuperLayout
          title={title ? `${appName} - ${title}` : appName}
          description={description ? description : defaultDescription}
          error={error}
          transitions={{
            variants: {
              hidden: { y: 10, opacity: 0 },
              enter: { y: 0, opacity: 1 },
              exit: { y: 10, opacity: 0 },
            },
            transition: {
              type: 'tween',
              // velocity: 200,
              duration: 0.4,
            },
          }}
        >
          <ParallaxProvider>
            <div
              className={`mt-14 mb-24 xl:mt-16 px-1 ${
                !fullBleed ? 'md:px-20 xl:px-24' : 'md:px-0'
              }`}
            >
              {children}
            </div>
          </ParallaxProvider>
        </SuperLayout>
      </div>
      <span
        className={`fixed top-0 bottom-0 right-0 w-1 md:w-16 ${currentBg} shadow-[inset_14px_0_9px_-6px_rgba(0,0,0,0.1)]`}
        aria-hidden="true"
      ></span>
    </>
  );
};
export default Layout;
