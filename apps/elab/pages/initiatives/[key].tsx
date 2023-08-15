import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { DocumentRenderer } from '@keystone-6/document-renderer';

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
  intro: string;
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
  mergedItems,
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
        <div className="lg:basis-1/2">
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
          <div className="flex w-full justify-center mt-3">
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
    <Layout
      error={error}
      fullBleed={true}
      theme={Theming[initiative].theme}
      breadcrumbs={[
        { label: 'Social Impact Initiatives', href: '/initiatives' },
      ]}
    >
      {page && (
        <div className="text-grey">
          <div className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full">
            <h2 className="text-5xl text-slate font-extrabold">
              {initiative === 'gunviolence'
                ? ' Transforming Narratives of Gun Violence'
                : 'Transforming Narratives for Environmental Justice'}
            </h2>
            <div className="flex flex-col-reverse lg:flex-row">
              <div className="w-full lg:w-1/2">
                <p>{page?.intro}</p>

                <div className="hidden lg:block w-3/4 lg:w-full mt-6">
                  <h2 className="text-green text-xl lg:text-3xl font-extrabold uppercase">
                    Jump to:
                  </h2>
                  <div className="flex flex-col">
                    <Button
                      label="The Big Picture of Gun Violence in Boston"
                      anchorId="context"
                      className={jumpClass}
                    />
                    <div className="flex flex-row justify-between w-1/2">
                      <Button
                        label="Projects"
                        anchorId="projects"
                        className={jumpClass}
                      />
                      <Button
                        label="Studios"
                        anchorId="studios"
                        className={jumpClass}
                      />
                      <Button
                        label="Research"
                        anchorId="research"
                        className={jumpClass}
                      />
                    </div>
                  </div>
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
              <div className="xl:mx-32">
                <Slideshow
                  slides={mergedItems}
                  ContentRenderer={renderSlide}
                  heightOverride="min-h-[550px] md:min-h-[570px] lg:min-h-[300px]"
                  className="border-4 border-green rounded-large"
                  themeColor="bg-green"
                />
              </div>
            )}
          </div>
          <Divider color="bg-green" />
          <Gutter>
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
          </Gutter>
          {page.projects && page.projects.length > 0 && (
            <Divider color="bg-green" />
          )}
          <Gutter>
            {page.projects && page.projects.length > 0 && (
              <div id="projects">
                <h2 className="font-bold text-4xl">Featured Projects</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.projects.map((item: StudioProject, i: number) => {
                    return (
                      <Link
                        href={`/studios/projects/${item.key}`}
                        className="group"
                      >
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
                            imageLabel="Project"
                            width={200}
                            height={200}
                          />
                        )}

                        <h3 className="hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                          {item.name}
                        </h3>
                        <p className="text-sm">{item.shortDescription}</p>
                      </Link>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <MoreButton
                    link={`/studios/projects/initiative=gunviolence`}
                    label="See more projects"
                    theme={Theme.gunviolence}
                  />
                </div>
              </div>
            )}
          </Gutter>

          {page.studios && page.studios.length > 0 && (
            <Divider color="bg-green" />
          )}
          <Gutter>
            {page.studios && page.studios.length > 0 && (
              <div id="studios">
                <h2 className="font-bold text-4xl">Recent Studios</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.studios.map((item: Studio, i: number) => {
                    return (
                      <Link href={`/studios/${item.key}`} className="group">
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
                            imageLabel="Studio"
                            width={200}
                            height={200}
                          />
                        )}
                        <h3 className="hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                          {item.name}
                        </h3>
                        <p>{item.shortDescription}</p>
                      </Link>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <MoreButton
                    link={`/studios/initiative=gunviolence`}
                    label="See more studios"
                    theme={Theme.gunviolence}
                  />
                </div>
              </div>
            )}
          </Gutter>

          {page.research && page.research.length > 0 && (
            <Divider color="bg-green" />
          )}
          <Gutter>
            {page.research && page.research.length > 0 && (
              <div id="research">
                <h2 className="font-bold text-4xl">Related Research</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.research.map((item: ResearchProject, i: number) => {
                    return (
                      <Link
                        href={`/studios/research/${item.key}`}
                        className="group"
                      >
                        {item.thumbnail ? (
                          <Image
                            id={`thumb-${i}`}
                            alt={item.thumbnailAltText}
                            transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                            imgId={item.thumbnail.publicId}
                            width={460}
                            maxWidthDisable={true}
                            className="w-full"
                          />
                        ) : (
                          <ImagePlaceholder
                            imageLabel="Project"
                            width={200}
                            height={200}
                          />
                        )}

                        <h3 className="hover:text-green-blue group-hover:text-green-blue text-xl font-semibold my-1">
                          {item.name}
                        </h3>
                        <p className="text-sm">{item.shortDescription}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </Gutter>
          <Divider color="bg-green" />
          <Gutter>
            <h2 className="text-3xl font-bold">Partner Organizations</h2>
            {initiative === 'gunviolence' ? (
              <Logos
                partners={[
                  'ldbpi',
                  'mgh',
                  'magv',
                  'teenempowerment',
                  'uncornered',
                ]}
              />
            ) : (
              <Logos partners={['ficdc', 'greenroots', 'sftt', 'swboston']} />
            )}
          </Gutter>
        </div>
      )}
    </Layout>
  );
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: ['/initiatives/gunviolence', '/initiatives/environment'],
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  let objectName = 'Gun Violence';
  let initiative = 'gunviolence';
  if (params!.key === 'environment') {
    objectName = 'Environmental Justice';
    initiative = 'climate';
  }

  const result = await Query(
    'initiative',
    `initiative(where: { name: "${objectName}" }) {
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
            registrationLink
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
        initiative: 'gunviolence',
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
      initiative,
      mergedItems,
    },
  };
}