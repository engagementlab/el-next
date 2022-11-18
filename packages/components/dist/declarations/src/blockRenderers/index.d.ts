/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022
 *
 * @author Johnny Richardson
 * KeystoneJS document field block renderers
 * ==========
 */
/// <reference types="react" />
/**
 * Create function that returns custom block rendrers used by Keystone
 * @function
 * @param {object} [styles] - optional app-globalized style classes to all blocks
 * @returns {function}
 */
export declare const BlockRenderers: (styles?: {
    buttonClass?: string;
}) => (imageOveride?: (props: any) => JSX.Element, peopleOveride?: (peopleProps: any) => JSX.Element) => {
    image: (props: any) => JSX.Element;
    video: (props: any) => JSX.Element;
    button: (props: any) => JSX.Element;
    associatedPeople: (props: any) => JSX.Element;
};
