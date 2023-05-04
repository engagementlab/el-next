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

interface NavLink {
  label: string;
  url?: string;
  subMenu?: NavLink[];
}

const links: NavLink[] = [
  {
    label: 'About',
    subMenu: [
      {
        label: 'The Big Picture',
        url: '/about/big-picture',
      },
      {
        label: 'The Initiative',
        url: '/about/initiative',
      },
      {
        label: 'Our Community',
        url: '/about/community',
      },
    ],
  },
  {
    label: 'Media Archive',
    url: '/archive',
  },
  {
    label: 'Studios',
    url: '/studios',
  },
  {
    label: 'Latest',
    subMenu: [
      {
        label: 'News',
        url: '/news',
      },
      {
        label: 'Events',
        url: '/events',
      },
    ],
  },
  {
    label: 'Get Involved',
    url: '/get-involved',
  },
];

const customEase =
  'ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300';
const linkClass =
  'text-purple no-underline border-b-2 border-b-[rgba(141,51,210,0)] hover:border-b-[rgba(141,51,210,1)] transition-all';
const sidebar: Variants = {
  open: (height = 1000) => ({
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      duration: 0.3,
    },
  }),
  closed: {
    // clipPath: 'circle(20px at 263px 60px)',
    width: '50vw',
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.2,
      staggerDirection: -1,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};
const navItemsVariants: Variants = {
  open: {
    // display: 'block',/
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    // display: 'none',
    y: -50,
    opacity: 0,
    transition: {
      duration: 1,
      y: { stiffness: 1000 },
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

// const NavItems = (isOpen: boolean) => {
//   return (
//     <motion.ul
//       className="list-none text-purple text-2xl xl:text-lg text-right opacity-0"
//       // animate={isOpen ? 'open' : 'closed'}
//       variants={navVariants}
//     >
//       {links.map((link: NavLink) => {
//         // if (link.subMenu) {
//         //   return (
//         //     <li key={link.label} className="group">
//         //       <a
//         //         href="#"
//         //         onClick={(e) => {
//         //           e.preventDefault();
//         //         }}
//         //       >
//         //         {link.label}
//         //         <svg
//         //           height="10.0"
//         //           width="14"
//         //           className="inline ml-2 transition-transform group-hover:rotate-180"
//         //         >
//         //           <polygon
//         //             points="0,0 14,0 7.0,9.0"
//         //             style={{ fill: '#8D33D2' }}
//         //           ></polygon>
//         //         </svg>
//         //       </a>

//         //       <ul
//         //         className={`xl:p-3 xl:border-2 xl:translate-y-3 z-50 text-gray-700 border-purple bg-lynx text-right transition-all group-hover:opacity-100 group-hover:translate-y-0 ${customEase}`}
//         //       >
//         //         {link.subMenu.map((subLink: NavLink) => {
//         //           return (
//         //             <li className="mt-6 xl:mt-2" key={subLink.label}>
//         //               {ActiveLink(subLink.url) ? (
//         //                 <span
//         //                   onClick={() => {
//         //                     // toggleNavOpen(false);
//         //                   }}
//         //                   className="opacity-40"
//         //                 >
//         //                   {subLink.label}
//         //                 </span>
//         //               ) : (
//         //                 <Link href={subLink.url || ''} passHref>
//         //                   {subLink.label}
//         //                 </Link>
//         //               )}
//         //             </li>
//         //           );
//         //         })}
//         //       </ul>
//         //     </li>
//         //   );
//         // } else {
//         return (
//           <motion.li
//             // animate={isOpen ? 'open' : 'closed'}
//             variants={navItemsVariants}
//             // whileHover={{ scale: 1.1 }}
//             // whileTap={{ scale: 0.95 }}
//             className="mt-6 xl:mt-0"
//             key={link.label}
//           >
//             {ActiveLink(link.url) ? (
//               <span className="opacity-40">{link.label}</span>
//             ) : (
//               <Link href={link.url || ''} passHref>
//                 {link.label}
//               </Link>
//             )}
//           </motion.li>
//         );
//         // }
//       })}
//     </motion.ul>
//   );
// };

const Header = () => {
  const router = useRouter();
  const [isOpen, toggleOpen] = useCycle(false, true);

  const [menuButtonHover, toggleMenuHover] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      //   toggleNavOpen(false);
    });
  });

  // eslint-disable-next-line class-methods-use-this
  return (
    <div className="flex justify-center xl:px-8">
      <nav className="w-full mt-9 mb-1 flex flex-col md:flex-row">
        <div className="w-full px-6 xl:px-0 flex justify-between">
          <Link href="/" passHref>
            <svg
              viewBox="0 0.081 81.459 50"
              width="81.459"
              height="50"
              className="cursor-pointer"
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
            </svg>
          </Link>
        </div>
        <motion.nav
          initial={false}
          // animate={isOpen ? 'open' : 'closed'}
          custom={height}
          ref={containerRef}
        >
          {/*  */}

          <AnimatePresence>
            {isOpen && (
              <motion.aside
                className="absolute flex justify-center items-center rounded-full w-[30px] h-[30px] bg-red-300 "
                animate={{
                  position: 'absolute',
                  height: '100vh',
                  width: '100vw',
                  borderRadius: 0,
                  // opacity: 1,
                  top: 0,
                  left: 0,
                }}
                exit={{
                  // position: 'absolute',
                  // width: '30px',
                  // height: '30px',
                  // top: '50px',
                  // // right: '500px',
                  // left: '100vw',
                  transition: { delay: 0.7, duration: 5.3 },
                }}
              >
                <motion.ul
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={sidebar}
                >
                  {links.map((link: NavLink) => (
                    <motion.li
                      variants={navItemsVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-6 xl:mt-0"
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
          <MenuToggle
            toggle={() => toggleOpen()}
            hover={() => toggleMenuHover()}
            isHover={menuButtonHover}
          />
        </motion.nav>
      </nav>
    </div>
  );
};

export default Header;
