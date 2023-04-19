/// <reference types="react" />
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
export declare const Button: ({ className, hoverColor, link, label, margin, }: ButtonProps) => JSX.Element;
export {};
