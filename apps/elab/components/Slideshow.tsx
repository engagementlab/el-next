import { Image, Video } from '@el-next/components';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import * as React from 'react';
import { HTMLProps } from 'react';
import CaptionedImage from './CaptionedImage';
import { ThemeConfig } from '@/types';

type Props = {
  slides: any[];
  className?: HTMLProps<HTMLElement>['className'];
  theme?: ThemeConfig;
  heightOverride?: string;
  ContentRenderer?: React.ComponentType<any>;
};

const variants = {
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
  const dotClass: HTMLProps<HTMLElement>['className'] = `relative w-10 h-3 mx-2 rounded-large inline-block transition-all hover:scale-125 cursor-pointer ${
    theme?.bg || ' bg-green-blue'
  }`;
  const [[slide, direction], setPage] = React.useState([0, 0]);
  const slideIndex = wrap(0, slides.length, slide);

  const paginate = (newDirection: number) => {
    setPage([slide + newDirection, newDirection]);
  };
  return (
    <div className="flex-grow my-5">
      <div
        className={`relative flex items-center ${
          heightOverride ? heightOverride : 'min-h-[350px]'
        } lg:min-h-[465px] overflow-hidden ${className}`}
      >
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
            {slides.map((slide, index) => {
              return index === slideIndex ? (
                <div
                  id={`slide-${index}`}
                  key={`slide-${index}`}
                  className="w-full"
                >
                  {ContentRenderer ? (
                    <ContentRenderer slide={slide} />
                  ) : slide.videoId ? (
                    <div
                      className={`flex items-center min-h-[350px] lg:min-h-[465px]`}
                    >
                      <Video
                        videoLabel={''}
                        videoUrl={`https://player.vimeo.com/video/${slide.videoId}`}
                        thumbUrl={slide.image.publicUrl}
                        isSlide={true}
                      />
                    </div>
                  ) : slide.caption ? (
                    <div className="relative">
                      <Image
                        id={'img-' + slide.image.publicId}
                        alt={slide.altText}
                        imgId={slide.image.publicId}
                        className="pointer-events-none max-h-[350px] lg:max-h-[465px]"
                      />
                      <aside
                        className={`absolute bottom-0 right-0 p-3 w-full lg:w-3/4 ${theme?.bg} text-white`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
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
                        {slide.caption}
                      </aside>
                    </div>
                  ) : (
                    <Image
                      id={'img-' + slide.image.publicId}
                      alt={slide.altText}
                      imgId={slide.image.publicId}
                      lazy={false}
                      // width={300}
                      transforms="c_crop,g_center"
                      className="pointer-events-none max-h-[350px] lg:max-h-[465px]"
                    />
                  )}
                </div>
              ) : null;
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      {slides.length > 1 && (
        <div className="flex justify-center items-center mt-3">
          <button
            className="transition-all hover:scale-125 cursor-pointer"
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
            className="transition-all hover:scale-125 cursor-pointer"
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
