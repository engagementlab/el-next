import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AnimatePresence,
  cubicBezier,
  motion,
  SVGMotionProps,
  useCycle,
} from 'framer-motion';

import { ImageUrl, Layout as SuperLayout } from '@el-next/components';
import { Breadcrumb, CustomEase, DefaultOGImageOptions, Theme } from '@/types';
import Header from './Header';
import { ParallaxProvider } from 'react-scroll-parallax';
import Footer from './Footer';
import { useRouter } from 'next/router';
import useStore from '@/useStore';
import { useBannerStore } from '@/bannerStore';

type Props = {
  children: ReactNode;
  description?: string;
  title?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageId?: string;
  error?: any;
  theme?: Theme;
  breadcrumbs?: Breadcrumb[];
  fullBleed?: boolean;
  topBgElement?: JSX.Element;
};

const appName = 'Engagement Lab';
const defaultDescription =
  'Advancing peace, equity, and justice through collaborative design, storytelling, and research.';
const DefaultOGImageId = 'elab-home-v3.x/about/cllz9l8bn00036gk2gnbddzl8';
const Path = (
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>
) => (
  <motion.path
    className="origin-center"
    fill="transparent"
    strokeWidth="5"
    strokeLinecap="square"
    {...props}
  />
);

const MenuToggle = ({ toggle, hover, isHover, clicked }: any) => {
  const currentState = () => {
    if (isHover) return 'hover';
    return 'closed';
  };
  return (
    <motion.button
      onMouseUp={() => clicked()}
      onTap={toggle}
      onHoverStart={hover}
      onHoverEnd={hover}
      whileTap={{
        scale: 1.2,
        transition: {
          ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
          duration: 0.3,
        },
      }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      className="relative z-50"
      aria-label="Close Top Banner"
    >
      <svg width="75" height="75" viewBox="0 0 75 75">
        <Path
          d="M 25 33 L 60 33"
          stroke="#FF0001"
          animate={currentState()}
          variants={{
            closed: {
              rotate: '-45deg',
              translateY: '10px',
            },
            hover: {
              rotate: '-42deg',
              translateY: '10px',
              scale: 1.23,
            },
          }}
          transition={{
            duration: 0.2,
            ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
          }}
        />
        <Path
          d="M 25 57 L 60 57"
          animate={currentState()}
          stroke="#FF0001"
          variants={{
            closed: { rotate: '45deg', translateY: '-13px' },
            hover: { rotate: '45deg', translateY: '-13px', scale: 1.23 },
          }}
          transition={{
            duration: 0.75,
            delay: 0.051,
            ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
          }}
        />
      </svg>
    </motion.button>
  );
};
const Layout = ({
  children,
  title,
  description,
  error,
  theme,
  breadcrumbs,
  fullBleed,
  topBgElement,

  ogTitle,
  ogDescription,
  ogImageId,
}: Props): JSX.Element => {
  const BG = topBgElement ? topBgElement : <></>;
  const GutterBGClasses = [
    'bg-gradient-to-b from-red/[.2] via-green-blue/[.2] to-yellow/[.5]',
    'bg-gradient-to-b from-[#E3BFFF] to-[#CC89FF]',
    'bg-gradient-to-b from-[#D7EFC1] to-leaf',
  ];
  const router = useRouter();
  const currentUrl = router.asPath;

  const [menuButtonHover, toggleMenuHover] = useCycle(false, true);
  const store = useStore(useBannerStore, (state) => state);

  return (
    <>
      <AnimatePresence mode="wait">
        {store?.bannerVisible && (
          <>
            <motion.div
              className="fixed top-0 z-[90] w-full h-3/4 bg-gradient-to-b from-[#fabc71]"
              animate={{
                opacity: 1,
                height: '100%',
                transition: {
                  ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
                  duration: 1.75,
                },
              }}
              initial={{ opacity: 0, height: 0 }}
              exit={{ opacity: 0, height: '100%' }}
              transition={{ type: 'tween', delay: 0.3 }}
            ></motion.div>
            <motion.header
              role="banner"
              className="fixed top-0 z-[100] w-full h-auto bg-white"
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
                  duration: 0.75,
                },
              }}
              initial={{ opacity: 0, y: '-100%' }}
              exit={{ opacity: 0, y: '-150%' }}
              transition={{ type: 'tween' }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between p-8 md:px-10 xl:px-20 ">
                <div>
                  <h1 className="font-extrabold uppercase text-xl md:text-2xl text-red mb-3">
                    This Website Is An Archive, As Of October 2024.
                  </h1>
                  <h2 className="text-gray-600 text-base">
                    The Engagement Lab at Emerson College has closed its doors.{' '}
                    <Link
                      href="https://elab.emerson.edu/news/read-the-report-detailing-the-elabs-final-chapter/"
                      className="text-red font-bold border-b-2 hover:border-b-0"
                    >
                      Read the report
                    </Link>{' '}
                    detailing the ELab’s final chapter, or{' '}
                    <a
                      href="#"
                      onClick={() => store?.hideBanner()}
                      className="text-red font-bold border-b-2 hover:border-b-0"
                    >
                      dismiss this message
                    </a>{' '}
                    to explore the archive.
                  </h2>
                </div>
                <MenuToggle
                  clicked={() => store?.hideBanner()}
                  hover={() => toggleMenuHover()}
                  isHover={menuButtonHover}
                />
              </div>
              <div>
                <hr className="h-1 border-none w-full bg-red" />
                <hr className="h-1 my-1 border-none w-full bg-green-blue" />
                <hr className="h-1 border-none w-full bg-yellow" />
              </div>
            </motion.header>
          </>
        )}
      </AnimatePresence>
      <span
        className={`fixed top-0 bottom-0 w-1 md:w-16 shadow-[inset_-14px_0_9px_-6px_rgba(0,0,0,0.1)] ${
          GutterBGClasses[theme || 0]
        }`}
        aria-hidden="true"
      ></span>
      {BG}
      <div className="relative md:mx-16">
        <Header theme={theme || 0} />

        {/* Breadcrumbs layout */}
        {breadcrumbs && (
          <motion.div
            className="relative flex justify-center xl:justify-start ml-1 md:ml-0 mt-5 lg:mt-6 lg:mb-20"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg width="100%" height="18" className="absolute">
              <rect y={6} width="100%" height="2" fill="#cbdce8" />
              <rect y={11} width="100%" height="2" fill="#cbdce8" />
              <rect y={16} width="100%" height="2" fill="#cbdce8" />
            </svg>
            <div className="absolute flex justify-center items-center px-6 xl:ml-12 bg-white">
              {breadcrumbs?.map((breadcrumb) => {
                return (
                  <Link
                    href={breadcrumb.href}
                    key={breadcrumb.href}
                    className="flex flex-row items-center group"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      width="20"
                      height="20"
                      className={`mr-1 transition-all group-hover:-translate-y-1 group-hover:opacity-40 ${CustomEase}`}
                    >
                      <path
                        d="M 0 10 C 0 15.52 4.48 20 10 20 C 15.52 20 20 15.52 20 10 C 20 4.48 15.52 0 10 0 C 4.48 0 0 4.48 0 10 Z M 6.22 8.48 C 6.22 8.48 7.72 6.98 9.48 5.22 C 9.62 5.08 9.82 5 10 5 C 10.2 5 10.38 5.08 10.54 5.22 C 12.28 6.98 13.8 8.48 13.8 8.48 C 13.94 8.62 14 8.82 14 9 C 14 9.2 13.94 9.38 13.78 9.54 C 13.5 9.82 13.02 9.82 12.74 9.54 L 10.76 7.56 L 10.76 14.26 C 10.76 14.66 10.42 15 10 15 C 9.58 15 9.26 14.66 9.26 14.26 L 9.26 7.56 L 7.28 9.54 C 6.98 9.82 6.52 9.82 6.22 9.54 C 6.08 9.38 6 9.2 6 9 C 6 8.82 6.06 8.62 6.22 8.48 Z"
                        fill="#666666"
                      ></path>
                    </svg>
                    <span className="text-lg opacity-40 font-extrabold">
                      {breadcrumb.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        <SuperLayout
          title={
            title
              ? `${
                  process.env.NEXT_PUBLIC_STAGING === 'true' ? '(QA)' : ''
                } ${title} - ${appName}`
              : appName
          }
          ogTitle={ogTitle}
          description={description ? description : defaultDescription}
          ogDescription={ogDescription ? ogDescription : defaultDescription}
          ogUrl={`https://elab.emerson.edu${currentUrl}`}
          ogImage={ImageUrl({
            // Fallback for OG image
            ...{ imgId: ogImageId || DefaultOGImageId },
            ...DefaultOGImageOptions,
          })}
          error={error}
          transitions={{
            variants: {
              hidden: { y: 10, opacity: 0 },
              enter: { y: 0, opacity: 1 },
              exit: { y: 50, opacity: 0 },
            },
            transition: {
              type: 'tween',
              duration: 0.8,
              ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
            },
          }}
        >
          <ParallaxProvider>
            <div
              id="layout-daddy"
              className={`${
                !fullBleed ? 'md:px-20 xl:px-24' : 'md:px-0'
              } mt-14 min-h-[500px]`}
            >
              {children}
            </div>
          </ParallaxProvider>
        </SuperLayout>
        <Footer />
      </div>
      <span
        className={`fixed top-0 bottom-0 right-0 w-1 md:w-16 shadow-[inset_14px_0_9px_-6px_rgba(0,0,0,0.1)] ${
          GutterBGClasses[theme || 0]
        }`}
        aria-hidden="true"
      ></span>
    </>
  );
};
export default Layout;
