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
            <h2 className="text-4xl lg:text-5xl text-slate font-extrabold">
              {initiative === 'gunviolence'
                ? ' Transforming Narratives of Gun Violence'
                : 'Transforming Narratives for Environmental Justice'}
            </h2>
            <div className="flex flex-col-reverse lg:flex-row gap-x-5">
              <div className="w-full lg:w-1/2">
                <DocumentRenderer
                  document={page?.intro.document}
                  componentBlocks={Blocks()}
                  renderers={Doc()}
                />

                <div className="hidden lg:block w-3/4 lg:w-full mt-6">
                  <h2 className={subHeadClass}>Jump to:</h2>
                  <div className="flex flex-row">
                    <Button
                      label="Context"
                      anchorId="context"
                      className={jumpClass}
                    />
                    {/* <div className="flex flex-row lg:w-3/4 xl:w-4/6"> */}
                    {page.projects && page.projects.length > 0 && (
                      <Button
                        label="Projects"
                        anchorId="projects"
                        className={jumpClass + ' ml-3'}
                      />
                    )}
                    <Button
                      label="Studios"
                      anchorId="studios"
                      className={jumpClass + ' ml-3'}
                    />
                    {/* <Button
                        label="Research"
                        anchorId="research"
                        className={jumpClass}
                      /> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
              {/* <Button label="→ Projects" link="/archive?tngv" /> */}
              {page?.slides && page?.slides.length > 0 && (
                <Slideshow
                  slides={page?.slides}
                  theme={Theming[initiative]}
                  className={`${Theming[initiative].bg} bg-opacity-50`}
                />
              )}
            </div>
            <h2 className={subHeadClass}>What's new</h2>
            {mergedItems && (
              <div className="xl:mx-32">
                <Slideshow
                  slides={mergedItems}
                  ContentRenderer={renderSlide}
                  heightOverride="min-h-[550px] md:min-h-[610px] lg:min-h-[300px] min-[1180px]:min-h-[335px] xl:min-h-[395px]"
                  className={`${Theming[initiative].border} border-4 rounded-large`}
                />
              </div>
            )}
          </div>
          <Divider color={Theming[initiative].secodary} />
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
          {page.projects && page.projects.length > 0 && (
            <Divider color={Theming[initiative].secodary} />
          )}
          <Gutter noMarginY={false}>
            {page.projects && page.projects.length > 0 && (
              <div id="projects">
                <h2 className="font-bold text-4xl">Featured Projects</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.projects.map((item: StudioProject, i: number) => {
                    return (
                      <Link
                        key={`project-${item.key}`}
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
                <div className="flex justify-center lg:justify-end">
                  <MoreButton
                    link={`/studios/projects?${initiative}`}
                    theme={Theming[initiative].theme}
                    label="See more projects"
                  />
                </div>
              </div>
            )}
          </Gutter>

          {page.studios && page.studios.length > 0 && (
            <Divider color={Theming[initiative].secodary} />
          )}
          <Gutter noMarginY={false}>
            {page.studios && page.studios.length > 0 && (
              <div id="studios">
                <h2 className="font-bold text-4xl">Recent Studios</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.studios.map((item: Studio, i: number) => {
                    return (
                      <Link
                        key={`studio-${item.key}`}
                        href={`/studios/${item.key}`}
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
                <div className="flex justify-center lg:justify-end">
                  <MoreButton
                    link={`/studios?${initiative}`}
                    theme={Theming[initiative].theme}
                    label="See more studios"
                  />
                </div>
              </div>
            )}
          </Gutter>

          {page.research && page.research.length > 0 && (
            <Divider color={Theming[initiative].secodary} />
          )}
          <Gutter noMarginY={false}>
            {page.research && page.research.length > 0 && (
              <div id="research">
                <h2 className="font-bold text-4xl">Related Research</h2>
                <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:gap-2 text-grey">
                  {page.research.map((item: ResearchProject, i: number) => {
                    return (
                      <Link
                        key={`research-${item.key}`}
                        href={`research/${item.key}`}
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
          <Divider color={Theming[initiative].secodary} />

          <Gutter noMarginY={false}>
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
              <Logos partners={['ficdc', 'greenroots', 'sftt']} />
            )}
          </Gutter>
        </div>
      )}
    </Layout>
  );
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: ['/initiatives/tngv', '/initiatives/climate'],
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  let objectName = 'Gun Violence';
  let initiative = 'gunviolence';
  if (params!.key === 'climate') {
    objectName = 'Environmental Justice';
    initiative = 'climate';
  }

  const result = await Query(
    'initiative',
    `initiative(where: { name: "${objectName}" }) {      
        intro {
          document
        }
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
            address
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
