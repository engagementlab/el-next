import React from 'react';
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
     * Open in new window
     */
    external?: boolean;
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
    icon?: React.JSX.Element;
    onClick?(): void;
}
/**
 * Return a <button> element wrapped in <Link>
 * @returns {React.JSX.Element} Element
 */
export declare const Button: ({ className, hoverColor, link, external, label, margin, anchorId, classOverride, icon, onClick, }: ButtonProps) => any;
export {};
