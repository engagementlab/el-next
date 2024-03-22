/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 * @packageDocumentation
 * @author Johnny Richardson
 * KeystoneJS document field block renderers
 * ==========
 */
/// <reference types="react" />
/**
 * Create function that returns custom block renderers used by Keystone
 * @function
 * @param {string} [styles] - optional app-globalized tailwindcss classes to all blocks
 * @returns {function}
 * @see https://keystonejs.com/docs/guides/document-fields#component-blocks
 */
export declare const BlockRenderers: (styles?: {
    buttonClass?: string;
}) => (blockOverrides: {
    imageOverride?: (props: any) => JSX.Element;
    peopleOverride?: (peopleProps: any) => JSX.Element;
    buttonOverride?: (props: any) => JSX.Element;
}) => {
    image: (props: any) => JSX.Element;
    video: (props: any) => JSX.Element;
    button: (props: any) => JSX.Element;
    pageAnchor: (props: any) => JSX.Element;
    associatedPeople: (props: any) => JSX.Element;
};
