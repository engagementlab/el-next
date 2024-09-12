import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { cubicBezier, motion } from 'framer-motion';

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
  'Advancing peace, equity, and justice through collaborative design, storytelling, and research.';
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

  const [isHomePage, setIsHomePage] = useState(false);
  const [farewellDismissed, setFarewellDismissed] = useState(false);

  useEffect(() => {
    if (currentUrl === '/') setIsHomePage(true);
  });
  return (
    <>
      {isHomePage && !farewellDismissed && (
        <>
          <div className="fixed top-0 bottom-0 z-[90] w-full h-full bg-black/50"></div>
          <div className="absolute top-0 md:top-1/4 bottom-0 md:bottom-auto p-8 md:px-20 xl:px-32 z-[100] w-full h-full md:h-auto bg-white">
            <h1 className="font-extrabold text-3xl md:text-5xl mb-3">
              The Engagement Lab will be closing its doors this fall.
              <br />
              We invite you to&nbsp;.&nbsp;.&nbsp;.
            </h1>
            <ul className="list-none font-medium md:text-2xl lg:mt-8 md:ml-3 lg:ml-5">
              <li>
                <svg
                  viewBox="9 6.998 17 24.286"
                  width="17"
                  height="24.286"
                  className="inline scale-50 fill-red md:scale-100 md:mr-3"
                >
                  <path d="M 11.941 7.379 C 11.596 7.117 11.215 6.998 10.831 6.998 C 9.891 6.998 9 7.741 9 8.817 L 9 29.462 C 9 30.543 9.894 31.284 10.831 31.284 C 11.217 31.284 11.601 31.162 11.946 30.898 C 15.72 27.976 22.141 23 25.293 20.557 C 25.74 20.212 26 19.682 26 19.119 C 26 18.56 25.738 18.029 25.293 17.684 C 22.136 15.25 15.71 10.291 11.941 7.379 Z"></path>
                </svg>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdflgbPiqz7fZM8f5GJAFPy10V82HvKDsgv49daI4hx4LPA2Q/viewform"
                  target="_blank"
                  className="text-red border-red border-b-2 font-bold hover:border-0"
                >
                  RSVP
                </a>
                &nbsp;to our farewell toast on the evening of October 9, 2024
              </li>
              <li className="mt-3">
                <svg
                  viewBox="9 6.998 17 24.286"
                  width="17"
                  height="24.286"
                  className="inline scale-50 fill-yellow md:scale-100 md:mr-3"
                >
                  <path d="M 11.941 7.379 C 11.596 7.117 11.215 6.998 10.831 6.998 C 9.891 6.998 9 7.741 9 8.817 L 9 29.462 C 9 30.543 9.894 31.284 10.831 31.284 C 11.217 31.284 11.601 31.162 11.946 30.898 C 15.72 27.976 22.141 23 25.293 20.557 C 25.74 20.212 26 19.682 26 19.119 C 26 18.56 25.738 18.029 25.293 17.684 C 22.136 15.25 15.71 10.291 11.941 7.379 Z"></path>
                </svg>
                <a
                  href="https://mailchi.mp/emerson/elab-toast"
                  target="_blank"
                  className="text-yellow border-yellow border-b-2 font-bold hover:border-0"
                >
                  Read the letter
                </a>
                &nbsp;to our communities reflecting on our 14 years at Emerson
              </li>
              <li className="mt-3">
                <svg
                  viewBox="9 6.998 17 24.286"
                  width="17"
                  height="24.286"
                  className="inline scale-50 fill-green-blue md:scale-100 md:mr-3"
                >
                  <path d="M 11.941 7.379 C 11.596 7.117 11.215 6.998 10.831 6.998 C 9.891 6.998 9 7.741 9 8.817 L 9 29.462 C 9 30.543 9.894 31.284 10.831 31.284 C 11.217 31.284 11.601 31.162 11.946 30.898 C 15.72 27.976 22.141 23 25.293 20.557 C 25.74 20.212 26 19.682 26 19.119 C 26 18.56 25.738 18.029 25.293 17.684 C 22.136 15.25 15.71 10.291 11.941 7.379 Z"></path>
                </svg>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfVSTPWRZvAozw2B2XZkH4yV2WAJZ-NgfDePX9JENDr_BAGIw/viewform"
                  className="text-green-blue border-green-blue border-b-2 font-bold hover:border-0"
                >
                  Share your ELab stories
                </a>
                , memories, thoughts, or provocations with us
              </li>
            </ul>
            <div
              className="flex flex-row justify-center my-8 cursor-pointer group"
              onClick={() => setFarewellDismissed(true)}
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
                className={`group-hover:scale-125 duration-300 ${CustomEase}`}
              >
                <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z" />
              </svg>
              &nbsp;
              <span className="opacity-50 group-hover:opacity-100 transition-all">
                Dismiss this message
              </span>
            </div>
          </div>
        </>
      )}
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
