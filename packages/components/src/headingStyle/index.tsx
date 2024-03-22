/**
 * @packageDocumentation
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Heading renderer
 * ==========
 */

import React, { ReactNode } from 'react';

interface HeadingProps {
  /**
   * The header's level (importance)
   */
  level: number;
  /**
   * The header's HTML content
   */
  children: ReactNode;
  /**
   * The header's text alignment
   */
  textAlign: 'center' | 'end' | undefined;
  /**
   * Custom tailwindcss classes on a per-level basis
   */
  customRenderers?: { [x: number]: string };
}

/**
 * Return a styled heading document fields
 * @returns {JSX.Element} Element
 * @see https://keystonejs.com/docs/guides/document-fields#overriding-the-default-renderers
 * @remarks
 * This is a renderer component that overrides Keystone's default document header styles with our default one, and further optional ones per heading level.
 * @example
 * const customRenderers = {
 *  3: 'text-4xl font-medium tracking-wider my-4',
 * };
 * return HeadingStyle({ level, children, textAlign, customRenderers });
 */

export const HeadingStyle = ({
  level,
  children,
  textAlign,
  customRenderers,
}: HeadingProps) => {
  const defaultClass = `${
    level === 3 && 'h3 text-2xl text-coated leading-none'
  } ${level === 4 && 'text-md text-coated mt-8 lg:mt-12 mb-2'} font-semibold`;
  const customClass = customRenderers && customRenderers[level];

  return (
    <p className={customClass || defaultClass} style={{ textAlign }}>
      {children}
    </p>
  );
};
