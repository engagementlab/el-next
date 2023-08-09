import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Button, HeadingStyle, Image, Query, Video } from '@el-next/components';

import _ from 'lodash';
import { create } from 'zustand';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

import Layout from '../../../components/Layout';
import { Blocks, Doc } from '../../../components/Renderers';

import { StudioProject, Theme, ThemeConfig, Theming } from '@/types';
import { subscribeWithSelector } from 'zustand/middleware';
import Logos from '@/components/Logos';
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
  useEffect,
} from 'react';
import Divider from '@/components/Divider';
import { AnimatePresence, Variants, motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { CTAButton } from '@/components/Buttons';
import { PeopleList } from '@/components/People';
import { Gutter } from '@/components/Gutter';

interface SemestersState {
  peopleOpen: boolean[];
  togglePeople: (i: number) => void;
  trailerOpen: boolean;
  toggleTrailerVideo: () => void;
  videoOpen: boolean;
  toggleVideo: () => void;
}

// Create store with Zustand
const useStore = create<SemestersState>()(
  subscribeWithSelector((set) => ({
    peopleOpen: [false, false, false, false],
    togglePeople: (i: number) =>
      set((state) => {
        // debugger;
        return {
          ...state,
          peopleOpen: state.peopleOpen.flatMap((section, ind) => {
            if (ind === i) return !section;
            return section;
          }),
        };
      }),
    trailerOpen: false,
    toggleTrailerVideo: () =>
      set((state) => {
        // debugger;
        return {
          ...state,
          trailerOpen: !state.trailerOpen,
        };
      }),
    videoOpen: false,
    toggleVideo: () =>
      set((state) => {
        // debugger;
        return {
          ...state,
          videoOpen: !state.videoOpen,
        };
      }),
  }))
);

export default function Studio({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    togglePeople,
    peopleOpen,
    toggleTrailerVideo,
    trailerOpen,
    toggleVideo,
    videoOpen,
  } = useStore((state) => state);

  if (item) {
    const rendererOverrides = {
      layout: (layout: number[], children: any[]) => {
        const flexClass = 'flex gap-x-5 flex-col-reverse md:flex-row';
        ('flex gap-x-5 flex-col-reverse md:flex-row');
        // [  ][ ]
        if (layout[0] === 2 && layout[1] === 1) {
          return (
            <div className={flexClass}>
              {children.map((element, i) => (
                <div key={i} className={`${i === 0 ? 'w-full lg:w-3/4' : ''}`}>
                  {element}
                </div>
              ))}
            </div>
          );
        }
        // [ ][  ]
        else if (layout[0] === 1 && layout[1] === 2) {
          return (
            <div className={flexClass}>
              {children.map((element, i) => (
                <div key={i} className="w-full lg:w-3/4">
                  {element}
                </div>
              ))}
            </div>
          );
        } else if (layout[0] === 1 && layout[1] === 1) {
          return (
            <div className={flexClass}>
              {children.map((element: any, i: number | null | undefined) => (
                <div
                  key={i}
                  className="w-full lg:w-1/2 flex-grow flex-shrink-0 basis-1/2"
                >
                  {element}
                </div>
              ))}
            </div>
          );
        }
      },
      heading: (level: number, children: ReactNode, textAlign: any) => {
        const customRenderers = {
          3: `text-xl font-extrabold uppercase my-4 ${
            Theming[item.initiative].heading
          }`,
        };
        return HeadingStyle({ level, children, textAlign, customRenderers });
      },
      quote: (children: ReactElement[]) => {
        if (
          children.length === 2 &&
          children[0].props.node.type === 'paragraph' &&
          children[1].props.node.type === 'paragraph'
        )
          return (
            <div className="my-4">
              <p
                className={`italic text-lg font-bold ${
                  Theming[item.initiative].text
                }`}
              >
                {children[0].props.node.children[0].text}
              </p>
              <p>&mdash; {children[1].props.node.children[0].text}</p>
            </div>
          );
        else
          return (
            <p className="bg-red text-white font-bold text-2xl p-4">
              Quote block error: quotes need to be followed by a full line break
              before attribution. Example:
              <br />
              <code>
                “This is a long quote.”
                <br />
                <br />
                Name, Title
              </code>
            </p>
          );
      },
    };
    return (
      <Layout
        error={error}
        breadcrumbs={[{ label: 'Studio Projects', href: '/studios/projects' }]}
        theme={Theming[item.initiative].theme}
        fullBleed={true}
      >
        {item && (
          <div className="text-grey">
            <Gutter>
              <h1 className="font-extrabold text-4xl text-slate">
                {item.name}
              </h1>
              <div className="flex flex-col flex-wrap lg:flex-row items-center gap-x-7">
                <div
                  className={`relative transition-all duration-500 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] ${
                    videoOpen
                      ? 'w-full basis-full'
                      : 'max-w-sm min-w-[300px] min-h-[200px] md:min-h-[255px] lg:mx-3 lg:max-w-xl lg:min-w-[450px] basis-2/5'
                  }`}
                >
                  {item.trailerId && (
                    <div className="group w-full h-full">
                      <div
                        id="video"
                        className={videoOpen ? 'relative mb-5' : ``}
                      >
                        <Video
                          videoLabel={`Trailer for ${item.name} `}
                          videoUrl={`https://player.vimeo.com/video/${
                            videoOpen ? item.videoId : item.trailerId
                          }`}
                          thumbUrl={item.trailerThumbnail.publicUrl}
                          play={trailerOpen || videoOpen}
                          noUi={true}
                        />
                      </div>
                      {!videoOpen && !trailerOpen && (
                        <button
                          className="absolute bottom-10 md:bottom-12 left-5 flex flex-row items-center gap-x-3 border-b-2 border-white cursor-pointer group-hover:w-80"
                          onClick={() => toggleTrailerVideo()}
                        >
                          <svg
                            height="48"
                            width="48"
                            viewBox="0 -960 960 960"
                            className="inline transition-all duration-200 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] group-hover:scale-125"
                          >
                            <path
                              d="m392-313 260-169-260-169v338ZM140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680v-520H140v520Zm0 0v-520 520Z"
                              fill="white"
                              className={`group-hover:${
                                Theming[item.initiative].fill
                              }`}
                            />
                          </svg>
                          <h4 className="text-white font-semibold text-3xl">
                            Watch the trailer
                          </h4>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="basis-1/3 xl:basis-1/2">
                  <h2
                    className={`uppercase text-xl lg:text-3xl font-extrabold ${
                      Theming[item.initiative].heading
                    }`}
                  >
                    About
                  </h2>
                  <div className="flex flex-col items-center">
                    <p className="my-6">{item.shortDescription}</p>
                    {!videoOpen && (
                      <CTAButton
                        label="Watch the film"
                        link="/"
                        icon="play"
                        theme={Theming[item.initiative].theme}
                        className={`flex flex-row-reverse gap-x-3 items-center text-3xl font-semibold mb-8 ${
                          Theming[item.initiative].fill
                        }`}
                        onClick={() => toggleVideo()}
                      />
                    )}
                  </div>
                </div>
                <div className="hidden lg:block w-3/4 lg:w-full">
                  <h2
                    className={`uppercase text-xl lg:text-3xl font-extrabold ${
                      Theming[item.initiative].heading
                    }`}
                  >
                    Jump to:
                  </h2>
                  <Button
                    label="A Look Inside the Co-Creation Process"
                    anchorId="cocreation"
                    className={`text-sm ${Theming[item.initiative].text} ${
                      Theming[item.initiative].fill
                    }
                      `}
                  />
                  <div className="flex flex-row gap-x-5">
                    <Button
                      label="Impact"
                      anchorId="impact"
                      className={`text-sm ${Theming[item.initiative].text} ${
                        Theming[item.initiative].fill
                      }
                    `}
                    />
                    <Button
                      label="Team"
                      anchorId="team"
                      className={`text-sm ${Theming[item.initiative].text} ${
                        Theming[item.initiative].fill
                      }
                    `}
                    />
                    <Button
                      label="Related Projects"
                      anchorId="related"
                      className={`text-sm ${Theming[item.initiative].text} ${
                        Theming[item.initiative].fill
                      }`}
                    />
                  </div>
                </div>
              </div>
            </Gutter>
            <Divider color="bg-green" />
            <Gutter>
              <div id="cocreation">
                <h2 className="font-bold text-5xl my-3">
                  A Look Inside the Co-Creation Process
                </h2>
                <DocumentRenderer
                  document={item.coCreation.document}
                  componentBlocks={Blocks(Theming[item.initiative])}
                  renderers={Doc(rendererOverrides)}
                />
              </div>

              <h2
                className={`text-xl font-extrabold uppercase ${
                  Theming[item.initiative].heading
                }`}
              >
                Partners
              </h2>
              <Logos partners={item.partners} />
            </Gutter>
            <Divider color="bg-green" />

            <Gutter>
              <div id="impact">
                <h2 className="font-bold text-5xl my-3">Impact</h2>
                <DocumentRenderer
                  document={item.impact.document}
                  componentBlocks={Blocks(Theming[item.initiative])}
                  renderers={Doc(rendererOverrides)}
                />
              </div>
            </Gutter>

            <Divider color="bg-green" />
            <Gutter>
              <h2 className="font-bold text-5xl my-3">Project Team</h2>
              {item.studioStudents && item.studioStudents.length > 0 && (
                <PeopleList
                  list={item.studioStudents}
                  heading="Students"
                  theme={Theming[item.initiative]}
                  index={0}
                />
              )}
              {item.learningPartners && item.learningPartners.length > 0 && (
                <PeopleList
                  list={item.learningPartners}
                  heading="Learning Partners"
                  theme={Theming[item.initiative]}
                  index={1}
                />
              )}
              <div className="flex flex-col lg:flex-row gap-x-7">
                <div>
                  {item.instructors && item.instructors.length > 0 && (
                    <PeopleList
                      list={item.instructors}
                      heading="Studio Instructors"
                      theme={Theming[item.initiative]}
                      index={2}
                    />
                  )}
                </div>
                <div>
                  {item.studioStaff && item.studioStaff.length > 0 && (
                    <PeopleList
                      list={item.studioStaff}
                      heading="Engagement Lab Staff"
                      theme={Theming[item.initiative]}
                      index={3}
                    />
                  )}
                </div>{' '}
              </div>
            </Gutter>
          </div>
        )}
      </Layout>
    );
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'studioProjects',
    `studioProjects {
        key
    }`
  );
  if (items.error) {
    return {
      paths: [],
      fallback: true,
    };
  }
  const paths = (items as { key: string }[])
    .filter(({ key }) => !!key)
    .map(({ key }) => `/studios/projects/${key}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'studioProjects',
    `studioProjects(where: { key: {equals: "${params!.key}"} }) {
            name
            key
            initiative
            about {
            document(hydrateRelationships: true)
            }
            buttons
            semester {
            name
            }
            shortDescription
            thumbAltText
            thumbnail {
            publicId
            }
            trailerId
            trailerThumbnail {
                publicUrl
            }
            trailerThumbAltText
            videoId
            partners
            coCreation {
            document(hydrateRelationships: true)
            }
            impact {
            document(hydrateRelationships: true)
            }
    
            instructors {
              name
              key
              title
              image {
                  publicId
              }
            }
            learningPartners {
              name
              key
              title
              image {
                  publicId
              }
            }
            studioStudents {
              name
              key
              title
              image {
                  publicId
              }  
            }
            studioStaff {
              name
              key
              title
              image {
                  publicId
              }  
            }
        }`
  );
  if (itemResult.error) {
    return {
      props: {
        error: itemResult.error,
        item: null,
      },
    };
  }
  const item = itemResult[0] as StudioProject;

  // const relatedItems = (await query.MediaItem.findMany({
  //     where: {
  //         filters: {
  //             some:{
  //                 OR: [
  //                     { name: { equals: "2022" } },
  //                     { name: { equals: "Rural Voices" } }
  //                 ]
  //             }
  //         }
  //     },
  //     query: 'title key filters { key name } shortDescription thumbnail { publicId }',
  // })) as MediaItem[];
  return { props: { item } };
}
