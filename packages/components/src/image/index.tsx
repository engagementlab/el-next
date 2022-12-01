/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2021-2022
 *
 * @author Johnny Richardson
 * Cloudinary image component
 * ==========
 */
import React from 'react';

import {
    Cloudinary
} from "@cloudinary/url-gen";
import {
    AdvancedImage,
    lazyload,
    placeholder,
    responsive,
} from '@cloudinary/react';
import {
    Plugins
} from '@cloudinary/html';

// Cloudinary instance
const cld = new Cloudinary({
    cloud: {
        cloudName: `engagement-lab-home`,
    },
    url: {
        secure: true,
    },
});

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
type ImageProps = {
    alt: string,
    id: string,
    imgId: string,
    urlOnly ? : boolean,
    className ? : string,
    transforms ? : string,
    width ? : number,
    lazy ? : boolean,
    aspectDefault ? : boolean,
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
const Image = ({
        alt,
        className,
        id,
        imgId,
        urlOnly,
        transforms,
        width,
        lazy,
        aspectDefault
    }: ImageProps) => {
        // Instantiate a CloudinaryImage object for the image with public ID;
        const cloudImage = cld.image(`${imgId}`);
        let plugins: Plugins = [responsive({
            steps: [800, 1000, 1400, 1800, 2200]
        })];

        // Create image transforms
        cloudImage.addTransformation(transforms || `f_auto,dpr_auto,c_crop,g_center${aspectDefault ? '' : ',ar_4:3'}`);

        // If lazyload not set to false, enable
        if (lazy === undefined)
            plugins.push(
                lazyload(),
                placeholder({
                    mode: 'blur'
                })
            );

        return <AdvancedImage
                id={id}
                className={className}
                cldImg={cloudImage}
                alt={alt}
                plugins={plugins}
                style={{ maxWidth: width + `px` }}
            />;
}
const ImageUrl = ({
        imgId,
        transforms,
        aspectDefault
    }) => {
        // Instantiate a CloudinaryImage object for the image with public ID;
        const cloudImage = cld.image(`${imgId}`);

        // Create image transforms
        cloudImage.addTransformation(transforms || `f_auto,dpr_auto,c_crop,g_center${aspectDefault ? '' : ',ar_4:3'}`);
console.log( cloudImage.toURL())
        return cloudImage.toURL();
}
export {Image as default, ImageUrl};