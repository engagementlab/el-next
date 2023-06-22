import React from 'react';
import Link from 'next/link';
import { scroller } from 'react-scroll';

/**
 * @packageDocumentation
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Link button archetype for nextjs
 * ==========
 */

interface ButtonProps {
  /**
   * The button's HREF attribute
   */
  link?: string;
  /**
   * The button's label
   */
  label: string;
  /**
   * Optional tailwindcss class suffix
   */
  className?: string;
  /**
   * Optional hover background color
   * - please use hex color
   * @defaultValue "#ab45f8"
   */
  hoverColor?: string;
  /**
   * Optional tailwindcss margin class
   * @defaultValue "my-10"
   */
  margin?: string;
  anchorId?: string;
  classOverride?: string;
  icon?: JSX.Element;
}

/**
 * Return a <button> element wrapped in <Link>
 * @returns {JSX.Element} Element
 */
export const Button = ({
  className,
  hoverColor,
  link,
  label,
  margin,
  anchorId,
  classOverride,
  icon,
}: ButtonProps) => {
  const scrollTo = (element: string) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const classStr = `${margin ? margin : `my-10`} hover:bg-[${
    hoverColor ? hoverColor : '#ab45f8'
  }] hover:scale-105 inline-block rounded-full px-10 py-7 uppercase bg-purple text-white transition-all duration-700 ${className}`;
  const anchorClassStr = `block flex flex-col items-end overflow-hidden transition-all font-bold duration-700 group text-sm lg:text-md mt-3 ${className}`;
  if (anchorId) {
    return (
      <button
        className={classOverride || anchorClassStr}
        onClick={() => scrollTo(anchorId)}
      >
        <div className="lg:flex items-center">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            className={`inline rotate-180 lg:rotate-90 mr-2 transition-transform group-hover:rotate-180 ${className}`}
          >
            <path d="M24 22h-24l12-20z" />
          </svg>
          <span>{label}</span>
        </div>
        <hr className="transition-all w-full border-b-2 translate-x-[25px] group-hover:translate-x-0 hidden lg:block" />
      </button>
    );
  }
  return (
    <Link href={link} passHref>
      <button className={`group ${classOverride || classStr}`}>
        {label} {icon}
      </button>
    </Link>
  );
};
