/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 *
 * @author Johnny Richardson
 * KeystoneJS document field renderers
 * ==========
 */
import { DocumentRendererProps } from '@keystone-6/document-renderer';
/**
 * Create function that return doc rendrers used by Keystone
 * @function
 * @param {object} [styles] - optional app-globalized style classes to all doc fields
 * @returns {function}
 */
export declare const DocRenderers: (styles?: {
    linkClass?: string;
}) => (renderOverrides?: {
    heading?: Function;
    layout?: Function;
    link?: Function;
    bold?: Function;
}) => DocumentRendererProps['renderers'];
