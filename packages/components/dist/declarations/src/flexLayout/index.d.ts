/**
 * @packageDocumentation
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * Flex layout renderer
 * ==========
 */
import { JSXElementConstructor, ReactElement } from 'react';
interface FlexProps {
    /**
     * Array of indices defining the layout type provided by the component
     */
    layout: [number, ...number[]];
    /**
     * The layout's columns
     */
    children: ReactElement<any, string | JSXElementConstructor<any>>[];
}
/**
 * Return a flex layout for document fields
 * @returns {JSX.Element} Element
 * @see https://keystonejs.com/docs/guides/document-fields#overriding-the-default-renderers
 * @remarks
 * This is a renderer component that overrides KeystoneJS 5.x's default layout DocumentRendererProp to use flex, rather than grid layout, allowing for responsive layout
 */
export declare const FlexLayout: ({ layout, children }: FlexProps) => JSX.Element;
export {};
