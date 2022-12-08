/// <reference types="react" />
/**
 * @typedef ImageProps
 * @prop {string} alt - The image's alt text
 * @prop {string} id - The image's ID attribute
 * @prop {string} imgId - The image's cloud public id attribute
 * @prop {string} [className] - The image element's optional class
 * @prop {string} [transforms] - The image's optional cloud transformations
 * @prop {number} [width] - The image's optional width
 * @prop {boolean} [lazy=true] - If set to false, the image will not be lazily-loaded
 * @prop {boolean} [aspectDefault=true] - If set to false, the image will not use a 4:3 aspect ratio
 */
declare type ImageProps = {
    alt: string;
    id: string;
    imgId: string;
    className?: string;
    transforms?: string;
    width?: number;
    lazy?: boolean;
    aspectDefault?: boolean;
};
/**
 * @typedef ImageUrlProps
 * @prop {string} imgId - The image's cloud public id attribute
 * @prop {number} width - The image's width
 * @prop {string} [transforms] - The image's optional cloud transformations
 * @prop {boolean} [aspectDefault=true] - If set to false, the image will not use a 4:3 aspect ratio
 */
declare type ImageUrlProps = {
    imgId: string;
    width: number;
    transforms?: string;
    aspectDefault?: boolean;
};
/**
 * Return a Cloudinary AdvancedImage component
 * @component
 * @returns {React.ReactElement} The image component
 *
 * @typedef {object} ImageProps
 *
 * @extends {Component<Props>}
 */
declare const Image: ({ alt, className, id, imgId, transforms, width, lazy, aspectDefault }: ImageProps) => JSX.Element;
/**
 * Return a Cloudinary url
 * @returns {string} The image URL
 *
 * @typedef {object} ImageUrlProps
 *
 * @extends {Component<Props>}
 */
declare const ImageUrl: ({ imgId, width, transforms, aspectDefault }: ImageUrlProps) => string;
export { Image as default, ImageUrl };
