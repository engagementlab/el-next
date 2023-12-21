import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import Layout from '../../../components/Layout';

import {
  News,
  Event,
  ResearchProject,
  Studio,
  StudioProject,
  Theming,
  Item,
  Person as PersonT,
  CustomEase,
  InitiativeFilterGroups,
} from '@/types';

import { CTAButton, MoreButton } from '@/components/Buttons';
import Divider from '@/components/Divider';
import Slideshow from '@/components/Slideshow';
import Logos from '@/components/Logos';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { Button, Query, Image, Video } from '@el-next/components';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Blocks, Doc } from '@/components/Renderers';
import { Gutter } from '@/components/Gutter';
import { Person } from '@/components/People';

type AboutPage = {
  name?: string;
  intro: {
    document: any;
  };
  slides?: any[];
  videoId?: string;
  videoCaption?: {
    document: any;
  };
  videoThumbnail?: {
    publicUrl: string;
  };
  body: { document: any };
  news: News[];
  events: Event[];
  projectsBlurb?: { document: any };
  projects: StudioProject[];
  studiosBlurb?: { document: any };
  studios: Studio[];
  research: ResearchProject[];
  associatedPeople?: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
};

export default function InitIndex({
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
    // Determine what type of button to show from conditions of slide
    const Button = () => {
      if (props.slide.eventDate) {
        if (
          props.slide.registrationLink &&
          new Date(props.slide.eventDate) >= new Date()
        )
          return (
            <CTAButton
              label="RSVP Today"
              external={true}
              link={props.slide.registrationLink}
              theme={Theming[initiative].theme}
            />
          );
        else
          return (
            <CTAButton
              label="Learn More"
              link={`/events/${props.slide.key}`}
              theme={Theming[initiative].theme}
            />
          );
      } else
        return (
          <CTAButton
            label="Learn More"
            link={`/news/${props.slide.key}`}
            theme={Theming[initiative].theme}
          />
        );
    };
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
          <div className="flex w-full mx-3 mt-3">{Button()}</div>
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
      title={InitiativeFilterGroups.find((i) => i.key === initiative)?.label}
      // ogDescription={item.summary}
    >
      {page && (
        <div className="text-grey">
          <div className="mt-14 mb-24 xl:mt-16 md:px-20 px-5 xl:px-24 w-full">
            {/* <h2 className="text-4xl lg:text-5xl text-slate font-extrabold">
              {initiative === 'gunviolence'
                ? ' Transforming Narratives of Gun Violence'
                : 'Transforming Narratives for Environmental Justice'}
            </h2> */}
            <div className="flex flex-col-reverse lg:flex-row gap-x-5">
              <div className="w-full lg:w-1/2">
                <h2 className={subHeadClass}>About The Initiative</h2>
                <DocumentRenderer
                  document={page?.intro.document}
                  componentBlocks={Blocks()}
                  renderers={Doc()}
                />

                {initiative === 'tngv' && (
                  <Logos
                    partners={['ldbpi', 'mgh']}
                    classOverride="flex flex-col sm:flex-row justify-evenly items-center"
                  />
                )}
                <div className="hidden lg:block w-3/4 lg:w-full mt-6">
                  <h2 className={subHeadClass}>Jump to:</h2>
                  <div className="flex flex-row">
                    {/* <Button
                      label="Context"
                      anchorId="context"
                      className={jumpClass}
                    /> */}
                    {/* <div className="flex flex-row lg:w-3/4 xl:w-4/6"> */}
                    {page.projects && page.projects.length > 0 && (
                      <Button
                        label="Featured Projects"
                        anchorId="projects"
                        className={jumpClass + ' ml-3'}
                      />
                    )}
                    <Button
                      label="Featured Studios"
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
              {page.videoId ? (
                <div className="relative transition-all duration-500 max-w-sm min-w-[300px] min-h-[200px] md:min-h-[255px] lg:mx-3 lg:max-w-xl lg:min-w-[450px] basis-1/5">
                  <div className="group w-full min-h-[inherit]">
                    <div id="video" className={`min-h-[inherit]`}>
                      <Video
                        videoLabel=""
                        videoUrl={`https://player.vimeo.com/video/${page.videoId}`}
                        thumbUrl={page.videoThumbnail?.publicUrl}
                      />
                    </div>
                  </div>
                  {page?.videoCaption && (
                    <div className={Theming[initiative].text}>
                      <DocumentRenderer
                        document={page?.videoCaption.document}
                        componentBlocks={Blocks(Theming[initiative])}
                      />
                    </div>
                  )}
                </div>
              ) : (
                page?.slides &&
                page?.slides.length > 0 && (
                  <Slideshow
                    slides={page?.slides}
                    theme={Theming[initiative]}
                    className={`${Theming[initiative].bg} bg-opacity-50`}
                  />
                )
              )}
            </div>
            <h2 className={`${subHeadClass} mt-20`}>Featured News & Events</h2>
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
            <div className="flex md:flex-row justify-end lg:ml-5 mt-8 mb-16">
              <MoreButton
                label="See more news & events"
                link={`/initiatives/${initiative}/whats-new/`}
              />
            </div>
          </div>
          {page.projects && page.projects.length > 0 && (
            <Divider color={Theming[initiative].secodary} />
          )}
          <Gutter noMarginY={false}>
            {page.projects && page.projects.length > 0 && (
              <div id="projects">
                <h2 className="font-bold text-4xl">Featured Projects</h2>
                {page?.projectsBlurb && (
                  <div className="w-full lg:w-1/2">
                    <DocumentRenderer
                      document={page?.projectsBlurb.document}
                      componentBlocks={Blocks(Theming[initiative])}
                    />
                  </div>
                )}
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
                    link={`/initiatives/${initiative}/studios/projects`}
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
                <h2 className="font-bold text-4xl">Featured Studios</h2>
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
                    link={`/initiatives/${initiative}/studios`}
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
              </div>
            )}
          </Gutter>
          <Divider color={Theming[initiative].secodary} />

          <Gutter noMarginY={false}>
            <h2 className="text-3xl font-bold">Partner Organizations</h2>
            {initiative === 'tngv' ? (
              <Logos
                partners={[
                  'ldbpi',
                  'mgh',
                  'magv',
                  'teenempowerment',
                  'uncornered',
                  'wab2g',
                ]}
              />
            ) : (
              <Logos partners={['ficdc', 'greenroots', 'sftt']} />
            )}
          </Gutter>
          {page.associatedPeople && page.associatedPeople.length > 0 && (
            <>
              <Divider color={Theming[initiative].secodary} />
              <Gutter noMarginY={false}>
                <>
                  <h2 className="text-3xl font-bold">Learning Partners</h2>

                  <div className="flex-wrap my-4 gap-x-14 gap-y-5 lg:flex">
                    {page.associatedPeople
                      .sort((person1: PersonT, person2: PersonT) =>
                        person1.name
                          .split(' ')
                          [person1.name.split(' ').length - 1].localeCompare(
                            person2.name.split(' ')[
                              person2.name.split(' ').length - 1
                            ]
                          )
                      )
                      .map((person: PersonT) => (
                        <Person
                          key={person.key}
                          person={person}
                          theme={Theming[initiative]}
                        />
                      ))}
                  </div>
                </>
              </Gutter>
            </>
          )}
        </div>
      )}
    </Layout>
  );
}
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: ['/initiatives/tngv', '/initiatives/tnej'],
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
        name
        intro {
          document
        }
        videoId
        videoThumbnail {
          publicUrl
        }
        videoCaption {
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
          order
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
        projectsBlurb {
          document
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
        associatedPeople {
            name
            key
            title
            secondaryTitle
            image {
                publicId
            }  
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
    revalidate: 1,
  };
}
