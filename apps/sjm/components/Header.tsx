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
            {url: '/events/2023', label: '2023: Las Vegas'},
            {url: '/events/2022', label: '2022: Miami'},
            {url: '/events/2021', label: '2021: Virtual'},
            {url: '/events/2020-persistence', label: '2020: Boston'},  
        ]
    },
    {
        label: 'Awards',
        subMenu : [
                {url: '/transformative-ml-scholar', label: 'Transformative ML Scholar'},
                {url: '/tranformational-research', label: 'Transformational Research'}
        ]
    }
];

const customEase = 'ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]';

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
    const linkClass = 'py-1 xl:px-2 w-full text-lg no-underline';
    return (
        <div className="flex flex-col justify-center w-full text-center text-blosson mt-1">
        {links.map((link: NavLink, i) => {
            if(link.subMenu) {
                return ( 
                    <>
                  <h3 className='w-full text-3xl font-bold uppercase text-blossom'>{link.label}</h3>
                  <div
                    className={`sublinks xl:border-2 text-gray-700 ${customEase}`}>
                      {link.subMenu.map((subLink: NavLink) => {
                        return (
                          <li key={subLink.label} className='flex items-center'>
                            {ActiveLink(subLink.url) ?
                              <span onClick={() => { toggleNavOpen(false); } } className={`${linkClass} block bg-blossom `}>{subLink.label}</span>
                              :
                              <Link href={subLink.url || ''} className={linkClass}>
                                {subLink.label}
                              </Link>}
                          </li>
                        );
                      })}
                    </div></>
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
        <hr className='py-2 border-gold w-1/2' />
        <div>
            <Link href="/" className={`${linkClass}`}>
              Dr. Moses Shumow
            </Link>
        </div>
    </div>
    
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
    <div className='xl:flex justify-center'>
      <nav className="w-full xl:w-3/4 mt-9 mb-1 flex flex-row justify-around">
          <Link href="/" className='flex justify-center'>
            <Image id="sjm-logo" alt="Social Justice and Media Symposium logo" imgId='sjm/logos/sjm'
                width={250} aspectDefault={true} className='max-h-[97px] w-1/2' />
          </Link>
          <div id="lines" className='relative z-50 cursor-pointer ' onClick={(e)=>{
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
        <div className={`block w-full fixed overflow-y-scroll top-0 left-0 h-full p-5 pt-20 z-40 bg-white
            transition-all ${customEase} ${!navOpen ? 'opacity-0'
            : 'opacity-100' }`}>

          {NavItems()}
        </div>

          {/* Mobile/tablet */}
        {/* Desktop */}
        {/* <div className="hidden xl:flex flex-grow mt-4 items-center">
          {NavItems()}
        </div> */}
      </nav>
    </div>
  );
}

export default Header;