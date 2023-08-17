import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
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
  const [showVideo, setShowVideo] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef();

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

    player.on('loaded', () => {
      setShowVideo(true);
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
      <div className="h-full flex items-center -translate-y-16">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0)' }}
          viewport={{ root: targetRef, amount: 'all' }}
          onViewportEnter={() => {
            setWordIndex(index);
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
        <motion.div id="tagline" className="flex static flex-col">
          <motion.div
            className="flex justify-center text-2xl md:text-5xl font-extrabold mt-10 xl:mt-24"
            // variants={cardVariants}
          >
            {/*  leading-[3.2rem] */}
            <div className="w-3/4 max-[375px]:break-words">
              Advancing&nbsp;
              <span className="inline-block text-purple">
                peace<span className="text-black">,</span>
              </span>
              &nbsp;
              <span className="inline-block text-purple">equity</span>, &&nbsp;
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
              className="flex justify-center xl:justify-end overflow-y-scroll no-scrollbar max-h-screen min-h-[190px]"
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
            <Divider />
            <h1 className="text-3xl lg:text-7xl text-grey font-bold my-14 md:px-20 xl:px-24 px-5 w-full">
              Featured
            </h1>
            <div className="flex flex-col my-14px-5 mb-10 md:px-20 xl:px-24 w-full">
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
                    let borderColor = 'border-yellow';
                    if (item.initiatives) {
                      if (item.initiatives[0] === 'gunviolence')
                        borderColor = 'border-purple';
                      else if (item.initiatives[0] === 'climate')
                        borderColor = 'border-leaf';
                    }
                    const ItemRenderer = ({
                      external,
                    }: {
                      external?: boolean;
                    }) => {
                      return (
                        <>
                          <div className="relative">
                            <div className="absolute right-4 top-4 p-2 bg-white rounded-full group">
                              {item.eventDate ? (
                                <div className="relative text-sm">
                                  <span className="absolute -top-10 -left-1 scale-0 translate-y-4 transition-all text-xs text-grey font-semibold group-hover:scale-100 group-hover:translate-y-0">
                                    <svg
                                      viewBox="3 6.317 41 24.354"
                                      width="41"
                                      height="24.354"
                                    >
                                      <path d="M 44 6.878 C 44 6.568 43.633 6.317 43.18 6.317 L 3.82 6.317 C 3.367 6.317 3 6.568 3 6.878 L 3 25.898 C 3 26.207 3.367 26.459 3.82 26.459 L 18.229 26.459 L 22.858 30.459 C 23.013 30.593 23.249 30.671 23.5 30.671 C 23.751 30.671 23.987 30.593 24.142 30.459 L 28.771 26.459 L 43.18 26.459 C 43.633 26.459 44 26.207 44 25.898 L 44 6.878 Z M 42.36 25.336 L 28.375 25.336 C 28.124 25.336 27.889 25.415 27.733 25.548 L 23.5 29.206 L 19.267 25.548 C 19.111 25.415 18.876 25.336 18.625 25.336 L 4.64 25.336 L 4.64 7.44 L 42.36 7.44 L 42.36 25.336 Z"></path>
                                      <path
                                        d="M 23.513 29.203 L 18.842 25.289 L 28.198 25.284 L 23.513 29.203 Z M 4.613 7.434 L 42.398 7.434 L 42.398 25.39 L 4.613 25.39 L 4.613 7.434 Z"
                                        style={{ fill: 'white' }}
                                      ></path>
                                      <text
                                        x="8.321"
                                        y="18.097"
                                        fontSize=".5em"
                                      >
                                        Event
                                      </text>
                                    </svg>
                                  </span>
                                  <svg
                                    height="30"
                                    viewBox="0 -960 960 960"
                                    width="30"
                                  >
                                    <path
                                      fill="#444"
                                      d="M596.817-220Q556-220 528-248.183q-28-28.183-28-69T528.183-386q28.183-28 69-28T666-385.817q28 28.183 28 69T665.817-248q-28.183 28-69 28ZM180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Z"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div className="relative">
                                  <span className="absolute -top-10 -left-1 scale-0 translate-y-4 transition-all text-xs text-grey font-semibold group-hover:scale-100 group-hover:translate-y-0">
                                    <svg
                                      viewBox="3 6.317 41 24.354"
                                      width="41"
                                      height="24.354"
                                    >
                                      <path d="M 44 6.878 C 44 6.568 43.633 6.317 43.18 6.317 L 3.82 6.317 C 3.367 6.317 3 6.568 3 6.878 L 3 25.898 C 3 26.207 3.367 26.459 3.82 26.459 L 18.229 26.459 L 22.858 30.459 C 23.013 30.593 23.249 30.671 23.5 30.671 C 23.751 30.671 23.987 30.593 24.142 30.459 L 28.771 26.459 L 43.18 26.459 C 43.633 26.459 44 26.207 44 25.898 L 44 6.878 Z M 42.36 25.336 L 28.375 25.336 C 28.124 25.336 27.889 25.415 27.733 25.548 L 23.5 29.206 L 19.267 25.548 C 19.111 25.415 18.876 25.336 18.625 25.336 L 4.64 25.336 L 4.64 7.44 L 42.36 7.44 L 42.36 25.336 Z"></path>
                                      <path
                                        d="M 23.513 29.203 L 18.842 25.289 L 28.198 25.284 L 23.513 29.203 Z M 4.613 7.434 L 42.398 7.434 L 42.398 25.39 L 4.613 25.39 L 4.613 7.434 Z"
                                        style={{ fill: 'white' }}
                                      ></path>
                                      <text
                                        x="8.321"
                                        y="18.097"
                                        fontSize=".5em"
                                      >
                                        News
                                      </text>
                                    </svg>
                                  </span>
                                  <svg
                                    height="30"
                                    viewBox="0 -960 960 960"
                                    width="30"
                                  >
                                    <path
                                      fill="#444"
                                      d="M140-120q-24 0-42-18t-18-42v-489h60v489h614v60H140Zm169-171q-24 0-42-18t-18-42v-489h671v489q0 24-18 42t-42 18H309Zm0-60h551v-429H309v429Zm86-131h168v-215H395v215Zm211 0h168v-88H606v88Zm0-127h168v-88H606v88ZM309-351v-429 429Z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div>
                              {item.thumbnail ? (
                                <Image
                                  id={`thumb-${i}`}
                                  alt={item.thumbAltText}
                                  transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                                  imgId={item.thumbnail.publicId}
                                  width={460}
                                  maxWidthDisable={true}
                                  className="w-full"
                                />
                              ) : (
                                <ImagePlaceholder
                                  imageLabel="News"
                                  width={335}
                                  height={200}
                                />
                              )}
                            </div>
                            <hr
                              className={`border-b-[15px] transition-transform origin-bottom ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-600 scale-y-100 group-hover:scale-y-[200%] ${borderColor}`}
                            />
                          </div>
                          <h3 className="text-bluegreen hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                            {item.name || item.title}{' '}
                            {external && (
                              <svg
                                viewBox="0 0 20 20"
                                width="20"
                                height="20"
                                className="inline ml-1"
                              >
                                <g transform="matrix(0.042265, 0, 0, 0.042265, 0, 2)">
                                  <g>
                                    <path
                                      d="M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374   c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13   c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5   C283.922,7.851,276.071,0,266.422,0z"
                                      className=" fill-bluegreen transition-all group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:fill-green-blue"
                                    ></path>
                                    <path
                                      d="M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137   c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"
                                      className=" fill-bluegreen transition-all group-hover:fill-green-blue"
                                    ></path>
                                  </g>
                                </g>
                              </svg>
                            )}
                          </h3>
                          <div className="">
                            {new Date(
                              item.publishDate
                                ? item.publishDate
                                : item.eventDate
                            ).toLocaleDateString('en-US', {
                              weekday: 'long',
                            })}
                            &nbsp;
                            {new Date(
                              item.publishDate
                                ? item.publishDate
                                : item.eventDate
                            ).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                            })}
                            &nbsp;
                            {new Date(
                              item.publishDate
                                ? item.publishDate
                                : item.eventDate
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                            })}
                          </div>
                          {item.summary && (
                            <p>
                              {item.summary.length > 150
                                ? `${item.summary.substring(
                                    0,
                                    item.summary
                                      .substring(0, 150)
                                      .lastIndexOf(' ')
                                  )}...`
                                : item.summary}
                            </p>
                          )}
                        </>
                      );
                    };
                    return (
                      <div key={i}>
                        <div className="flex-shrink">
                          {item.externalLink ? (
                            <a className="group" href={item.externalLink}>
                              <ItemRenderer external={true} />
                            </a>
                          ) : (
                            <Link
                              href={`/${item.eventDate ? 'events' : 'news'}/${
                                item.key
                              }`}
                              className="group"
                            >
                              <ItemRenderer />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex flex-col md:flex-row justify-end lg:ml-5 mt-8 mb-16">
                <span>
                  <MoreButton label="See more news" link="/news" />
                </span>
                <span className="md:ml-4">
                  <MoreButton label="See more events" link="/events" />
                </span>
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
