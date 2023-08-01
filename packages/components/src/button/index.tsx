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
  onClick?(): void;
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
  onClick,
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
  const anchorClassStr = `flex items-start transition-all font-bold duration-700 group text-sm lg:text-lg mt-3 font-semibold ${className}`;
  if (anchorId) {
    return (
      <button
        className={classOverride || anchorClassStr}
        onClick={() => scrollTo(anchorId)}
      >
        <div className="lg:inline-flex items-center overflow-hidden">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            className={`inline rotate-180 lg:rotate-90 mr-2 transition-transform group-hover:rotate-180 ${className}`}
          >
            <path d="M24 22h-24l12-20z" />
          </svg>
          <span className="">
            {label}
            <hr className="transition-all w-[150%] border-b-2  group-hover:-translate-x-[25px] hidden lg:block" />
          </span>
        </div>
      </button>
    );
  }
  if (onClick)
    return (
      <button
        className={`group ${classOverride || classStr}`}
        onClick={onClick}
      >
        {label} {icon}
      </button>
    );
  return (
    <Link href={link} passHref>
      <button className={`group ${classOverride || classStr}`}>
        {label} {icon}
      </button>
    </Link>
  );
};
