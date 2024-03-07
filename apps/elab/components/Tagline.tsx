import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  Transition,
  Variants,
  cubicBezier,
  motion,
  wrap,
} from 'framer-motion';
import { Gutter } from './Gutter';

const wordTransition: Transition = {
  y: {
    type: 'tween',
    duration: 1.8,
    ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
  },
  opacity: { duration: 1.1 },
};
const wordVariants: Variants = {
  enter: {
    y: -50,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 50,
    opacity: 0,
  },
};
const definitionVariants: Variants = {
  enter: {
    y: 50,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -50,
    opacity: 0,
  },
};

export const Tagline = ({ showVideo, vidH }: any) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [underlineOrder, setWordUnderlineOrder] = useState([0, 1, 2]);
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((wordIndex) => wrap(0, 3, wordIndex + 1));
      setWordUnderlineOrder([...underlineOrder.slice(1, 3), underlineOrder[0]]);
    }, 3500);
    return () => clearInterval(interval);
  }, [wordIndex]);

  const Definition = ({
    word,
    define,
    index,
    color,
  }: {
    word: string;
    define: string;
    index: number;
    color: string;
  }) => {
    if (wordIndex === index)
      return (
        <motion.div
          key={`word-${wordIndex}`}
          variants={definitionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { duration: 1, ease: cubicBezier(0.075, 0.82, 0.165, 1.0) },
            opacity: { duration: 0.8 },
          }}
          className="h-full flex items-center"
        >
          <div
            className={`h-1/5 relative drop-shadow-[0px_0px_10px_#fff] ${color}`}
          >
            <p className="flex flex-row w-3/4 justify-start items-center">
              {word}{' '}
              <em className="text-sm font-semibold ml-3 animate-enterNoun">
                noun
              </em>
            </p>
            <p className="text-grey font-normal text-sm animate-unBlur">
              {define}
            </p>
          </div>
        </motion.div>
      );
    return <span key={`word-${wordIndex}`}></span>;
  };
  return (
    <Gutter noMarginY={true}>
      <>
        <div id="tagline" className="flex static flex-col xl:pt-14">
          <div className="flex justify-center text-2xl md:text-3xl xl:text-5xl font-extrabold mt-10 xl:mt-24">
            <div className="text-slate w-3/4 drop-shadow-[0px_0px_15px_#fff]">
              Advancing&nbsp;
              <span className="inline-block text-purple">
                peace<span className="text-slate">,</span>
              </span>
              &nbsp;
              <div className="inline-block">
                <span className="inline-block text-purple">equity</span>,
                &&nbsp;
              </div>
              <span className="text-purple">justice</span>
              <br />
              <div className="flex flex-col lg:flex-row h-20">
                through collaborative&nbsp;
                <div
                  className={`flex flex-col font-extrabold ${
                    wordIndex !== 0
                      ? wordIndex === 1
                        ? 'w-[4.1em]'
                        : 'w-[3.1em]'
                      : 'w-[5.5em]'
                  }`}
                >
                  <div
                    className={`flex lg:inline-flex flex-col transition-all duration-700 overflow-hidden h-8 md:h-12`}
                  >
                    <div className="relative">
                      <div className="text-yellow ">
                        <AnimatePresence>
                          {wordIndex === 0 && (
                            <motion.div
                              key={0}
                              variants={wordVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={wordTransition}
                              className="absolute inline-block"
                            >
                              storytelling
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="text-green">
                        <AnimatePresence>
                          {wordIndex === 1 && (
                            <motion.div
                              key={1}
                              variants={wordVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={wordTransition}
                              className="absolute inline-block"
                            >
                              research
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="text-red">
                        <AnimatePresence>
                          {wordIndex === 2 && (
                            <motion.div
                              key={2}
                              variants={wordVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={wordTransition}
                              className="absolute inline-block"
                            >
                              design
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {underlineOrder.map((underlineI, i) => {
                    const colors = ['bg-yellow', 'bg-green', 'bg-red'];
                    return (
                      <motion.hr
                        key={`u-${underlineI}`}
                        layout
                        className={`h-1 border-none w-full ${
                          colors[underlineI]
                        } ${i === 0 ? 'animate-fill' : 'mt-1'}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showVideo && (
            <motion.div
              key="definitions"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: vidH,
                transition: { duration: 0.5 },
              }}
              exit={{ opacity: 0 }}
              className="flex justify-center xl:justify-end min-h-[10rem] max-h-screen"
            >
              <div className="w-3/4 xl:w-1/3 h-1/3 relative text-xl font-extrabold">
                <Definition
                  word="sto•ry•tell​•ing"
                  define="The art of conveying a narrative or a sequence of events through
                  spoken, written, or visual means."
                  index={0}
                  color="text-yellow"
                />
                <Definition
                  word="re•search"
                  define="The systematic investigation of the observable world"
                  index={1}
                  color="text-green"
                />
                <Definition
                  word="de•sign"
                  define="The intentional shaping of futures"
                  index={2}
                  color="text-red"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </Gutter>
  );
};
