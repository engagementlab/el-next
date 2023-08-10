import { InferGetStaticPropsType } from 'next';

import { Button, HeadingStyle, Query, Image, Video } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../../components/Layout';
import {
  News,
  Event,
  ResearchProject,
  Studio,
  StudioProject,
  Theme,
} from '@/types';
import { CTAButton, MoreButton } from '@/components/Buttons';
import Divider from '@/components/Divider';
import Slideshow from '@/components/Slideshow';
import Link from 'next/link';
import Logos from '@/components/Logos';
import ImagePlaceholder from '@/components/ImagePlaceholder';

type AboutPage = {
  intro: string;
  slides: any[];
  body: { document: any };
  news: News[];
  events: Event[];
  projects: StudioProject[];
  studios: Studio[];
  research: ResearchProject[];
};
type Item = News & Event;

const renderSlide = (props: { slide: Item }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-grow w-full">
        {props.slide.thumbnail ? (
          <Image
            id={`thumb-${props.slide.key}`}
            alt={props.slide.thumbAltText}
            // transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
            imgId={props.slide.thumbnail.publicId}
            width={460}
            maxWidthDisable={true}
            className="w-full"
          />
        ) : (
          <ImagePlaceholder imageLabel="News/Event" width={335} height={200} />
        )}
        <h3 className="text-bluegreen text-xl font-semibold mt-3 mx-3">
          {props.slide.name || props.slide.title}
        </h3>
        <div className="font-bold mx-3">
          {new Date(
            props.slide.publishDate
              ? props.slide.publishDate
              : props.slide.eventDate
          ).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          })}
          ,&nbsp;
          {new Date(
            props.slide.publishDate
              ? props.slide.publishDate
              : props.slide.eventDate
          ).toLocaleDateString('en-US', {
            year: 'numeric',
          })}
        </div>
        <p className="mx-3 mt-3">
          {props.slide.summary.length > 150
            ? `${props.slide.summary.substring(
                0,
                props.slide.summary.substring(0, 150).lastIndexOf(' ')
              )}...`
            : props.slide.summary}
        </p>

        <CTAButton label="RSVP Today" link="/" theme={Theme.gunviolence} />
      </div>
    </div>
  );
};

const jumpClass =
  'border-purple text-purple fill-green group-hover:fill-purple';

export default function GunViolence({
  page,
  mergedItems,
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
      <div className="text-grey">
        <div className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full">
          <h2 className="text-5xl text-slate font-extrabold">
            Transforming Narratives of Gun Violence
          </h2>
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-1/2">
              <p>{page?.intro}</p>

              <div className="hidden lg:block w-3/4 lg:w-full mt-6">
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
              <Slideshow slides={page?.slides} themeColor="bg-purple" />
            )}
          </div>

          <h2 className="text-green text-3xl my-7 font-extrabold uppercase">
            What's new
          </h2>
          {mergedItems && (
            <Slideshow
              slides={mergedItems}
              ContentRenderer={renderSlide}
              heightOverride="min-h-[550px]"
              className="border-4 border-green rounded-large"
              themeColor="bg-green"
            />
          )}
          {/* <MoreButton link="/" label="See more news" theme={Theme.gunviolence} /> */}
        </div>
        <Divider color="bg-green" />
        <Divider color="bg-green" />
        <h2 className="text-3xl font-bold">Partner Organizations</h2>
        <Logos
          partners={['ldbpi', 'mgh', 'magv', 'teenempowerment', 'uncornered']}
        />
      </div>
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
        body {
          document
        }
        news {
            title
            key
            publishDate
            summary
            thumbnail { 
              publicId
            }
            thumbAltText
          }
          events  {
            name
            key
            eventDate
            summary
            thumbnail { 
                publicId
            }
            thumbAltText
        }
        projects  {
            name
            key
            shortDescription 
            thumbnail { 
                publicId
            }
            thumbAltText
        }
        studios  {
            name
            key
            shortDescription 
            thumbnail { 
                publicId
            }
            thumbAltText
        }
        research  {
            name
            key
            shortDescription 
            thumbnail { 
                publicId
            }
            thumbAltText
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
  const mergedItems = (
    [...(result.events as Event[]), ...(result.news as News[])] as Item[]
  ).sort((a, b) => {
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
  });
  return {
    props: {
      page,
      mergedItems,
    },
  };
}
