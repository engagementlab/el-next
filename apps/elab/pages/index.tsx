import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Layout from '../components/Layout';
import { CTAButton, MoreButton } from '@/components/Buttons';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { Event, Item, News, StudioProject, Theme } from '@/types';

import { Image, Query } from '@el-next/components';
import Divider from '@/components/Divider';
import { InferGetStaticPropsType } from 'next';
import BleedImage from '@/components/BleedImage';
import { Icons } from '@/components/Icons';
import Player from '@vimeo/player';
import { Gutter } from '@/components/Gutter';
import Link from 'next/link';
import { NewsEventRenderer } from '@/components/Renderers';

type Home = {
  newsItem?: News;
};

export default function Home({
  newsItem,
  studioProject,
  event,
  mergedItems,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [vidH, setVideoHeight] = useState(0);
  const [videoOverlayHeight, setVideoOverlayHeight] = useState(0);
  const [bgTargetElement, setBgVideo] = useState();
  const [didScroll, setDidScroll] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef();
  useEffect(() => {
    window.addEventListener(
      'scroll',
      () => {
        if (!didScroll) setDidScroll(true);
      },
      true
    );
    setBgVideo(bgVideoRef.current);
    const portraitVideo = window.matchMedia('(orientation: portrait)').matches;
    const player = new Player('video-bg', {
      id: portraitVideo ? 855474088 : 855473995,
      width: 1640,
      height: 720,
      controls: false,
      autoplay: true,
      autopause: true,
      muted: true,
      loop: true,
      responsive: true,
    });

    player.on('loaded', () => {
      setShowVideo(true);
    });
    player.on('resize', (e) => {
      // We have to set the height of the video manually because we don't know the height of the iframe until the video is embedded based on the size of the device
      let height =
        document.querySelector<HTMLElement>('iframe')!.clientHeight -
        document.querySelector<HTMLElement>('nav')!.clientHeight -
        document.querySelector<HTMLElement>('#tagline')!.offsetHeight -
        parseInt(
          window
            .getComputedStyle(document.getElementById('layout-daddy')!)
            .marginTop.replace(/[^0-9-]/g, '')
        );
      if (window.matchMedia('(orientation: portrait)').matches && height > 500)
        height = 500;

      setVideoHeight(height);
      setVideoOverlayHeight(
        document.querySelector<HTMLElement>('iframe') !== null
          ? document.querySelector<HTMLElement>('iframe')!.clientHeight
          : 0
      );
    });
  }, [bgVideoRef]);

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
    return (
      <div className="h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0)' }}
          viewport={{ root: targetRef, amount: 'all' }}
          onViewportEnter={() => {
            if (didScroll) setWordIndex(index);
            // console.log(index, scrollYProgress.get());
          }}
          className={`h-1/5 relative ${color}`}
        >
          <p className="flex flex-row w-3/4 justify-between items-center">
            {word} <em className="text-sm font-semibold">noun</em>
          </p>
          <p className="text-grey font-normal text-sm">{define}</p>
        </motion.div>
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
            className={`absolute top-0 h-screen w-full min-h-screen transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300  ${
              showVideo ? 'block' : 'hidden'
            }`}
            style={{ height: vidH }}
          ></div>

          <div
            className={`absolute top-0 w-full bg-gradient-to-b from-[#EFC3C0] via-[#CDE6E1] to-[#F4E3C5] ${
              showVideo
                ? 'opacity-80'
                : 'flex justify-center items-center min-h-screen opacity-100'
            }`}
            style={{ height: showVideo ? videoOverlayHeight : 'auto' }}
          >
            {!showVideo && (
              <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                className="opacity-70 fill-purple"
              >
                {/* <path
                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                width={1}
                opacity=".25"
              />
              <path
                d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
              /> */}
                <path
                  d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
                  className="animate-spin origin-center"
                />
              </svg>
            )}
          </div>
        </div>
      }
      fullBleed={true}
      error={error}
    >
      <Gutter noMarginY={true}>
        <motion.div id="tagline" className="flex static flex-col pt-14">
          <motion.div className="flex justify-center text-2xl md:text-5xl font-extrabold mt-10 xl:mt-24">
            {showVideo && (
              <div className="w-3/4 max-[375px]:break-words">
                Advancing&nbsp;
                <span className="inline-block text-purple">
                  peace<span className="text-black">,</span>
                </span>
                &nbsp;
                <span className="inline-block text-purple">equity</span>,
                &&nbsp;
                <span className="text-purple">justice</span>
                <br />
                through collaborative&nbsp;
                <div className="inline-flex flex-col font-extrabold">
                  <div className="overflow-hidden h-8 md:h-12">
                    <div
                      className={`inline-flex flex-col transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 text-left  ${
                        wordIndex !== 0
                          ? wordIndex === 1
                            ? 'translate-y-[-33%]'
                            : 'translate-y-[-66%]'
                          : ''
                      }`}
                    >
                      <motion.span className="text-yellow" initial="onscreen">
                        storytelling
                      </motion.span>{' '}
                      <motion.span className="text-green" initial="onscreen">
                        research
                      </motion.span>
                      <motion.span className="text-red" initial="onscreen">
                        design
                      </motion.span>
                    </div>
                  </div>
                  <div
                    className={`flex flex-col transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 ${
                      wordIndex !== 0
                        ? wordIndex === 1
                          ? 'w-9/12'
                          : 'w-7/12'
                        : ''
                    }`}
                  >
                    <hr className="h-1 border-none bg-red w-full" />
                    <hr className="h-1 my-1 border-none bg-green-blue w-full" />
                    <hr className="h-1 border-none bg-yellow w-full" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: vidH,
                transition: { duration: 0.5 },
              }}
              exit={{ opacity: 0 }}
              className="flex justify-center xl:justify-end overflow-y-scroll no-scrollbar max-h-screen"
              ref={targetRef}
            >
              <div className="w-3/4 xl:w-1/3 h-full relative text-xl font-extrabold">
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
      </Gutter>
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, delay: 0.6 },
            }}
            exit={{ opacity: 0 }}
          >
            <Divider noMarginY={true} />
            <h1 className="text-3xl lg:text-7xl text-grey bg-white font-bold py-16 md:px-20 xl:px-24 px-5 w-full">
              Featured
            </h1>
            <div className="flex flex-col bg-white px-5 mb-10 md:px-20 xl:px-24 w-full">
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
                        `${new Date(event.eventDate).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'long',
                          }
                        )} ${new Date(event.eventDate).toLocaleDateString(
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
                    transforms="f_auto,dpr_auto,c_fill,g_faces,h_290,w_460"
                    width={650}
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
                    transforms="f_auto,dpr_auto,c_fill,g_faces,h_290,w_460"
                    width={650}
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
                      <DocumentRenderer
                        document={studioProject.blurb.document}
                      />

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
                    transforms="f_auto,dpr_auto,c_fill,g_faces,h_290,w_460"
                    width={650}
                    className="mb-6 lg:mb-0"
                  />
                </div>
              )}
            </div>
            <Divider />
            <Gutter>
              <h1 className="text-3xl lg:text-7xl text-grey font-bold my-14">
                News & Events
              </h1>
              {/* News/events */}
              <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
                {mergedItems &&
                  mergedItems.map((item: Item, i: number) => {
                    return (
                      <div key={i}>
                        <div className="flex-shrink">
                          {item.externalLink ? (
                            <a className="group" href={item.externalLink}>
                              <NewsEventRenderer
                                item={item}
                                i={i}
                                external={true}
                                showIcon={true}
                              />
                            </a>
                          ) : (
                            <Link
                              href={`/${item.eventDate ? 'events' : 'news'}/${
                                item.key
                              }`}
                              className="group"
                            >
                              <NewsEventRenderer
                                item={item}
                                i={i}
                                external={false}
                                showIcon={true}
                              />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex md:flex-row justify-end lg:ml-5 mt-8 mb-16">
                <MoreButton label="See more news & events" link="/whats-new" />
              </div>
            </Gutter>
          </motion.div>
        )}
      </AnimatePresence>
      {!showVideo && <div className="min-h-[600px]"></div>}
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
        orderBy: {
          eventDate: desc
        }
      ) { 
          name
          key
          initiatives
          eventDate
          blurb {
            document
          }
          flags
          thumbnail { 
            publicId
          }
          thumbAltText
          summary
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
        }
      },
      orderBy: {
          publishDate: desc
      }	
    ) { 
        title
        key
        blurb {
          document
        }
        flags
        initiatives
        publishDate
        externalLink
        thumbnail { 
            publicId
        }
        thumbAltText
        summary
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
  const studioProject = (studioProjects as StudioProject[]).filter(
    (item) => item.flags && item.flags.includes('home')
  )[0];
  const featuredEvents = (events as Event[]).filter(
    (item) => item.flags && item.flags.includes('home')
  );
  const event = featuredEvents.length > 0 ? featuredEvents[0] : null;
  const mergedItems = ([...(events as Event[]), ...(news as News[])] as Item[])
    .sort((a, b) => {
      let val = 0;
      if (a.publishDate && b.publishDate)
        val = a.publishDate > b.publishDate ? 1 : -1;
      else if (a.eventDate && b.eventDate)
        val = a.eventDate > b.eventDate ? -1 : 1;
      else if (a.eventDate && b.publishDate)
        val = a.eventDate > b.publishDate ? -1 : 1;
      else if (a.publishDate && b.eventDate)
        val = a.publishDate > b.eventDate ? -1 : 1;
      return val;
    })
    .slice(0, 3);
  return {
    props: {
      event,
      newsItem,
      studioProject,
      mergedItems,
    },
  };
}
