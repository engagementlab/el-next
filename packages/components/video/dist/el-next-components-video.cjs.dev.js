'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var objectSpread2 = require('../../dist/objectSpread2-62cbe323.cjs.dev.js');
var slicedToArray = require('../../dist/slicedToArray-b8687d91.cjs.dev.js');
var react = require('react');
var create = require('zustand');
var ReactPlayer = require('react-player/lazy');
var Box = require('@mui/material/Box');
var Slider = require('@mui/material/Slider');
var material = require('@mui/material');
var PlayCircleFilledIcon = require('@mui/icons-material/PlayCircleFilled');
var PauseCircleFilledIcon = require('@mui/icons-material/PauseCircleFilled');
var VolumeUpIcon = require('@mui/icons-material/VolumeUp');
var VolumeMuteIcon = require('@mui/icons-material/VolumeMute');
var jsxRuntime = require('react/jsx-runtime');
require('../../dist/unsupportedIterableToArray-ac28611a.cjs.dev.js');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var create__default = /*#__PURE__*/_interopDefault(create);
var ReactPlayer__default = /*#__PURE__*/_interopDefault(ReactPlayer);
var Box__default = /*#__PURE__*/_interopDefault(Box);
var Slider__default = /*#__PURE__*/_interopDefault(Slider);
var PlayCircleFilledIcon__default = /*#__PURE__*/_interopDefault(PlayCircleFilledIcon);
var PauseCircleFilledIcon__default = /*#__PURE__*/_interopDefault(PauseCircleFilledIcon);
var VolumeUpIcon__default = /*#__PURE__*/_interopDefault(VolumeUpIcon);
var VolumeMuteIcon__default = /*#__PURE__*/_interopDefault(VolumeMuteIcon);

