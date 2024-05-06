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
export declare const ExternalLink: ({ href, label, customClass, }: ExternalLinkProps) => React.JSX.Element;
export {};
