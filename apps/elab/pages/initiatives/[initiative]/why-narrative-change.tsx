import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Button, HeadingStyle, Query, Image, Video } from '@el-next/components';

// import query from '../../../../apollo-client';
import Layout from '../../../components/Layout';
import {
  News,
  Event,
  ResearchProject,
  Studio,
  StudioProject,
  Theme,
  Theming,
  Item,
} from '@/types';
import { CTAButton, MoreButton } from '@/components/Buttons';
import Divider from '@/components/Divider';
import Slideshow from '@/components/Slideshow';
import Link from 'next/link';
import Logos from '@/components/Logos';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { Blocks, Doc } from '@/components/Renderers';
import { ReactNode } from 'react';
import { Gutter } from '@/components/Gutter';

type AboutPage = {
  intro: {
    document: any;
  };
  slides: any[];
  body: { document: any };
  news: News[];
  events: Event[];
  projects: StudioProject[];
  studios: Studio[];
  research: ResearchProject[];
};

export default function GunViolence({
  page,
  initiative,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const jumpClass =
    Theming[initiative].border +
    ' ' +
    Theming[initiative].text +
    ' ' +
    Theming[initiative].fill;
  (' group-hover:fill-purple');
  const subHeadClass = `${Theming[initiative].heading} text-3xl my-7 font-extrabold uppercase`;
  const renderSlide = (props: { slide: Item }) => {
    return (
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="flex-grow w-full lg:w-1/2">
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
            <ImagePlaceholder
              imageLabel="News/Event"
              width={335}
              height={200}
            />
          )}
        </div>
        <div className="lg:basis-1/2 flex flex-col justify-center">
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
            {props.slide.eventDate && (
              <div className="text-xs">{props.slide.address}</div>
            )}
          </div>
          <p className="mx-3 mt-3">
            {props.slide.summary.length > 150
              ? `${props.slide.summary.substring(
                  0,
                  props.slide.summary.substring(0, 150).lastIndexOf(' ')
                )}...`
              : props.slide.summary}
          </p>
          <div className="flex w-full mx-3 mt-3">
            {props.slide.eventDate ? (
              props.slide.registrationLink ? (
                <CTAButton
                  label="RSVP Today"
                  link={props.slide.registrationLink}
                  theme={Theming[initiative].theme}
                />
              ) : (
                <CTAButton
                  label="Learn More"
                  link={`/events/${props.slide.key}`}
                  theme={Theming[initiative].theme}
                />
              )
            ) : (
              <CTAButton
                label="Learn More"
                link={`/news/${props.slide.key}`}
                theme={Theming[initiative].theme}
              />
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  };
  return (
    <Layout error={error} fullBleed={true} theme={Theming[initiative].theme}>
      {page && (
        <div className="text-grey">
          <div className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full">
            <h2 className="text-4xl lg:text-5xl text-slate font-extrabold">
              Why Narrative Change?
            </h2>

            <Gutter noMarginY={false}>
              <div id="context">
                <DocumentRenderer
                  document={page?.body.document}
                  componentBlocks={Blocks(Theming[initiative])}
                  renderers={Doc({
                    heading: (
                      level: number,
                      children: ReactNode,
                      textAlign: any
                    ) => {
                      return HeadingStyle({
                        level,
                        children,
                        textAlign,
                        customRenderers: {
                          2: `font-bold text-4xl`,
                        },
                      });
                    },
                  })}
                />
              </div>
            </Gutter>
          </div>
        </div>
      )}{' '}
    </Layout>
  );
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: [
      '/initiatives/tngv/why-narrative-change',
      '/initiatives/tnej/why-narrative-change',
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { initiative: string };
}) {
  let objectName = 'Gun Violence';
  let initiative = 'tngv';
  if (params.initiative === 'tnej') {
    objectName = 'Environmental Justice';
    initiative = 'tnej';
  }
  const result = await Query(
    'initiative',
    `initiative(where: { name: "${objectName}" }) {      
        body {
          document
        }
      }`
  );
  if (result.error) {
    return {
      props: {
        error: result.error,
        page: null,
        initiative: 'tngv',
      },
    };
  }

  const page = result as AboutPage;

  return {
    props: {
      page,
      initiative,
    },
  };
}
