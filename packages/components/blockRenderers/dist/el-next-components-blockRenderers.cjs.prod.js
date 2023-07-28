'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var Link = require('next/link');
var image_dist_elNextComponentsImage = require('../../image/dist/el-next-components-image.cjs.prod.js');
var video_dist_elNextComponentsVideo = require('../../video/dist/el-next-components-video.cjs.prod.js');
var jsxRuntime = require('react/jsx-runtime');
require('@cloudinary/url-gen');
require('@cloudinary/react');
require('../../dist/unsupportedIterableToArray-42309462.cjs.prod.js');
require('next/image');
require('zustand');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);

/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022-2023
 * @packageDocumentation
 * @author Johnny Richardson
 * KeystoneJS document field block renderers
 * ==========
 */
var BlockRenderers = function BlockRenderers(styles) {
  /**
   * @function
   * @param {JSX.Element} [imageOveride] - optional app-globalized tailwindcss classes to all blocks
   * @returns {function}
   */
  return function (blockOverrides) {
    var blocks = {
      image: function image(props) {
        var _props$image$image;
        var publicId = props.image.publicId || props.image.image.publicId;
        var alt = props.image.alt || ((_props$image$image = props.image.image) === null || _props$image$image === void 0 ? void 0 : _props$image$image.alt);
        return blockOverrides.imageOverride ? blockOverrides.imageOverride(props) : /*#__PURE__*/jsxRuntime.jsx(image_dist_elNextComponentsImage["default"], {
          id: 'img-' + publicId,
          alt: alt || '',
          imgId: publicId,
          aspectDefault: true
        });
      },
      video: function video(props) {
        return /*#__PURE__*/jsxRuntime.jsx(video_dist_elNextComponentsVideo.Video, {
          videoLabel: props.video.label,
          videoUrl: props.video.value,
          thumbUrl: props.video.thumb
        });
      },
      button: function button(props) {
        return blockOverrides.buttonOverride ? blockOverrides.buttonOverride(props) : /*#__PURE__*/jsxRuntime.jsx(Link__default["default"], {
          href: props.link.props.node.children[0].text,
          passHref: true,
          children: /*#__PURE__*/jsxRuntime.jsx("button", {
            className: "block lg:inline-block transition-all uppercase whitespace-nowrap ".concat(styles && styles.buttonClass ? styles.buttonClass : 'px-9 py-7 mt-4'),
            children: props.label
          })
        });
      },
      pageAnchor: function pageAnchor(props) {
        return /*#__PURE__*/jsxRuntime.jsx("span", {
          id: props.anchorId.props.node.children[0].text
        });
      },
      associatedPeople: function associatedPeople(props) {
        return blockOverrides.peopleOverride ? blockOverrides.peopleOverride(props) : /*#__PURE__*/jsxRuntime.jsx("div", {
          style: {
            display: 'flex',
            flexDirection: 'column'
          },
          children: /*#__PURE__*/jsxRuntime.jsx("p", {
            children: "ppl"
          })
        });
      }
    };
    return blocks;
  };
};

exports.BlockRenderers = BlockRenderers;
