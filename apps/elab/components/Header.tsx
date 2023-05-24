// 'use client';
import * as React from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import _ from 'lodash';
import { create } from 'zustand';
import { useEffect } from 'react';

import {
  AnimatePresence,
  Variants,
  motion,
  sync,
  useCycle,
} from 'framer-motion';
import { useDimensions } from './use-dimensions';

import { MenuToggle } from './MenuToggle';
import { useScrollBlock } from './scrollBlock';

interface NavLink {
  enabled?: boolean;
  label: string;
  url?: string;
  href?: string;
  subLinks?: NavLink[];
}

const links: NavLink[] = [
  {
    label: 'For Students',
    subLinks: [
      { url: '/', label: 'Social Impact Studios' },
      {
        url: '/',
        label: 'Link 1',
      },
      {
        url: '/',
        label: 'Link 2',
      },
      {
        url: '/',
        label: 'Link 3',
      },
    ],
  },
  { url: 'people', label: 'People', enabled: true },
];

const customEase =
  'ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300';
const linkClass =
  'text-purple no-underline border-b-2 border-b-[rgba(141,51,210,0)] hover:border-b-[rgba(141,51,210,1)] transition-all';
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
const subMenuAnimate = {
  enter: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 0.2,
    },
    display: 'flex',
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.15,
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
  return router.asPath === `${href}/`;
};

