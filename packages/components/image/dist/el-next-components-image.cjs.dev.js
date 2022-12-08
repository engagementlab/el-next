'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var urlGen = require('@cloudinary/url-gen');
var react = require('@cloudinary/react');
var jsxRuntime = require('react/jsx-runtime');

/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2021-2022
 *
 * @author Johnny Richardson
 * Cloudinary image component
 * ==========
 */
// Cloudinary instance
var cld = new urlGen.Cloudinary({
  cloud: {
    cloudName: "engagement-lab-home"
  },
  url: {
    secure: true
  }
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

/**
 * Return a Cloudinary AdvancedImage component
 * @component
 * @returns {React.ReactElement} The image component
 * 
 * @typedef {object} ImageProps
 *
 * @extends {Component<Props>}
 */
var Image = function Image(_ref) {
  var alt = _ref.alt,
      className = _ref.className,
      id = _ref.id,
      imgId = _ref.imgId,
      transforms = _ref.transforms,
      width = _ref.width,
      lazy = _ref.lazy,
      aspectDefault = _ref.aspectDefault;
  // Instantiate a CloudinaryImage object for the image with public ID;
  var cloudImage = cld.image("".concat(imgId));
  var plugins = [react.responsive({
    steps: [800, 1000, 1400, 1800, 2200]
  })]; // Create image transforms

  cloudImage.addTransformation(transforms || "f_auto,dpr_auto,c_crop,g_center".concat(aspectDefault ? '' : ',ar_4:3')); // If lazyload not set to false, enable

  if (lazy === undefined) plugins.push(react.lazyload(), react.placeholder({
    mode: 'blur'
  }));
  return /*#__PURE__*/jsxRuntime.jsx(react.AdvancedImage, {
    id: id,
    className: className,
    cldImg: cloudImage,
    alt: alt,
    plugins: plugins,
    style: {
      maxWidth: width + "px"
    }
  });
};
/**
 * Return a Cloudinary url
 * @returns {string} The image URL
 * 
 * @typedef {object} ImageUrlProps
 *
 * @extends {Component<Props>}
 */


var ImageUrl = function ImageUrl(_ref2) {
  var imgId = _ref2.imgId,
      width = _ref2.width,
      transforms = _ref2.transforms,
      aspectDefault = _ref2.aspectDefault;
  // Instantiate a CloudinaryImage object for the image with public ID;
  var cloudImage = cld.image("".concat(imgId)); // Create image transforms

  cloudImage.addTransformation(transforms || "f_auto,dpr_auto,c_crop,g_center".concat(aspectDefault ? '' : ',ar_4:3', ",w_").concat(width));
  return cloudImage.toURL();
};

exports.ImageUrl = ImageUrl;
exports["default"] = Image;
