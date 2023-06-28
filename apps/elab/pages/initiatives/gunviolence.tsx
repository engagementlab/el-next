import { HTMLProps, HtmlHTMLAttributes, ReactNode, useState } from 'react';
import { InferGetStaticPropsType } from 'next';

import { Button, HeadingStyle, Query, Image, Video } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../../components/Layout';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import { Theme } from '@/types';
import CTAButton from '@/components/CTAButton';
import Divider from '@/components/Divider';
import Slideshow from '@/components/Slideshow';

type AboutPage = {
  intro: string;
  slides: any[];
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const renderSlide = (props: { slide: any }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow w-1/2">
        <p>Peace in Process May 2 at 5pm Little Building at Emerson College</p>
        <p>
          This is the blurb for Peace in Process. This is the blurb for Peace in
          Process. This is the blurb for Peace in Process. This is the blurb for
          Peace in Process. This is the blurb for Peace in Process. This is the
          blurb for Peace in Process.
        </p>

        <CTAButton label="RSVP Today" link="/" theme={Theme.gunviolence} />
      </div>
      <div>
        <Image
          id={'img-' + props.slide.image.publicId}
          alt={props.slide.altText}
          imgId={props.slide.image.publicId}
          lazy={false}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
};

export default function Initiatives({
  page,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      error={error}
      fullBleed={true}
      theme={Theme.gunviolence}
      breadcrumbs={[
        { label: 'Social Impact Initiatives', href: '/initiatives' },
      ]}
    >
      <div className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full">
        <h2 className="text-5xl text-slate font-extrabold">
          Transforming Narratives of Gun Violence
        </h2>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <p>{page?.intro}</p>

            <div className="w-3/4 lg:w-full mt-6">
              <p className="text-blue text-xl lg:text-3xl font-extrabold uppercase">
                Jump to:
              </p>
              <div>
                <Button
                  label="The Big Picture of Gun Violence in Boston"
                  anchorId="context"
                  className="border-purple text-purple fill-purple text-sm"
                />
              </div>
              <Button
                label="Projects"
                anchorId="projects"
                className="inline border-purple text-purple fill-purple text-sm"
              />
              <Button
                label="Studios"
                anchorId="studios"
                className="border-purple text-purple fill-purple text-sm ml-2"
              />
              <Button
                label="Research"
                anchorId="research"
                className="border-purple text-purple fill-purple text-sm ml-2"
              />
            </div>
          </div>
          {/* <Button label="→ Projects" link="/archive?gunviolence" /> */}
          {page?.slides && <Slideshow slides={page?.slides} />}
        </div>

        <p className="text-blue text-xl lg:text-3xl font-extrabold uppercase">
          What's new
        </p>
        {page?.slides && (
          <Slideshow slides={page?.slides} ContentRenderer={renderSlide} />
        )}
      </div>
      <Divider color="bg-blue" />
    </Layout>
  );
}

export async function getStaticProps() {
  const result = await Query(
    'initiative',
    `initiative(where: { name: "Gun Violence" }) {
        intro 
        slides {
          image {
            publicId
            publicUrl
          }
          altText
          videoId
        }
      }`
  );
  // console.log(result.slides[1].image);
  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
      },
    };
  }

  const page = result as AboutPage;
  return {
    props: {
      page,
    },
  };
}
