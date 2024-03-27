'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var unsupportedIterableToArray = require('../../dist/unsupportedIterableToArray-d9e5a90f.cjs.dev.js');
var react = require('react');
var create = require('zustand');
var ReactPlayer = require('react-player/lazy');
var Box = require('@mui/material/Box');
var Slider = require('@mui/material/Slider');
var material = require('@mui/material');
var ClosedCaptionIcon = require('@mui/icons-material/ClosedCaption');
var ClosedCaptionDisabledIcon = require('@mui/icons-material/ClosedCaptionDisabled');
var FullscreenIcon = require('@mui/icons-material/Fullscreen');
var PlayCircleFilledIcon = require('@mui/icons-material/PlayCircleFilled');
var PauseCircleFilledIcon = require('@mui/icons-material/PauseCircleFilled');
var VolumeUpIcon = require('@mui/icons-material/VolumeUp');
var VolumeMuteIcon = require('@mui/icons-material/VolumeMute');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var create__default = /*#__PURE__*/_interopDefault(create);
var ReactPlayer__default = /*#__PURE__*/_interopDefault(ReactPlayer);
var Box__default = /*#__PURE__*/_interopDefault(Box);
var Slider__default = /*#__PURE__*/_interopDefault(Slider);
var ClosedCaptionIcon__default = /*#__PURE__*/_interopDefault(ClosedCaptionIcon);
var ClosedCaptionDisabledIcon__default = /*#__PURE__*/_interopDefault(ClosedCaptionDisabledIcon);
var FullscreenIcon__default = /*#__PURE__*/_interopDefault(FullscreenIcon);
var PlayCircleFilledIcon__default = /*#__PURE__*/_interopDefault(PlayCircleFilledIcon);
var PauseCircleFilledIcon__default = /*#__PURE__*/_interopDefault(PauseCircleFilledIcon);
var VolumeUpIcon__default = /*#__PURE__*/_interopDefault(VolumeUpIcon);
var VolumeMuteIcon__default = /*#__PURE__*/_interopDefault(VolumeMuteIcon);

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || unsupportedIterableToArray._unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var easing = 'ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)]';
var Controls = function Controls(props) {
  var seek = function seek(value) {
    props.playerRef.current.seekTo(+value, 'seconds');
  };
  var _useState = react.useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    volumeHover = _useState2[0],
    toggleHover = _useState2[1];
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    className: "absolute flex flex-col px-5 bottom-0 left-[1rem] right-[1rem] md:left-[3rem] md:right-[3rem] bg-[#D7EFC1]/80 rounded-[10px]",
    children: [/*#__PURE__*/jsxRuntime.jsx(Box__default["default"], {
      sx: {
        opacity: volumeHover ? 0.3 : 1
      },
      className: "flex basis-[75%] mt-2 items-center transition-all duration-[320ms] ease-in-out",
      children: /*#__PURE__*/jsxRuntime.jsx(Slider__default["default"], {
        "aria-label": "Player Current Position",
        defaultValue: 0,
        value: props.playerRef.current ? props.playerRef.current.getCurrentTime() : 0,
        getAriaValueText: function getAriaValueText() {
          return props.playerRef.current ? props.playerRef.current.getCurrentTime().toString() : '0';
        }
        // color="#6FB42C"
        ,
        max: props.duration,
        onChange: function onChange(event, value, activeThumb) {
          return seek(value);
        },
        sx: {
          color: '#F6A536',
          filter: 'drop-shadow(1px 0px 12px #F6A515)'
        }
      })
    }), /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "flex flex-row items-center justify-evenly",
      children: [/*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
        "aria-label": props.playing ? 'pause' : 'play',
        size: "large",
        onClick: function onClick() {
          return props.setPlaying(!props.playing);
        },
        children: props.playing ? /*#__PURE__*/jsxRuntime.jsx(PauseCircleFilledIcon__default["default"], {}) : /*#__PURE__*/jsxRuntime.jsx(PlayCircleFilledIcon__default["default"], {})
      }), /*#__PURE__*/jsxRuntime.jsxs(Box__default["default"], {
        className: "flex flex-row items-center transition-all duration-[420ms] mr-5 ".concat(volumeHover ? 'basis-[50%]' : 'basis-[5%]', " ").concat(easing),
        onMouseEnter: function onMouseEnter() {
          return toggleHover(true);
        },
        onMouseLeave: function onMouseLeave() {
          return toggleHover(false);
        },
        children: [/*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
          "aria-label": props.muted ? 'unmute' : 'mute',
          size: "large",
          onClick: function onClick() {
            return props.onMute();
          },
          children: props.muted ? /*#__PURE__*/jsxRuntime.jsx(VolumeMuteIcon__default["default"], {}) : /*#__PURE__*/jsxRuntime.jsx(VolumeUpIcon__default["default"], {})
        }), /*#__PURE__*/jsxRuntime.jsx(Slider__default["default"], {
          "aria-label": "Player Current Volume",
          defaultValue: 0.5,
          value: props.volume * 100,
          getAriaValueText: function getAriaValueText() {
            return props.volume.toString();
          },
          onChange: function onChange(e, value, activeThumb) {
            // console.log(value, activeThumb);
            props.onVolumeChangeHandler(e, value.toString());
          },
          sx: {
            color: '#5EB89E',
            opacity: volumeHover ? 1 : 0,
            transition: 'all 420ms ease'
          }
        })]
      }), /*#__PURE__*/jsxRuntime.jsx(material.IconButton
      // aria-label={props.playing ? 'pause' : 'play'}
      , {
        size: "large",
        onClick: function onClick() {
          return props.onToggleCaptions();
        },
        children: props.hideCaptions ? /*#__PURE__*/jsxRuntime.jsx(ClosedCaptionDisabledIcon__default["default"], {}) : /*#__PURE__*/jsxRuntime.jsx(ClosedCaptionIcon__default["default"], {})
      }), /*#__PURE__*/jsxRuntime.jsx(material.IconButton, {
        "aria-label": "Enter fullscreen",
        size: "large",
        onClick: function onClick() {
          return props.onClickFullscreen();
        },
        children: /*#__PURE__*/jsxRuntime.jsx(FullscreenIcon__default["default"], {})
      })]
    })]
  });
};
var Video = function Video(_ref) {
  _ref.thumbUrl;
    var videoUrl = _ref.videoUrl;
    _ref.videoLabel;
    _ref.isSlide;
    _ref.themeColor;
    _ref.noUi;
    _ref.play;
  var _useState3 = react.useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    playing = _useState4[0],
    setPlaying = _useState4[1];
  var _useState5 = react.useState(0),
    _useState6 = _slicedToArray(_useState5, 2),
    durationSeconds = _useState6[0],
    setDurationSeconds = _useState6[1];
  var _useState7 = react.useState(0),
    _useState8 = _slicedToArray(_useState7, 2),
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
    _useState10 = _slicedToArray(_useState9, 1),
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
      cachedVolume: 0.5,
      played: 0,
      seeking: false,
      buffer: true,
      hideCaptions: true,
      isFullscreen: false
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    videoState = _useState12[0],
    setVideoState = _useState12[1];
  var muted = videoState.muted,
    volume = videoState.volume;
    videoState.played;
    videoState.seeking;
    videoState.buffer;
    var hideCaptions = videoState.hideCaptions,
    isFullscreen = videoState.isFullscreen;
  var volumeChangeHandler = function volumeChangeHandler(e, value) {
    var newVolume = parseFloat(value) / 100;
    setVideoState(unsupportedIterableToArray._objectSpread2(unsupportedIterableToArray._objectSpread2({}, videoState), {}, {
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false // volume === 0 then muted
    }));
  };

  var volumeSeekUpHandler = function volumeSeekUpHandler(e, value) {
    var newVolume = parseFloat(value) / 100;
    setVideoState(unsupportedIterableToArray._objectSpread2(unsupportedIterableToArray._objectSpread2({}, videoState), {}, {
      volume: newVolume,
      muted: newVolume === 0 ? true : false
    }));
  };
  var muteHandler = function muteHandler() {
    // Mutes the video player
    setVideoState(unsupportedIterableToArray._objectSpread2(unsupportedIterableToArray._objectSpread2({}, videoState), {}, {
      muted: !videoState.muted,
      volume: videoState.muted ? videoState.cachedVolume : 0,
      cachedVolume: videoState.volume
    }));
  };
  var onClickFullscreen = function onClickFullscreen() {
    var video = document.querySelector('.video-player');
    video.requestFullscreen();
  };
  var toggleCaptions = function toggleCaptions() {
    playerRef.current.getInternalPlayer().textTracks[0].mode = hideCaptions ? 'showing' : 'hidden';
    setVideoState(unsupportedIterableToArray._objectSpread2(unsupportedIterableToArray._objectSpread2({}, videoState), {}, {
      hideCaptions: !hideCaptions
    }));
  };
  var classStr = 'absolute w-full h-full top-0 left-0 bottom-0 right-0 lg:mb-8';
  react.useEffect(function () {
    document.querySelector('.video-player').addEventListener('fullscreenchange', function (e) {
      return setVideoState(unsupportedIterableToArray._objectSpread2(unsupportedIterableToArray._objectSpread2({}, videoState), {}, {
        isFullscreen: true
      }));
    });
  }, [playerRef]);
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
      onTouchEnd: function onTouchEnd() {
        return toggleHover(true);
      },
      className: "w-full h-full min-h-[inherit] overflow-y-hidden",
      children: /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "relative h-full min-h-[inherit]",
        children: [/*#__PURE__*/jsxRuntime.jsx("div", {
          className: "absolute h-full",
          children: /*#__PURE__*/jsxRuntime.jsx(ReactPlayer__default["default"], {
            url: "https://player.vimeo.com/progressive_redirect/playback/911300630/rendition/720p/file.mp4?loc=external&signature=6dadd6681fc191c020410ff373ac24e37231ac8760196c9a611c7400dac5f88c",
            ref: playerRef,
            id: "video-player-".concat(videoUrl),
            className: "video-player",
            controls: isFullscreen ? true : false,
            width: "100%",
            height: "100%",
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
                attributes: {
                  crossOrigin: 'true'
                },
                tracks: [{
                  src: 'https://res.cloudinary.com/engagement-lab-home/raw/upload/v1711547945/0_yo8h2d.vtt',
                  kind: 'subtitles',
                  srcLang: 'en',
                  "default": true,
                  label: 'English'
                }]
              }
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsx("div", {
          className: "relative top-[90%] transition-all duration-700 ".concat(videoHover ? 'translate-y-[0]' : 'translate-y-[8rem]', " ").concat(easing)
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
            hideCaptions: hideCaptions,
            onMute: muteHandler,
            onToggleCaptions: toggleCaptions,
            onVolumeChangeHandler: volumeChangeHandler,
            onVolumeSeekUp: volumeSeekUpHandler,
            onClickFullscreen: onClickFullscreen
          })
        })]
      })
    })
  });
};

exports.Video = Video;
