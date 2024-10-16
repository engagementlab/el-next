/**
 * Engagement Lab 'Next' shared component library
 * Developed by Engagement Lab, 2021-2024
 *
 * @author Johnny Richardson
 * Video player component
 * ==========
 */
import Image from 'next/image';
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { useState } from 'react';

import { findDOMNode } from 'react-dom';

import create from 'zustand';
import ReactPlayer from 'react-player/lazy';
import screenfull from 'screenfull';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { IconButton } from '@mui/material';

import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import ClosedCaptionDisabledIcon from '@mui/icons-material/ClosedCaptionDisabled';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

import * as CldImage from '../image';

type VideoTheme = {
  fill: string;
  fillRgb: string;
  stroke: string;
  bg: string;
  buttons: string;
  seekbar: string;
};

type VideoProps = {
  videoFile: string;
  videoLabel?: string;
  caption?: string;
  captionsFile?: string;
  theme: VideoTheme;
  thumbUrl?: string;
  thumbPublicId?: string;
  isSlide?: boolean;
  noUi?: boolean;
  showCloseButton?: boolean;
  play?: boolean;
  playing?: boolean;
  started?: () => void;
  ended?: () => void;
  InitialUI?: React.ComponentType<any>;
};

interface VideoState {
  buffer: boolean;
  error: boolean;
  cachedVolume: number;
  hideCaptions: boolean;
  isFullscreen: boolean;
  muted: boolean;
  played: number;
  playing: boolean;
  seeking: boolean;
  videoOpen: boolean;
  videoHover: boolean;
  volume: number;
  setVideoState: (state: VideoState) => void;
}

type ControlsProps = {
  duration: number;
  muted: boolean;
  playing: boolean;
  captionsEnabled: boolean;
  hideCaptions: boolean;
  fullscreen: boolean;
  playedSeconds: number;
  volume: number;
  playerRef: MutableRefObject<ReactPlayer>;
  theme: VideoTheme;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  onVolumeChangeHandler: (e: any, value: string) => void;
  onVolumeSeekUp: (e: any, value: string) => void;
  onClickFullscreen: () => void;
  onMute: () => void;
  onToggleCaptions: () => void;
};

const easing = 'ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)]';
const thumbClass = `transition-all duration-150 pointer-events-none group-hover:brightness-105 group-hover:scale-105 ${easing}`;

const initialState = {
  volume: 0.5,
  cachedVolume: 0.5,
  played: 0,
  buffer: true,
  error: false,
  muted: false,
  playing: true,
  seeking: false,
  hideCaptions: true,
  isFullscreen: false,
  videoOpen: false,
  videoHover: false,
};

