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
    const linkClass = 'xl:py-1 xl:px-2 w-full text-center';
    return (
        <ul className="flex flex-row justify-around w-full list-none text-blosson text-right mt-1">
        {links.map((link: NavLink, i) => {
            if(link.subMenu) {
                return ( 
                    <li key={link.label} className={`max-w-[${i === 0 ? '190' : '160'}px] group`}>
                    <a href="#"
                        className='text-center relative rounded-3xl px-10 py-3 text-lg uppercase bg-blossom transition-all duration-300 z-50 hover:bg-gold'
                        onClick={(e)=>{ e.preventDefault() }}>{link.label}</a>
                    <ul
                    className={`opacity-0 -mt-[100%] xl:border-2 text-gray-700 transition-all duration-1000 group-hover:opacity-100 group-hover:mt-5 ${customEase}`}>
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
    <div className='xl:flex justify-center'>
      <nav className="w-full xl:w-3/4 mt-9 mb-1 flex flex-col md:flex-row justify-center xl:justify-around">
          <Link href="/" className='flex justify-center'>
            <Image id="sjm-logo" alt="Social Justice and Media Symposium logo" imgId='sjm/logos/sjm'
                width={250} aspectDefault={true} className='max-h-[97px]' />
          </Link>
          <div className='p-5 w-full'>
            {NavItems()}
          </div>
          {/* Mobile/tablet */}
          {/* <div id="lines" className='relative z-50 cursor-pointer ' onClick={(e)=>{
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
          </div> */}
        {/* Desktop */}
        {/* <div className="hidden xl:flex flex-grow mt-4 items-center">
          {NavItems()}
        </div> */}
      </nav>
    </div>
  );
}

export default Header;