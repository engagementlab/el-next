import Image from 'next/image';
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
} from 'react';
import { useState } from 'react';
import create from 'zustand';
import ReactPlayer from 'react-player/lazy';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { IconButton } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
  import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';

interface VideoProps {
  videoUrl: string;
  videoLabel: string;
  thumbUrl?: string;
  isSlide?: boolean;
  themeColor?: { fill: string; stroke: string };
  noUi?: boolean;
  play?: boolean;
}
interface VideoState {
  videoOpen: boolean;
  videoHover: boolean;
  toggleOpen: (open: boolean) => void;
  toggleHover: (hover: boolean) => void;
}
type ControlsProps = {
  duration: number;
  muted: boolean;
  playing: boolean;
  playedSeconds: number;
  volume: number;
  playerRef: MutableRefObject<ReactPlayer>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  onVolumeChangeHandler: (e: any, value: string) => void;
  onVolumeSeekUp: (e: any, value: string) => void;
};

const Controls = (props: ControlsProps) => {
  const seek = (value: number) => {
    props.playerRef.current.seekTo(+value, 'seconds');
  };

  return (
    <div className="absolute flex flex-row items-center bottom-0 left-[4rem] right-[4rem] bg-white/90 rounded-[50px]">
      <IconButton
        aria-label={props.playing ? 'pause' : 'play'}
        size="large"
        onClick={() => props.setPlaying(!props.playing)}
      >
        {props.playing ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
      </IconButton>
      {/* <input
          type="range"
          value={props.playedSeconds}
          min="0"
        />
        */}

      <Box sx={{ width: '75%' }}>
        <Slider
          aria-label="Player Current Position"
          defaultValue={0}
          value={
            props.playerRef.current
              ? props.playerRef.current.getCurrentTime()
              : 0
          }
          getAriaValueText={() => {
            return props.playerRef.current
              ? props.playerRef.current.getCurrentTime().toString()
              : '0';
          }}
          color="secondary"
          max={props.duration}
          onChange={(event: Event, value: number, activeThumb: number) =>
            seek(value)
          }
        />
      </Box>
      <IconButton
        aria-label={props.playing ? 'pause' : 'play'}
        size="large"
        onClick={() => props.playerRef.current.}
      >
        {props.playerRef.current.props.muted ? (
          <VolumeMuteIcon />
        ) : (
          <VolumeUpIcon />
        )}
      </IconButton>
    </div>
  );
};

export const Video = ({
  thumbUrl,
  videoUrl,
  videoLabel,
  isSlide,
  themeColor,
  noUi,
  play,
}: VideoProps) => {
  // const [playing, setPlaying] = useState(true);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<VideoState>((set) => ({
      videoOpen: false,
      videoHover: false,
      toggleOpen: (open: boolean) => set({ videoOpen: open }),
      toggleHover: (hover: boolean) => set({ videoHover: hover }),
    }))
  );

  const toggleOpen = useStore((state) => state.toggleOpen);
  const { videoOpen, videoHover, toggleHover } = useStore((state) => state);
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;
  const buttonSize = isSlide ? 75 : 150;
  const [videoState, setVideoState] = useState({
   playing: true,
   muted: false,
   volume: 0.5,
   played: 0,
   seeking: false,
Buffer : true
 });
  const {playing, muted, volume, playbackRate, played, seeking, buffer} = videoState
const volumeChangeHandler = (e: any, value: string) => {
 const newVolume = parseFloat(value) / 100;
   setVideoState({
     ...videoState,
     volume: newVolume,
     muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
   })

};

