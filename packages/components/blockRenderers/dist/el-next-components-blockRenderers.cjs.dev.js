'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var Link = require('next/link');
var image_dist_elNextComponentsImage = require('../../image/dist/el-next-components-image.cjs.dev.js');
var video_dist_elNextComponentsVideo = require('../../video/dist/el-next-components-video.cjs.dev.js');
var jsxRuntime = require('react/jsx-runtime');
require('@cloudinary/url-gen');
require('@cloudinary/react');
require('../../dist/unsupportedIterableToArray-7cc9ff15.cjs.dev.js');
require('next/image');
require('zustand');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);

/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2022
 *
 * @author Johnny Richardson
 * KeystoneJS document field block renderers
 * ==========
 */
var BlockRenderers = function BlockRenderers(styles) {
  return function (imageOveride, peopleOveride) {
    var blocks = {
      image: function image(props) {
        return imageOveride ? imageOveride(props) : /*#__PURE__*/jsxRuntime.jsx("div", {
          style: {
            display: 'flex',
            flexDirection: 'column'
          },
          children: /*#__PURE__*/jsxRuntime.jsx(image_dist_elNextComponentsImage["default"], {
            id: 'img-' + props.image.publicId,
            alt: props.image.alt,
            imgId: props.image.publicId,
            aspectDefault: true
          })
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
        return /*#__PURE__*/jsxRuntime.jsx(Link__default["default"], {
          href: props.link.props.node.children[0].text,
          passHref: true,
          children: /*#__PURE__*/jsxRuntime.jsx("button", {
            className: "block lg:inline-block transition-all uppercase whitespace-nowrap ".concat(styles.buttonClass || 'px-9 py-7 mt-4'),
            children: props.label
          })
        });
      },
      associatedPeople: function associatedPeople(props) {
        return peopleOveride ? peopleOveride(props) : /*#__PURE__*/jsxRuntime.jsx("div", {
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
