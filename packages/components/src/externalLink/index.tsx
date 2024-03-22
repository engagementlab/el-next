/**
 * @packageDocumentation
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * External link renderer
 * ==========
 */
import React from 'react';

interface ExternalLinkProps {
  href: string;
  label: string;
  /**
   * Optional tailwindcss class override
   */
  customClass?: string;
}
/**
 * Return a link with "external" SVG icon
 * @returns {JSX.Element} Element
 */
export const ExternalLink = ({
  href,
  label,
  customClass,
}: ExternalLinkProps) => {
  return (
    <a href={href} className={`${customClass || 'text-bluegreen'} group`}>
      {label}&nbsp;&nbsp;
      <svg
        viewBox="4.222 4.222 15.556 15.556"
        width="15.556"
        height="15.556"
        className="inline group-hover:translate-x-1 group-hover:-translate-y-1  transition-all"
      >
        <path
          d="M 13 7 L 18 12 M 18 12 L 13 17 M 18 12 L 6 12"
          transform="matrix(0.707107, -0.707107, 0.707107, 0.707107, -4.970563, 12)"
          style={{ stroke: 'rgb(2, 102, 112)', strokeWidth: '1px' }}
        ></path>
      </svg>
    </a>
  );
};
