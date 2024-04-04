'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slicedToArray = require('../../dist/slicedToArray-85dd2515.cjs.prod.js');
var Image = require('next/image');
var react = require('react');
var create = require('zustand');
var jsxRuntime = require('react/jsx-runtime');
require('../../dist/unsupportedIterableToArray-42309462.cjs.prod.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Image__default = /*#__PURE__*/_interopDefault(Image);
var create__default = /*#__PURE__*/_interopDefault(create);

var Video = function Video(_ref) {
  var thumbUrl = _ref.thumbUrl,
    videoUrl = _ref.videoUrl,
    videoLabel = _ref.videoLabel,
    isSlide = _ref.isSlide;
    _ref.themeColor;
    var noUi = _ref.noUi,
    play = _ref.play;
  // Create store with Zustand
  var _useState = react.useState(function () {
      return create__default["default"](function (set) {
        return {
          videoOpen: false,
          toggleOpen: function toggleOpen(open) {
            return set({
              videoOpen: open
            });
          }
        };
      });
    }),
    _useState2 = slicedToArray._slicedToArray(_useState, 1),
    useStore = _useState2[0];
  var toggleOpen = useStore(function (state) {
    return state.toggleOpen;
  });
  var videoOpen = useStore(function (state) {
    return state.videoOpen;
  });
  var buttonSize = isSlide ? 75 : 150;
  var classStr = 'absolute w-full h-full top-0 left-0 bottom-0 right-0 lg:mb-8';
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    className: classStr,
    children: [videoOpen || play || !thumbUrl ? '' : /*#__PURE__*/jsxRuntime.jsxs("button", {
      onClick: function onClick(e) {
        toggleOpen(true);
        e.preventDefault();
      },
      className: "group relative overflow-hidden",
      style: {
        height: 'inherit'
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(Image__default["default"], {
        alt: "Thumbnail image for video with title \"".concat(videoLabel, "\""),
        className: "pointer-events-none",
        src: thumbUrl,
        width: 1920,
        height: 1080,
        unoptimized: true,
        draggable: "true"
      }), !noUi && /*#__PURE__*/jsxRuntime.jsx("span", {
        className: "absolute",
        style: {
          top: "calc(50% - ".concat(buttonSize / 2, "px)"),
          left: "calc(50% - ".concat(buttonSize / 2, "px)")
        },
        children: /*#__PURE__*/jsxRuntime.jsxs("svg", {
          viewBox: "0 0 151 151",
          width: buttonSize,
          height: buttonSize,
          className: "transition-all group-hover:scale-110",
          children: [/*#__PURE__*/jsxRuntime.jsx("circle", {
            style: {
              strokeWidth: '0.8px',
              stroke: '#B571E9',
              fill: 'rgba(141, 51, 210, .6)'
            },
            cx: "49.467",
            cy: "49.467",
            r: "49.467",
            transform: "matrix(1.521806, 0, 0, 1.510012, 0, 0)"
          }), /*#__PURE__*/jsxRuntime.jsx("path", {
            style: {
              strokeWidth: '0.8px',
              stroke: '#B571E9',
              fill: 'rgba(237, 234, 229, .8)'
            },
            d: "M 214.012 155.256 L 252.117 221.256 L 175.907 221.256 L 214.012 155.256 Z",
            "data-bx-shape": "triangle 175.907 155.256 76.21 66 0.5 0 1@b1f3cbc1",
            transform: "matrix(-0.000024, 1, -1, -0.000024, 268.262054, -141.660278)",
            "data-bx-origin": "0.53481 0.565042"
          })]
        })
      })]
    }), !videoOpen && !play ? '' : /*#__PURE__*/jsxRuntime.jsx("div", {
      id: "video-embed",
      className: "w-full h-full min-h-[inherit]",
      children: /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "relative h-full min-h-[inherit]",
        children: /*#__PURE__*/jsxRuntime.jsx("iframe", {
          src: "".concat(videoUrl, "?h=e72038724e&color=bf9eda&byline=0&portrait=0&autoplay=1"),
          style: {
            position: isSlide ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          },
          allow: "autoplay; fullscreen;",
          allowFullScreen: true
        })
      })
    })]
  });
};

exports.Video = Video;
