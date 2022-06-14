import React, { Component } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import _ from 'lodash';
import Image from './Image';

const ActiveLink = (href: string | undefined) => {

    const router = useRouter();
    return router.asPath === href;

}

const LinkRender = (props: { link: string; label: string, pad?: boolean }) => {
    const linkClass = 'text-bluegreen no-underline border-b-2 border-b-[rgba(2,102,112,0)] hover:border-b-[rgba(2,102,112,1)] transition-all';
    return (
        <li className={props.pad ? 'pt-2' : ''}>
            {
                ActiveLink(props.link) ? 
                <span className='opacity-40'>{props.label}</span> 
                :
                <Link href={props.link} passHref>
                    <a className={linkClass}>
                        {props.label}
                    </a>
                </Link>
            }
        </li>
    );
    
}

class Footer extends Component {
  render() {
    return (
        <div>
        <div className='p-2 text-center text-sm border-t-[1px] border-t-[#E589E0] border-b-[1px] border-b-[#F4B477]'>
            If you or someone you know has been impacted by gun violence and are in need of support or services, please <span className='text-purple no-underline border-b-2 border-b-[rgba(141,51,210,0)] hover:border-b-[rgba(141,51,210,1)] transition-all'><Link href="/resources" passHref>click here</Link></span> for resources.
        </div>
        <nav className="w-full px-6 xl:px-12 my-7 mb-24">
            <Link href="/" passHref>
                <svg viewBox="0 0.081 58 35.601" width="58" height="35.601">
                    <title>Transforming Narratives of Gun Violence logo</title>
                    <g transform="matrix(0.11329, 0, 0, 0.11329, 0, 0.071911)">
                        <path d="M149,61.7V17.8H0v43.9h32.2c3.9,0,11.1-0.8,14.4,0.2v132.7H102V74.4c0-3.5-0.7-9.8,0.2-12.7H149z"
                            style={{'fill': 'rgb(2, 102, 112)'}}></path>
                        <path d="M362.4,163.7v-28.1c0-3.6,0.8-10-0.2-13h-59.8c-2,0-4.7-0.3-6.2,0.2v19.5c0,2.8-0.5,6.8,0.2,9.1h21.8
                    c3.1,0,7.5-0.6,10.1,0.2c-0.7,2.1-3.1,3.8-4.8,5c-1.9,1.4-3.7,3.1-6,4.1c-6,2.6-17.4,2.6-24,0.5c-9.3-3.1-13.6-9.7-16.1-19.7
                    c-0.7-2.6-0.5-5.5-0.5-8.6c0-13.5,4.6-22.9,13.9-26.9c9.7-4.2,24-1.3,27.8,6.2h29.6c3.7,0,10.4,0.8,13.4-0.2
                    c-2.5-20.2-14.7-32.3-30-39.8c-3.9-1.9-8.7-2.9-13-4.1c-6.7-1.9-15.9-1.6-24.2-1.4c-7.7,0.9-5.4,0.4-7.7,0.9
                    c-3.5,0.7-6.9,1.6-10.3,2.6c-16,5.9-28.4,16.7-35,31.9c-2.1,4.9-3.4,10.4-4.8,16.1c-2.1,8.2-1.5,21.9,0.5,29.5
                    c0.8,3.2,0.8,5.9,1.9,8.9c7.1,19.4,19.4,31.9,39.4,38.4c10.7,3.5,28.5,5.3,40.8,1.7c8.1-2.4,15.7-5.3,21.8-9.6c2.1-1.4,4-3.5,6-5
                    c2.4-1.7,4.6-3.7,6.5-6c1.9-2.5,4-4.9,5.8-7.4C360.4,167.2,361,165.1,362.4,163.7z"
                            style={{'fill': 'rgb(2, 102, 112)'}}></path>
                        <path d="M202.8,67.7c-3.7,0-9.3-0.8-12.5,0.2v64.2h-0.5c-2.8-5.4-6.9-10.3-10.1-15.4c-7-11.1-14.1-22-21.1-33.1
                    c-2.3-3.6-4.8-7.3-7.2-11c-1-1.5-2.8-3.1-3.4-5h-27.6c-3.7,0-9.3-0.8-12.5,0.2v127.2h40.1l0-63.3c1.6,0.8,2.4,3.4,3.4,4.8
                    c2.4,3.7,4.9,7.5,7.4,11.3c7.2,10.7,14.2,21.6,21.4,32.4c2.4,3.5,4.7,6.9,7,10.6c0.9,1.4,2.4,2.6,2.9,4.3h27.6
                    c3.5,0,9.8,0.8,12.7-0.2v-115c0-3.7,0.8-9.1-0.2-12.2H202.8z" style={{'fill': 'rgb(2, 102, 112)'}}></path>
                        <path
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
                            style={{'fill': 'rgb(2, 102, 112)'}}></path>
                    </g>
                </svg>
            </Link>
            <div className="mt-4 w-full flex flex-col lg:flex-row justify-between">
                <div className="mt-4 w-full lg:w-2/5 flex flex-col sm:flex-row justify-between text-bluegreen text-md font-semibold">

                    <ul className="list-none pt-2  lg:pt-0">
                        <LinkRender label='The Big Picture' link='/about/big-picture' />
                        <LinkRender label='About the Initiative' link='/about/initiative' pad={true} />
                        <LinkRender label='About Our Community' link='/about/community' pad={true} />
                    </ul>
                    <ul className="list-none pt-2  lg:pt-0">
                        <LinkRender label='Media Archive' link='/archive' />
                        <LinkRender label='Studios' link='/studios' pad={true} />
                    </ul>
                    <ul className="list-none pt-2  lg:pt-0">
                        <LinkRender label='News' link='/news' />
                        <LinkRender label='Events' link='/events' pad={true} />
                        <LinkRender label='Get Involved' link='/get-involved' pad={true} />
                    </ul>
                    {/* <ul className="list-none pt-2 md:pt-0">
                        <LinkRender label='Get Involved' link='/get-involved' pad={true} />
                        
                        <li className='pt-2'>
                            <Link href='/' passHref>
                            Facebook
                            </Link>
                        </li>
                        <li className='pt-2'>
                            <Link href='/' passHref>
                            Twitter
                            </Link>
                        </li>
                    </ul> */}
                </div>
                <div className="grid grid-cols-2 grid-rows-2 sm:grid-cols-4 mt-7 xl:mt-0 w-full md:w-1/2 lg:w-2/5 xl:w-1/3 list-none">
                    <svg viewBox="0 0 75 26.578" width="75" height="26.578" className=''>
                        <title>Engagement Lab logo</title>
                        <path fill="#F6A536" fillRule="evenodd"
                            d="M 73.222 24.141 C 73.222 23.798 72.916 23.456 72.305 23.456 L 70.336 23.456 L 70.336 24.826 L 72.305 24.826 C 72.906 24.826 73.222 24.484 73.222 24.141 Z M 72.967 21.4 C 72.967 21.057 72.662 20.715 72.06 20.715 L 70.336 20.715 L 70.336 22.085 L 72.111 22.085 C 72.682 22.066 72.967 21.733 72.967 21.4 Z M 74.619 24.141 C 74.619 25.169 73.844 26.197 72.305 26.197 L 68.909 26.197 L 68.909 19.344 L 72.06 19.344 C 73.6 19.344 74.364 20.372 74.364 21.41 C 74.364 21.85 74.221 22.281 73.946 22.644 C 74.395 23.035 74.619 23.593 74.619 24.141 Z"
                            clipRule="evenodd"></path>
                        <path fill="#00AB9E" fillRule="evenodd"
                            d="M 70.932 14.166 L 71.764 11.799 L 72.596 14.166 L 70.932 14.166 Z M 73.613 17.06 L 75 17.06 L 72.457 9.827 L 71.071 9.827 L 68.528 17.06 L 69.915 17.06 L 70.423 15.613 L 73.105 15.613 L 73.613 17.06 Z"
                            clipRule="evenodd"></path>
                        <path fill="#F72923" fillRule="evenodd"
                            d="M 74.239 5.791 L 74.239 7.161 L 69.289 7.161 L 69.289 0.309 L 70.637 0.309 L 70.637 5.791 L 74.239 5.791 Z"
                            clipRule="evenodd"></path>
                        <path fill="#000" fillRule="evenodd"
                            d="M 25.546 26.197 C 25.087 26.197 24.676 26.107 24.323 25.928 C 23.936 25.726 23.634 25.43 23.397 25.023 C 23.082 24.46 22.948 23.683 22.948 22.425 C 22.948 19.557 22.725 17.709 22.285 16.931 C 22.111 16.617 21.969 16.494 21.172 16.48 L 21.172 26.153 L 19.036 26.153 L 19.036 14.395 L 20.994 14.395 C 21.505 14.395 22.097 14.412 22.653 14.611 C 23.307 14.848 23.806 15.282 24.179 15.938 C 24.824 17.092 25.099 19.032 25.099 22.425 C 25.099 23.45 25.212 23.872 25.306 24.045 C 25.318 24.067 25.327 24.084 25.33 24.088 C 25.331 24.089 25.367 24.114 25.546 24.114 C 25.678 24.114 25.678 24.114 25.719 24.026 C 25.861 23.739 25.931 23.202 25.931 22.425 C 25.931 19.032 26.206 17.092 26.852 15.939 C 27.201 15.294 27.71 14.847 28.362 14.611 C 28.935 14.412 29.519 14.395 30.021 14.395 L 31.98 14.395 L 31.98 26.153 L 29.843 26.153 L 29.843 16.479 C 29.098 16.493 28.925 16.6 28.729 16.934 C 28.295 17.702 28.083 19.499 28.083 22.425 C 28.083 23.576 27.955 24.343 27.669 24.911 C 27.469 25.327 27.171 25.658 26.807 25.865 C 26.45 26.084 26.024 26.197 25.546 26.197 Z M 22.464 4.848 C 22.464 1.878 24.348 0 27.299 0 C 30.25 0 31.934 1.639 31.934 4.438 L 31.934 4.575 L 29.733 4.575 L 29.733 4.404 C 29.733 2.97 28.9 2.014 27.299 2.014 C 25.648 2.014 24.665 3.243 24.665 4.746 L 24.665 7.682 C 24.665 9.321 25.581 10.414 27.299 10.414 C 29.05 10.414 29.733 9.543 29.733 8.109 L 29.733 7.989 L 26.899 7.989 L 26.899 6.009 L 31.934 6.009 L 31.934 7.989 C 31.934 10.84 30.317 12.428 27.299 12.428 C 24.431 12.428 22.464 10.755 22.464 7.58 L 22.464 4.848 Z M 39.902 7.457 L 38.246 2.163 L 38.045 2.163 L 36.622 7.457 L 39.902 7.457 Z M 39.92 0.309 L 43.401 12.111 L 41.124 12.111 L 40.421 9.48 L 36.102 9.48 L 35.399 12.111 L 33.122 12.111 L 36.37 0.309 L 39.92 0.309 Z M 44.619 4.848 C 44.619 1.878 46.562 0 49.606 0 C 52.651 0 54.388 1.639 54.388 4.438 L 54.388 4.575 L 52.117 4.575 L 52.117 4.404 C 52.117 2.97 51.257 2.014 49.606 2.014 C 47.904 2.014 46.889 3.243 46.889 4.746 L 46.889 7.682 C 46.889 9.321 47.835 10.414 49.606 10.414 C 51.412 10.414 52.117 9.543 52.117 8.109 L 52.117 7.989 L 49.194 7.989 L 49.194 6.009 L 54.388 6.009 L 54.388 7.989 C 54.388 10.84 52.72 12.428 49.606 12.428 C 46.648 12.428 44.619 10.755 44.619 7.58 L 44.619 4.848 Z M 65.002 0.309 L 65.002 2.332 L 58.16 2.332 L 58.16 5.148 L 64.536 5.148 L 64.536 7.171 L 58.16 7.171 L 58.16 10.088 L 65.102 10.088 L 65.102 12.111 L 55.964 12.111 L 55.964 0.309 L 65.002 0.309 Z M 9.037 0.309 L 9.037 2.332 L 2.196 2.332 L 2.196 5.148 L 8.572 5.148 L 8.572 7.171 L 2.196 7.171 L 2.196 10.088 L 9.137 10.088 L 9.137 12.111 L 0 12.111 L 0 0.309 L 9.037 0.309 Z M 42.54 14.395 L 42.54 16.418 L 35.698 16.418 L 35.698 19.234 L 42.074 19.234 L 42.074 21.257 L 35.698 21.257 L 35.698 24.174 L 42.64 24.174 L 42.64 26.197 L 33.503 26.197 L 33.503 14.395 L 42.54 14.395 Z M 65.441 14.825 L 65.441 16.839 L 61.846 16.839 L 61.846 26.578 L 59.608 26.578 L 59.608 16.839 L 56.014 16.839 L 56.014 14.825 L 65.441 14.825 Z M 0 21.628 L 14.848 21.628 L 14.848 19.344 L 0 19.344 L 0 21.628 Z M 54.061 14.776 L 51.972 14.776 L 51.972 24.576 L 51.927 24.57 C 51.424 24.497 51.1 24.193 50.875 23.582 C 50.614 22.871 50.536 21.89 50.452 20.851 L 50.437 20.665 C 50.332 19.311 50.223 17.912 49.734 16.805 C 49.443 16.157 49.054 15.675 48.548 15.335 C 48.064 15.001 47.449 14.813 46.721 14.776 L 44.543 14.776 L 44.543 26.578 L 46.632 26.578 L 46.632 16.775 L 46.684 16.781 C 46.964 16.811 47.193 16.895 47.377 17.03 C 47.593 17.203 47.765 17.457 47.916 17.819 C 48.19 18.554 48.256 19.56 48.325 20.624 L 48.335 20.772 C 48.403 21.975 48.489 23.472 48.983 24.595 C 49.273 25.241 49.652 25.713 50.143 26.038 C 50.62 26.354 51.205 26.535 51.88 26.577 L 54.061 26.578 L 54.061 14.776 Z M 20.558 0.309 L 18.469 0.309 L 18.469 10.109 L 18.425 10.103 C 17.922 10.03 17.597 9.726 17.372 9.115 C 17.112 8.404 17.033 7.423 16.95 6.384 L 16.935 6.198 C 16.83 4.844 16.721 3.445 16.231 2.338 C 15.94 1.69 15.551 1.208 15.045 0.868 C 14.561 0.534 13.946 0.346 13.219 0.309 L 11.04 0.309 L 11.04 12.111 L 13.13 12.111 L 13.13 2.308 L 13.182 2.314 C 13.461 2.344 13.691 2.428 13.874 2.563 C 14.09 2.736 14.263 2.99 14.414 3.352 C 14.687 4.087 14.753 5.093 14.823 6.157 L 14.832 6.305 C 14.901 7.508 14.986 9.005 15.48 10.128 C 15.771 10.774 16.15 11.246 16.64 11.571 C 17.117 11.887 17.702 12.068 18.378 12.11 L 20.558 12.111 L 20.558 0.309 Z"
                            clipRule="evenodd"></path>
                    </svg>
                    <svg viewBox="10.036 10.287 77.171 26" width="77.171" height="26" className='flex-shrink-0'>
                        <title>Emerson College logo</title>
                        <path
                            d="M 34.457 24.852 L 34.457 24.309 C 34.535 24.283 34.587 24.231 34.638 24.231 C 35.777 24.101 35.777 24.101 35.777 22.989 C 35.777 21.566 35.803 20.169 35.777 18.746 C 35.751 16.78 34.691 16.108 32.879 16.884 C 32.492 17.039 32.129 17.272 31.715 17.504 L 31.715 23.145 C 31.715 24.153 31.767 24.206 32.776 24.257 C 32.879 24.257 32.957 24.283 33.112 24.309 C 33.138 24.49 33.138 24.671 33.164 24.904 L 28.559 24.904 C 28.533 24.723 28.533 24.542 28.507 24.361 C 28.636 24.309 28.688 24.283 28.766 24.283 C 29.853 24.206 29.853 24.206 29.853 23.119 L 29.853 18.928 C 29.827 16.78 28.637 16.056 26.748 17.039 C 26.438 17.194 26.153 17.376 25.817 17.557 L 25.817 23.248 C 25.817 24.205 25.868 24.231 26.8 24.282 C 26.903 24.282 26.981 24.308 27.137 24.334 C 27.162 24.515 27.162 24.671 27.188 24.929 L 22.557 24.929 L 22.557 24.36 C 22.997 24.283 23.411 24.231 23.877 24.153 C 23.902 23.843 23.954 23.61 23.954 23.351 L 23.954 18.307 C 23.954 17.66 23.825 17.091 23.152 16.806 C 22.997 16.729 22.919 16.547 22.713 16.289 C 23.721 15.927 24.627 15.616 25.662 15.254 C 25.739 15.745 25.791 16.159 25.869 16.677 C 26.049 16.573 26.205 16.495 26.334 16.392 C 27.084 15.875 27.86 15.435 28.792 15.358 C 30.008 15.228 31.043 15.564 31.561 16.832 C 32.052 16.522 32.44 16.185 32.905 15.978 C 33.552 15.694 34.225 15.409 34.897 15.358 C 36.45 15.254 37.459 16.159 37.562 17.712 C 37.639 19.109 37.614 20.506 37.614 21.903 L 37.614 23.222 C 37.614 24.179 37.691 24.231 38.648 24.309 C 38.726 24.309 38.804 24.334 38.933 24.36 C 38.933 24.541 38.959 24.722 38.985 24.955 C 37.433 24.852 35.984 24.852 34.458 24.852 Z M 14.201 11.114 L 14.201 16.729 C 15.313 16.729 16.4 16.78 17.461 16.703 C 18.056 16.651 18.289 16.108 18.418 15.564 C 18.469 15.358 18.625 15.176 18.728 14.995 L 18.961 15.072 L 18.961 19.729 C 18.884 19.755 18.728 19.781 18.573 19.833 C 18.522 19.678 18.496 19.601 18.47 19.496 C 18.314 18.073 18.056 17.867 16.633 17.867 L 14.175 17.867 L 14.175 21.644 C 14.175 22.032 14.201 22.394 14.253 22.782 C 14.33 23.584 14.615 23.998 15.391 24.024 C 16.633 24.05 17.875 24.024 19.091 23.869 C 20.1 23.739 20.617 22.937 21.005 22.058 C 21.082 21.877 21.16 21.722 21.264 21.514 C 21.444 21.54 21.6 21.592 21.859 21.618 C 21.574 22.731 21.29 23.791 21.005 24.878 L 10.088 24.878 C 10.062 24.671 10.062 24.49 10.036 24.283 C 10.321 24.257 10.527 24.231 10.76 24.205 C 11.64 24.102 11.924 23.817 11.976 22.911 C 12.002 22.291 12.002 21.644 12.002 21.023 C 12.002 18.151 12.002 15.305 11.976 12.434 C 11.976 11.296 11.821 11.167 10.657 11.011 C 10.528 10.985 10.398 10.985 10.269 10.959 C 10.217 10.959 10.165 10.908 10.062 10.856 C 10.062 10.7 10.036 10.52 10.036 10.287 L 20.306 10.287 L 20.306 13.495 C 20.255 13.521 20.178 13.572 20.125 13.598 C 19.996 13.469 19.763 13.365 19.737 13.21 C 19.453 11.684 18.444 11.089 16.995 11.089 C 16.038 11.089 15.158 11.114 14.201 11.114 Z M 79.937 17.453 L 79.937 23.585 C 79.937 23.972 80.17 24.18 80.558 24.206 C 80.791 24.206 80.998 24.231 81.283 24.231 C 81.309 24.438 81.309 24.62 81.335 24.852 L 76.781 24.852 L 76.781 24.283 C 77.221 24.206 77.609 24.154 77.997 24.076 C 78.049 23.869 78.075 23.74 78.075 23.611 L 78.075 17.996 C 78.075 17.479 77.79 17.194 77.35 17.013 C 77.066 16.885 76.781 16.729 76.962 16.289 C 77.868 15.953 78.773 15.643 79.808 15.254 C 79.86 15.746 79.912 16.16 79.963 16.677 C 80.326 16.444 80.636 16.238 80.921 16.057 C 81.852 15.487 82.861 15.125 83.973 15.332 C 85.112 15.539 85.836 16.444 85.862 17.738 C 85.913 19.549 85.913 21.36 85.913 23.171 C 85.913 24.18 85.913 24.18 86.922 24.231 C 87 24.231 87.077 24.257 87.207 24.283 L 87.207 24.904 L 82.731 24.904 C 82.731 24.697 82.705 24.516 82.705 24.309 C 83.119 24.258 83.456 24.206 83.895 24.153 C 83.922 23.869 83.999 23.585 83.999 23.326 L 83.999 18.411 C 83.999 17.065 83.094 16.315 81.774 16.677 C 81.205 16.806 80.584 17.169 79.937 17.453 Z M 75.488 20.195 C 75.488 22.964 73.289 25.24 70.624 25.24 C 67.701 25.24 65.502 23.092 65.502 20.273 C 65.528 17.427 67.649 15.228 70.417 15.254 C 73.392 15.254 75.488 17.323 75.488 20.195 Z M 73.392 20.48 C 73.418 19.29 72.926 17.737 72.28 16.936 C 71.167 15.616 69.512 15.642 68.503 16.961 C 67.131 18.746 67.39 22.264 68.968 23.817 C 69.977 24.8 71.504 24.722 72.383 23.636 C 73.134 22.731 73.366 21.618 73.392 20.48 Z M 41.908 19.212 C 41.52 20.661 42.193 22.601 43.357 23.352 C 44.987 24.412 46.28 23.558 47.496 22.497 C 47.574 22.523 47.625 22.497 47.677 22.523 C 47.755 22.601 47.832 22.678 47.884 22.756 C 47.212 24.179 45.426 25.266 43.874 25.214 C 42.167 25.162 40.951 24.257 40.304 22.575 C 39.502 20.48 40.046 17.763 41.572 16.366 C 43.357 14.71 46.28 14.969 47.392 16.936 C 47.781 17.608 47.936 18.307 47.703 19.212 L 41.908 19.212 Z M 45.815 18.281 C 45.969 17.531 45.815 16.909 45.271 16.47 C 44.651 15.952 43.9 15.978 43.228 16.341 C 42.452 16.728 42.064 17.427 41.96 18.281 L 45.815 18.281 Z M 57.456 22.058 C 57.637 22.006 57.766 21.955 57.922 21.903 C 58.051 22.239 58.155 22.55 58.284 22.834 C 58.775 23.998 59.836 24.567 61 24.334 C 61.984 24.153 62.501 22.989 61.854 22.213 C 61.466 21.747 60.845 21.437 60.302 21.101 C 59.836 20.816 59.319 20.609 58.853 20.324 C 57.844 19.678 57.456 18.721 57.663 17.556 C 57.87 16.392 58.646 15.719 59.733 15.409 C 60.975 15.047 62.139 15.306 63.355 15.875 C 63.406 16.573 63.458 17.272 63.51 18.074 C 63.277 18.1 63.122 18.126 62.941 18.126 C 62.811 17.815 62.734 17.531 62.63 17.272 C 62.19 16.263 61.026 15.797 59.992 16.237 C 59.086 16.625 58.827 17.608 59.526 18.281 C 60.017 18.746 60.664 19.005 61.259 19.341 C 61.621 19.548 62.009 19.704 62.398 19.885 C 63.406 20.376 63.975 21.204 63.949 22.342 C 63.924 23.506 63.303 24.36 62.268 24.8 C 60.742 25.499 59.215 25.292 57.689 24.464 C 57.611 23.714 57.534 22.912 57.456 22.058 Z M 49.488 16.496 C 50.368 16.082 51.247 15.642 52.282 15.15 C 52.334 15.875 52.36 16.444 52.385 17.169 C 52.644 16.832 52.799 16.625 52.955 16.444 C 53.394 15.901 53.912 15.461 54.611 15.306 C 55.49 15.099 56.214 15.642 56.214 16.47 C 56.214 17.375 55.438 17.841 54.636 17.453 C 53.394 16.832 52.411 17.453 52.411 18.876 L 52.411 23.403 C 52.411 24.102 52.541 24.231 53.265 24.231 L 54.507 24.231 L 54.507 24.878 L 49.074 24.878 C 49.048 24.697 49.023 24.516 48.997 24.257 C 49.333 24.231 49.617 24.206 49.876 24.206 C 50.316 24.206 50.575 23.998 50.575 23.559 C 50.575 21.67 50.601 19.782 50.549 17.893 C 50.549 17.634 50.161 17.35 49.928 17.091 C 49.773 16.936 49.592 16.832 49.41 16.703 C 49.436 16.625 49.462 16.548 49.488 16.496 Z M 29.801 33.415 C 29.775 31.734 30.939 30.543 32.595 30.518 C 34.251 30.492 35.466 31.707 35.466 33.415 C 35.466 35.045 34.277 36.261 32.621 36.287 C 31.017 36.312 29.8 35.097 29.8 33.415 Z M 34.768 33.466 C 34.819 32.173 33.94 31.19 32.673 31.165 C 31.404 31.113 30.473 32.018 30.422 33.312 C 30.37 34.631 31.25 35.614 32.543 35.666 C 33.785 35.717 34.742 34.786 34.768 33.467 Z M 67.261 35.329 L 67.261 33.777 L 66.097 33.7 L 66.097 33.156 L 67.882 33.156 L 67.882 35.692 C 66.873 36.597 64.674 36.442 63.769 35.381 C 62.708 34.139 62.837 32.121 64.027 31.138 C 65.166 30.207 67.002 30.284 67.83 31.345 C 67.726 31.474 67.598 31.604 67.494 31.733 C 65.838 30.931 64.881 31.009 64.131 31.992 C 63.535 32.794 63.588 34.165 64.234 34.941 C 64.881 35.717 66.226 35.898 67.261 35.329 Z M 55.93 35.51 L 58.62 35.51 L 58.62 36.105 L 55.206 36.105 L 55.206 30.724 L 58.491 30.724 L 58.517 31.268 L 55.904 31.268 L 55.904 32.975 L 58.413 33.001 L 58.439 33.596 L 55.93 33.596 L 55.93 35.51 Z M 73.729 35.51 L 76.419 35.51 L 76.419 36.105 L 73.004 36.105 L 73.004 30.724 L 76.29 30.724 L 76.316 31.268 L 73.729 31.268 L 73.729 32.975 L 76.212 33.001 L 76.238 33.596 L 73.729 33.596 L 73.729 35.51 Z M 25.17 34.864 C 25.325 34.967 25.455 35.07 25.558 35.174 C 25.17 36.054 24.161 36.442 22.945 36.209 C 21.677 35.976 20.798 34.942 20.746 33.648 C 20.669 32.07 21.419 30.983 22.816 30.621 C 23.902 30.337 24.989 30.673 25.403 31.475 C 25.274 31.578 25.144 31.707 25.041 31.811 C 23.695 30.673 22.505 31.164 21.859 31.94 C 21.16 32.794 21.263 34.269 22.039 35.045 C 22.894 35.898 23.98 35.847 25.17 34.864 Z M 40.175 36.105 L 40.175 30.672 L 40.796 30.646 L 40.796 35.51 L 43.253 35.51 L 43.253 36.105 L 40.175 36.105 Z M 48.324 35.536 L 50.807 35.536 L 50.807 36.106 L 47.755 36.106 L 47.755 30.673 L 48.298 30.673 L 48.324 35.536 Z"
                            style={{'fill': 'rgb(98, 50, 147)'}}></path>
                    </svg>
                    <Image id="ldpni-logo" alt="Louis D. Brown Peace Institute (LDBPI) logo" imgId='tngvi/logos/ldpi'
                        width={86} />
                    <Image id="mgh-logo" alt="MGH Center for Gun Violence Prevention logo" imgId='tngvi/logos/mgh-cgvp'
                        width={89} className='aspect-[3/2]' />
                </div>
                </div>
                </nav>
        </div>
    );
  }
}

export default Footer;
