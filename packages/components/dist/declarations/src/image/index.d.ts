/// <reference types="react" />
/**
 * @typedef Props
 * @prop {string} alt - The image's alt text
 * @prop {string} id - The image's ID attribute
 * @prop {string} imgId - The image's cloud public id attribute
 * @prop {boolean} [urlOnly=false] -
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
    urlOnly?: boolean;
    className?: string;
    transforms?: string;
    width?: number;
    lazy?: boolean;
    aspectDefault?: boolean;
};
/**
 * Return a Cloudinary AdvancedImage component
 * @component
 * @returns {React.ReactElement} The image component
 *
 * @typedef {object} Props
 *
 * @extends {Component<Props>}
 */
declare const Image: ({ alt, className, id, imgId, urlOnly, transforms, width, lazy, aspectDefault }: ImageProps) => JSX.Element;
declare const ImageUrl: ({ imgId, transforms, aspectDefault }: {
    imgId: any;
    transforms: any;
    aspectDefault: any;
}) => string;
export { Image as default, ImageUrl };
