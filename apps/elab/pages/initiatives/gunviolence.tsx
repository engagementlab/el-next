import { InferGetStaticPropsType } from 'next';

import { Button, HeadingStyle, Query, Image, Video } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../../components/Layout';
import { Partner, Theme } from '@/types';
import { CTAButton, MoreButton } from '@/components/Buttons';
import Divider from '@/components/Divider';
import Slideshow from '@/components/Slideshow';
import Link from 'next/link';
import Logos from '@/components/Logos';

type AboutPage = {
  intro: string;
  slides: any[];
};

const renderSlide = (props: { slide: any }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow w-1/2 p-10">
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

const jumpClass =
  'border-purple text-purple fill-green group-hover:fill-purple';

export default function GunViolence({
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
              <h2 className="text-green text-xl lg:text-3xl font-extrabold uppercase">
                Jump to:
              </h2>
              <div>
                <Button
                  label="The Big Picture of Gun Violence in Boston"
                  anchorId="context"
                  className={jumpClass}
                />
              </div>
              <Button
                label="Projects"
                anchorId="projects"
                className={`inline ${jumpClass}`}
              />
              <Button
                label="Studios"
                anchorId="studios"
                className={`ml-2 ${jumpClass}`}
              />
              <Button
                label="Research"
                anchorId="research"
                className={`ml-2 ${jumpClass}`}
              />
            </div>
          </div>
          {/* <Button label="→ Projects" link="/archive?gunviolence" /> */}
          {page?.slides && (
            <Slideshow slides={page?.slides} themeColor="bg-green" />
          )}
        </div>

        <h2 className="text-green text-xl lg:text-3xl font-extrabold uppercase">
          What's new
        </h2>
        {page?.slides && (
          <Slideshow
            slides={page?.slides}
            ContentRenderer={renderSlide}
            className="border-4 border-blue rounded-large"
            themeColor="bg-blue"
          />
        )}
        <MoreButton link="/" label="See more news" theme={Theme.gunviolence} />

        <h2 className="text-green text-xl lg:text-3xl font-extrabold uppercase">
          Collaborative Leadership Team
        </h2>
        <Logos
          partners={['ldbpi', 'mgh', 'magv', 'teenempowerment', 'uncornered']}
        />
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
          caption
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
