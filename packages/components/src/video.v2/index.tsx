import Image from 'next/image';
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
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
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

interface VideoProps {
  videoFile?: string;
  videoLabel: string;
  thumbUrl?: string;
  isSlide?: boolean;
  theme?: { fill: string; stroke: string };
  noUi?: boolean;
  play?: boolean;
}
interface VideoState {
  videoOpen: boolean;
  videoHover: boolean;
  // volumeHover: boolean;
  toggleOpen: (open: boolean) => void;
  toggleHover: (hover: boolean) => void;
  // toggleVolumeHover: (hover: boolean) => void;
}
type ControlsProps = {
  duration: number;
  muted: boolean;
  playing: boolean;
  hideCaptions: boolean;
  playedSeconds: number;
  volume: number;
  playerRef: MutableRefObject<ReactPlayer>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  onVolumeChangeHandler: (e: any, value: string) => void;
  onVolumeSeekUp: (e: any, value: string) => void;
  onClickFullscreen: () => void;
  onMute: () => void;
  onToggleCaptions: () => void;
};

const easing = 'ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)]';

const Controls = (props: ControlsProps) => {
  const seek = (value: number) => {
    props.playerRef.current.seekTo(+value, 'seconds');
  };

  const [volumeHover, toggleHover] = useState(false);

  return (
    <div className="absolute flex flex-col justify-center max-w-md px-5 bottom-0 left-[1rem] right-[1rem] md:left-[3rem] md:right-[3rem] bg-[#D7EFC1]/80 rounded-[10px]">
      <Box
        sx={{
          opacity: volumeHover ? 0.3 : 1,
        }}
        className="flex basis-[75%] mt-2 items-center transition-all duration-[320ms] ease-in-out"
      >
        <Slider
          aria-label="Player Current Position"
          defaultValue={0}
          value={
            props.playerRef.current
              ? props.playerRef.current.getCurrentTime()
              : 0
          }
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
            color: '#F6A536',
            filter: 'drop-shadow(1px 0px 12px #F6A515)',
          }}
        />
      </Box>
      <div className="flex flex-row items-center justify-evenly">
        <IconButton
          aria-label={props.playing ? 'pause' : 'play'}
          size="large"
          onClick={() => props.setPlaying(!props.playing)}
        >
          {props.playing ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
        </IconButton>
        <Box
          className={`flex flex-row items-center transition-all duration-[420ms] mr-5 ${
            volumeHover ? 'basis-[50%]' : 'basis-[5%]'
          } ${easing}`}
          onMouseEnter={() => toggleHover(true)}
          onMouseLeave={() => toggleHover(false)}
        >
          <IconButton
            aria-label={props.muted ? 'unmute' : 'mute'}
            size="large"
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
            sx={{
              color: '#5EB89E',
              opacity: volumeHover ? 1 : 0,
              transition: 'all 420ms ease',
            }}
          />
        </Box>
        <IconButton
          // aria-label={props.playing ? 'pause' : 'play'}
          size="large"
          onClick={() => props.onToggleCaptions()}
        >
          {props.hideCaptions ? (
            <ClosedCaptionDisabledIcon />
          ) : (
            <ClosedCaptionIcon />
          )}
        </IconButton>
        <IconButton
          aria-label="Enter fullscreen"
          size="large"
          onClick={() => props.onClickFullscreen()}
        >
          <FullscreenIcon />
        </IconButton>
      </div>
    </div>
  );
};

