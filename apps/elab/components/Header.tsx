// 'use client';
import * as React from 'react';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import _ from 'lodash';
import { create } from 'zustand';
import { useEffect } from 'react';

import {
  AnimatePresence,
  MotionValue,
  Variants,
  cubicBezier,
  motion,
  useCycle,
} from 'framer-motion';

import { MenuToggle } from './MenuToggle';
import { useScrollBlock } from './scrollBlock';
import { Theme } from '@/types';

interface NavLink {
  enabled?: boolean;
  label: string;
  url?: string;
  href?: string;
  subLinks?: NavLink[];
}

type Props = {
  theme?: Theme;
};

const sidebar: Variants = {
  open: (height = 1000) => ({
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
      duration: 0.1,
      type: 'spring',
    },
  }),
  closed: {
    // clipPath: 'circle(20px at 263px 60px)',
    transition: {
      delay: 0.1,
      duration: 0.1,
      staggerChildren: 0.2,
      staggerDirection: -1,
      type: 'spring',
      // stiffness: 400,
      damping: 40,
    },
  },
};
const navItemsVariants: Variants = {
  open: {
    display: 'block',
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    display: 'none',
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.15,
      // y: { stiffness: 1000 },
    },
  },
  hover: {
    scale: 1.03,
  },
};
const subMenuAnimate: Variants = {
  enter: {
    left: '50%',
    translateX: '-50%',
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.7,
      ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
    },
    display: 'flex',
  },
  exit: {
    left: '50%',
    translateX: '-50%',
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.15,
    },
    transitionEnd: {
      display: 'none',
    },
  },

  enterMobile: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: {
      duration: 0.7,
      ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
    },
    display: 'flex',
  },
  exitMobile: {
    opacity: 0,
    y: -20,
    height: 0,
    transition: {
      duration: 0.7,
      ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
    },
    transitionEnd: {
      display: 'none',
    },
  },
};
type NavState = {
  navOpen: boolean;
  menuButtonHover: boolean;
  toggleNavOpen: (open: boolean) => void;
  toggleMenuHover: (hover: boolean) => void;
};

// Create store with Zustand
const useStore = create<NavState>((set) => ({
  navOpen: false,
  menuButtonHover: false,
  toggleNavOpen: (open: boolean) =>
    set((state) => {
      document.body.style.overflow = open ? 'hidden' : 'visible';
      if (open) window.scrollTo(0, 0);
      return { ...state, navOpen: open };
    }),
  toggleMenuHover: (hover: boolean) =>
    set((state) => {
      return { ...state, menuButtonHover: !hover };
    }),
}));

const ActiveLink = (href: string | undefined) => {
  const router = useRouter();

  return router.asPath === href;
};

