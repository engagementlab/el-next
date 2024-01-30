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
 * Return a Cloudinary AdvancedImage component
 * @returns {React.ReactElement} The image component
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
    maxWidth = _ref.maxWidth,
    maxWidthDisable = _ref.maxWidthDisable,
    lazy = _ref.lazy,
    _ref$aspectDefault = _ref.aspectDefault,
    aspectDefault = _ref$aspectDefault === void 0 ? true : _ref$aspectDefault;
  // Instantiate a CloudinaryImage object for the image with public ID
  var cloudImage = cld.image(imgId);
  if (process.env.NODE_ENV !== 'production' && maxWidth < 800) return /*#__PURE__*/jsxRuntime.jsxs("div", {
    className: "m-4 p-1 border-4 border-[#00ab9e]",
    children: [/*#__PURE__*/jsxRuntime.jsxs("svg", {
      viewBox: "0 0 50 50",
      className: "max-w-[45px]",
      children: [/*#__PURE__*/jsxRuntime.jsx("circle", {
        style: {
          fill: '#D75A4A'
        },
        cx: "25",
        cy: "25",
        r: "25"
      }), /*#__PURE__*/jsxRuntime.jsx("polyline", {
        style: {
          fill: 'none',
          stroke: '#FFFFFF',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeMiterlimit: 10
        },
        points: "16,34 25,25 34,16  "
      }), /*#__PURE__*/jsxRuntime.jsx("polyline", {
        style: {
          fill: 'none',
          stroke: '#FFFFFF',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeMiterlimit: 10
        },
        points: "16,16 25,25 34,34  "
      })]
    }), "Image error: maxWidth cannot be less than 800."]
  });
  // If maxWidth is defined, ensure that the image steps don't exceed it
  var plugins = [react.responsive({
    steps: [800, 1000, 1400, 1800, 2200].filter(function (step) {
      return maxWidth ? step <= maxWidth : step;
    })
  })];

  // Create image transforms;
  // For dev mode or low bandwidth, degrade image quality and use grayscale to save bandwidth
  var lowBandwidth = process.env.LOW_BANDWIDTH === 'true' || typeof window !== 'undefined' && window.location.host.includes('localhost');
  var defaultTransforms = "f_auto,dpr_auto".concat(aspectDefault ? '' : ',ar_4:3').concat(
  // if maxWidth defined, ensure initial width is used
  maxWidth ? ",w_".concat(maxWidth) : ',c_crop,g_center');
  cloudImage.addTransformation("".concat(transforms || defaultTransforms).concat(lowBandwidth ? ',e_grayscale,q_auto:eco' : ''));

  // If lazyload not set to false, enable
  if (lazy === undefined) plugins.push(react.lazyload());
  return /*#__PURE__*/jsxRuntime.jsx(react.AdvancedImage, {
    id: id,
    className: className,
    cldImg: cloudImage,
    alt: alt,
    plugins: plugins,
    style: !maxWidthDisable ? {
      maxWidth: "".concat(width, "px")
    } : {}
  });
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
var ImageUrl = function ImageUrl(_ref2) {
  var imgId = _ref2.imgId,
    width = _ref2.width,
    transforms = _ref2.transforms,
    aspectDefault = _ref2.aspectDefault;
  // Instantiate a CloudinaryImage object for the image with public ID;
  var cloudImage = cld.image("".concat(imgId));

  // Create image transforms
  cloudImage.addTransformation(transforms || "f_auto,dpr_auto,c_crop,g_center".concat(aspectDefault ? '' : ',ar_4:3', ",w_").concat(width));
  return cloudImage.toURL();
};

exports.ImageUrl = ImageUrl;
exports["default"] = Image;