const volumeSeekUpHandler = (e: any, value: string) => {
 const newVolume = parseFloat(value) / 100;
   setVideoState({
     ...videoState,
     volume: newVolume,
     muted: newVolume === 0 ? true : false,
   })};

  let classStr = 'absolute w-full h-full top-0 left-0 bottom-0 right-0 lg:mb-8';
  if (!isSlide) `video w-full h-full lg:mb-8 ${thumbUrl && 'min-h-[inherit]'}`;

  return (
    <div className={classStr}>
      {/* {videoOpen || play || !thumbUrl ? (
        ''
      ) : (
        <button
          onClick={(e) => {
            toggleOpen(true);
            e.preventDefault();
          }}
          className="group relative"
          style={{ height: 'inherit' }}
        >
          <Image
            alt={`Thumbnail image for video with title "${videoLabel}"`}
            className="pointer-events-none"
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
                <g className="transition-all origin-center group-hover:scale-75 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]">
                  <g>
                    <path
                      d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496
			C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z"
                      style={{ fill: '#fff', strokeWidth: '3px' }}
                    />
                  </g>
                </g>

                <circle
                  cx="256"
                  cy="256"
                  r="250"
                  style={{ fill: 'rgba(111, 180, 44, .6)' }}
                ></circle>
                <g>
                  <g className="transition-all origin-center group-hover:scale-110 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]">
                    <polygon
                      points="189.776,141.328 189.776,370.992 388.672,256.16"
                      style={{ fill: 'rgba(237, 234, 229, 0.8)' }}
                    />
                  </g>
                </g>
              </svg>
              {/* <svg
                viewBox="0 0 156 156"
                className="transition-all"
                width={buttonSize}
                height={buttonSize}
              >
                <circle
                  cx="49.467"
                  cy="49.467"
                  r="49.467"
                  transform="matrix(1.521806, 0, 0, 1.510012, 2.720824, 3.304236)"
                  style={{
                    fill: 'none',
                    stroke: '#fff',
                    strokeWidth: '4.6px',
                    // stroke: '#B571E9',
                  }}
                ></circle>
                <circle
                  cx="78"
                  cy="78"
                  r="71"
                  style={{ fill: 'rgb(109, 109, 109)' }}
                  className="transition-all origin-center group-hover:scale-110  ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]"
                ></circle>
                <path
                  d="M 182.532 132.419 L 215.032 188.711 L 150.032 188.711 L 182.532 132.419 Z"
                  style={{ fill: 'rgb(255, 255, 255)' }}
                  // className="transition-all group-hover:scale-110 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)]"
                ></path>
              </svg> 
            </span>
          )}
        </button>
      )} */}
      {/* 
      {!videoOpen && !play ? (
        ''
      ) : ( */}
      <div
        id="video-embed"
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
        className="w-full h-full min-h-[inherit] overflow-y-hidden"
      >
        <div className="relative h-full min-h-[inherit]">
          <div className="absolute h-full">
            <ReactPlayer
              url={`https://player.vimeo.com/progressive_redirect/playback/911300630/rendition/720p/file.mp4?loc=external&signature=6dadd6681fc191c020410ff373ac24e37231ac8760196c9a611c7400dac5f88c`}
              ref={playerRef}
              controls={false}
              playing={playing}
              onDuration={setDurationSeconds}
              onProgress={({ playedSeconds }) =>
                setPlayedSeconds(playedSeconds)
              }
              onSeek={setPlayedSeconds}
              volume={}
              muted
              config={{
                file: {
                  tracks: [
                    {
                      src: 'https://captions.cloud.vimeo.com/captions/134131399.vtt?expires=1710536245&sig=49e06e5995dd5947770b13fff510efe2a9f55db5&download=auto_generated_captions.vtt',

                      kind: 'subtitles',
                      srcLang: 'en',
                      default: true,
                      label: 'English',
                    },
                  ],
                },
              }}
              
            />
          </div>
          {/* <AnimatePresence> */}
          {/* {videoHover && ( */}
          <div
            className={`relative top-[90%] transition-all duration-700 ease-[cubic-bezier(0.68, -0.55, 0.27, 1.55)] ${
              videoHover ? 'translate-y-[0]' : 'translate-y-[0rem]'
            }`}
            // style={{
            //   top: '90%',
            //   position: 'relative',
            //   transform: videoHover ? '' : 'translateY(3rem)',
            // }}
          >
            <Controls
              duration={durationSeconds}
              playerRef={playerRef}
              playing={playing}
              playedSeconds={playedSeconds}
              // setPlaying={setPlaying}
volume={volume}
           onVolumeChangeHandler = {volumeChangeHandler}
           onVolumeSeekUp = {volumeSeekUpHandler}
            />
          </div>
          {/* )} */}
          {/* </AnimatePresence> */}
        </div>
      </div>
      {/* )} */}
    </div>
  );
};