const Controls = (props: ControlsProps) => {
  const seek = (value: number) => {
    props.playerRef.current.seekTo(+value, 'seconds');
  };

  const [volumeHover, toggleHover] = useState(false);

  return (
    <div
      className={`max-w-2xl flex flex-col px-5 bottom-0 rounded-[5px] bg-opacity-50 ${
        props.theme.bg
      } w-full ${props.fullscreen ? 'lg:w-1/2' : 'lg:w-2/3'}`}
    >
      <Box
        sx={{
          opacity: volumeHover ? 0.3 : 1,
        }}
        className="flex basis-[75%] mt-2 items-center transition-all duration-[320ms] ease-in-out"
      >
        <Slider
          aria-label="Player Current Position"
          defaultValue={0}
          valueLabelDisplay="auto"
          value={
            props.playerRef.current
              ? props.playerRef.current.getCurrentTime()
              : 0
          }
          valueLabelFormat={(v) => {
            const mins = v < 60 ? 0 : Math.ceil(v / 60);
            const secs = (v % 60 <= 9 ? '0' : '') + Math.ceil(v % 60);
            return `${mins}:${secs}`;
          }}
          getAriaValueText={() => {
            return props.playerRef.current &&
              props.playerRef.current.getCurrentTime() !== null
              ? props.playerRef.current.getCurrentTime().toString()
              : '0';
          }}
          max={props.duration}
          onChange={(event: Event, value: number, activeThumb: number) =>
            seek(value)
          }
          sx={{
            color: props.theme.seekbar,
            // filter: 'drop-shadow(1px 0px 12px #F6A515)',÷
            '& .MuiSlider-thumb': {
              height: 24,
              width: 24,
              backgroundColor: '#fff',
              border: '2px solid currentColor',
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'none',
              },
              '&::before': {
                display: 'none',
              },
            },

            '& .MuiSlider-valueLabel': {
              lineHeight: 1.2,
              fontSize: 12,
              background: 'unset',
              padding: 0,
              width: 64,
              height: 32,
              borderRadius: '50px',
              backgroundColor: '#000',
              transformOrigin: 'bottom center',
              transform: 'translate(0, -100%) scale(0)',
              '&::before': { display: 'none' },
              '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(0, -100%) scale(1)',
              },
            },
          }}
        />
      </Box>
      <div className="flex flex-row items-center justify-evenly">
        <IconButton
          aria-label={props.playing ? 'pause' : 'play'}
          size="large"
          onClick={() => props.setPlaying(!props.playing)}
          sx={{ color: props.theme.buttons }}
        >
          {props.playing ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
        </IconButton>
        {props.captionsEnabled && (
          <IconButton
            aria-label={props.hideCaptions ? 'show captions' : 'hide captions'}
            size="large"
            onClick={() => props.onToggleCaptions()}
            sx={{ color: props.theme.buttons }}
          >
            {props.hideCaptions ? (
              <ClosedCaptionDisabledIcon />
            ) : (
              <ClosedCaptionIcon />
            )}
          </IconButton>
        )}
        <IconButton
          aria-label={props.fullscreen ? 'exit fullscreen' : 'Enter fullscreen'}
          size="large"
          onClick={() => props.onClickFullscreen()}
          sx={{ color: props.theme.buttons }}
        >
          {props.fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
        <Box
          className={`flex flex-row items-center transition-all duration-[420ms] lg:mr-5 ${
            volumeHover ? 'md:basis-[50%]' : 'basis-[5%]'
          } ${easing}`}
          onMouseEnter={() => toggleHover(true)}
          onMouseLeave={() => toggleHover(false)}
        >
          <IconButton
            aria-label={props.muted ? 'unmute' : 'mute'}
            size="large"
            sx={{ color: props.theme.buttons }}
            onClick={() => props.onMute()}
          >
            {props.muted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
          </IconButton>

          <Slider
            aria-label="Player Current Volume"
            defaultValue={0.5}
            value={props.volume * 100}
            getAriaValueText={() => {
              return props.volume.toString();
            }}
            onChange={(e: Event, value: number, activeThumb: number) => {
              props.onVolumeChangeHandler(e, value.toString());
            }}
            className="!hidden md:!inline-block"
            sx={{
              color: props.theme.seekbar,
              opacity: volumeHover ? 1 : 0,
              transition: 'all 420ms ease',
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export const Video = ({
  thumbUrl,
  thumbPublicId,
  videoFile,
  videoLabel,
  caption,
  captionsFile,
  isSlide,
  theme,
  noUi,
  showCloseButton,
  play,
  started,
  ended,
  InitialUI,
}: VideoProps) => {
  const PreviewUI = () => {
    return (
      <button
        onClick={(e) => {
          toggleOpen(true);
          e.preventDefault();
        }}
        className="relative h-full w-full"
      >
        {thumbPublicId ? (
          <CldImage.default
            id={`img-${thumbPublicId}`}
            alt={`Thumbnail image for video with title "${videoLabel}"`}
            imgId={thumbPublicId}
            lazy={false}
            transforms="g_faces"
            className={thumbClass}
          />
        ) : (
          <Image
            alt={
              videoLabel
                ? `Thumbnail image for video with title "${videoLabel}"`
                : 'Thumbnail image for video preview'
            }
            src={
              thumbUrl
                ? thumbUrl
                : 'https://dummyimage.com/350/F6A536/000.png&text=No thumb provided'
            }
            className={thumbClass}
            fill={true}
            unoptimized={true}
            draggable="true"
          />
        )}
        {!noUi && (
          <span
            className="absolute"
            style={{
              top: `calc(50% - ${buttonSize / 2}px)`,
              left: `calc(50% - ${buttonSize / 2}px)`,
            }}
          >
            <svg
              fill="#000000"
              width={buttonSize}
              height={buttonSize}
              viewBox="0 0 512 512"
            >
              <g
                className={`transition-all origin-center group-hover:scale-75 group-hover:opacity-0 ${easing}`}
              >
                <g>
                  <path
                    d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496
			C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z"
                    style={{ fill: '#fff', strokeWidth: '6px' }}
                  />
                </g>
              </g>

              <circle
                cx="256"
                cy="256"
                r="250"
                style={{ fill: theme.fillRgb }}
              ></circle>
              <g>
                <g className="transition-all origin-center group-hover:scale-125 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]">
                  <polygon
                    points="189.776,141.328 189.776,370.992 388.672,256.16"
                    style={{ fill: '#fff' }}
                  />
                </g>
              </g>
            </svg>
          </span>
        )}
        {caption && (
          <aside
            className={`absolute bottom-0 right-3 p-3 text-left w-3/4 ${theme.bg} text-white sm:max-w-xs sm:right-20 lg:right-0`}
          >
            ↳ {caption}
          </aside>
        )}
      </button>
    );
  };

  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);

  // Create store with Zustand
  const [useStore] = useState(() =>
    create<VideoState>((set) => ({
      ...initialState,
      setVideoState: (state: VideoState) => set({ ...state }),
    }))
  );
  const buttonSize = isSlide ? 75 : 150;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;
  const videoState = useStore();
  const {
    buffer,
    error,
    muted,
    playing,
    volume,
    hideCaptions,
    isFullscreen,
    videoOpen,
    videoHover,
    setVideoState,
  } = useStore();

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };

  const muteHandler = () => {
    setVideoState({
      ...videoState,
      muted: !videoState.muted,
      volume: videoState.muted ? videoState.cachedVolume : 0,
      cachedVolume: videoState.volume,
    });
  };

  const onClickFullscreen = () => {
    screenfull.toggle(findDOMNode(wrapperRef.current) as Element);

    setVideoState({
      ...videoState,
      isFullscreen: !isFullscreen,
    });
  };

  const toggleCaptions = () => {
    playerRef.current.getInternalPlayer().textTracks[0].mode = hideCaptions
      ? 'showing'
      : 'hidden';
    setVideoState({
      ...videoState,
      hideCaptions: !hideCaptions,
    });
  };

  const toggleOpen = (open: boolean) => {
    if (open && started) started();
    setVideoState({
      ...videoState,
      videoOpen: open,
    });
  };

  const toggleHover = (hover: boolean) => {
    setVideoState({
      ...videoState,
      videoHover: hover,
    });
  };

  let classStr =
    'absolute w-full h-full overflow-hidden top-0 left-0 bottom-0 right-0 lg:mb-8';
  // if (!isSlide) `video w-full h-full lg:mb-8 ${thumbUrl && ''}`;

  useEffect(() => {
    if (videoOpen) {
      document
        .querySelector('.video-player')
        .addEventListener('fullscreenchange', (e) => {
          setVideoState({
            ...videoState,
            isFullscreen: !(document.fullscreenElement === null),
          });
        });
    }
  }, [videoOpen]);

  useEffect(() => {
    return () => {
      setVideoState({
        ...videoState,
        ...initialState,
      });
    };
  }, []);

  if (InitialUI && !videoOpen)
    return (
      <button
        onClick={(e) => {
          toggleOpen(true);
          e.preventDefault();
        }}
      >
        <InitialUI />
      </button>
    );
  else
    return (
      // <div className="group relative w-full min-h-[350px] max-h-[350px] lg:max-h-[465px]">
      <div
        className={classStr}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
        onTouchEnd={() => toggleHover(true)}
      >
        {videoOpen || play ? '' : <PreviewUI />}
        {(videoOpen || play) && (
          <div
            id="video-embed"
            ref={wrapperRef}
            className="w-full h-full min-h-[inherit] overflow-y-hidden"
          >
            {/* Close button */}
            {showCloseButton && (
              <button
                onClick={() => toggleOpen(false)}
                className={`transition-all duration-500 ${easing} absolute right-0 mr-2 mt-2 z-50 inline-block w-12 h-12 hover:scale-125`}
              >
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  className={theme.fill}
                >
                  <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                </svg>
              </button>
            )}
            {!error ? (
              <>
                {buffer && (
                  <div className="absolute bg-white/20 w-full h-full">
                    <span
                      className="absolute"
                      style={{
                        top: `calc(50% - 50px)`,
                        left: `calc(50% - 50px)`,
                      }}
                    >
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        className={`opacity-100 ${theme.fill}`}
                      >
                        <path
                          d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
                          className="animate-spin origin-center"
                        />
                      </svg>
                    </span>
                  </div>
                )}
                <ReactPlayer
                  url={videoFile || ''}
                  ref={playerRef}
                  id={`video-player-${Math.ceil(Math.random() * 10000)}`}
                  className="video-player"
                  controls={false}
                  width="100%"
                  height="100%"
                  playing={playing}
                  onEnded={() => {
                    playerRef.current.seekTo(0);
                    playerRef.current.seekTo(0);
                    setVideoState({
                      ...videoState,
                      playing: false,
                      videoOpen: false,
                    });
                    if (ended) ended();
                  }}
                  onDuration={setDurationSeconds}
                  onProgress={({ playedSeconds }) =>
                    setPlayedSeconds(playedSeconds)
                  }
                  onSeek={setPlayedSeconds}
                  onError={() =>
                    setVideoState({
                      ...videoState,
                      error: true,
                    })
                  }
                  onBuffer={() =>
                    setVideoState({
                      ...videoState,
                      buffer: true,
                    })
                  }
                  onBufferEnd={() =>
                    setVideoState({
                      ...videoState,
                      buffer: false,
                    })
                  }
                  volume={volume}
                  muted={muted}
                  config={
                    captionsFile
                      ? {
                          file: {
                            attributes: {
                              crossOrigin: 'true',
                            },
                            tracks: [
                              {
                                src: captionsFile,
                                kind: 'subtitles',
                                srcLang: 'en',
                                default: true,
                                label: 'English',
                              },
                            ],
                          },
                        }
                      : {}
                  }
                />
                <div
                  className={`relative flex flex-col w-full items-center transition-all duration-700 ${
                    videoHover ? '-translate-y-[7rem]' : 'translate-y-0'
                  } ${easing}`}
                >
                  <Controls
                    duration={durationSeconds}
                    playerRef={playerRef}
                    playing={playing}
                    playedSeconds={playedSeconds}
                    volume={volume}
                    muted={muted}
                    theme={theme}
                    captionsEnabled={captionsFile !== undefined}
                    hideCaptions={hideCaptions}
                    fullscreen={isFullscreen}
                    setPlaying={() =>
                      setVideoState({
                        ...videoState,
                        playing: false,
                      })
                    }
                    onMute={muteHandler}
                    onToggleCaptions={toggleCaptions}
                    onVolumeChangeHandler={volumeChangeHandler}
                    onVolumeSeekUp={volumeSeekUpHandler}
                    onClickFullscreen={onClickFullscreen}
                  />
                </div>
              </>
            ) : (
              <h1 className="text-red font-bold">
                {videoFile === 'none'
                  ? 'No video provided!'
                  : 'Could not load video.'}
              </h1>
            )}
          </div>
        )}
      </div>
      // </div>
    );
};
