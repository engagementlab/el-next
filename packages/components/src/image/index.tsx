/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2021-2022
 *
 * @author Johnny Richardson
 * Cloudinary image component
 * ==========
 */
import React from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import {
  AdvancedImage,
  lazyload,
  placeholder,
  responsive,
} from '@cloudinary/react';
import { Plugins } from '@cloudinary/html';

// Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: `engagement-lab-home`,
  },
  url: {
    secure: true,
  },
});

interface ImageProps {
  /**
   * The image's ID attribute
   */
  alt: string;
  /**
   * The image's alt text
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
const Image = ({
  alt,
  className,
  id,
  imgId,
  transforms,
  width,
  maxWidth,
  lazy,
  aspectDefault,
}: ImageProps) => {
  // Instantiate a CloudinaryImage object for the image with public ID
  const cloudImage = cld.image(`${imgId}`);
  // If maxWidth is defined, ensure that the image steps don't exceed it
  let plugins: Plugins = [
    responsive({
      steps: [800, 1000, 1400, 1800, 2200].filter((step) => {
        return maxWidth ? step <= maxWidth : step;
      }),
    }),
  ];

  // Create image transforms;
  // if maxWidth defined, ensure initial width is used
  cloudImage.addTransformation(
    transforms ||
      `f_auto,dpr_auto${aspectDefault ? '' : ',ar_4:3'}${
        maxWidth ? `,w_${maxWidth}` : ',c_crop,g_center'
      }`
  );

  // If lazyload not set to false, enable
  if (lazy === undefined)
    plugins.push(
      lazyload(),
      placeholder({
        mode: 'blur',
      })
    );

  return (
    <AdvancedImage
      id={id}
      className={className}
      cldImg={cloudImage}
      alt={alt}
      plugins={plugins}
      style={{ maxWidth: width + `px` }}
    />
  );
};

/**
 * Return a Cloudinary url
 * @returns {string} The image URL
 *
 * @typedef {object} ImageUrlProps
 * @
 *
 * @extends {Component<Props>}
 */
const ImageUrl = ({
  imgId,
  width,
  transforms,
  aspectDefault,
}: ImageUrlProps) => {
  // Instantiate a CloudinaryImage object for the image with public ID;
  const cloudImage = cld.image(`${imgId}`);

  // Create image transforms
  cloudImage.addTransformation(
    transforms ||
      `f_auto,dpr_auto,c_crop,g_center${
        aspectDefault ? '' : ',ar_4:3'
      },w_${width}`
  );

  return cloudImage.toURL();
};

export { Image as default, ImageUrl };
