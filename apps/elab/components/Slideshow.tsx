import { Image, Video } from '@el-next/components';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import * as React from 'react';
import { HTMLProps } from 'react';
import CaptionedImage from './CaptionedImage';

type Props = {
  slides: any[];
  className?: HTMLProps<HTMLElement>['className'];
  themeColor?: string;
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
  themeColor,
  ContentRenderer,
}: Props): JSX.Element => {
  const dotClass: HTMLProps<HTMLElement>['className'] = `relative w-10 h-3 mx-1 rounded-large inline-block transition-all hover:scale-125 cursor-pointer ${
    themeColor || ' bg-purple'
  }`;
  const [[slide, direction], setPage] = React.useState([0, 0]);
  const slideIndex = wrap(0, slides.length, slide);

  const paginate = (newDirection: number) => {
    setPage([slide + newDirection, newDirection]);
  };
  return (
    <div className="flex-grow">
      <div className={`relative min-h-[465px] overflow-hidden ${className}`}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className={`absolute mx-4 max-h-[465px] w-full ${
              !ContentRenderer && 'flex justify-center'
            }`}
            key={slide}
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
              return ContentRenderer ? (
                <ContentRenderer slide={slide} />
              ) : (
                index === slideIndex &&
                  (slide.videoId ? (
                    <Video
                      videoLabel={'item?.videos[0].label'}
                      videoUrl={`https://player.vimeo.com/video/${slide.videoId}`}
                      thumbUrl={slide.image.publicUrl}
                      isSlide={true}
                    />
                  ) : slide.caption ? (
                    <div className="relative overflow-x-hidden">
                      <Image
                        id={'img-' + slide.image.publicId}
                        alt={slide.altText}
                        imgId={slide.image.publicId}
                        lazy={false}
                        aspectDefault={false}
                        transforms="f_auto,dpr_auto,c_crop,g_center,r_max,h_630,w_630"
                        className="pointer-events-none max-h-[465px]"
                      />
                      <aside
                        className={`absolute bottom-0 right-0 p-3 w-3/4 ${themeColor} text-white`}
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
                      className="pointer-events-none"
                    />
                  ))
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      <div>
        <li className="flex justify-center mt-3">
          {slides.map((slide, index) => (
            <label
              htmlFor="img-1"
              className={`${dotClass} ${index !== slideIndex && 'opacity-50'}`}
              id="img-dot-1"
              onClick={(event) => {
                setPage([index, 1]);
              }}
            ></label>
          ))}
        </li>
      </div>
    </div>
  );
};

export default Slideshow;
