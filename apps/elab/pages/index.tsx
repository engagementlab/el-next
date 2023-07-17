import { Variants, motion } from 'framer-motion';
import Layout from '../components/Layout';
import { CTAButton } from '@/components/Buttons';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { Theme } from '@/types';
import { Parallax } from 'react-scroll-parallax';
import { useState, useRef, useEffect } from 'react';
import { Image, Query } from '@el-next/components';
import Divider from '@/components/Divider';
import { InferGetStaticPropsType } from 'next';

type News = {
  title: string;
  key: string;
  flags: string[];
  publishDate: string;
  blurb: string;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
};
type Home = {
  newsItem: News;
};

export default function Home({
  newsItem,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [targetElement, setTarget] = useState();
  const targetRef = useRef();
  useEffect(() => {
    setTarget(targetRef.current);
  }, [targetRef]);

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
          <Image
            id="home-top-bg"
            alt="Photo of Boston skyline"
            imgId="elab-home-v3.x/home.jpg"
            width={1640}
            className="absolute top-0 h-screen w-full"
            transforms="o_30"
          />
          <div className="absolute top-0 h-screen w-full bg-gradient-to-b from-red/[.2] via-green-blue/[.2] to-yellow/[.5]"></div>
        </div>
      }
    >
      <div
        className={`flex flex-col max-h-screen home-center overflow-y-scroll no-scrollbar`}
      >
        <div
          className=" min-h-[300vh] w-full relative text-3xl"
          ref={targetElement}
        >
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
      <div className="flex flex-col home-center mt-14 mb-10 xl:mt-16 md:px-20xl:px-24 w-full">
        <Divider />
        <h1 className="text-7xl text-grey mt-5">Featured</h1>
        {/* Featured news */}
        {newsItem && (
          <div className="flex flex-col-reverse justify-between items-center lg:flex-row my-7">
            <div className="flex fill-grey lg:w-1/2 px-5">
              <div className="w-2/5 sm:w-14 mr-3">
                <svg
                  viewBox="120 -840 48 50.014"
                  width="48"
                  height="30"
                  className="inline-block w-full"
                >
                  <path d="M 124 -789.986 C 122.933 -789.986 122 -790.402 121.2 -791.236 C 120.4 -792.069 120 -793.042 120 -794.153 L 120 -835.832 C 120 -836.944 120.4 -837.916 121.2 -838.75 C 122 -839.583 122.933 -840 124 -840 L 154.8 -840 L 168 -826.246 L 168 -794.153 C 168 -793.042 167.6 -792.069 166.8 -791.236 C 166 -790.402 165.067 -789.986 164 -789.986 L 124 -789.986 Z M 124 -794.153 L 164 -794.153 L 164 -823.924 L 152.6 -823.924 L 152.6 -835.832 L 124 -835.832 L 124 -794.153 Z M 130.6 -801.864 L 157.4 -801.864 L 157.4 -806.032 L 130.6 -806.032 L 130.6 -801.864 Z M 130.6 -823.954 L 144 -823.954 L 144 -828.122 L 130.6 -828.122 L 130.6 -823.954 Z M 130.6 -812.909 L 157.4 -812.909 L 157.4 -817.077 L 130.6 -817.077 L 130.6 -812.909 Z M 124 -835.832 L 124 -823.924 L 124 -835.832 L 124 -794.153 L 124 -835.832 Z"></path>
                </svg>
              </div>
              <div className="flex flex-col home-center text-grey">
                <h2 className="flex-shrink text-2xl lg:text-3xl text-grey font-bold">
                  {newsItem.title}
                </h2>
                {newsItem.blurb}
                <div className="mt-8">
                  <CTAButton
                    label="Read news"
                    link={`/news/${newsItem.key}`}
                    theme={Theme.climate}
                  />
                </div>
              </div>
            </div>
            <Image
              id={`thumb-${newsItem.key}`}
              alt={`Thumbnail for media with name "${newsItem.title}"
                  `}
              imgId={newsItem.thumbnail.publicId}
              width={350}
              transforms="c_fill,g_faces,h_650,w_650"
              className="rounded-full aspect-square"
            />
          </div>
        )}
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="lg:w-1/2 lg:ml-14 px-5">
            <h2 className="text-3xl text-grey font-bold">
              Transforming Narratives of Gun Violence
            </h2>
            <div className="flex flex-col home-center text-grey">
              This is a homepage blurb. These text boxes should allow for
              formatting, unlike the shorter blurbs pulled for archive listings,
              so that we can format dates and location info for events, or add
              additional links beyond the call to action button if needed.
              Accent colors should correspond to the featured item’s initiative:
              teal for climate, purple for TNGV.
              <div className="mt-8">
                <CTAButton
                  label="Learn more"
                  link="/initiatives/gunviolence"
                  theme={Theme.gunviolence}
                />
              </div>
            </div>
          </div>
          {/* {props.item.thumbnail ? (
                <Image
                  id={`thumb-${props.item.key}`}
                  alt={`Thumbnail for media with name "${props.item.title}"
                            `}
                  imgId={props.item.thumbnail.publicId}
                  maxWidth={800}
                  className="w-full"
                />
              ) : ( */}
          <ImagePlaceholder imageLabel="Home" width={335} height={200} />
          {/* )}  */}
        </div>
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="lg:w-1/2 lg:ml-14 px-5">
            <div className="inline p-2 mb-4 bg-purple text-sm text-white font-bold rounded-large">
              Project
            </div>
            <h2 className="text-3xl text-grey font-bold">
              Transforming Narratives of Gun Violence
            </h2>
            <div className="flex flex-col home-center text-grey">
              This is a homepage blurb. These text boxes should allow for
              formatting, unlike the shorter blurbs pulled for archive listings,
              so that we can format dates and location info for events, or add
              additional links beyond the call to action button if needed.
              Accent colors should correspond to the featured item’s initiative:
              teal for climate, purple for TNGV.
              <div className="mt-8">
                <CTAButton
                  label="Learn more"
                  link="/initiatives/gunviolence"
                  theme={Theme.gunviolence}
                />
              </div>
            </div>
          </div>
          {/* {props.item.thumbnail ? (
                <Image
                  id={`thumb-${props.item.key}`}
                  alt={`Thumbnail for media with name "${props.item.title}"
                            `}
                  imgId={props.item.thumbnail.publicId}
                  maxWidth={800}
                  className="w-full"
                />
              ) : ( */}
          <ImagePlaceholder imageLabel="Home" width={335} height={200} />
          {/* )}  */}
        </div>
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
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
            blurb
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
  return {
    props: {
      newsItem,
    },
  };
}