var Controls = function Controls(props) {
  var seek = function seek(value) {
    props.playerRef.current.seekTo(+value, 'seconds');
  };
  var _useState = react.useState(false),
    _useState2 = slicedToArray._slicedToArray(_useState, 2),
    volumeHover = _useState2[0],
    toggleHover = _useState2[1];
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    className: "absolute flex flex-row items-center bottom-0 left-[4rem] right-[4rem] bg-white/90 rounded-[50px]",
    children: [/*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
      "aria-label": props.playing ? 'pause' : 'play',
      size: "large",
      onClick: function onClick() {
        return props.setPlaying(!props.playing);
      },
      children: props.playing ? /*#__PURE__*/jsxRuntime.jsx(PauseCircleFilledIcon__default["default"], {}) : /*#__PURE__*/jsxRuntime.jsx(PlayCircleFilledIcon__default["default"], {})
    }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
      sx: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexBasis: volumeHover ? '100%' : '5%',
        transition: 'all 420ms ease'
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
        "aria-label": props.muted ? 'unmute' : 'mute',
        size: "large",
        onClick: function onClick() {
          return props.onMute();
        },
        onMouseEnter: function onMouseEnter() {
          return toggleHover(true);
        },
        onMouseLeave: function onMouseLeave() {
          return toggleHover(false);
        },
        children: props.muted ? /*#__PURE__*/jsxRuntime.jsx(VolumeMuteIcon__default["default"], {}) : /*#__PURE__*/jsxRuntime.jsx(VolumeUpIcon__default["default"], {})
      }), /*#__PURE__*/jsxRuntime.jsx(Slider__default["default"], {
        "aria-label": "Player Current Volume",
        defaultValue: 0,
        value: props.volume,
        getAriaValueText: function getAriaValueText() {
          return props.volume.toString();
        },
        color: "primary",
        max: 1
        // onChange={(event: Event, value: number, activeThumb: number) =>
        //   seek(value)
        // }
        ,
        sx: {
          opacity: volumeHover ? 1 : 0,
          transition: 'all 420ms ease'
        }
      })]
    }), /*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      sx: {
        display: 'flex',
        flexBasis: '75%',
        alignItems: 'center',
        opacity: volumeHover ? 0 : 1,
        transition: 'all 320ms ease'
      },
      children: /*#__PURE__*/jsxRuntime.jsx(Slider__default["default"], {
        "aria-label": "Player Current Position",
        defaultValue: 0,
        value: props.playerRef.current ? props.playerRef.current.getCurrentTime() : 0,
        getAriaValueText: function getAriaValueText() {
          return props.playerRef.current ? props.playerRef.current.getCurrentTime().toString() : '0';
        },
        color: "secondary",
        max: props.duration,
        onChange: function onChange(event, value, activeThumb) {
          return seek(value);
        }
      })
    })]
  });
};
var Video = function Video(_ref) {
  _ref.thumbUrl;
    _ref.videoUrl;
    _ref.videoLabel;
    _ref.isSlide;
    _ref.themeColor;
    _ref.noUi;
    _ref.play;
  var _useState3 = react.useState(true),
    _useState4 = slicedToArray._slicedToArray(_useState3, 2),
    playing = _useState4[0],
    setPlaying = _useState4[1];
  var _useState5 = react.useState(0),
    _useState6 = slicedToArray._slicedToArray(_useState5, 2),
    durationSeconds = _useState6[0],
    setDurationSeconds = _useState6[1];
  var _useState7 = react.useState(0),
    _useState8 = slicedToArray._slicedToArray(_useState7, 2),
    playedSeconds = _useState8[0],
    setPlayedSeconds = _useState8[1];
  // Create store with Zustand
  var _useState9 = react.useState(function () {
      return create__default["default"](function (set) {
        return {
          videoOpen: false,
          videoHover: false,
          // volumeHover: false,
          toggleOpen: function toggleOpen(open) {
            return set({
              videoOpen: open
            });
          },
          toggleHover: function toggleHover(hover) {
            return set({
              videoHover: hover
            });
          }
          // toggleVolumeHover: (hover: boolean) => set({volumeHover: hover }),
        };
      });
    }),
    _useState10 = slicedToArray._slicedToArray(_useState9, 1),
    useStore = _useState10[0];
  useStore(function (state) {
    return state.toggleOpen;
  });
  var _useStore = useStore(function (state) {
      return state;
    });
    _useStore.videoOpen;
    var videoHover = _useStore.videoHover,
    toggleHover = _useStore.toggleHover;
  var playerRef = react.useRef();
  var _useState11 = react.useState({
      playing: true,
      muted: false,
      volume: 0.5,
      played: 0,
      seeking: false,
      buffer: true
    }),
    _useState12 = slicedToArray._slicedToArray(_useState11, 2),
    videoState = _useState12[0],
    setVideoState = _useState12[1];
  var muted = videoState.muted,
    volume = videoState.volume;
    videoState.played;
    videoState.seeking;
    videoState.buffer;
  var volumeChangeHandler = function volumeChangeHandler(e, value) {
    var newVolume = parseFloat(value) / 100;
    setVideoState(objectSpread2._objectSpread2(objectSpread2._objectSpread2({}, videoState), {}, {
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false // volume === 0 then muted
    }));
  };

  var volumeSeekUpHandler = function volumeSeekUpHandler(e, value) {
    var newVolume = parseFloat(value) / 100;
    setVideoState(objectSpread2._objectSpread2(objectSpread2._objectSpread2({}, videoState), {}, {
      volume: newVolume,
      muted: newVolume === 0 ? true : false
    }));
  };
  var muteHandler = function muteHandler() {
    // Mutes the video player
    setVideoState(objectSpread2._objectSpread2(objectSpread2._objectSpread2({}, videoState), {}, {
      muted: !videoState.muted,
      volume: videoState.muted ? 1 : 0
    }));
  };
  var classStr = 'absolute w-full h-full top-0 left-0 bottom-0 right-0 lg:mb-8';
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    className: classStr,
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      id: "video-embed",
      onMouseEnter: function onMouseEnter() {
        return toggleHover(true);
      },
      onMouseLeave: function onMouseLeave() {
        return toggleHover(false);
      },
      className: "w-full h-full min-h-[inherit] overflow-y-hidden",
      children: /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "relative h-full min-h-[inherit]",
        children: [/*#__PURE__*/jsxRuntime.jsx("div", {
          className: "absolute h-full",
          children: /*#__PURE__*/jsxRuntime.jsx(ReactPlayer__default["default"], {
            url: "https://player.vimeo.com/progressive_redirect/playback/911300630/rendition/720p/file.mp4?loc=external&signature=6dadd6681fc191c020410ff373ac24e37231ac8760196c9a611c7400dac5f88c",
            ref: playerRef,
            controls: false,
            playing: playing,
            onDuration: setDurationSeconds,
            onProgress: function onProgress(_ref2) {
              var playedSeconds = _ref2.playedSeconds;
              return setPlayedSeconds(playedSeconds);
            },
            onSeek: setPlayedSeconds,
            volume: volume,
            muted: muted,
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
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "relative top-[90%] transition-all duration-700 ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)] ".concat(videoHover ? 'translate-y-[0]' : 'translate-y-[6rem]')
          // style={{
          //   top: '90%',
          //   position: 'relative',
          //   transform: videoHover ? '' : 'translateY(3rem)',
          // }}
          ,
          children: /*#__PURE__*/jsxRuntime.jsx(Controls, {
            duration: durationSeconds,
            playerRef: playerRef,
            playing: playing,
            playedSeconds: playedSeconds,
            setPlaying: setPlaying,
            volume: volume,
            muted: muted,
            onMute: muteHandler,
            onVolumeChangeHandler: volumeChangeHandler,
            onVolumeSeekUp: volumeSeekUpHandler
          })
        })]
      })
    })
  });
};

exports.Video = Video;
