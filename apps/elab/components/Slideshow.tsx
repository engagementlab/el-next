import * as React from 'react';
import { HTMLProps, useEffect } from 'react';
import { AnimatePresence, motion, wrap, Variants } from 'framer-motion';
import _ from 'lodash';

import { Image } from '@el-next/components';
import { Video } from '@el-next/components/video';
import { Video as VideoV2 } from '@el-next/components/video.v2';
import { CustomEase, Slide, Theme, ThemeConfig, Theming } from '@/types';

type Props = {
  slides: any[];
  className?: HTMLProps<HTMLElement>['className'];
  theme?: ThemeConfig;
  heightOverride?: string;
  ContentRenderer?: React.ComponentType<any>;
};

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 0.8,
      bounce: 0.2,
    },
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 0 : -1000,
      opacity: 0,
    };
  },
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Slideshow = ({
  slides,
  className,
  theme,
  heightOverride,
  ContentRenderer,
}: Props): JSX.Element => {
  const dotClass: HTMLProps<HTMLElement>['className'] = `relative w-10 h-3 mx-2 rounded-large inline-block transition-all hover:scale-[110%] cursor-pointer ${
    theme?.bg || ' bg-green-blue'
  } ${CustomEase}`;
  const [[slide, direction], setPage] = React.useState([0, 0]);
  const slideIndex = wrap(0, slides.length, slide);

  const paginate = (newDirection: number) => {
    setPage([slide + newDirection, newDirection]);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') paginate(1);
    else if (e.key === 'ArrowLeft') paginate(-1);
  };

  useEffect(() => {
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [slide]);

  const Slide = ({ data }: { data: Slide }) => {
    if (ContentRenderer) return <ContentRenderer slide={data} />;
    else if (
      (data.video.file !== 'none' || data.videoId) &&
      data.video.file.length > 0 &&
      data.image
    )
      return (
        <div className={`flex items-center min-h-[350px] lg:min-h-[465px]`}>
          {data.video.file !== 'none' ? (
            <VideoV2
              key={`video-slide-${data.video.file}`}
              isSlide={true}
              videoFile={data.video.file}
              caption={data.caption}
              captionsFile={data.captions?.file}
              thumbUrl={data.image ? data.image.publicUrl : data.video.thumbUrl}
              theme={{
                stroke: Theming['none'].arrow,
                fill: Theming['none'].fill,
                fillRgb: Theming['none'].fillRgb,
                bg: Theming['none'].secondaryBg,
                seekbar: Theming['none'].arrowHex,
                buttons: '#fff',
              }}
            />
          ) : (
            <Video
              videoLabel={''}
              videoUrl={`https://player.vimeo.com/video/${data.videoId}`}
              thumbUrl={data.image.publicUrl}
              isSlide={true}
            />
          )}
        </div>
      );
    else if (data.caption && data.image)
      return (
        <div className="flex relative justify-center">
          <Image
            id={'img-' + data.image.publicId}
            alt={data.altText}
            imgId={data.image.publicId}
            className="pointer-events-none max-h-[350px] lg:max-h-[465px]"
          />
          <aside
            className={`absolute bottom-0 right-0 p-3 w-full lg:w-3/4 ${theme?.bg} text-white`}
          >
            <svg
              height="20"
              viewBox="0 -960 960 960"
              width="20"
              className="inline"
            >
              <path
                d="m566-120-43-43 162-162H200v-475h60v415h426L524-547l43-43 233 233-234 237Z"
                style={{ fill: '#fff' }}
              />
            </svg>{' '}
            {data.caption}
          </aside>
        </div>
      );
    else if (data.image && data.altText)
      return (
        <div className="flex relative justify-center">
          <Image
            id={'img-' + data.image.publicId}
            alt={data.altText}
            imgId={data.image.publicId}
            lazy={false}
            // width={300}
            transforms="c_crop,g_center"
            className="pointer-events-none max-h-[350px] lg:max-h-[465px]"
          />
        </div>
      );
    else
      return (
        <img
          src={`https://dummyimage.com/850x850/F6A536/000.png&text=No image and alt or video and thumb provided`}
          width={850}
          height={850}
        />
      );
  };

  return (
    <div className="flex-grow my-5">
      <div
        className={`relative flex items-center lg:min-h-[465px] overflow-hidden ${className} ${
          heightOverride ? heightOverride : 'min-h-[350px]'
        }`}
      >
        {slides.length > 1 ? (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className={`absolute max-[1100px]:top-0 w-full ${
                !ContentRenderer
                  ? 'flex justify-center max-h-[350px] lg:max-h-[465px]'
                  : ''
              }`}
              key={`slide-${slide}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              draggable="true"
              transition={{
                x: { type: 'spring', stiffness: 200, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(event, info) => {
                if (!info) return;
                const swipe = swipePower(info.offset.x, info.velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              {_.orderBy(slides, 'order').map((slide, index) => {
                return index === slideIndex ? (
                  <div
                    id={`slide-${index}`}
                    key={`slide-${index}`}
                    className="w-full"
                  >
                    <Slide data={slide} />
                  </div>
                ) : null;
              })}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div
            className={`absolute max-[1100px]:top-0 w-full ${
              !ContentRenderer
                ? 'flex justify-center max-h-[350px] lg:max-h-[465px]'
                : ''
            }`}
          >
            <Slide data={slides[0]} />
          </div>
        )}
      </div>
      {slides.length > 1 && (
        <div className="flex justify-center items-center mt-3">
          <button
            className={`transition-all hover:scale-125 cursor-pointer ${CustomEase}`}
            onClick={() => paginate(-1)}
          >
            <svg height="48" viewBox="0 -960 960 960" width="48">
              <path
                d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"
                className={theme?.fill || 'fill-green-blue'}
              />
            </svg>
          </button>
          {slides.map((slide, index) => (
            <label
              htmlFor={`slide-${index}`}
              className={`${dotClass} ${
                index !== slideIndex ? 'opacity-50' : 'scale-125'
              }`}
              key={`slide-dot-${index}`}
              id={`slide-dot-${index}`}
              onClick={() => {
                setPage([index, slideIndex > index ? -1 : 1]);
              }}
            ></label>
          ))}
          <button
            className={`transition-all hover:scale-125 cursor-pointer ${CustomEase}`}
            onClick={() => paginate(1)}
          >
            <svg height="48" viewBox="0 -960 960 960" width="48">
              <path
                d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"
                className={theme?.fill || 'fill-green-blue'}
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Slideshow;
