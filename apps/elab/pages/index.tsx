import { useState, useRef, useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import {
  AnimatePresence,
  Transition,
  Variants,
  cubicBezier,
  motion,
  wrap,
} from 'framer-motion';
import _ from 'lodash';

import { Image, Query } from '@el-next/components';
import Layout from '../components/Layout';

import Divider from '@/components/Divider';
import { Gutter } from '@/components/Gutter';
import {
  NewsEventRenderer,
  StudioGenericItemRenderer,
} from '@/components/Renderers';
import { MoreButton } from '@/components/Buttons';

import {
  CustomEase,
  DefaultWhereCondition,
  Event,
  Item,
  News,
  Project,
  ResearchProject,
  Studio,
  StudioProject,
  StudioUnion,
} from '@/types';
import { Tagline } from '@/components/Tagline';

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
  const [showVideo, setShowVideo] = useState(false);

  const videoPlayerRef = useRef<HTMLVideoElement>(null);
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
        setShowVideo(true);
      });
    }
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
        <h2 className="text-2xl md:text-5xl text-grey font-bold my-7 lg:my-14">
          {upcoming ? 'Upcoming' : 'Recent'} Events
        </h2>
        <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
          {events.map((item: Event, i: number) => {
            return (
              <div key={`event-${i}`}>
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

  useEffect(() => {
    const portraitVideo = window.matchMedia('(orientation: portrait)').matches;
    const videoUrlSuffixPortrait =
      '855474088/rendition/540p/file.mp4?loc=external&signature=da990294f49e048e5bf3e9d32c58b7b4cf8f1d662eeccfddf5ad25ce056bd2c5';
    const videoUrlSuffix =
      '855473995/rendition/720p/file.mp4?loc=external&signature=b8c1e523cef66417157a29c9baf8a66a5d7701eaad2a44d723e71614f664a0fa';

    setBgVideo(bgVideoRef.current);

    if (videoPlayerRef.current) {
      try {
        videoPlayerRef.current.onplay = () => {
          // We have to set the height of the video manually because we don't know the height of the frame until the video is embedded based on the size of the device
          let height =
            videoPlayerRef.current!.clientHeight -
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
            videoPlayerRef.current ? videoPlayerRef.current.clientHeight : 0
          );
          setShowVideo(true);
        };

        videoPlayerRef.current.onerror = (e) => {
          EnableVideoFallback();
        };
        videoPlayerRef.current.src = `https://player.vimeo.com/progressive_redirect/playback/${
          portraitVideo ? videoUrlSuffixPortrait : videoUrlSuffix
        }`;
      } catch (e) {
        EnableVideoFallback();
      }
    }
  }, [bgVideoRef]);
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
              className={`absolute top-0 h-[100vh] w-full ${
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
              className={`absolute top-0 w-full h-[80vh] min-h-[900px] ${
                videoFallback ? 'block' : 'hidden'
              }`}
            />
          )}

          {!videoFallback && (
            <div
              id="video-bg"
              ref={bgTargetElement}
              className="absolute top-0 w-full duration-300 opacity-100"
            >
              <video
                ref={videoPlayerRef}
                preload=""
                autoPlay={true}
                playsInline={true}
                muted={true}
                loop={true}
                poster="https://res.cloudinary.com/engagement-lab-home/image/upload/c_mpad,g_center,w_1024/v1709576469/elab-home-v3.x/loading.gif"
                className="w-full"
              ></video>
            </div>
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
      {/* --- TAGLINE --- */}
      <Tagline showVideo={showVideo} vidH={vidH} />

      {/* ===== PAGE CONTENT ===== */}
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
                  case 'news':
                    if (sections.news && sections.news.length > 0)
                      return (
                        <div key="news">
                          {index > 0 && <Divider />}
                          <Gutter>
                            <h2 className="text-2xl md:text-5xl text-grey font-bold my-7 lg:my-14">
                              Recent News
                            </h2>
                            <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
                              {sections.news.map((item: News, i: number) => {
                                return (
                                  <div key={i}>
                                    <div className="flex-shrink">
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
                        </div>
                      );
                  case 'events':
                    const upcoming =
                      sections.events.upcomingEvents &&
                      sections.events.upcomingEvents.length > 0;

                    return (
                      <div key="events">
                        {index > 0 && <Divider />}
                        <EventsRenderer
                          events={
                            upcoming
                              ? sections.events.upcomingEvents
                              : sections.events.recentEvents
                          }
                          upcoming={upcoming}
                        />
                      </div>
                    );
                  case 'projects':
                    if (sections.projects && sections.projects.length > 0)
                      return (
                        <div key="projects">
                          {index > 0 && <Divider />}
                          <Gutter>
                            <h2 className="text-2xl md:text-5xl text-grey font-bold my-7 lg:my-14">
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
                        </div>
                      );

                    break;
                  case 'studios':
                    if (sections.studios && sections.studios.length > 0)
                      return (
                        <div key="studioss">
                          {index > 0 && <Divider />}
                          <Gutter>
                            <h2 className="text-2xl md:text-5xl text-grey font-bold my-7 lg:my-14">
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
                        </div>
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
    `initiativesLanding(where: { name: "Miscellaneous Blurbs" }) {
        homepageOrder
      }`
  );
  const ordering: string[] = orderingQuery.homepageOrder;

  let recentEventsResult = [];
  const eventQueryStr = (dateCondition: string, upcoming?: boolean) => {
    return `events(
              ${DefaultWhereCondition(`
                eventDate: {
                  ${dateCondition}
                }
              `)},
              orderBy: {
                eventDate: ${upcoming ? 'asc' : 'desc'}
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
    eventQueryStr(`gte: "${new Date().toISOString()}"`, true)
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
			${DefaultWhereCondition()},
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
    `studioProjects(${DefaultWhereCondition(`home: { equals: true }`)}) { 
      name
      key
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
    `researchProjects(${DefaultWhereCondition(`home: { equals: true }`)}
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
    `studios(${DefaultWhereCondition(`home: { equals: true }`)}) {
			name
			key
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

  // Project can either be studio or research
  const projects: Project[] = _.orderBy(
    researchProjects && !researchProjects.error
      ? [...(studioProjects as Project[]), ...(researchProjects as Project[])]
      : (studioProjects as Project[]),
    'order'
  );

  const studios = _.orderBy(studiosQuery, 'order');

  const events = { upcomingEvents, recentEvents };

  const sections = {
    events,
    news,
    projects,
    studios,
  };

  return {
    props: { sections, sectionOrder: ordering },
    revalidate: 1,
  };
}
