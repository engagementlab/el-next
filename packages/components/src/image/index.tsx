/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2021-2024
 *
 * @author Johnny Richardson
 * Cloudinary image component
 * ==========
 */
import React from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, lazyload, responsive } from '@cloudinary/react';
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
const Image = ({
  alt,
  className,
  id,
  imgId,
  transforms,
  width,
  maxWidth,
  maxWidthDisable,
  lazy,
  aspectDefault = true,
}: ImageProps) => {
  // Instantiate a CloudinaryImage object for the image with public ID
  const cloudImage = cld.image(imgId);

  if (process.env.NODE_ENV !== 'production' && maxWidth < 800)
    return (
      <div className="m-4 p-1 border-4 border-[#00ab9e]">
        <svg viewBox="0 0 50 50" className="max-w-[45px]">
          <circle style={{ fill: '#D75A4A' }} cx="25" cy="25" r="25" />
          <polyline
            style={{
              fill: 'none',
              stroke: '#FFFFFF',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeMiterlimit: 10,
            }}
            points="16,34 25,25 34,16 
	"
          />
          <polyline
            style={{
              fill: 'none',
              stroke: '#FFFFFF',
              strokeWidth: 2,
              strokeLinecap: 'round',
              strokeMiterlimit: 10,
            }}
            points="16,16 25,25 34,34 
	"
          />
        </svg>
        Image error: maxWidth cannot be less than 800.
      </div>
    );
  // If maxWidth is defined, ensure that the image steps don't exceed it
  let plugins: Plugins = [
    responsive({
      steps: [800, 1000, 1400, 1800, 2200].filter((step) => {
        return maxWidth ? step <= maxWidth : step;
      }),
    }),
  ];

  // Create image transforms;
  // For dev mode or low bandwidth, degrade image quality and use grayscale to save bandwidth
  const lowBandwidth =
    process.env.LOW_BANDWIDTH === 'true' ||
    (typeof window !== 'undefined' &&
      window.location.host.includes('localhost'));

  let defaultTransforms = `f_auto,dpr_auto${aspectDefault ? '' : ',ar_4:3'}${
    // if maxWidth defined, ensure initial width is used
    maxWidth ? `,w_${maxWidth}` : ',c_crop,g_center'
  }`;
  cloudImage.addTransformation(
    `${transforms || defaultTransforms}${
      lowBandwidth ? ',e_grayscale,q_auto:eco' : ''
    }`
  );

  // If lazyload not set to false, enable
  if (lazy === undefined) plugins.push(lazyload());

  return (
    <AdvancedImage
      id={id}
      className={className}
      cldImg={cloudImage}
      alt={alt}
      plugins={plugins}
      style={!maxWidthDisable ? { maxWidth: `${width}px` } : {}}
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
  let transformsFormatted = transforms;

  // If transforms missing width and width prop defined, use prop
  if (!transforms.includes('w_') && width) transformsFormatted += `,w_${width}`;

  // Create image transforms
  cloudImage.addTransformation(
    transformsFormatted ||
      `f_auto,dpr_auto,c_crop,g_center${
        aspectDefault ? '' : ',ar_4:3'
      },w_${width}`
  );

  return cloudImage.toURL();
};

export { Image as default, ImageUrl };