export const Video = ({
  thumbUrl,
  videoFile,
  videoLabel,
  isSlide,
  theme,
  noUi,
  play,
}: VideoProps) => {
  const [playing, setPlaying] = useState(true);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<VideoState>((set) => ({
      videoOpen: false,
      videoHover: false,
      // volumeHover: false,
      toggleOpen: (open: boolean) => set({ videoOpen: open }),
      toggleHover: (hover: boolean) => set({ videoHover: hover }),
      // toggleVolumeHover: (hover: boolean) => set({volumeHover: hover }),
    }))
  );

  const toggleOpen = useStore((state) => state.toggleOpen);
  const { videoOpen, videoHover, toggleHover } = useStore((state) => state);
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;
  const buttonSize = isSlide ? 75 : 150;
  const [videoState, setVideoState] = useState({
    playing: true,
    muted: false,
    volume: 0.5,
    cachedVolume: 0.5,
    played: 0,
    seeking: false,
    buffer: true,
    hideCaptions: true,
    isFullscreen: false,
  });
  const { muted, volume, hideCaptions, isFullscreen } = videoState;

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
    // Mutes the video player
    setVideoState({
      ...videoState,
      muted: !videoState.muted,
      volume: videoState.muted ? videoState.cachedVolume : 0,
      cachedVolume: videoState.volume,
    });
  };

  const onClickFullscreen = () => {
    // const video = document.querySelector('.video-player');
    // video.requestFullscreen();
    screenfull.toggle(findDOMNode(wrapperRef.current) as Element);
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

  let classStr = 'absolute w-full h-full top-0 left-0 bottom-0 right-0 lg:mb-8';
  if (!isSlide) `video w-full h-full lg:mb-8 ${thumbUrl && 'min-h-[inherit]'}`;

  useEffect(() => {
    if (videoOpen) {
      document
        .querySelector('.video-player')
        .addEventListener('fullscreenchange', (e) => {
          setVideoState({
            ...videoState,
            isFullscreen: !(document.fullscreenElement === null),
          });
          console.log('video state changed', document.fullscreenElement);
        });
    }
  }, [videoOpen]);

  return (
    <div className={classStr}>
      {videoOpen || play || !thumbUrl ? (
        ''
      ) : (
        <button
          onClick={(e) => {
            toggleOpen(true);
            e.preventDefault();
          }}
          className="group relative overflow-hidden"
          style={{ height: 'inherit' }}
        >
          <Image
            alt={`Thumbnail image for video with title "${videoLabel}"`}
            className={`transition-all pointer-events-none group-hover:brightness-105 group-hover:scale-105 ${easing}`}
            src={thumbUrl}
            width={1920}
            height={1080}
            unoptimized={true}
            draggable="true"
          />

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
                  style={{ fill: theme.fill }}
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
        </button>
      )}
      {videoOpen && (
        <div
          id="video-embed"
          ref={wrapperRef}
          onMouseEnter={() => toggleHover(true)}
          onMouseLeave={() => toggleHover(false)}
          onTouchEnd={() => toggleHover(true)}
          className={`w-full h-full min-h-[inherit] overflow-y-hidden`}
        >
          <ReactPlayer
            url={videoFile || ''}
            ref={playerRef}
            id={`video-player-${Math.ceil(Math.random() * 10000)}`}
            className="video-player"
            controls={false}
            width="100%"
            height="100%"
            playing={playing}
            onDuration={setDurationSeconds}
            onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
            onSeek={setPlayedSeconds}
            volume={volume}
            muted={muted}
            config={
              {
                // file: {
                //   attributes: {
                //     crossOrigin: 'true',
                //   },
                //   tracks: [
                //     {
                //       src: 'https://res.cloudinary.com/engagement-lab-home/raw/upload/v1711547945/0_yo8h2d.vtt',
                //       kind: 'subtitles',
                //       srcLang: 'en',
                //       default: true,
                //       label: 'English',
                //     },
                //   ],
                // },
              }
            }
          />

          <div
            className={`relative transition-all duration-700 ${
              videoHover ? '-translate-y-[1rem]' : 'translate-y-[8rem]'
            } ${easing}`}
          >
            <Controls
              duration={durationSeconds}
              playerRef={playerRef}
              playing={playing}
              playedSeconds={playedSeconds}
              setPlaying={setPlaying}
              volume={volume}
              muted={muted}
              hideCaptions={hideCaptions}
              onMute={muteHandler}
              onToggleCaptions={toggleCaptions}
              onVolumeChangeHandler={volumeChangeHandler}
              onVolumeSeekUp={volumeSeekUpHandler}
              onClickFullscreen={onClickFullscreen}
            />
          </div>
        </div>
      )}
    </div>
  );
};
