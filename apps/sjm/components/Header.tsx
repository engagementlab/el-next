import React from 'react';
import {
  useRouter
} from 'next/router';
import Link from 'next/link';
import _ from 'lodash';
import create from 'zustand';
import { useEffect } from 'react';
import Image from '@el-next/components/image';

interface NavLink {
  label: string;
  url ? : string;
  subMenu ? : NavLink[];
}

const links: NavLink[] = [
    {
        label:  'Symposium',
        subMenu : [
            {url: '2023-las-vegas', label: '2023: Las Vegas'},
            {url: '2022-miami', label: '2022: Miami'},
            {url: '2021', label: '2021: Virtual'},
            {url: '2020', label: '2020: Boston'},  
        ]
    },
    {
        label: 'Awards',
        subMenu : [
                {url: '/transformative-ml-scholar', label: 'Transformative ML Scholar'},
                {url: '/tranformational-research', label: 'Transformational Research'}
        ]
    },
    {
        label: 'Gallery',
        subMenu : [
                {url: '/2020#gallery', label: '2020'},
                {url: '/2022-miami#gallery', label: '2022'}
        ]
    },
    {
        label: 'About',
        subMenu : [
                {url: '/mosesshumow', label: 'Dr. Moses Shumow'}
        ]
    }
];

const customEase = 'ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300';

type NavState = {
    navOpen: boolean
    toggleNavOpen: (open: boolean) => void
}

// Create store with Zustand
const useStore = create<NavState>(set => ({
    navOpen: false,
    toggleNavOpen: (open: boolean) => set((state) => { 
        document.body.style.overflow = open ? 'hidden' : 'visible';
        if(open) window.scrollTo(0, 0);
        return { ...state, navOpen:open }; 
    }),
}));

const ActiveLink = (href: string | undefined) => {

    const router = useRouter();
    return router.asPath === `/${href}/`;

}

const NavItems = () => {
    const toggleNavOpen = useStore(state => state.toggleNavOpen);
    const linkClass = 'py-3 xl:py-1 xl:px-6 w-full text-center';
    return (
        <ul className="flex flex-col xl:flex-row justify-between pt-10 w-full list-none text-blosson text-2xl xl:text-lg text-right">
        {links.map((link: NavLink) => {
            if(link.subMenu) {
                return ( 
                    <li key={link.label} className='flex flex-col max-w-[190px] group'>
                    <a href="#"
                        className='hidden xl:block text-center rounded-3xl px-10 py-3 uppercase bg-blossom transition-all duration-700 hover:bg-gold'
                        onClick={(e)=>{ e.preventDefault() }}>{link.label}</a>

                        <p className='xl:hidden'>{link.label}</p>
                    <ul
                    className={`xl:opacity-0 xl:border-2 z-50 text-gray-700 transition-all group-hover:opacity-100 group-hover:translate-y-0 ${customEase}`}>
                        {link.subMenu.map((subLink: NavLink) => {
                        return (
                            <li key={subLink.label}>
                            {
                            ActiveLink(subLink.url) ? 
                                <span onClick={()=>{toggleNavOpen(false) }} className={`${linkClass} block bg-blossom `}>{subLink.label}</span> 
                            :
                                <Link href={subLink.url || '' } className={`${linkClass} inline-block transition-all duration-700 hover:bg-gold cursor-pointer`}>
                                    {subLink.label}
                                </Link>
                            }
                            </li>
                        );
                        })}
                    </ul>
                </li>
            );
        }
        else {
            return (
            <li className='mt-6 xl:mt-0' key={link.label}>
                {
                ActiveLink(link.url) ? 
                    <span className='opacity-40'>{link.label}</span> 
                    : 
                    <Link href={link.url || '' }>
                    {link.label}
                    </Link>
                }
            </li>
            );
        }
        })}
    </ul>
    )
}

const Header = () => {
  const navOpen = useStore(state => state.navOpen);
  const toggleNavOpen = useStore(state => state.toggleNavOpen);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      toggleNavOpen(false);
    });
  });
  
  return (
    <div className="flex justify-center xl:px-8">
      <nav className="w-full xl:w-3/4 mt-9 mb-1 flex flex-col md:flex-row">
        <div className="w-full xl:w-1/3 xl:px-0 px-6 flex justify-between xl:justify-center">
          <Link href="/">
            <Image id="sjm-logo" alt="Social Justice and Media Symposium logo" imgId='sjm/logos/sjm'
                width={250} className='hidden xl:block' />
            <Image id="sjm-logo" alt="Social Justice and Media Symposium logo" imgId='sjm/icon'
                width={75} className='block xl:hidden' />
          </Link>
          {/* Mobile/tablet */}
          <div id="lines" className='block xl:hidden relative z-50 cursor-pointer' onClick={(e)=>{
            toggleNavOpen(!navOpen) }}>
            <span className={`block relative h-[1px] w-12 bg-blossom opacity-100 origin-center transition-all
              ${customEase} ${navOpen ? 'opacity-0 left-4' : ' left-0'
              }`}></span>
            <span className={`block relative h-[1px] w-12 bg-blossom opacity-100 left-0 origin-center transition-all
              ${customEase} ${navOpen ? 'rotate-45 top-0' : 'top-4'
              }`}></span>
            <span className={`block relative h-[1px] w-12 bg-blossom opacity-100 left-0 origin-center transition-all
              ${customEase} ${navOpen ? '-rotate-45 top-0' : 'top-8'
              }`}></span>
          </div>
        </div>
        <div className={`xl:hidden block w-full fixed overflow-y-scroll top-0 left-full h-full p-5 pt-20 z-40 bg-white
            transition-all ${customEase} ${!navOpen ? 'opacity-0'
            : '-translate-x-full opacity-100' }`}>
          {NavItems()}
        </div>
        {/* Desktop */}
        <div className="hidden xl:flex flex-grow mt-4 items-center">
          {NavItems()}
        </div>
      </nav>
    </div>
  );
}

export default Header;