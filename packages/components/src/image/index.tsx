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
type ImageProps = {
    alt: string,
    id: string,
    imgId: string,
    className ? : string,
    transforms ? : string,
    width ? : number,
    lazy ? : boolean,
    aspectDefault ? : boolean,
};

/**
 * @typedef ImageUrlProps
 * @prop {string} imgId - The image's cloud public id attribute
 * @prop {number} width - The image's width
 * @prop {string} [transforms] - The image's optional cloud transformations
 * @prop {boolean} [aspectDefault=true] - If set to false, the image will not use a 4:3 aspect ratio
 */
type ImageUrlProps = {
    imgId: string,
    width: number,
    transforms ? : string,
    aspectDefault ? : boolean,
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
const Image = ({
        alt,
        className,
        id,
        imgId,
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

/**
 * Return a Cloudinary url
 * @returns {string} The image URL
 * 
 * @typedef {object} ImageUrlProps
 *
 * @extends {Component<Props>}
 */
const ImageUrl = ({
    imgId,
    width,
    transforms,
    aspectDefault
}: ImageUrlProps) => {
    // Instantiate a CloudinaryImage object for the image with public ID;
    const cloudImage = cld.image(`${imgId}`);

    // Create image transforms
    cloudImage.addTransformation(transforms || `f_auto,dpr_auto,c_crop,g_center${aspectDefault ? '' : ',ar_4:3'},w_${width}`);

    return cloudImage.toURL();
}

export {
    Image as
    default, ImageUrl
};