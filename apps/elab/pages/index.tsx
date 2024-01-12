import { useState, useRef, useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Player from '@vimeo/player';
import _ from 'lodash';

import { Image, Query } from '@el-next/components';
import Layout from '../components/Layout';

import Divider from '@/components/Divider';
import { Gutter } from '@/components/Gutter';
import {
  NewsEventRenderer,
  StudioGenericItemRenderer,
} from '@/components/Renderers';

import {
  CustomEase,
  Event,
  Item,
  News,
  Project,
  ResearchProject,
  Studio,
  StudioProject,
  StudioUnion,
} from '@/types';
import { MoreButton } from '@/components/Buttons';

type Home = {
  newsItem?: News;
};

export default function Home({
  sections,
  sectionOrder,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [videoFallback, setVideoFallback] = useState(false);
  const [videoFallbackPortrait, setVideoFallbackPortrait] = useState(false);
  const [vidH, setVideoHeight] = useState(0);
  const [videoOverlayHeight, setVideoOverlayHeight] = useState(0);
  const [bgTargetElement, setBgVideo] = useState();
  const [didScroll, setDidScroll] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef();

  const EnableVideoFallback = () => {
    // There is a problem with Vimeo, we will fall back to an image
    setVideoFallback(true);
    if (window.matchMedia('(orientation: portrait)').matches)
      setVideoFallbackPortrait(true);

    const img = document.getElementById('video-fallback');
    if (img) {
      img.addEventListener('load', () => {
        const height =
          img.clientHeight -
          document.querySelector<HTMLElement>('nav')!.clientHeight -
          document.querySelector<HTMLElement>('#tagline')!.offsetHeight -
          parseInt(
            window
              .getComputedStyle(document.getElementById('layout-daddy')!)
              .marginTop.replace(/[^0-9-]/g, '')
          );
        setVideoHeight(height);
        setVideoOverlayHeight(img.clientHeight);
      });
    }
  };

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
    try {
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
        quality: '720p',
      });

      player.on('loaded', () => {
        setShowVideo(true);
      });
      player.on('error', () => {
        EnableVideoFallback();
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
        if (
          window.matchMedia('(orientation: portrait)').matches &&
          height > 500
        )
          height = 500;

        setVideoHeight(height);
        setVideoOverlayHeight(
          document.querySelector<HTMLElement>('iframe') !== null
            ? document.querySelector<HTMLElement>('iframe')!.clientHeight
            : 0
        );
      });
      player
        .loadVideo({ id: portraitVideo ? 855474088 : 855473995 })
        .catch((e) => {
          EnableVideoFallback();
        });
    } catch (e) {
      EnableVideoFallback();
    }
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
          initial={{
            opacity: 0,
            filter: 'drop-shadow(0px 0px 13px #fff) blur(5px)',
          }}
          whileInView={{
            opacity: 1,
            filter: 'drop-shadow(0px 0px 13px #fff) blur(0px)',
          }}
          viewport={{ root: targetRef, amount: 'all' }}
          onViewportEnter={() => {
            if (didScroll) setWordIndex(index);
          }}
          className={`h-1/5 relative drop-shadow-[0px_0px_10px_#fff] ${color}`}
        >
          <p className="flex flex-row w-3/4 justify-start items-center">
            {word} <em className="text-sm font-semibold ml-3">noun</em>
          </p>
          <p className="text-grey font-normal text-sm">{define}</p>
        </motion.div>
      </div>
    );
  };

  const EventsRenderer = ({
    events,
    upcoming,
  }: {
    events: Event[];
    upcoming?: boolean;
  }) => {
    return (
      <Gutter>
        <h2 className="text-2xl md:text-5xl text-grey font-bold my-14">
          {upcoming ? 'Upcoming' : 'Recent'} Events
        </h2>
        <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
          {events.map((item: Event, i: number) => {
            return (
              <div key={i}>
                <div className="flex-shrink">
                  <Link href={`/events/${item.key}`} className="group">
                    <NewsEventRenderer item={item as Item} i={i} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex md:flex-row justify-end lg:ml-5 mt-8 mb-16">
          <MoreButton label="See more events" link="/events" />
        </div>
      </Gutter>
    );
  };

  return (
    <Layout
      ogTitle="Home"
      topBgElement={
        <div className="relative md:mx-16">
          {!videoFallbackPortrait ? (
            <Image
              id="video-fallback"
              alt="A group of people sitting around a table"
              imgId="elab-home-v3.x/about/cllz9l8bn00036gk2gnbddzl8"
              width={1800}
              className={`absolute top-0 h-screen w-full min-h-screen ${
                videoFallback ? 'block' : 'hidden'
              }`}
            />
          ) : (
            <Image
              id="video-fallback"
              alt="A group of people sitting around a table"
              imgId="elab-home-v3.x/about/cllz9l8bn00036gk2gnbddzl8"
              transforms={`c_lfill,g_custom:faces,w_${window.innerWidth},h_820`}
              width={window.innerWidth}
              maxWidthDisable={true}
              className={`absolute top-0 h-screen w-full min-h-screen ${
                videoFallback ? 'block' : 'hidden'
              }`}
            />
          )}
          {!videoFallback && (
            <div
              id="video-bg"
              ref={bgTargetElement}
              className={`absolute top-0 h-screen w-full min-h-screen transition-all ${CustomEase} duration-300  ${
                showVideo ? 'block' : 'hidden'
              }`}
              style={{ height: vidH }}
            ></div>
          )}

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
        <div id="tagline" className="flex static flex-col pt-14">
          <motion.div className="flex justify-center text-2xl md:text-5xl font-extrabold mt-10 xl:mt-24">
            {/* {showVideo && ( */}
            <div className="text-slate w-3/4 max-[375px]:break-words drop-shadow-[0px_0px_15px_#fff]">
              Advancing&nbsp;
              <span className="inline-block text-purple">
                peace<span className="text-slate">,</span>
              </span>
              &nbsp;
              <span className="inline-block text-purple">equity</span>, &&nbsp;
              <span className="text-purple">justice</span>
              <br />
              through collaborative&nbsp;
              <div className="inline-flex flex-col font-extrabold">
                <div className="overflow-hidden h-8 md:h-12">
                  <div
                    className={`inline-flex flex-col transition-all ${CustomEase} duration-300 text-left ${
                      wordIndex !== 0
                        ? wordIndex === 1
                          ? 'translate-y-[-33%]'
                          : 'translate-y-[-66%]'
                        : ''
                    }`}
                  >
                    <motion.span className="text-yellow">
                      storytelling
                    </motion.span>
                    <motion.span className="text-green">research</motion.span>
                    <motion.span className="text-red">design</motion.span>
                  </div>
                </div>
                <div
                  className={`flex flex-col transition-all ${CustomEase} duration-300 ${
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
            {/* )} */}
          </motion.div>
        </div>

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
            className="bg-white"
          >
            <Divider noMarginY={true} />
            {sections &&
              sectionOrder.map((key, index) => {
                switch (key) {
                  case 'events':
                    if (
                      sections.events.upcomingEvents &&
                      sections.events.upcomingEvents.length > 0
                    )
                      return (
                        <>
                          {index > 0 && <Divider />}
                          <EventsRenderer
                            events={sections.events.upcomingEvents}
                            upcoming={true}
                          />
                        </>
                      );
                    else if (
                      sections.events.recentEvents &&
                      sections?.events.recentEvents.length > 0
                    )
                      return (
                        <>
                          {index > 0 && <Divider />}
                          <EventsRenderer
                            events={sections?.events.recentEvents}
                          />
                        </>
                      );
                    break;
                  case 'news':
                    if (sections.news && sections.news.length > 0)
                      return (
                        <>
                          {index > 0 && <Divider />}
                          <Gutter>
                            <h2 className="text-2xl md:text-5xl text-grey font-bold my-14">
                              Recent News
                            </h2>
                            <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
                              {sections.news.map((item: News, i: number) => {
                                return (
                                  <div key={i}>
                                    <div className="flex-shrink">
                                      {/*  &&
                                      !item.externalLink.includes(
                                        'elab.emerson.edu'
                                      ) */}
                                      {item.externalLink ? (
                                        <a
                                          className="group"
                                          href={item.externalLink}
                                        >
                                          <NewsEventRenderer
                                            item={item as Item}
                                            i={i}
                                            external={true}
                                          />
                                        </a>
                                      ) : (
                                        <Link
                                          href={`/news/${item.key}`}
                                          className="group"
                                        >
                                          <NewsEventRenderer
                                            item={item as Item}
                                            i={i}
                                          />
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="flex md:flex-row justify-end lg:ml-5 mt-8 mb-16">
                              <MoreButton label="See more news" link="/news" />
                            </div>
                          </Gutter>
                        </>
                      );
                  case 'projects':
                    if (sections.projects && sections.projects.length > 0)
                      return (
                        <>
                          {index > 0 && <Divider />}
                          <Gutter>
                            <h2 className="text-2xl md:text-5xl text-grey font-bold my-14">
                              Featured Projects
                            </h2>
                            <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
                              {sections.projects?.map(
                                (
                                  item: StudioProject | ResearchProject,
                                  i: number
                                ) => {
                                  if (item.hasOwnProperty('initiative'))
                                    return (
                                      <StudioGenericItemRenderer
                                        key={i}
                                        item={item as unknown as StudioUnion}
                                        showBorder={true}
                                      />
                                    );
                                  else
                                    return (
                                      <Link
                                        href={`/research/projects/${item.key}`}
                                        passHref
                                        className="group"
                                      >
                                        <div className="relative">
                                          <Image
                                            id={`thumb-${item.key}`}
                                            alt={item.thumbAltText}
                                            transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                                            imgId={item.thumbnail.publicId}
                                            width={460}
                                            maxWidthDisable={true}
                                            className="w-full"
                                          />

                                          <hr
                                            className={`border-b-[15px] transition-transform origin-bottom ${CustomEase} duration-600 scale-y-100 group-hover:scale-y-[200%] border-red`}
                                          />
                                        </div>
                                        <h3 className="text-bluegreen text-xl font-semibold mt-4 hover:text-green-blue group-hover:text-green-blue">
                                          {item.name}
                                        </h3>

                                        <p>{item.shortDescription}</p>
                                      </Link>
                                    );
                                }
                              )}
                            </div>
                            <div className="flex justify-center lg:justify-end">
                              <MoreButton
                                link={`/studios/projects`}
                                label="See more projects"
                              />
                            </div>
                          </Gutter>
                        </>
                      );

                    break;
                  case 'studios':
                    if (sections.studios && sections.studios.length > 0)
                      return (
                        <>
                          {index > 0 && <Divider />}
                          <Gutter>
                            <h2 className="text-2xl md:text-5xl text-grey font-bold my-14">
                              Featured Studios
                            </h2>
                            <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
                              {sections.studios.map(
                                (item: Studio, i: number) => {
                                  return (
                                    <StudioGenericItemRenderer
                                      key={i}
                                      item={item as StudioUnion}
                                      showBorder={true}
                                    />
                                  );
                                }
                              )}
                            </div>
                            <div className="flex justify-center lg:justify-end">
                              <MoreButton
                                link={`/studios`}
                                label="See more studios"
                              />
                            </div>
                          </Gutter>
                        </>
                      );
                }
              })}
          </motion.div>
        )}
      </AnimatePresence>
      {!showVideo && <div className="min-h-[600px]"></div>}
    </Layout>
  );
}
export async function getStaticProps() {
  const orderingQuery = await Query(
    'initiativesLanding',
    `initiativesLanding(where: { name: "Blurbs / Landing Pages" }) {
        homepageOrder
      }`
  );
  const ordering: string[] = orderingQuery.homepageOrder;

  let recentEventsResult = [];
  const eventQueryStr = (dateCondition: string) => {
    return `events(
              where: {
                  enabled: {
                      equals: true
                  },
                  eventDate: {
                    ${dateCondition}
                  }
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
                  thumbnail { 
                    publicId
                  }
                  thumbAltText
                  summary
              }`;
  };
  // We want events only on or after right now, If there aren't any we will look for most recent
  const eventsQuery = await Query(
    'events',
    eventQueryStr(`gte: "${new Date().toISOString()}"`)
  );
  // If response for upcoming events is empty, look for past events
  // ErrorClass.empty = 1
  if (eventsQuery.error && eventsQuery.error.class === 1) {
    recentEventsResult = await Query(
      'events',
      eventQueryStr(`lte: "${new Date().toISOString()}"`)
    );
  } else if (eventsQuery.error) {
    return {
      props: {
        error: eventsQuery.error,
        event: null,
      },
      revalidate: 1,
    };
  }

  const newsItems = await Query(
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

  if (newsItems.error) {
    return {
      props: {
        error: newsItems.error,
        news: null,
      },
      revalidate: 1,
    };
  }

  const studioProjects = await Query(
    'studioProjects',
    `studioProjects(
      where: {
              enabled: {
                  equals: true
              }
            },
        ) { 
            name
            key
            flags
            order
            shortDescription
            initiative
            thumbnail { 
              publicId
            }
            thumbAltText
            filters {
              key
            }
        }`
  );

  const researchProjects = await Query(
    'researchProjects',
    `researchProjects(
			where: {
				enabled: {
					equals: true
				},
        featured: {
					equals: true
				}
			},
			orderBy: {
				endYear: asc
			}
		) {
			name
			key
      ongoing
      order
      startYear
      endYear
      shortDescription 
			thumbnail { 
				publicId
			}
      thumbAltText
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
  const studiosQuery = await Query(
    'studios',
    `studios(
			where: {
				enabled: {
					equals: true
				}
			}
		) {
			name
			key
      flags
      order
      initiatives
			shortDescription 
			thumbnail { 
				publicId
			}
      thumbAltText
		}`
  );
  if (studiosQuery.error) {
    return {
      props: {
        error: studiosQuery.error,
        studios: null,
      },
    };
  }

  // We need only the first three items in these queries
  const upcomingEvents = eventsQuery.error
    ? []
    : (eventsQuery as Event[]).slice(0, 3);
  const recentEvents =
    recentEventsResult.length > 0
      ? (recentEventsResult as Event[]).slice(0, 3)
      : [];
  const news = (newsItems as News[]).slice(0, 3);

  // TODO: clean this up
  let projectsMerged: Project[] = (studioProjects as Project[]).filter(
    (item) => item.flags && item.flags.includes('home')
  );

  // Project can either be studio or research
  if (researchProjects && researchProjects.length > 0)
    projectsMerged = [
      ...(studioProjects as Project[]).filter(
        (item) => item.flags && item.flags.includes('home')
      ),
      ...(researchProjects as Project[]),
    ];

  const projects = _.orderBy(projectsMerged, 'order');
  const studios = _.orderBy(
    (studiosQuery as Studio[]).filter(
      (item) => item.flags && item.flags.includes('home')
    ),
    'order'
  );
  const events = { upcomingEvents, recentEvents };
  let sections = {
    events: events,
    news: news,
    projects: projects,
    studios: studios,
  };
  return {
    props: { sections, sectionOrder: ordering },
    revalidate: 1,
  };
}
