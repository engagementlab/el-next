'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var Link = require('next/link');
var image_dist_elNextComponentsImage = require('../../image/dist/el-next-components-image.cjs.prod.js');
var slicedToArray = require('../../dist/slicedToArray-85dd2515.cjs.prod.js');
var Image = require('next/image');
var create = require('zustand');
var ReactPlayer = require('react-player/lazy');
var PlayCircleFilledIcon = require('@mui/icons-material/PlayCircleFilled');
var PauseCircleFilledIcon = require('@mui/icons-material/PauseCircleFilled');
var material = require('@mui/material');
var jsxRuntime = require('react/jsx-runtime');
require('@cloudinary/url-gen');
require('@cloudinary/react');
require('../../dist/unsupportedIterableToArray-42309462.cjs.prod.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var Link__default = /*#__PURE__*/_interopDefault(Link);
var Image__default = /*#__PURE__*/_interopDefault(Image);
var create__default = /*#__PURE__*/_interopDefault(create);
var ReactPlayer__default = /*#__PURE__*/_interopDefault(ReactPlayer);
var PlayCircleFilledIcon__default = /*#__PURE__*/_interopDefault(PlayCircleFilledIcon);
var PauseCircleFilledIcon__default = /*#__PURE__*/_interopDefault(PauseCircleFilledIcon);

var Video = function Video(_ref) {
  var thumbUrl = _ref.thumbUrl;
    _ref.videoUrl;
    var videoLabel = _ref.videoLabel,
    isSlide = _ref.isSlide;
    _ref.themeColor;
    var noUi = _ref.noUi,
    play = _ref.play;
  var _useState = react.useState(true),
    _useState2 = slicedToArray._slicedToArray(_useState, 2),
    playing = _useState2[0],
    setPlaying = _useState2[1];
  var _useState3 = react.useState(0),
    _useState4 = slicedToArray._slicedToArray(_useState3, 2),
    durationSeconds = _useState4[0],
    setDurationSeconds = _useState4[1];
  var _useState5 = react.useState(0),
    _useState6 = slicedToArray._slicedToArray(_useState5, 2),
    playedSeconds = _useState6[0],
    setPlayedSeconds = _useState6[1];
  // Create store with Zustand
  var _useState7 = react.useState(function () {
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
    _useState8 = slicedToArray._slicedToArray(_useState7, 1),
    useStore = _useState8[0];
  var toggleOpen = useStore(function (state) {
    return state.toggleOpen;
  });
  var videoOpen = useStore(function (state) {
    return state.videoOpen;
  });
  var playerRef = react.useRef();
  var buttonSize = isSlide ? 75 : 150;
  var classStr = 'absolute w-full h-full top-0 left-0 bottom-0 right-0 lg:mb-8';
  var Controls = function Controls(props) {
    return /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "w-full",
      children: [/*#__PURE__*/jsxRuntime.jsx("button", {
        onClick: function onClick() {
          return props.setPlaying(!props.playing);
        },
        children: props.playing ? /*#__PURE__*/jsxRuntime.jsx(PauseCircleFilledIcon__default["default"], {}) : /*#__PURE__*/jsxRuntime.jsx(PlayCircleFilledIcon__default["default"], {})
      }), /*#__PURE__*/jsxRuntime.jsx(Box, {
        sx: {
          width: '100%'
        },
        children: /*#__PURE__*/jsxRuntime.jsx(material.Slider, {
          "aria-label": "Player Current Position",
          defaultValue: 0,
          getAriaValueText: props.playerRef.current.getCurrentTime(),
          color: "secondary"
        })
      })]
    });
  };
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    className: classStr,
    children: [videoOpen || play || !thumbUrl ? '' : /*#__PURE__*/jsxRuntime.jsxs("button", {
      onClick: function onClick(e) {
        toggleOpen(true);
        e.preventDefault();
      },
      className: "group relative",
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
          fill: "#000000",
          width: buttonSize,
          height: buttonSize,
          viewBox: "0 0 512 512",
          children: [/*#__PURE__*/jsxRuntime.jsx("g", {
            className: "transition-all origin-center group-hover:scale-75 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]",
            children: /*#__PURE__*/jsxRuntime.jsx("g", {
              children: /*#__PURE__*/jsxRuntime.jsx("path", {
                d: "M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496 C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z",
                style: {
                  fill: '#fff',
                  strokeWidth: '3px'
                }
              })
            })
          }), /*#__PURE__*/jsxRuntime.jsx("circle", {
            cx: "256",
            cy: "256",
            r: "250",
            style: {
              fill: 'rgba(111, 180, 44, .6)'
            }
          }), /*#__PURE__*/jsxRuntime.jsx("g", {
            children: /*#__PURE__*/jsxRuntime.jsx("g", {
              className: "transition-all origin-center group-hover:scale-110 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]",
              children: /*#__PURE__*/jsxRuntime.jsx("polygon", {
                points: "189.776,141.328 189.776,370.992 388.672,256.16",
                style: {
                  fill: 'rgba(237, 234, 229, 0.8)'
                }
              })
            })
          })]
        })
      })]
    }), !videoOpen && !play ? '' : /*#__PURE__*/jsxRuntime.jsx("div", {
      id: "video-embed",
      className: "w-full h-full min-h-[inherit]",
      children: /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "relative h-full min-h-[inherit]",
        children: [/*#__PURE__*/jsxRuntime.jsx(ReactPlayer__default["default"], {
          url: "https://player.vimeo.com/progressive_redirect/playback/911300630/rendition/720p/file.mp4?loc=external&signature=6dadd6681fc191c020410ff373ac24e37231ac8760196c9a611c7400dac5f88c",
          ref: playerRef,
          controls: false,
          playing: playing,
          onProgress: function onProgress(_ref2) {
            var playedSeconds = _ref2.playedSeconds;
            return setPlayedSeconds(playedSeconds);
          },
          onSeek: setPlayedSeconds,
          onDuration: setDurationSeconds,
          config: {
            file: {
              tracks: [{
                src: 'https://captions.cloud.vimeo.com/captions/134131399.vtt?expires=1710536245&sig=49e06e5995dd5947770b13fff510efe2a9f55db5&download=auto_generated_captions.vtt',
                kind: 'subtitles',
                srcLang: 'en',
                "default": true,
                label: 'English'
              }]
            }
          }
        }), /*#__PURE__*/jsxRuntime.jsx(Controls, {
          playerRef: playerRef,
          playing: playing,
          setPlaying: setPlaying,
          playedSeconds: playedSeconds,
          duration: durationSeconds
        })]
      })
    })]
  });
};

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
        return blockOverrides && blockOverrides.imageOverride ? blockOverrides.imageOverride(props) : /*#__PURE__*/jsxRuntime.jsx(image_dist_elNextComponentsImage["default"], {
          id: 'img-' + publicId,
          alt: alt || '',
          imgId: publicId,
          aspectDefault: true
        });
      },
      video: function video(props) {
        return /*#__PURE__*/jsxRuntime.jsx(Video, {
          videoLabel: props.video.label,
          videoUrl: props.video.value,
          thumbUrl: props.video.thumb
        });
      },
      button: function button(props) {
        return blockOverrides && blockOverrides.buttonOverride ? blockOverrides.buttonOverride(props) : /*#__PURE__*/jsxRuntime.jsx(Link__default["default"], {
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
