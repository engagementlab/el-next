import React, { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { ImageUrl, Layout as SuperLayout } from '@el-next/components';
import { Breadcrumb, CustomEase, DefaultOGImageOptions, Theme } from '@/types';
import Header from './Header';
import { ParallaxProvider } from 'react-scroll-parallax';
import Footer from './Footer';
import { useRouter } from 'next/router';

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
  'Advancing peace, equity, and justice through collaborative design and storytelling.';
const DefaultOGImageId = 'elab-home-v3.x/about/cllz9l8bn00036gk2gnbddzl8';

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
  return (
    <>
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
              exit: { y: 10, opacity: 0 },
            },
            transition: {
              type: 'tween',
              duration: 0.4,
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
