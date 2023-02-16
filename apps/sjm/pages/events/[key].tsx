import { ReactNode, useEffect, useState } from 'react';

import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import Image, { ImageUrl } from '@el-next/components/image';
import { HeadingStyle } from '@el-next/components/headingStyle';

import _ from 'lodash';

import type { Swiper as SwiperT } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import query from '../../../../apollo-client';

import { Blocks, Doc, ImageOverride } from '../../components/Renderers';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

type Event = {
  name: string;
  intro: any;
  agenda: any;
  awards: any;
  location: any;
  gallerySlides: {
    image: {
      publicId: string;
    };
    altText: string;
    caption: string;
  }[];
  bgImage1: {
    publicId: string;
  };
  bgImage2: {
    publicId: string;
  };
};

const rendererOverrides = {
  heading: (level: number, children: ReactNode, textAlign: any) => {
    const customRenderers = {
      2: 'text-3xl font-bold tracking-wide my-4',
      3: 'text-2xl font-medium tracking-wide my-4',
    };
    return HeadingStyle(level, children, textAlign, customRenderers);
  },
};
const agendaRendererOverrides = {
  layout: (layout: any, children: any) => {
    const flexClass = 'flex gap-y-5 flex-col mt-10 xl:flex-row justify-between';
    if (layout[0] === 1 && layout[1] === 2) {
      return (
        <div className={flexClass}>
          {children.map((element: any, i: number) => (
            <div key={i} className="w-full xl:w-1/2">
              {element}
            </div>
          ))}
        </div>
      );
    } else if (layout[0] === 1 && layout[1] === 1) {
      return (
        <div className={`${flexClass} gap-x-5`}>
          {children.map((element: any, i: number) => (
            <div key={i} className="w-full xl:w-1/2">
              {element}
            </div>
          ))}
        </div>
      );
    }
  },
};

export default function Event({
  item,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [bgImg1, setBgImg1] = useState('');
  const [bgImg2, setBgImg2] = useState('');

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperT | null>(null);

  useEffect(() => {
    if (item.bgImage1)
      setBgImg1(
        ImageUrl({
          imgId: item.bgImage1.publicId,
          width: window.innerWidth,
          transforms: `f_auto,dpr_auto,c_thumb,g_face,ar_4:3,e_colorize:70,co_rgb:ffdb66,o_60,w_${window.innerWidth}`,
        })
      );
    if (item.bgImage2)
      setBgImg2(
        ImageUrl({
          imgId: item.bgImage2.publicId,
          width: window.innerWidth,
          transforms: `f_auto,dpr_auto,c_thumb,g_face,ar_4:3,e_colorize:70,co_rgb:ffdb66,o_60,w_${window.innerWidth}`,
        })
      );
  }, []);

  const lavenderStyle = 'bg-lavender text-white flex justify-center p-8';
  const bgImageStyle = 'bg-cover flex flex-col items-center text-lavender';

  const hasAwards = item.awards.document[0].children[0].text !== '';
  const hasLocation = item.location.document[0].children[0].text !== '';

  return (
    <>
      <section className="relative mt-6 lg:mt-0">
        <div className={lavenderStyle}>
          <div className="lg:ml-10 w-full xl:w-9/12">
            <h1 className="text-5xl lg:text-7xl font-normal mb-7">
              {item.name}
            </h1>
            <div className="font-overpass">
              <DocumentRenderer
                document={item.intro.document}
                componentBlocks={Blocks(ImageOverride(480))}
                renderers={Doc(rendererOverrides)}
              />
            </div>
          </div>
        </div>
        <div
          className={bgImageStyle}
          style={{ backgroundImage: `url(${bgImg1})` }}
        >
          <div className="w-full xl:w-1/2 pt-4 mb-10 p-5">
            <h1 className="text-5xl lg:text-7xl font-normal py-10 w-full text-right">
              Agenda
            </h1>
            <DocumentRenderer
              document={item.agenda.document}
              componentBlocks={Blocks()}
              renderers={Doc(agendaRendererOverrides)}
            />
          </div>
        </div>
        {hasAwards && (
          <div className={lavenderStyle}>
            <div className="lg:ml-10 w-full xl:w-8/12">
              <h1 className="text-5xl lg:text-7xl font-normal mb-7">Awards</h1>
              <DocumentRenderer
                document={item.awards.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
            </div>
          </div>
        )}
        {hasLocation && (
          <div
            className={bgImageStyle}
            style={{ backgroundImage: `url(${bgImg2})` }}
          >
            <div className="lg:ml-10 w-full xl:w-8/12 mb-10 p-5">
              <h1 className="text-5xl lg:text-7xl font-normal py-10 w-full text-right">
                Location
              </h1>
              <DocumentRenderer
                document={item.location.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
            </div>
          </div>
        )}
        {item.gallerySlides.length > 0 && (
          <div className={lavenderStyle}>
            <div className="lg:ml-10 w-full xl:w-8/12">
              <h1 className="text-5xl lg:text-7xl font-normal mb-7">Gallery</h1>
              <Swiper
                // style={{
                // "--swiper-navigation-color": "#fff",
                // "--swiper-pagination-color": "#fff",
                // }}
                slidesPerView={1}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {item.gallerySlides.map((image, index) => (
                  <SwiperSlide key={index} className="flex justify-center">
                    <Image
                      id=""
                      alt=""
                      imgId={image.image.publicId}
                      width={600}
                      transforms="f_auto,dpr_auto"
                      className="w-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                slidesPerView={10}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
              >
                {item.gallerySlides.map((image, index) => (
                  <SwiperSlide
                    key={`thumb-${index}`}
                    className="cursor-pointer"
                  >
                    <Image
                      key={`img-thumb-${index}`}
                      id=""
                      alt=""
                      imgId={image.image.publicId}
                      width={100}
                      transforms="f_auto,dpr_auto"
                      className="w-full"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = (await query(
    'events',
    ` events {
            key
        }
        `
  )) as { key: string }[];

  const paths = items
    .filter(({ key }) => !!key)
    .map(({ key }) => `/events/${key}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await query(
    'events',
    `events(where: { key: { equals: "${params!.key}" } }) {
        name
        intro {
            document
        }
        agenda {
            document
        }
        awards {
            document
        }
        location {
            document
        }
        gallerySlides {
            image {
                publicId
            }
            altText
            caption
        }
        bgImage1 {
            publicId
        }
        bgImage2 {
            publicId
        }
    }`
  );
  const item = itemResult[0] as Event;
  return { props: { item } };
}
