/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2021-2024
 *
 * @author Johnny Richardson
 * Cloudinary image component
 * ==========
 */
import React from 'react';
interface ImageProps {
    /**
     * The image's alt text
     */
    alt: string;
    /**
     * The image's ID attribute
     */
    id: string;
    /**
     * The image's cloud public id attribute
     */
    imgId: string;
    /**
     * The image element's optional class
     */
    className?: string;
    /**
     * The image's optional cloud transformations
     * @defaultValue "f_auto,dpr_auto,ar_4:3,c_crop,g_center"
     * - 'c_crop,g_center' are omitted if maxWidth defined
     */
    transforms?: string;
    /**
     * The image's optional width
     */
    width?: number;
    /**
     *  The largest optional width for responsive steps
     */
    maxWidth?: number;
    maxWidthDisable?: boolean;
    /**
     * @defaultValue true
     *  - If set to false, the image will not be lazily-loaded
     */
    lazy?: boolean;
    /**
     * @defaultValue true
     * - If set to false, the image will not use a 4:3 aspect ratio
     */
    aspectDefault?: boolean;
}
interface ImageUrlProps {
    /**
     * The image's cloud public id attribute
     */
    imgId: string;
    /**
     * The image's width
     */
    width: number;
    /**
     * The image's optional cloud transformations
     * @defaultValue "f_auto,dpr_auto,c_crop,g_center,ar_4:3"
     */
    transforms?: string;
    /**
     * @defaultValue true
     * - If set to false, the image will not use a 4:3 aspect ratio
     */
    aspectDefault?: boolean;
}
/**
 * Return a Cloudinary AdvancedImage component
 * @returns {React.ReactElement} The image component
 *
 * @extends {Component<Props>}
 */
declare const Image: ({ alt, className, id, imgId, transforms, width, maxWidth, maxWidthDisable, lazy, aspectDefault, }: ImageProps) => React.JSX.Element;
/**
 * Return a Cloudinary url
 * @returns {string} The image URL
 *
 * @typedef {object} ImageUrlProps
 * @
 *
 * @extends {Component<Props>}
 */
declare const ImageUrl: ({ imgId, width, transforms, aspectDefault, }: ImageUrlProps) => string;
export { Image as default, ImageUrl };