const Header = ({ theme }: Props): JSX.Element => {
  const customEase =
    'ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-600';
  const navHeaderClass = `inline-block text-grey font-bold border-b-4 transition-all group-hover:w-full ease-out duration-500`;
  const navSubClass =
    'absolute flex flex-col text-stone text-sm border-t-2 border-t-white p-3';

  const router = useRouter();
  const [menuButtonHover, toggleMenuHover] = useCycle(false, true);
  const [hoverAbout, toggleHoverAbout] = useCycle(false, true);
  const [hoverSII, toggleHoverSII] = useCycle(false, true);
  const [hoverResearch, toggleHoverResearch] = useCycle(false, true);
  const [hoverNews, toggleHoverNews] = useCycle(false, true);

  const [expanded, setExpanded] = useState<false | number>(-1);

  const [blockScroll, allowScroll] = useScrollBlock();

  const { navOpen, toggleNavOpen } = useStore();

  const NavLink = ({
    label,
    href,
    disabled = false,
    subLink = false,
  }: {
    label: string;
    href: string;
    disabled?: boolean;
    subLink?: boolean;
  }): JSX.Element =>
    ActiveLink(href) ? (
      <span
        onClick={() => {
          toggleNavOpen(false);
        }}
        className="opacity-40"
      >
        {subLink && (
          <svg
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            className="inline"
          >
            <path d="m566-120-43-43 162-162H200v-475h60v415h426L524-547l43-43 233 233-234 237Z" />
          </svg>
        )}{' '}
        {label}
      </span>
    ) : disabled ? (
      <span className="opacity-50 mt-3 xl:my-1">
        {subLink && (
          <svg
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            className="inline"
          >
            <path d="m566-120-43-43 162-162H200v-475h60v415h426L524-547l43-43 233 233-234 237Z" />
          </svg>
        )}{' '}
        {label}
      </span>
    ) : (
      <Link href={href} className="mt-3 xl:my-1">
        {subLink && (
          <svg
            height="20"
            viewBox="0 -960 960 960"
            width="20"
            className="inline"
          >
            <path d="m566-120-43-43 162-162H200v-475h60v415h426L524-547l43-43 233 233-234 237Z" />
          </svg>
        )}{' '}
        {label}
      </Link>
    );
  const aboutLinks = (
    <>
      <NavLink href="/about/mission-values" label="Mission & Values" />
      <NavLink href="/about/our-approach" label="Our Approach" />
      <NavLink href="/about/people" label="People" />
      <NavLink href="/about/jobs" label="Jobs" />
      <NavLink href="/about/get-involved" label="Get Involved" />
      <NavLink href="/about/donate" label="Donate" />
    </>
  );
  const siiLinks = (
    <>
      <NavLink
        href="/initiatives/gunviolence"
        label="
        Transforming Narratives of Gun Violence (TNGV)"
      />
      <NavLink
        href="/studios?initiative=gunviolence"
        label="TNGV Studios"
        subLink={true}
      />
      <NavLink
        href="/studios/projects?initiative=gunviolence"
        label="TNGV Projects"
        subLink={true}
      />
      <NavLink
        href="/initiatives/climate"
        label="Transforming Narratives for Environmental Justice (TN4EJ)"
        disabled={true}
      />
      <NavLink
        href="/studios?initiative=climate"
        label="TN4EJ Studios"
        disabled={true}
        subLink={true}
      />
      <NavLink
        href="/projects?initiative=climate"
        label="TN4EJ Projects"
        disabled={true}
        subLink={true}
      />
    </>
  );
  const researchLinks = (
    <>
      <NavLink href="/research/projects" label="Research Projects" />
      <NavLink href="/publications" label="Publications" disabled={true} />
    </>
  );
  const whatsNewLinks = (
    <>
      <NavLink href="/news" label="News" disabled={true} />
      <NavLink href="/events" label="Events" disabled={true} />
      <NavLink href="/press" label="Press Room" disabled={true} />
      <NavLink href="/newsletter" label="Join Newsletter" disabled={true} />
    </>
  );
  const MobileAccordion = ({
    i,
    expanded,
    setExpanded,
    links,
    label,
  }: {
    i: number;
    expanded: number | false;
    setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
    links: React.ReactElement;
    label: string;
  }) => {
    const isOpen = i === expanded;
    return (
      <>
        <motion.header
          className="text-2xl font-light mt-3"
          initial={false}
          onClick={() => setExpanded(isOpen ? false : i)}
        >
          {label}
        </motion.header>
        <motion.section
          animate={isOpen ? 'enterMobile' : 'exitMobile'}
          initial="exitMobile"
          variants={subMenuAnimate}
        >
          <motion.div
            variants={{
              open: { scale: 1 },
            }}
            transition={{ duration: 0.8 }}
            className="flex flex-col font-semibold ml-5"
          >
            {links}
          </motion.div>
        </motion.section>
      </>
    );
  };
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      toggleNavOpen(false);
      toggleHoverAbout(0);
      toggleHoverSII(0);
      toggleHoverResearch(0);
      toggleHoverNews(0);
    });
    // isMobile = /Android|iPhone|iPad|webOS/i.test(navigator.userAgent);
  });

  return (
    <nav className="w-full flex flex-row justify-center pt-9 mb-1 md:px-16">
      <div className="w-full xl:w-6/12 px-6 xl:px-0 flex items-center">
        <Link href="/" passHref className="w-36 md:w-44 xl:w-52 h-min">
          <motion.svg
            id="logo-img"
            viewBox="0 0 166 58.741"
            width="166"
            height="58.741"
            aria-label="Engagement Lab logo"
            whileHover={{ scale: 1.023 }}
          >
            <g
              id="logo-group"
              transform="matrix(0.390588, 0, 0, 0.390588, 0, 0)"
            >
              <g id="color-lab">
                <motion.path
                  d="M419,32.68v7.74H391.06V1.74h7.6V32.68Z"
                  style={{ fill: '#ff0000' }}
                ></motion.path>
                <path
                  d="M400.33,80,405,66.59,409.72,80Zm15.13,16.33h7.83L408.94,55.46h-7.83L386.76,96.28h7.83l2.87-8.16h15.13l2.87,8.16Z"
                  style={{ fill: '#00ab9e' }}
                ></path>
                <path
                  d="M413.25,136.25c0-1.94-1.72-3.87-5.18-3.87H397v7.74h11.11C411.47,140.12,413.25,138.18,413.25,136.25Zm-1.44-15.47c0-1.94-1.72-3.87-5.12-3.87H397v7.74h10C410.2,124.54,411.81,122.66,411.81,120.78Zm9.33,15.47c0,5.8-4.38,11.6-13.07,11.6H388.91V109.18h17.78c8.69,0,13,5.8,13,11.65a11.52,11.52,0,0,1-2.36,7A11.2,11.2,0,0,1,421.14,136.25Z"
                  style={{ fill: ' #f6a536' }}
                ></path>
              </g>
              {/* <path
                  id="bw-lab"
                  d="M420.33,41.92h-31.5V0h10.54V31.37h21V41.92Zm-28.86-2.69h26.12V34.06h-21V2.69h-5.16V39.22h0Zm16.07,111.16h-20V108.47H406.2c9.64,0,14,6.82,14,13.2a13.39,13.39,0,0,1-1.93,6.91,13.21,13.21,0,0,1-.23,17.77,14.29,14.29,0,0,1-10.5,4Zm-17.32-2.69h17.32c7.81,0,11.4-5.39,11.4-10.41a10.15,10.15,0,0,0-3.27-7.59l-.9-.8.72-1a10.51,10.51,0,0,0,2-6.29c0-7.18-5.89-10.5-11.31-10.5h-16V147.7Zm17.32-5.16H395.38V132h12.16c4.22,0,6.37,2.65,6.37,5.25S411.72,142.54,407.54,142.54Zm-9.47-2.69h9.47c2.56,0,3.68-1.35,3.68-2.56s-1.16-2.56-3.68-2.56h-9.47Zm8.44-13H395.38V116.33H406.2c4.17,0,6.32,2.65,6.32,5.25C412.52,124.9,409.52,126.74,406.51,126.88Zm-8.44-2.7h8.39c2.34-.09,3.37-1.35,3.37-2.56s-1.12-2.55-3.63-2.55h-8.13ZM425,96.36H414.18l-2.91-8H397.8l-2.91,8H384.07L399.6,54h9.83Zm-8.93-2.7h5.07L407.59,56.73h-6.06L388,93.66h5.08L396,85.72h17.19Zm-4.85-13.15H397.85l6.69-18.22Zm-9.51-2.69h5.65l-2.82-7.72-2.83,7.72Z"
                ></path> */}
              <motion.path
                id="engagement"
                initial={{ pathOffset: 0, stroke: '#fff', fill: '#000' }}
                whileHover={{
                  pathOffset: 1,
                  stroke: '#000',
                  fill: '#fff',
                  transition: { duration: 3.3 },
                }}
                pathLength={100}
                animate={{
                  strokeDashoffset: 0,
                }}
                transition={{ duration: 2 }}
                d="M144.18,147.85a15.18,15.18,0,0,1-6.91-1.52,12.82,12.82,0,0,1-5.22-5.11c-1.78-3.18-2.54-7.56-2.54-14.66,0-16.18-1.26-26.62-3.74-31-1-1.78-1.78-2.47-6.28-2.55V147.6H107.43V81.24h11.06a27.75,27.75,0,0,1,9.36,1.22A15.89,15.89,0,0,1,136.46,90c3.64,6.51,5.19,17.46,5.19,36.61,0,5.79.64,8.17,1.17,9.15.07.12.12.22.14.24a2.61,2.61,0,0,0,1.22.15c.74,0,.74,0,1-.5.8-1.62,1.2-4.65,1.2-9,0-19.15,1.55-30.09,5.19-36.6a15.58,15.58,0,0,1,8.53-7.5,28.19,28.19,0,0,1,9.36-1.22h11.06V147.6H168.43V93c-4.21.07-5.18.68-6.29,2.56-2.45,4.34-3.65,14.48-3.65,31,0,6.5-.72,10.83-2.33,14a12.15,12.15,0,0,1-4.87,5.39,13.37,13.37,0,0,1-7.11,1.87ZM126.78,27.36C126.78,10.6,137.41,0,154.07,0s26.16,9.25,26.16,25.05v.77H167.81v-1c0-8.1-4.7-13.49-13.74-13.49-9.32,0-14.87,6.94-14.87,15.41V43.36c0,9.25,5.18,15.41,14.87,15.41,9.88,0,13.74-4.91,13.74-13v-.67h-16V33.91h28.42V45.09c0,16.09-9.13,25-26.16,25-16.18,0-27.29-9.44-27.29-27.36ZM225.2,42.09l-9.35-29.88h-1.13l-8,29.88Zm.1-40.35L245,68.35H232.1l-4-14.84H203.76l-4,14.84H186.93L205.27,1.74Zm26.52,25.62C251.82,10.6,262.79,0,280,0s27,9.25,27,25.05v.77H294.14v-1c0-8.1-4.85-13.49-14.17-13.49-9.61,0-15.34,6.94-15.34,15.41V43.36c0,9.25,5.34,15.41,15.34,15.41,10.19,0,14.17-4.91,14.17-13v-.67h-16.5V33.91H307V45.09c0,16.09-9.41,25-27,25-16.7,0-28.15-9.44-28.15-27.36V27.36Zm115-25.62V13.16H328.24V29.05h36V40.47h-36V56.93h39.18V68.35H315.85V1.74ZM51,1.74V13.16H12.39V29.05h36V40.47h-36V56.93H51.57V68.35H0V1.74Zm189.09,79.5V92.66H201.47v15.89h36V120h-36v16.46h39.18v11.42H189.08V81.24Zm129.24,2.43V95H349.05v55H336.42V95H316.13V83.67ZM0,122.07H83.8V109.18H0ZM305.11,83.39H293.32V138.7l-.25,0c-2.84-.41-4.67-2.13-5.94-5.58-1.47-4-1.92-9.55-2.39-15.41l-.08-1.05c-.59-7.64-1.21-15.54-4-21.79a19,19,0,0,0-6.7-8.29,19.59,19.59,0,0,0-10.31-3.16H251.39V150h11.79V94.67l.3,0a8,8,0,0,1,3.91,1.4,10.77,10.77,0,0,1,3,4.46c1.55,4.15,1.92,9.82,2.31,15.83l.05.83c.39,6.79.87,15.24,3.66,21.58A18.34,18.34,0,0,0,283,147a19.67,19.67,0,0,0,9.8,3.05h12.31V83.39ZM116,1.74H104.24V57.05L104,57c-2.84-.41-4.67-2.13-5.94-5.58-1.47-4-1.92-9.55-2.39-15.41L95.58,35c-.6-7.64-1.21-15.54-4-21.78a19,19,0,0,0-6.7-8.3A19.59,19.59,0,0,0,74.6,1.74H62.31V68.35H74.1V13l.3,0a8,8,0,0,1,3.91,1.4,10.86,10.86,0,0,1,3,4.46c1.54,4.15,1.91,9.82,2.31,15.83l0,.83c.39,6.79.87,15.24,3.66,21.58a18.39,18.39,0,0,0,6.54,8.14,19.74,19.74,0,0,0,9.81,3H116V1.74Z"
              ></motion.path>
            </g>
          </motion.svg>
        </Link>
        {/* TNGVI logo */}
        {theme === Theme.gunviolence && (
          <motion.svg
            viewBox="0 0.081 81.459 50"
            width="81.459"
            height="50"
            initial={{ y: -10, opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="ml-4"
          >
            <title>Transforming Narratives of Gun Violence logo</title>
            <g transform="matrix(0.159112, 0, 0, 0.159112, 0, 0.068195)">
              <path
                style={{ fill: '#8D33D2' }}
                d="M149,61.7V17.8H0v43.9h32.2c3.9,0,11.1-0.8,14.4,0.2v132.7H102V74.4c0-3.5-0.7-9.8,0.2-12.7H149z"
              />
              <path
                style={{ fill: '#8D33D2' }}
                d="M362.4,163.7v-28.1c0-3.6,0.8-10-0.2-13h-59.8c-2,0-4.7-0.3-6.2,0.2v19.5c0,2.8-0.5,6.8,0.2,9.1h21.8
                                  c3.1,0,7.5-0.6,10.1,0.2c-0.7,2.1-3.1,3.8-4.8,5c-1.9,1.4-3.7,3.1-6,4.1c-6,2.6-17.4,2.6-24,0.5c-9.3-3.1-13.6-9.7-16.1-19.7
                                  c-0.7-2.6-0.5-5.5-0.5-8.6c0-13.5,4.6-22.9,13.9-26.9c9.7-4.2,24-1.3,27.8,6.2h29.6c3.7,0,10.4,0.8,13.4-0.2
                                  c-2.5-20.2-14.7-32.3-30-39.8c-3.9-1.9-8.7-2.9-13-4.1c-6.7-1.9-15.9-1.6-24.2-1.4c-7.7,0.9-5.4,0.4-7.7,0.9
                                  c-3.5,0.7-6.9,1.6-10.3,2.6c-16,5.9-28.4,16.7-35,31.9c-2.1,4.9-3.4,10.4-4.8,16.1c-2.1,8.2-1.5,21.9,0.5,29.5
                                  c0.8,3.2,0.8,5.9,1.9,8.9c7.1,19.4,19.4,31.9,39.4,38.4c10.7,3.5,28.5,5.3,40.8,1.7c8.1-2.4,15.7-5.3,21.8-9.6c2.1-1.4,4-3.5,6-5
                                  c2.4-1.7,4.6-3.7,6.5-6c1.9-2.5,4-4.9,5.8-7.4C360.4,167.2,361,165.1,362.4,163.7z"
              ></path>
              <path
                style={{ fill: '#8D33D2' }}
                d="M202.8,67.7c-3.7,0-9.3-0.8-12.5,0.2v64.2h-0.5c-2.8-5.4-6.9-10.3-10.1-15.4c-7-11.1-14.1-22-21.1-33.1
                                  c-2.3-3.6-4.8-7.3-7.2-11c-1-1.5-2.8-3.1-3.4-5h-27.6c-3.7,0-9.3-0.8-12.5,0.2v127.2h40.1l0-63.3c1.6,0.8,2.4,3.4,3.4,4.8
                                  c2.4,3.7,4.9,7.5,7.4,11.3c7.2,10.7,14.2,21.6,21.4,32.4c2.4,3.5,4.7,6.9,7,10.6c0.9,1.4,2.4,2.6,2.9,4.3h27.6
                                  c3.5,0,9.8,0.8,12.7-0.2v-115c0-3.7,0.8-9.1-0.2-12.2H202.8z"
              ></path>
              <path
                style={{ fill: '#8D33D2' }}
                d="M509.3,171c1.5-2.9,3.2-6.1,2.5-9.6c-1.1-6-3.6-10.3-7.4-12.5c-3.6-2.1-8-2.2-13.2-0.3l-1.2,0.4l-0.4,0.1
                                  c0.1-0.4,0.3-0.7,0.4-1.1c0.6-1.6,1.3-3.3,1.8-5.1c0.9-3.4,0.9-6.9,0.3-10.3c-0.1-0.5-0.2-1.1-0.2-1.6c0-0.9-0.1-1.8-0.4-2.7
                                  c-2-5.9-7.2-7.9-11.5-9c-2.3-0.7-4.8-0.9-7.2-0.5l-1.2,0.3c-1.3,0.3-2.5,0.6-3.7,1c0.3-1.1,0.8-2.3,1.2-3.2s0.8-1.9,1.1-2.9l1-4.9
                                  c0.5-1.6,1-3.3,1.5-5c0.7-2.4,1.5-4.9,2.2-7.1c1.2-3.6,2.1-7.3,2.7-11c0.6-3.3,1.4-6.6,2.3-9.9c2.3-7.2,4.5-14.6,6.5-21.8
                                  c1.5-5.1,3-10.4,4.6-15.7c2.1-6.7,3.5-20.2,0.2-27.6c-2.2-5-6.6-8.4-12.8-10.2c-4.5-1.3-9.9,0.2-13.2,1.8
                                  c-8.4,4.2-12.4,11.5-15.4,18.8c-2.2,5.8-4,11.8-5.2,17.9c-0.8,3.3-1.6,6.8-2.5,10c-0.9,3.2-1.8,6.4-2.7,9.6
                                  c-2.2,8.2-4.6,16.6-7.2,24.4c-0.9,2.7-1.7,5.4-2.4,8c-2.3,8-4.5,15.6-9.2,21.2c-1.7-0.4-2.6-1.9-3.8-4.3l-0.3-0.6
                                  c-2.3-4.6-4.1-9.5-5.6-14.4c-0.3-1-0.7-2-1-3c-1.4-4.4-2.9-9-4.3-13.5c-1.2-3.8-2.4-7.7-3.6-11.5c-0.5-1.8-1-3.6-1.2-5.5
                                  c-0.3-2-0.8-4-1.4-6c-1.4-4.3-2.7-8.7-4-13.1c-2.6-8.6-5.1-17.4-8.6-25.3c-2.2-5.1-4.7-8.9-7.5-11.4c-4.4-4-9.6-4.9-15-2.5
                                  c-7,3.1-9.8,10.6-11.7,18.4c-0.3,1.1-0.4,2.3-0.3,3.5c0,0.9,0,1.7-0.2,2.6c-0.5,3.6-0.5,7.2,0,10.7c0.4,2,0.6,4.1,0.7,6.1
                                  c0.1,2.6,0.4,5.2,1,7.7c1.2,4.2,2.7,8.8,4.4,13.3c0.2,0.6,0.3,1.2,0.4,1.8c0.1,0.8,0.3,1.6,0.5,2.4c0.6,1.9,1.2,3.9,1.9,6
                                  c0.7,2.2,1.3,4.4,2,6.4c0.8,2.4,1.4,4.9,1.9,7.5c0.5,2.6,1.2,5.1,1.9,7.6c1.3,4.2,2.6,8.6,3.9,13s2.6,9.1,4,13.4
                                  c0.5,1.7,0.9,3.4,1.1,5.1c0.2,1.7,0.6,3.4,1,5.1l0.2,0.8c1,3.5,3.3,11.6,2.4,15.5c-1.3,6.4-3.3,12.6-5.8,18.5l-11.7,21.6l-0.1,0.2
                                  c-2.7,6.1-4.6,12.8-6.6,20.2c-1.6,5.9,0,12.1,1.2,16.6l0.2,0.8c0,0.5-0.1,1-0.2,1.5v0.2c-0.4,2.8-0.3,5.6,0.5,8.2
                                  c5.2,15.9,13.7,32.9,26.2,51.8c0.8,1.1,1.5,2.3,2.3,3.6c3.3,5.2,7,11.1,11.7,14.4c4.4,2.9,9.2,5.1,14.3,6.5
                                  c1.6,0.4,3.2,0.7,4.9,0.8c1.1,0.1,2.1,0.2,3.2,0.4h0.2h2.9c3.4,0.6,6.8,0.8,10.2,0.7l0.1-0.1h1.5c13.3,0,30.1-3.4,37.6-13
                                  c2.7-3.2,4.9-6.7,6.7-10.5c1.8-4.3,3.2-8.8,4.4-13.3c0.3-0.9,0.5-1.9,0.8-2.8l0.5-3.7c1.4-4.9,2.5-9.9,3.7-14.8
                                  c2.1-9.2,4.2-17.9,7.5-25.9c5.3-12.6,9.6-25.5,13-38.7c0.9-3.4,1.8-12.9-0.8-17.1C508.1,173.4,508.6,172.1,509.3,171z M485.7,154.6
                                  L485.7,154.6C485.7,154.6,485.7,154.6,485.7,154.6C485.7,154.6,485.7,154.6,485.7,154.6z M477.3,126.3L477.3,126.3
                                  c0.4,0,0.9,0.1,1.3,0.2c3.5,0.9,6.3,5.1,5,10.5c-1.3,5.3-3.6,10.2-5.9,14.8c-1,2-2,4.1-2.9,6.2c-0.4,0.9-0.7,1.9-1,2.9
                                  c-0.3,1.4-0.9,2.7-1.5,3.9c-1.9-0.3-5.1-0.6-6.6-0.3c-1.2,0.2-2.5,0.4-3.7,0.5c-1.6,0.1-3.2,0.3-4.7,0.7c-0.5,0.1-1,0.2-1.6,0.4
                                  s-1.3,0.4-2,0.5c0.5-2.1,1.1-4.1,1.9-6.1c0.3-1,0.7-1.9,1-2.9c0.8-2.3,1.4-4.6,2-6.8c1.3-4.7,2.5-9.2,4.8-13
                                  c0.9-1.3,1.8-2.6,2.9-3.8c0.6-0.7,1.2-1.5,1.8-2.3C469.4,130.1,473.5,126.3,477.3,126.3z M471.7,176.3c-0.2,2.6-1.6,3.8-3.7,5.4
                                  c-5.1,3.9-10.7,7.8-17.5,9.5c-2.8,0.7-8.6-2.7-9.4-3.8c-0.3-0.4-0.5-0.9-0.7-1.4c-0.2-0.5-0.4-1-0.6-1.4c-0.6-1.3-0.9-2.6-0.8-4
                                  l0.1-0.2h0c1-0.4,2.1-0.7,3.2-0.8c1.1-0.1,2.2-0.3,3.3-0.7c3.8-1.2,8.4-2.6,13.8-4c0.8-0.2,1.7-0.3,2.6-0.3c1.6,0,3.1-0.3,4.6-0.8
                                  C469.7,173.8,470.2,174.4,471.7,176.3z M462.6,132.3c0-0.1,0.1-0.2,0.1-0.3c0,0,0.1,0,0.1,0C462.7,132.1,462.7,132.2,462.6,132.3z
                                  M366.4,206.3l0.1-0.2c0.3-1.1,0.6-2.2,0.7-3.3c0.1-1,0.3-1.9,0.7-2.8c2.4-5.9,5.2-11.6,8.5-17c4.3-7.3,7.9-15,10.6-23
                                  c0.2-0.4,0.4-0.8,0.4-1.2c0.2-0.7,0.5-1.4,0.7-2.2c0.4-1.6,0.7-3.2,0.8-4.8c0.1-1.1,0.2-2.2,0.5-3.3c0.9-3.8-0.4-8.5-1.1-11.3
                                  l-0.1-0.4c-0.7-2.7-1.3-5.5-1.8-8.1c-0.7-3.8-1.6-7.5-2.8-11.2c-0.7-2.2-1.3-4.5-1.7-6.8c-0.5-2.5-1.1-5-1.9-7.4
                                  c-1.6-4.9-3.2-10.3-4.6-15.3s-2.9-10.2-4.5-15.1c-0.4-1.4-0.8-2.8-1-4.2c-0.3-1.6-0.7-3.1-1.1-4.7l-4.8-14.6
                                  c-0.4-1.5-0.7-3.1-0.8-4.7c-0.1-1.5-0.3-2.9-0.6-4.3l-0.1-3.1V37c-2-8.5-0.5-20.1,3.3-25.3c0.5-0.5,1.1-0.9,1.8-1.2
                                  c0.5-0.2,1-0.5,1.5-0.8c2.9,0.1,3.8,1.3,5.4,3.5l0.3,0.4c3.3,4.6,4.9,9.9,6.7,15.9c0.6,2,1.2,4,1.9,6.1c3,9,5.6,18.6,8.2,27.9
                                  c3.3,11.9,6.7,24.3,10.8,35.5c0.4,1.1,0.8,2.2,1.2,3.3c2.8,8.1,6,17.3,15,19.7c4.6,1.2,8.6-1.6,10.8-4.6c3.6-4.9,5.3-9.8,7.4-15.5
                                  c0.5-1.3,1-2.7,1.5-4.2c3.4-9,6-18.6,8.5-27.9c1.4-5.3,2.9-10.8,4.5-16.1c0.3-1.1,0.6-2.3,0.7-3.5c0.1-0.9,0.3-1.9,0.5-2.8
                                  c0.6-2.1,1.2-4.3,1.8-6.5c1.4-5.9,3.2-11.6,5.4-17.2c2.2-5.2,5.2-10.8,10.6-12.8c1-0.4,3.7-1.4,5.7-0.9c2.4,0.6,4.4,2.1,5.6,4.2
                                  c3.2,5.6,1.4,15,0,20c-0.6,2.3-1.1,4.5-1.5,6.6c-0.5,2.6-1.1,5.2-1.8,7.7c-3.5,10.7-6.6,22.1-9.5,33.1c-2.9,11-5.9,22.4-9.5,33.1
                                  l-3.6,15.9c-0.9,2.5-1.9,5-3.1,7.5c-0.9,1.9-1.8,3.8-2.6,5.8c-0.7,2-1.3,4.1-1.7,6.2c-0.4,1.9-0.8,3.7-1.5,5.6l-0.5,1.3
                                  c-1.6,4-2.8,8.1-3.6,12.4c-1.3,0.4-2.7,0.8-4.1,1c-1.2,0.2-2.6,0.5-3.7,0.8s-2.4,0.7-3.5,1c-4.2,1-8.3,2.3-12.3,3.9
                                  c-15.4,6.6-29.2,15.8-39.5,23c-1.8,1.2-3.7,2.4-5.6,3.5c-2.8,1.6-5.5,3.3-8,5.3C366,207.4,366.2,206.8,366.4,206.3z M493.1,207.8
                                  c-2.4,5.8-4.5,11.8-6.5,17.7c-1.1,3.1-2.2,6.4-3.4,9.5c-2.1,6.1-3.8,12.3-5.1,18.6c-0.9,3.9-1.8,7.9-2.9,11.8
                                  c-0.3,1-0.4,2.1-0.5,3.2c-0.1,0.9-0.2,1.7-0.4,2.6l-0.5,1.7c-3,10.5-5.8,20.4-13.2,25.8c-3.6,2.6-8.2,4.1-12.4,5.2l-5.8,0.5h-0.3
                                  c-3,0.6-6,0.7-9,0.4h-4.8v0c-2.7-0.5-5.3-0.7-8-0.8c-3.1-0.1-6.1-0.5-9.1-1.3c-10.4-3.4-15.1-11.1-20.5-20.1
                                  c-0.4-0.8-0.9-1.4-1.4-2.4s-1.2-1.8-1.8-2.7s-1.2-1.7-1.8-2.6c-2.4-4.1-4.6-8.4-6.5-12.8c-1.3-2.9-2.7-5.8-4.2-8.7
                                  c-0.6-1.2-1.4-2.4-2.2-3.6c-1-1.4-1.8-2.9-2.6-4.5c-3.6-8.1-6.6-17.4-2.3-24.5c2.7-4.4,6.9-7,11.3-9.6c1.8-1.1,3.6-2.2,5.4-3.5
                                  c11.3-7.9,23.1-14.9,35.3-21.2c2.4-1.1,4.8-2,7.3-2.7l1.9-0.6c-0.1,0.7,0,1.5,0.2,2.2c0.8,3.5,2.5,6.7,4.8,9.3
                                  c0.8,0.7,1.7,1.4,2.8,1.8c0.4,0.2,0.8,0.4,1.2,0.6c2.5,1.6,5.2,2.8,8,3.6c5.8,1.5,13.1-1.8,18.1-4.8c0.3-0.2,0.7-0.4,1-0.5
                                  c-2.8,4.3-8,8-15.5,11.1c-1.7,0.7-3.5,1.2-5.2,1.7c-2.9,0.7-5.6,1.8-8.2,3.2c-4.2,2.7-8.1,5.8-11.8,9.2c-2.3,2-4.7,4.1-7.1,6
                                  l-3.3,3.5c-2.2,2.2-4.6,4.2-7.2,6c-0.8-0.4-1.7-0.5-2.6-0.3c-1,0.1-1.9,0.5-2.6,1.3c-0.1,0.1-0.2,0.2-0.3,0.3l-0.8,0.6l0,0.9
                                  c-0.1,3.2,2.5,6.5,4.9,9.4c0.9,1,1.7,2,2.1,2.8c0.2,0.4,0.4,0.8,0.7,1.3c0.8,1.4,1.6,3.2,3.8,4c2,1.2,4.1-0.2,4.8-0.7l0.9-0.6
                                  l0.2-0.8c0.9-4.1-1.4-7.1-3.3-9.6c-0.3-0.5-0.7-0.9-1-1.3c2-1.4,3.9-3,5.7-4.7l3.5-3.7c1-0.8,1.9-1.7,2.8-2.6
                                  c0.6-0.6,1.1-1.2,1.7-1.7c4.2-3.8,8.8-7.3,13.6-10.4c1.9-1.3,4-2.3,6.2-3.1l3.2-0.7l0.3-0.1c0.5-0.2,1-0.4,1.3-0.6s0.6-0.3,0.9-0.4
                                  c1.1,2,2.8,3.6,4.9,4.5c4.9,2.4,12.9,3.2,17.3,0.3c4.1-2.7,6.9-6.8,9.7-10.7l0.9-1.3c1.5-2.1,3.1-4.3,4.6-6.4
                                  c2.7-3.6,5.4-7.4,7.9-11.1c0.2-0.3,0.4-0.7,0.6-1C497.7,196.6,495.3,202.5,493.1,207.8z M502.2,167.5c-3.2,7.6-8,14.5-12.6,21.2
                                  c-1.4,1.9-2.7,3.9-4,5.8l-1.6,2.4c-2.8,4.3-5.7,8.7-9.2,12.2c-3.1,3.1-6.6,5.8-10.9,4.3c-1.1-0.4-2-1.1-2.8-2
                                  c0.5-0.3,1-0.7,1.5-0.9c0.8-0.4,1.5-0.8,2.1-1.4c4-3.8,7.4-8.2,10-13.1c0.8-1.7,1.3-3.5,1.6-5.4c0.3-2.4,1.2-4.7,2.5-6.8
                                  c1.2-1.8,2-3.7,2.5-5.8c0.4-1.8,0-3.7-1-5.3c-0.3-0.5-0.5-1-0.6-1.6c0.4-3,3.4-7.9,5.2-10.4c1.7-2.2,4-4,6.6-5.1
                                  c0.5-0.2,1-0.3,1.5-0.3c0.9-0.1,1.9-0.3,2.8-0.7c2.7,0,4.5,0.6,5.5,1.6s1.6,2.9,1.6,5.5C503.1,163.7,502.8,165.6,502.2,167.5z"
              ></path>
            </g>
          </motion.svg>
        )}
      </div>
      {/* Desktop+ */}
      <div className="hidden xl:block flex-grow">
        <div className="flex flex-row items-center justify-end mr-3 mb-5 text-sm text-grey">
          <span className="uppercase font-extrabold mr-7">Our Curriculum:</span>
          <Link
            href="/"
            className="uppercase flex items-center mr-7 font-semibold group"
          >
            <svg
              height="25"
              viewBox="0 -960 960 960"
              width="25"
              className="inline mr-1 fill-grey"
            >
              <path
                d="M560-574v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-610q-38 0-73 9.5T560-574Zm0 220v-49q33-13.5 67.5-20.25T700-430q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-390q-38 0-73 9t-67 27Zm0-110v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-500q-38 0-73 9.5T560-464Zm-48 214q50-25 98-37.5T712-300q38 0 78.5 6t69.5 16v-429q-34-17-71.822-25-37.823-8-76.178-8-54 0-104.5 16.5T512-677v427Zm-30 90q-51-38-111-58.5T248-239q-36.537 0-71.768 9Q141-221 106-208q-23.1 11-44.55-3Q40-225 40-251v-463q0-15 7-27.5T68-761q42-20 87.5-29.5T248-800q63 0 122.5 17T482-731q51-35 109.5-52T712-800q47.179 0 92.089 9.5Q849-781 891-761q14 7 21.5 19.5T920-714v463q0 27.894-22.5 42.447Q875-194 853-208q-34-14-69.232-22.5Q748.537-239 712-239q-63 0-121 21t-109 58Z"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <path d="M560-574v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-610q-38 0-73 9.5T560-574Zm0 220v-49q33-13.5 67.5-20.25T700-430q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-390q-38 0-73 9t-67 27Zm0-110v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-500q-38 0-73 9.5T560-464ZM248-300q53.566 0 104.283 12.5T452-250v-427q-45-30-97.619-46.5Q301.763-740 248-740q-38 0-74.5 9.5T100-707v434q31-14 70.5-20.5T248-300Zm264 50q50-25 98-37.5T712-300q38 0 78.5 6t69.5 16v-429q-34-17-71.822-25-37.823-8-76.178-8-54 0-104.5 16.5T512-677v427Zm-30 90q-51-38-111-58.5T248-239q-36.537 0-71.768 9Q141-221 106-208q-23.1 11-44.55-3Q40-225 40-251v-463q0-15 7-27.5T68-761q42-20 87.395-29.5Q200.789-800 248-800q63 0 122.5 17T482-731q51-35 109.5-52T712-800q46.868 0 91.934 9.5Q849-781 891-761q14 7 21.5 19.5T920-714v463q0 27.894-22.5 42.447Q875-194 853-208q-34-14-69.232-22.5Q748.537-239 712-239q-63 0-121 21t-109 58ZM276-489Z" />
            </svg>
            <span className="inline-block">
              Undergraduate
              <hr className="border-b-1 border-b-grey border-dotted opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </span>
          </Link>
          <Link
            href="/"
            className="uppercase flex items-center mr-7 font-semibold group"
          >
            <svg
              height="25"
              viewBox="0 -960 960 960"
              width="25"
              className="inline mr-1 fill-grey"
            >
              <path
                d="M860-283v-282L479-360 40-600l439-240 441 240v317h-60ZM479-120 189-279v-210l290 159 290-159v210L479-120Z"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <path d="M479-120 189-279v-240L40-600l439-240 441 240v317h-60v-282l-91 46v240L479-120Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127v-168L479-360 249-485v170l230 127Zm1-240Zm-1 74Zm0 0Z" />
            </svg>
            <span className="inline-block">
              Graduate
              <hr className="border-b-1 border-b-grey border-dotted opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </span>
          </Link>
          <Link
            href="/"
            className="uppercase flex items-center mr-7 font-semibold group"
          >
            <svg
              height="25"
              viewBox="0 -960 960 960"
              width="25"
              className="inline mr-1 fill-grey"
            >
              <path
                d="M484-120q-17 0-29-11.788-12-11.787-12-29.212 0-7 3-14.5t9-13.5l185-185-21-21-185 185q-6 6-13 9t-15 3q-17 0-28.5-11.5T366-238q0-10 3-16.5t8-11.5l185-185-21-21-185 184q-6 6-13 9t-16 3q-16 0-28-12t-12-28q0-8 3-15t9-13l185-185-21-21-184 185q-5 5-12 8t-17 3q-17 0-28.5-11.212Q210-376.425 210-393q0-8 3-15t9-13l223-223 127 127q11 11 24.5 18.5T629-491q32 0 54-20.5t22-55.5q0-14-5.5-27.5T681-621L502-800l6-7q17-16 38-24.5t42-8.5q26 0 48 8.5t40 26.5l169 170q18 18 26.5 40t8.5 51q0 20-9 40.5T845-466L512-132q-8 8-14 10t-14 2ZM169-412l-54-54q-17-16-26-38t-9-46q0-26 10-48t25-37l169-170q16-16 38-25.5t43-9.5q27 0 48 7.5t41 27.5l205 205q9 9 12.5 17t3.5 16q0 20-13 33t-33 13q-9 0-18.5-4.5T592-539L444-687 169-412Z"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <path d="M475-140q5 0 11.5-2.5T497-149l337-338q13-13 19.5-29.667Q860-533.333 860-550q0-17-6.5-34T834-614L654-794q-13-13-30-19.5t-34-6.5q-16.667 0-33.333 6.5Q540-807 527-794l-18 18 81 82q13 14 23 32.5t10 40.5q0 38-29.5 67T526-525q-25 0-41.5-7.5t-30.185-21.341L381-627 200-446q-5 5-7 10.526-2 5.527-2 11.842 0 12.632 8.5 21.132 8.5 8.5 21.167 8.5 6.333 0 11.833-3t9.5-7l138-138 42 42-137 137q-5 5-7 11t-2 12q0 12 9 21t21 9q6 0 11.5-2.5t9.5-6.5l138-138 42 42-137 137q-4 4-6.5 10.333Q361-261.333 361-255q0 12 9 21t21 9q6 0 11-2t10-7l138-138 42 42-138 138q-5 5-7 11t-2 11q0 14 8 22t22 8Zm.064 60Q442-80 416-104.5t-31-60.619Q351-170 328-193t-28-57q-34-5-56.5-28.5T216-335q-37-5-61-30t-24-60q0-17 6.724-34.049T157-489l224-224 110 110q8 8 17.333 12.5Q517.667-586 527-586q13 0 24.5-11.5t11.5-24.654q0-5.846-3.5-13.346T548-651L405-794q-13-13-30-19.5t-34-6.5q-16.667 0-33.333 6.5Q291-807 278.059-794.143L126-642q-14 14-19.5 29.5t-6.5 35q-1 19.5 7.5 38T128-506l-43 43q-20-22-32.5-53T40-579q0-30 11.5-57.5T84-685l151-151q22-22 49.793-32.5 27.794-10.5 57-10.5Q371-879 398.5-868.5T448-836l18 18 18-18q22-22 49.793-32.5 27.794-10.5 57-10.5Q620-879 647.5-868.5T697-836l179 179q22 22 33 50.033t11 57Q920-521 909-493.5T876-444L539-107q-13 13-29.532 20t-34.404 7ZM377-626Z" />
            </svg>
            <span className="inline-block">
              Learning Partners
              <hr className="border-b-1 border-b-grey border-dotted opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </span>
          </Link>
        </div>
        <div className="flex flex-row relative z-50">
          <motion.div
            className="group relative"
            onMouseEnter={() => {
              toggleHoverAbout();
            }}
            onHoverEnd={() => {
              toggleHoverAbout();
            }}
          >
            <Link href="/" className="block w-40 text-center">
              <span className={`w-11 border-yellow ${navHeaderClass}`}>
                About
              </span>
            </Link>
            <motion.div
              className={`bg-[#FFEACB] w-40 ${navSubClass}`}
              initial="exit"
              animate={hoverAbout ? 'enter' : 'exit'}
              variants={subMenuAnimate}
            >
              {aboutLinks}
            </motion.div>
          </motion.div>

          <motion.div
            className="group relative"
            onMouseEnter={() => {
              toggleHoverSII();
            }}
            onHoverEnd={() => {
              toggleHoverSII();
            }}
          >
            <Link href="/initiatives" className="block w-56 text-center">
              <span className={`w-[183px] border-red ${navHeaderClass}`}>
                Social Impact Initiatives{hoverSII}
              </span>
            </Link>
            <motion.div
              className={`bg-[#FFCFCC] w-56 ${navSubClass}`}
              initial="exit"
              animate={hoverSII ? 'enter' : 'exit'}
              variants={subMenuAnimate}
            >
              {siiLinks}
            </motion.div>
          </motion.div>

          <motion.div
            className="group relative"
            onMouseEnter={() => {
              toggleHoverResearch();
            }}
            onHoverEnd={() => {
              toggleHoverResearch();
            }}
          >
            <div className="w-40 text-center cursor-`pointer`">
              <span className={`w-[70px] border-green-blue ${navHeaderClass}`}>
                Research
              </span>
            </div>
            <motion.div
              className={`bg-[#BBEBE7] w-40 ${navSubClass}`}
              initial="exit"
              animate={hoverResearch ? 'enter' : 'exit'}
              variants={subMenuAnimate}
            >
              {researchLinks}
            </motion.div>
          </motion.div>

          <motion.div
            className="group relative"
            onMouseEnter={() => {
              toggleHoverNews();
            }}
            onHoverEnd={() => {
              toggleHoverNews();
            }}
          >
            <Link href="/initiatives" className="block w-36 text-center">
              <span className={`w-[86px] border-yellow ${navHeaderClass}`}>
                What’s New
              </span>
            </Link>
            <motion.div
              className={`bg-[#FFEACB] w-36 ${navSubClass}`}
              initial="exit"
              animate={hoverNews ? 'enter' : 'exit'}
              variants={subMenuAnimate}
            >
              {whatsNewLinks}
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Non-desktop */}
      <motion.nav className="block xl:hidden">
        <MenuToggle
          toggle={() => {
            toggleNavOpen(!navOpen);
            !navOpen ? blockScroll() : allowScroll();
          }}
          hover={() => toggleMenuHover()}
          isHover={menuButtonHover}
          isOpen={navOpen}
        />
        <AnimatePresence>
          {navOpen && (
            <motion.aside
              className="absolute w-full h-full top-0 left-0 bottom-0 pl-8 pr-20 pt-16 z-40 text-white font-bold bg-gradient-to-b from-[#00A494] to-[#438EA0]"
              animate={{
                borderRadius: 0,
                opacity: 1,
                top: 0,
                right: 0,
                transition: { ease: 'easeOut', delay: 0.7, duration: 5.3 },
              }}
              exit={{
                transition: { delay: 0.2, duration: 1.15 },
              }}
            >
              <section className="flex flex-col">
                <h2 className="uppercase">Main Menu</h2>
                <MobileAccordion
                  i={0}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  links={aboutLinks}
                  label="About"
                />
                <MobileAccordion
                  i={1}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  links={siiLinks}
                  label="Social Impact Initiatives"
                />
                <MobileAccordion
                  i={2}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  links={researchLinks}
                  label="Research"
                />
                <MobileAccordion
                  i={3}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  links={whatsNewLinks}
                  label="What's New"
                />
              </section>
              <div className="absolute flex flex-col font-light text-[13px] left-[9vw] top-[80vh]">
                <span className="uppercase font-bold mb-4">
                  Our Curriculum:
                </span>

                <Link href="/" className="uppercase group">
                  <svg
                    height="25"
                    viewBox="0 -960 960 960"
                    width="25"
                    className="inline mr-1 fill-white"
                  >
                    <path
                      d="M560-574v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-610q-38 0-73 9.5T560-574Zm0 220v-49q33-13.5 67.5-20.25T700-430q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-390q-38 0-73 9t-67 27Zm0-110v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-500q-38 0-73 9.5T560-464Zm-48 214q50-25 98-37.5T712-300q38 0 78.5 6t69.5 16v-429q-34-17-71.822-25-37.823-8-76.178-8-54 0-104.5 16.5T512-677v427Zm-30 90q-51-38-111-58.5T248-239q-36.537 0-71.768 9Q141-221 106-208q-23.1 11-44.55-3Q40-225 40-251v-463q0-15 7-27.5T68-761q42-20 87.5-29.5T248-800q63 0 122.5 17T482-731q51-35 109.5-52T712-800q47.179 0 92.089 9.5Q849-781 891-761q14 7 21.5 19.5T920-714v463q0 27.894-22.5 42.447Q875-194 853-208q-34-14-69.232-22.5Q748.537-239 712-239q-63 0-121 21t-109 58Z"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <path d="M560-574v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-610q-38 0-73 9.5T560-574Zm0 220v-49q33-13.5 67.5-20.25T700-430q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-390q-38 0-73 9t-67 27Zm0-110v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-500q-38 0-73 9.5T560-464ZM248-300q53.566 0 104.283 12.5T452-250v-427q-45-30-97.619-46.5Q301.763-740 248-740q-38 0-74.5 9.5T100-707v434q31-14 70.5-20.5T248-300Zm264 50q50-25 98-37.5T712-300q38 0 78.5 6t69.5 16v-429q-34-17-71.822-25-37.823-8-76.178-8-54 0-104.5 16.5T512-677v427Zm-30 90q-51-38-111-58.5T248-239q-36.537 0-71.768 9Q141-221 106-208q-23.1 11-44.55-3Q40-225 40-251v-463q0-15 7-27.5T68-761q42-20 87.395-29.5Q200.789-800 248-800q63 0 122.5 17T482-731q51-35 109.5-52T712-800q46.868 0 91.934 9.5Q849-781 891-761q14 7 21.5 19.5T920-714v463q0 27.894-22.5 42.447Q875-194 853-208q-34-14-69.232-22.5Q748.537-239 712-239q-63 0-121 21t-109 58ZM276-489Z" />
                  </svg>
                  <span className="inline-block">Undergraduate</span>
                </Link>
                <Link href="/" className="uppercase">
                  <svg
                    height="25"
                    viewBox="0 -960 960 960"
                    width="25"
                    className="inline mr-1 fill-white"
                  >
                    <path
                      d="M860-283v-282L479-360 40-600l439-240 441 240v317h-60ZM479-120 189-279v-210l290 159 290-159v210L479-120Z"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <path d="M479-120 189-279v-240L40-600l439-240 441 240v317h-60v-282l-91 46v240L479-120Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127v-168L479-360 249-485v170l230 127Zm1-240Zm-1 74Zm0 0Z" />
                  </svg>
                  <span className="inline-block">Graduate</span>
                </Link>
                <Link href="/" className="uppercase">
                  <svg
                    height="25"
                    viewBox="0 -960 960 960"
                    width="25"
                    className="inline mr-1 fill-white"
                  >
                    <path
                      d="M484-120q-17 0-29-11.788-12-11.787-12-29.212 0-7 3-14.5t9-13.5l185-185-21-21-185 185q-6 6-13 9t-15 3q-17 0-28.5-11.5T366-238q0-10 3-16.5t8-11.5l185-185-21-21-185 184q-6 6-13 9t-16 3q-16 0-28-12t-12-28q0-8 3-15t9-13l185-185-21-21-184 185q-5 5-12 8t-17 3q-17 0-28.5-11.212Q210-376.425 210-393q0-8 3-15t9-13l223-223 127 127q11 11 24.5 18.5T629-491q32 0 54-20.5t22-55.5q0-14-5.5-27.5T681-621L502-800l6-7q17-16 38-24.5t42-8.5q26 0 48 8.5t40 26.5l169 170q18 18 26.5 40t8.5 51q0 20-9 40.5T845-466L512-132q-8 8-14 10t-14 2ZM169-412l-54-54q-17-16-26-38t-9-46q0-26 10-48t25-37l169-170q16-16 38-25.5t43-9.5q27 0 48 7.5t41 27.5l205 205q9 9 12.5 17t3.5 16q0 20-13 33t-33 13q-9 0-18.5-4.5T592-539L444-687 169-412Z"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <path d="M475-140q5 0 11.5-2.5T497-149l337-338q13-13 19.5-29.667Q860-533.333 860-550q0-17-6.5-34T834-614L654-794q-13-13-30-19.5t-34-6.5q-16.667 0-33.333 6.5Q540-807 527-794l-18 18 81 82q13 14 23 32.5t10 40.5q0 38-29.5 67T526-525q-25 0-41.5-7.5t-30.185-21.341L381-627 200-446q-5 5-7 10.526-2 5.527-2 11.842 0 12.632 8.5 21.132 8.5 8.5 21.167 8.5 6.333 0 11.833-3t9.5-7l138-138 42 42-137 137q-5 5-7 11t-2 12q0 12 9 21t21 9q6 0 11.5-2.5t9.5-6.5l138-138 42 42-137 137q-4 4-6.5 10.333Q361-261.333 361-255q0 12 9 21t21 9q6 0 11-2t10-7l138-138 42 42-138 138q-5 5-7 11t-2 11q0 14 8 22t22 8Zm.064 60Q442-80 416-104.5t-31-60.619Q351-170 328-193t-28-57q-34-5-56.5-28.5T216-335q-37-5-61-30t-24-60q0-17 6.724-34.049T157-489l224-224 110 110q8 8 17.333 12.5Q517.667-586 527-586q13 0 24.5-11.5t11.5-24.654q0-5.846-3.5-13.346T548-651L405-794q-13-13-30-19.5t-34-6.5q-16.667 0-33.333 6.5Q291-807 278.059-794.143L126-642q-14 14-19.5 29.5t-6.5 35q-1 19.5 7.5 38T128-506l-43 43q-20-22-32.5-53T40-579q0-30 11.5-57.5T84-685l151-151q22-22 49.793-32.5 27.794-10.5 57-10.5Q371-879 398.5-868.5T448-836l18 18 18-18q22-22 49.793-32.5 27.794-10.5 57-10.5Q620-879 647.5-868.5T697-836l179 179q22 22 33 50.033t11 57Q920-521 909-493.5T876-444L539-107q-13 13-29.532 20t-34.404 7ZM377-626Z" />
                  </svg>
                  <span className="inline-block">Learning Partners</span>
                </Link>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </motion.nav>
    </nav>
  );
};

export default Header;
