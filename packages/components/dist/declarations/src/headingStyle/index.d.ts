/**
 * @packageDocumentation
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Heading renderer
 * ==========
 */
import { ReactNode } from 'react';
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
    customRenderers?: {
        [x: number]: string;
    };
}
/**
 * Return a styled heading document fields
 * @returns {JSX.Element} Element
 * @see https://keystonejs.com/docs/guides/document-fields#overriding-the-default-renderers
 * @remarks
 * This is a renderer component that overrides Keystone's default document header styles with our default one, and further optional ones per heading level.
 */
export declare const HeadingStyle: ({ level, children, textAlign, customRenderers, }: HeadingProps) => JSX.Element;
export {};
