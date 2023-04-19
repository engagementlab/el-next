import React from 'react';
import Link from 'next/link';

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
  link: string;
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
}: ButtonProps) => {
  const classStr = `${margin ? margin : `my-10`} hover:bg-[${
    hoverColor ? hoverColor : '#ab45f8'
  }] hover:scale-105 inline-block rounded-full px-10 py-7 uppercase bg-purple text-white transition-all duration-700 ${className}`;
  return (
    <Link href={link} passHref>
      <button className={classStr}>{label}</button>
    </Link>
  );
};