const Header = () => {
  let isMobile = false;

  const router = useRouter();
  const [menuButtonHover, toggleMenuHover] = useCycle(false, true);
  const [isHover, toggleHover] = useCycle(false, true);

  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  // const [blockScroll, allowScroll] = useScrollBlock();

  const { navOpen, toggleNavOpen } = useStore();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      toggleNavOpen(false);
    });
    // isMobile = /Android|iPhone|iPad|webOS/i.test(navigator.userAgent);
  });

  // eslint-disable-next-line class-methods-use-this
  return (
    <div className="flex justify-center xl:px-8">
      <nav className="w-full mt-9 mb-1 flex flex-row">
        <div className="w-9/12 px-6 xl:px-0 flex justify-between">
          <Link href="/" passHref className="w-40 h-min p-4">
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
                  // initial={{ pathOffset: 0, stroke: '#fff', fill: '#000' }}
                  // whileHover={{
                  //   pathOffset: 1,
                  //   stroke: '#000',
                  //   fill: '#fff',
                  //   transition: { duration: 3.3 },
                  // }}
                  pathLength={100}
                  initial={{
                    strokeDasharray: 100,
                    strokeDashoffset: 100,
                  }}
                  animate={{
                    strokeDashoffset: 0,
                  }}
                  transition={{ duration: 2 }}
                  d="M144.18,147.85a15.18,15.18,0,0,1-6.91-1.52,12.82,12.82,0,0,1-5.22-5.11c-1.78-3.18-2.54-7.56-2.54-14.66,0-16.18-1.26-26.62-3.74-31-1-1.78-1.78-2.47-6.28-2.55V147.6H107.43V81.24h11.06a27.75,27.75,0,0,1,9.36,1.22A15.89,15.89,0,0,1,136.46,90c3.64,6.51,5.19,17.46,5.19,36.61,0,5.79.64,8.17,1.17,9.15.07.12.12.22.14.24a2.61,2.61,0,0,0,1.22.15c.74,0,.74,0,1-.5.8-1.62,1.2-4.65,1.2-9,0-19.15,1.55-30.09,5.19-36.6a15.58,15.58,0,0,1,8.53-7.5,28.19,28.19,0,0,1,9.36-1.22h11.06V147.6H168.43V93c-4.21.07-5.18.68-6.29,2.56-2.45,4.34-3.65,14.48-3.65,31,0,6.5-.72,10.83-2.33,14a12.15,12.15,0,0,1-4.87,5.39,13.37,13.37,0,0,1-7.11,1.87ZM126.78,27.36C126.78,10.6,137.41,0,154.07,0s26.16,9.25,26.16,25.05v.77H167.81v-1c0-8.1-4.7-13.49-13.74-13.49-9.32,0-14.87,6.94-14.87,15.41V43.36c0,9.25,5.18,15.41,14.87,15.41,9.88,0,13.74-4.91,13.74-13v-.67h-16V33.91h28.42V45.09c0,16.09-9.13,25-26.16,25-16.18,0-27.29-9.44-27.29-27.36ZM225.2,42.09l-9.35-29.88h-1.13l-8,29.88Zm.1-40.35L245,68.35H232.1l-4-14.84H203.76l-4,14.84H186.93L205.27,1.74Zm26.52,25.62C251.82,10.6,262.79,0,280,0s27,9.25,27,25.05v.77H294.14v-1c0-8.1-4.85-13.49-14.17-13.49-9.61,0-15.34,6.94-15.34,15.41V43.36c0,9.25,5.34,15.41,15.34,15.41,10.19,0,14.17-4.91,14.17-13v-.67h-16.5V33.91H307V45.09c0,16.09-9.41,25-27,25-16.7,0-28.15-9.44-28.15-27.36V27.36Zm115-25.62V13.16H328.24V29.05h36V40.47h-36V56.93h39.18V68.35H315.85V1.74ZM51,1.74V13.16H12.39V29.05h36V40.47h-36V56.93H51.57V68.35H0V1.74Zm189.09,79.5V92.66H201.47v15.89h36V120h-36v16.46h39.18v11.42H189.08V81.24Zm129.24,2.43V95H349.05v55H336.42V95H316.13V83.67ZM0,122.07H83.8V109.18H0ZM305.11,83.39H293.32V138.7l-.25,0c-2.84-.41-4.67-2.13-5.94-5.58-1.47-4-1.92-9.55-2.39-15.41l-.08-1.05c-.59-7.64-1.21-15.54-4-21.79a19,19,0,0,0-6.7-8.29,19.59,19.59,0,0,0-10.31-3.16H251.39V150h11.79V94.67l.3,0a8,8,0,0,1,3.91,1.4,10.77,10.77,0,0,1,3,4.46c1.55,4.15,1.92,9.82,2.31,15.83l.05.83c.39,6.79.87,15.24,3.66,21.58A18.34,18.34,0,0,0,283,147a19.67,19.67,0,0,0,9.8,3.05h12.31V83.39ZM116,1.74H104.24V57.05L104,57c-2.84-.41-4.67-2.13-5.94-5.58-1.47-4-1.92-9.55-2.39-15.41L95.58,35c-.6-7.64-1.21-15.54-4-21.78a19,19,0,0,0-6.7-8.3A19.59,19.59,0,0,0,74.6,1.74H62.31V68.35H74.1V13l.3,0a8,8,0,0,1,3.91,1.4,10.86,10.86,0,0,1,3,4.46c1.54,4.15,1.91,9.82,2.31,15.83l0,.83c.39,6.79.87,15.24,3.66,21.58a18.39,18.39,0,0,0,6.54,8.14,19.74,19.74,0,0,0,9.81,3H116V1.74Z"
                ></motion.path>
              </g>
            </motion.svg>
          </Link>
        </div>
        <div>
          {/* Desktop+ */}
          <div className="hidden xl:block">
            <motion.div
              // className="flex flex-row"
              onHoverStart={() => toggleHover()}
              onHoverEnd={() => toggleHover()}
            >
              <Link href="/">For Students</Link>
              <motion.div
                className="absolute flex flex-col bg-white border-2 border-black p-3"
                initial="exit"
                animate={isHover ? 'enter' : 'exit'}
                variants={subMenuAnimate}
              >
                <Link href="/">Submenu Item 1</Link>
                <Link href="/">Submenu Item 2</Link>
                <Link href="/">Submenu Item 3</Link>
              </motion.div>
            </motion.div>
            <div className="flex flex-row justify-evenly">
              <Link href="/" className="group">
                <span className="group-hover:text-red">Our Approach</span>
                <hr className="border-2 border-red group-hover:hidden" />
              </Link>
              <Link href="/" className="group">
                <span className="group-hover:text-green-blue">
                  Social Impact Initiatives
                </span>
                <hr className="border-2 border-green-blue group-hover:hidden" />
              </Link>
              <Link href="/" className="group">
                <span className="group-hover:text-yellow">News & Events</span>
                <hr className="border-2 border-yellow group-hover:hidden" />
              </Link>
            </div>
          </div>
          {/* Non-desktop */}
          <motion.nav
            // initial={false}
            // animate={isOpen ? 'open' : 'closed'}
            custom={height}
            ref={containerRef}
          >
            <MenuToggle
              toggle={() => {
                toggleNavOpen(!navOpen);
                // !navOpen ? blockScroll() : allowScroll();
              }}
              hover={() => toggleMenuHover()}
              isHover={menuButtonHover}
              isOpen={navOpen}
            />
            <AnimatePresence>
              {navOpen && (
                <motion.aside
                  className="absolute flex flex-col items-center w-full h-full top-0 left-0 bottom-0 pt-20 bg-white"
                  animate={{
                    borderRadius: 0,
                    // opacity: 1,
                    // top: 0,
                    // right: 0,
                    // transition: { ease: "easeOut" delay: 0.7, duration: 5.3 },
                  }}
                  exit={{
                    // width: '30px',
                    // height: '30px',
                    // top: '-100%',
                    // right: '45px',
                    // borderRadius: '50%',
                    // opacity: 0,
                    // left: '100vw',
                    transition: { delay: 0.2, duration: 1.15 },
                  }}
                >
                  <div className="">
                    <Link
                      href="/"
                      className="inline-block border-b-4 border-red hover:border-b-0"
                    >
                      Our Approach
                    </Link>
                    <br />
                    <Link
                      href="/"
                      className="border-b-4 border-green-blue hover:border-b-0"
                    >
                      Social Impact Initiatives
                    </Link>
                    <br />
                    <Link
                      href="/"
                      className="inline-block border-b-4 border-yellow group-hover:hidden"
                    >
                      News & Events
                    </Link>
                  </div>
                  <motion.ul
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={sidebar}
                  >
                    {links.map((link: NavLink) => (
                      <motion.li
                        variants={navItemsVariants}
                        // whileHover="hover"
                        className="mt-4 text-2xl"
                        key={link.label}
                      >
                        {ActiveLink(link.url) ? (
                          <span className="opacity-40">{link.label}</span>
                        ) : (
                          <Link href={link.url || ''} passHref>
                            {link.label}
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.aside>
              )}
            </AnimatePresence>
          </motion.nav>
          {/* <div className="flex flex-col items-center absolute w-full h-full xl:hidden">
            <div
            // className="flex flex-row"
            >
              <Link href="/">For Students</Link>
              <div className="flex flex-col">
                <Link href="/">Submenu Item 1</Link>
                <Link href="/">Submenu Item 2</Link>
                <Link href="/">Submenu Item 3</Link>
              </div>
            </div>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
