import {
  useState,
  useRef,
  useEffect,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  SetStateAction,
} from 'react';
import {
  MotionValue,
  Variants,
  motion,
  useInView,
  useScroll,
} from 'framer-motion';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Layout from '../components/Layout';
import { CTAButton } from '@/components/Buttons';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { Theme } from '@/types';
import { Parallax } from 'react-scroll-parallax';
import { Image, Query } from '@el-next/components';
import Divider from '@/components/Divider';
import { InferGetStaticPropsType } from 'next';
import BleedImage from '@/components/BleedImage';
import { Icons } from '@/components/Icons';
import Player from '@vimeo/player';
import { Gutter } from '@/components/Gutter';

type News = {
  title: string;
  name?: string;
  key: string;
  flags: string[];
  filters?: { key: string }[];
  eventDate?: string;
  publishDate: string;
  blurb: {
    document: any;
  };
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
};
type Home = {
  newsItem?: News;
};

export default function Home({
  newsItem,
  studioProject,
  event,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [targetElement, setTarget] = useState();
  const [vidH, setVideoHeight] = useState(0);
  const [videoOverlayHeight, setVideoOverlayHeight] = useState(0);
  const [bgTargetElement, setBgVideo] = useState();
  const [wordIndex, setWordIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const definition1Ref = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef();
  // useEffect(() => {
  //   setTarget(targetRef.current);
  // }, [targetRef]);

  // const { scrollYProgress } = useScroll({ container: targetElement });

  const isInView = useInView(definition1Ref, { root: targetRef });
  useEffect(() => {
    setBgVideo(bgVideoRef.current);
    const portraitVideo = window.matchMedia('(orientation: portrait)').matches;
    const player = new Player('video-bg', {
      id: portraitVideo ? 854491578 : 846665267,
      width: 1640,
      height: 720,
      controls: false,
      autoplay: true,
      autopause: true,
      muted: true,
      loop: true,
      responsive: true,
    });
    player.on('resize', (e) => {
      // We have to set the height of the video manually because we don't know the height of the iframe until the video is embedded based on the size of the device
      setVideoHeight(
        document.querySelector<HTMLElement>('iframe') !== null
          ? document.querySelector<HTMLElement>('iframe')!.clientHeight -
              document.querySelector<HTMLElement>('nav')!.clientHeight -
              document.querySelector<HTMLElement>('#tagline')!.clientHeight
          : 0
      );
      setVideoOverlayHeight(
        document.querySelector<HTMLElement>('iframe') !== null
          ? document.querySelector<HTMLElement>('iframe')!.clientHeight
          : 0
      );
    });
  }, [bgVideoRef]);

  const cardVariants: Variants = {
    offscreen: {
      y: 100,
      // opacity: 0,
      // transitionEnd: {
      //   display: 'none',
      // },
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.8,
      },
    },
  };
  const wordVariants: Variants = {
    offscreen: {
      x: 45,
      opacity: 0,
      // transitionEnd: {
      //   display: 'none',
      // },
    },
    onscreen: {
      x: 0,
      opacity: 1,
      display: 'flex',

      transition: {
        duration: 0.4,
      },
    },
  };

  const Definition = ({ text, index }: { text: string; index: number }) => {
    return (
      <div className="h-full flex items-center">
        <motion.p
          ref={definition1Ref}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: targetRef, amount: 'all' }}
          onViewportEnter={(definition) => {
            // console.log('Started animating #' + index, definition);
            // debugger;
            setWordIndex(index);
          }}
          className="h-1/5 relative"
        >
          {text}
        </motion.p>
      </div>
    );
  };
  return (
    <Layout
      topBgElement={
        <div className="relative md:mx-16">
          <div
            id="video-bg"
            ref={bgTargetElement}
            className="absolute top-0 h-screen w-full"
          ></div>
          <div
            className="absolute top-0 w-full bg-gradient-to-b from-[#EFC3C0] via-[#CDE6E1] to-[#F4E3C5] opacity-80"
            style={{ height: videoOverlayHeight }}
          ></div>
        </div>
      }
      fullBleed={true}
      error={error}
    >
      <Gutter noMarginY={true}>
        <motion.div id="tagline" className="flex static flex-col">
          <motion.div
            className="flex justify-center text-2xl md:text-4xl font-extrabold mt-10 xl:mt-24"
            variants={cardVariants}
          >
            <div className="w-3/4 xl:w-full text-center">
              Advancing&nbsp;<span className="text-purple">peace</span>,&nbsp;
              <span className="text-purple">equity</span>, &&nbsp;
              <span className="text-purple">justice</span>&nbsp;through&nbsp;
              collaborative&nbsp;
              <div className="inline-flex flex-col text-2xl md:text-4xl font-extrabold">
                <div className="overflow-hidden h-8 md:h-10">
                  <div
                    className={`inline-flex flex-col transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 text-left  ${
                      wordIndex !== 0
                        ? wordIndex === 1
                          ? 'translate-y-[-33%]'
                          : 'translate-y-[-66%]'
                        : ''
                    }`}
                  >
                    <motion.span
                      className="text-yellow"
                      // variants={wordVariants}
                      initial="onscreen"
                    >
                      storytelling
                    </motion.span>{' '}
                    <motion.span
                      className="text-green"
                      initial="onscreen"
                      // animate={wordIndex !s== 1 ? 'offscreen' : 'onscreen'}
                    >
                      research
                    </motion.span>
                    <motion.span
                      className="text-red"
                      // variants={wordVariants}
                      initial="onscreen"
                      // animate={wordIndex !s== 1 ? 'offscreen' : 'onscreen'}
                    >
                      design
                    </motion.span>
                  </div>
                </div>
                <div
                  className={`flex flex-col transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300  ${
                    wordIndex !== 0
                      ? wordIndex === 1
                        ? 'w-9/12'
                        : 'w-7/12'
                      : ''
                  }`}
                >
                  {' '}
                  <hr className="h-1 border-none bg-red w-full" />
                  <hr className="h-1 my-1 border-none bg-green-blue w-full" />
                  <hr className="h-1 border-none bg-yellow w-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div
          className={`flex justify-center max-h-screen overflow-y-scroll no-scrollbar`}
          style={{ height: vidH }}
          ref={targetRef}
        >
          <div className="w-3/4 md:w-full xl:w-11/12 h-full relative text-3xl font-extrabold">
            <Definition
              text="The art of conveying a narrative or a sequence of events through
                spoken, written, or visual means."
              index={0}
            />
            <Definition
              text="The systematic investigation of the observable world"
              index={1}
            />
            <Definition text="The intentional shaping of futures" index={2} />
          </div>
        </div>
      </Gutter>
      <Divider />
      <Gutter>
        <div className="flex flex-col mb-10 w-full">
          <h1 className="text-3xl lg:text-7xl text-grey font-bold my-14">
            Featured
          </h1>

          {/* Featured event */}
          {event && (
            <div className="flex flex-col-reverse justify-between items-center lg:flex-row my-7">
              <div className="flex fill-grey lg:w-4/5 px-5">
                <div className="w-2/5 sm:w-14 mr-3">
                  <Icons icons={['event']} />
                </div>
                <div className="flex flex-col  text-grey">
                  <h2 className="flex-shrink text-2xl lg:text-3xl text-grey font-bold">
                    {event.name}
                  </h2>
                  {event.eventDate &&
                    `${new Date(event.eventDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                    })} ${new Date(event.eventDate).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        day: 'numeric',
                      }
                    )}`}

                  <DocumentRenderer document={event.blurb.document} />

                  <div className="mt-8">
                    <CTAButton
                      label="Learn more"
                      link={`/events/${event.key}`}
                      theme={Theme.climate}
                    />
                  </div>
                </div>
              </div>
              <BleedImage
                id={`thumb-${event.key}`}
                alt={event.thumbAltText}
                imgId={event.thumbnail.publicId}
                width={700}
                transforms="c_fill,g_faces,h_650,w_650"
                className="mb-6 lg:mb-0"
              />
            </div>
          )}

          {/* Featured studio project */}
          {studioProject && (
            <div className="flex flex-col justify-between items-center lg:flex-row my-7">
              <BleedImage
                id={`thumb-${studioProject.key}`}
                alt={studioProject.thumbAltText}
                imgId={studioProject.thumbnail.publicId}
                width={350}
                transforms="c_fill,g_faces,h_650,w_650"
                className="mb-6 lg:mb-0"
              />
              <div className="flex fill-grey lg:w-4/5 px-5 ml-4">
                <div className="w-2/5 sm:w-14 mr-3">
                  <Icons
                    icons={studioProject.filters?.map((f) => {
                      return f.key;
                    })}
                  />
                </div>
                <div className="flex flex-col  text-grey">
                  <h2 className="flex-shrink text-2xl lg:text-3xl text-grey font-bold">
                    {studioProject.name}
                  </h2>
                  <DocumentRenderer document={studioProject.blurb.document} />

                  <div className="mt-8">
                    <CTAButton
                      label="Learn more"
                      link={`/news/${studioProject.key}`}
                      theme={Theme.gunviolence}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Featured news */}
          {newsItem && (
            <div className="flex flex-col-reverse justify-between items-center lg:flex-row my-7">
              <div className="flex fill-grey lg:w-4/5 px-5">
                <div className="w-2/5 sm:w-14 mr-3">
                  <Icons icons={['news']} />
                </div>
                <div className="flex flex-col  text-grey">
                  <h2 className="flex-shrink text-2xl lg:text-3xl text-grey font-bold">
                    {newsItem.title}
                  </h2>
                  <DocumentRenderer document={newsItem.blurb.document} />

                  <div className="mt-8">
                    <CTAButton
                      label="Read news"
                      link={`/news/${newsItem.key}`}
                      theme={Theme.climate}
                    />
                  </div>
                </div>
              </div>
              <BleedImage
                id={`thumb-${newsItem.key}`}
                alt={newsItem.thumbAltText}
                imgId={newsItem.thumbnail.publicId}
                width={700}
                transforms="c_fill,g_faces,h_650,w_650"
                className="mb-6 lg:mb-0"
              />
            </div>
          )}
        </div>
      </Gutter>
    </Layout>
  );
}
export async function getStaticProps() {
  const events = await Query(
    'events',
    `events(
        where: {
              enabled: {
                  equals: true
              },
            },
        ) { 
            name
            key
            eventDate
            blurb {
              document
            }
            flags
            thumbnail { 
              publicId
            }
            thumbAltText
        }`
  );

  if (events.error) {
    return {
      props: {
        error: events.error,
        event: null,
      },
    };
  }

  const studioProjects = await Query(
    'studioProjects',
    `studioProjects(
      where: {
              enabled: {
                  equals: true
              },
            },
        ) { 
            name
            key
            blurb {
              document
            }
            flags
            thumbnail { 
              publicId
            }
            thumbAltText
            filters {
              key
            }
        }`
  );

  if (studioProjects.error) {
    return {
      props: {
        error: studioProjects.error,
        studioProject: null,
      },
    };
  }

  const news = await Query(
    'newsItems',
    `newsItems(
      where: {
              enabled: {
                  equals: true
              },
            },
        ) { 
            title
            key
            blurb {
              document
            }
            flags
            thumbnail { 
                publicId
            }
            thumbAltText
        }`
  );

  if (news.error) {
    return {
      props: {
        error: news.error,
        newsItem: null,
      },
    };
  }

  const newsItem = (news as News[]).filter(
    (item) => item.flags && item.flags.includes('home')
  )[0];
  const studioProject = (studioProjects as News[]).filter(
    (item) => item.flags && item.flags.includes('home')
  )[0];
  const featuredEvents = (events as News[]).filter(
    (item) => item.flags && item.flags.includes('home')
  );
  const event = featuredEvents.length > 0 ? featuredEvents[0] : null;
  return {
    props: {
      event,
      newsItem,
      studioProject,
    },
  };
}
