import Image, { ImageLoaderProps } from 'next/image';
import React from 'react';
import { useState } from 'react';
import create from 'zustand';
// import '@slightlyoff/lite-vimeo';

interface VideoProps {
  videoUrl: string;
  videoLabel: string;
  thumbUrl?: string;
  isSlide?: boolean;
  themeColor?: string;
  noUi?: boolean;
  play?: boolean;
}
interface VideoState {
  videoOpen: boolean;
  toggleOpen: (open: boolean) => void;
}

const thumbLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return src.replace('_1920x1080?r=pad', `_${width}x1080?r=pad`);
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
  // Create store with Zustand
  const [useStore] = useState(() =>
    create<VideoState>((set) => ({
      videoOpen: false,
      toggleOpen: (open: boolean) => set({ videoOpen: open }),
    }))
  );
  const toggleOpen = useStore((state) => state.toggleOpen);
  const videoOpen = useStore((state) => state.videoOpen);
  const buttonSize = isSlide ? 75 : 150;
  return (
    <div
      className={
        isSlide
          ? 'absolute w-full h-full top-0 left-0 bottom-0 right-0 lg:mb-8'
          : 'absolute video w-full h-full min-h-[inherit] lg:mb-8'
      }
    >
      {videoOpen || play || !thumbUrl ? (
        ''
      ) : (
        <button
          onClick={(e) => {
            toggleOpen(true);
            e.preventDefault();
          }}
          className="group"
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
                viewBox="0 0 151 151"
                width={buttonSize}
                height={buttonSize}
                className="transition-all group-hover:scale-110"
              >
                <circle
                  style={{
                    strokeWidth: '0.8px',
                    stroke: '#B571E9',
                    fill: 'rgba(141, 51, 210, .6)',
                  }}
                  cx="49.467"
                  cy="49.467"
                  r="49.467"
                  transform="matrix(1.521806, 0, 0, 1.510012, 0, 0)"
                ></circle>
                <path
                  style={{
                    strokeWidth: '0.8px',
                    stroke: '#B571E9',
                    fill: 'rgba(237, 234, 229, .8)',
                  }}
                  d="M 214.012 155.256 L 252.117 221.256 L 175.907 221.256 L 214.012 155.256 Z"
                  data-bx-shape="triangle 175.907 155.256 76.21 66 0.5 0 1@b1f3cbc1"
                  transform="matrix(-0.000024, 1, -1, -0.000024, 268.262054, -141.660278)"
                  data-bx-origin="0.53481 0.565042"
                ></path>
              </svg>
            </span>
          )}
        </button>
      )}

      {!videoOpen && !play ? (
        ''
      ) : (
        <div id="video-embed" className="w-full h-full min-h-[inherit]">
          <div className="relative h-full min-h-[inherit]">
            <iframe
              src={`${videoUrl}?h=e72038724e&color=bf9eda&byline=0&portrait=0&autoplay=1`}
              style={{
                position: isSlide ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              allow="autoplay; fullscreen;"
              allowFullScreen
            ></iframe>
            {/* <lite-vimeo videoid="364402896" /> */}
          </div>
        </div>
      )}
    </div>
  );
};
