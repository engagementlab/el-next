import { useState, useRef, useEffect } from 'react';
import { Variants, motion } from 'framer-motion';
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
  const [bgTargetElement, setBgVideo] = useState();
  const targetRef = useRef();
  const bgVideoRef = useRef();
  useEffect(() => {
    setTarget(targetRef.current);
  }, [targetRef]);

  useEffect(() => {
    setBgVideo(bgVideoRef.current);
    // debugger;
    // if (bgVideoRef.current) {
    const player = new Player('video-bg', {
      id: 846665267,
      width: 1640,
      height: 566,
      controls: false,
      autoplay: true,
      autopause: true,
      muted: true,
      loop: true,
      responsive: true,
    });
    // }
  }, [bgVideoRef]);

  const cardVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        // type: 'spring',
        // bounce: 0.4,
        duration: 1.8,
      },
    },
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
          <div className="absolute top-0 h-screen w-full bg-gradient-to-b from-[#EFC3C0] via-[#CDE6E1] to-[#F4E3C5] opacity-80"></div>
        </div>
      }
      error={error}
    >
      <div
        className={`flex flex-col max-h-screen home-center overflow-y-scroll no-scrollbar`}
      >
        <div className="w-full relative text-3xl" ref={targetElement}>
          <motion.div
            className=" flex home-center"
            // initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8 }}
          >
            <motion.div className="card" variants={cardVariants}>
              Advancing peace, equity, & justice through collaborative
              <div className="text-yellow text-4xl font-extrabold">
                storytelling
                <hr className="h-1 border-none bg-red w-full" />
                <hr className="h-1 my-1 border-none bg-green-blue w-full" />
                <hr className="h-1 border-none bg-yellow w-full" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="h-screen flex home-center bg-green-blue bg-opacity-30 top-48 relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
            variants={cardVariants}
          >
            <div>Storytelling definition</div>
          </motion.div>

          <motion.div
            className="h-screen flex home-center bg-yellow bg-opacity-30 relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
            variants={cardVariants}
          >
            <div>Research definition</div>
          </motion.div>

          <motion.div
            className="h-screen flex home-center bg-red bg-opacity-30 relative"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.5 }}
            variants={cardVariants}
          >
            <div>Design definition</div>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col home-center mb-10 xl:mt-16 md:px-20xl:px-24 w-full">
        <Divider />
        <h1 className="text-3xl lg:text-7xl text-grey font-bold mt-5">
          Featured
        </h1>

        {/* Featured event */}
        {event && (
          <div className="flex flex-col-reverse justify-between items-center lg:flex-row my-7">
            <div className="flex fill-grey lg:w-4/5 px-5">
              <div className="w-2/5 sm:w-14 mr-3">
                <Icons icons={['event']} />
              </div>
              <div className="flex flex-col home-center text-grey">
                <h2 className="flex-shrink text-2xl lg:text-3xl text-grey font-bold">
                  {event.name}
                </h2>
                {event.eventDate &&
                  `${new Date(event.eventDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                  })} ${new Date(event.eventDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}`}

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
              <div className="flex flex-col home-center text-grey">
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
              <div className="flex flex-col home-center text-grey">
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
