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

import { Theme, ThemeConfig } from '@/types';
import { subscribeWithSelector } from 'zustand/middleware';
import Logos from '@/components/Logos';
import { ReactElement, ReactNode, useEffect } from 'react';
import Divider from '@/components/Divider';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { CTAButton } from '@/components/Buttons';

type StudioProject = {
  name: string;
  key: string;

  initiative: string;
  about: {
    document: any;
  };

  trailerId: string;
  videoId: string;
  buttons: any[];
  semester: {
    name: string;
  };

  partners: string[];
  coCreation: {
    document: any;
  };
  impact: {
    document: any;
  };
  shortDescription: string;
  thumbnail: {
    publicId: string;
  };
  thumbAltText: string;
  trailerThumbnail: {
    publicUrl: string;
  };
  trailerThumbAltText: string;
  instructors: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
  learningPartners: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
  studioStudents: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
  studioStaff: {
    name: string;
    key: string;
    title: string;
    image: {
      publicId: string;
    };
  }[];
};

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

  const theming: { [key: string]: ThemeConfig } = {
    gunviolence: {
      arrow: '#7C4E9F',
      text: 'text-purple',
      heading: 'text-green',
      border: 'border-purple',
      borderLight: 'border-[#E3BFFF]',
      bg: 'bg-purple',
      fill: 'fill-purple',
      gradient: 'from-[#E2BDFE] to-[#ecd0fe]',
      secodary: 'bg-[#E2BDFE]',
      secodaryBg: 'bg-[#E2BDFE]/40',
      theme: Theme.gunviolence,
    },
    climate: {
      arrow: '#00A494',
      text: 'text-leaf',
      heading: 'text-yellow',
      border: 'border-leaf',
      borderLight: 'border-purple',
      bg: 'group-hover:bg-leaf/40',
      fill: 'fill-leaf',
      secodary: 'bg-#D7EFC1',
      secodaryBg: 'bg-#D7EFC1/40',
      gradient: 'from-[#D7EFC1] to-leaf',
      theme: Theme.gunviolence,
    },
  };

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
            theming[item.initiative].heading
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
                  theming[item.initiative].text
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
    const Gutter = ({ children }: { children: ReactNode }) => {
      return <div className="md:px-20 xl:px-24 my-6 xl:my-12">{children}</div>;
    };
    return (
      <Layout
        error={error}
        breadcrumbs={[{ label: 'Studio Projects', href: '/studio/projects' }]}
        theme={theming[item.initiative].theme}
        fullBleed={true}
      >
        {item && (
          <div className="text-grey">
            <Gutter>
              <h1 className="font-extrabold text-4xl text-slate">
                {item.name}
              </h1>
              <div className="flex flex-col flex-wrap xl:flex-row gap-x-7">
                <div
                  className={`relative transition-all duration-500 ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] ${
                    videoOpen
                      ? 'w-full basis-full'
                      : 'max-w-xl min-w-[450px] min-h-[300px] basis-2/5'
                  }`}
                >
                  {item.trailerId && (
                    <div className="group w-full h-full">
                      <div
                        className={
                          videoOpen ? 'relative' : `absolute w-full h-full`
                        }
                      >
                        <Video
                          videoLabel={`Trailer for ${item.name} `}
                          videoUrl={`https://player.vimeo.com/video/${item.trailerId}`}
                          thumbUrl={item.trailerThumbnail.publicUrl}
                          play={trailerOpen || videoOpen}
                          noUi={true}
                        />
                      </div>
                      {!videoOpen && !trailerOpen && (
                        <button
                          className="absolute bottom-14 left-5 flex flex-row items-center gap-x-3 border-b-2 border-white cursor-pointer group-hover:w-80"
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
                                theming[item.initiative].fill
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
                <div className=" basis-1/2">
                  <h2
                    className={`uppercase text-xl lg:text-3xl font-extrabold ${
                      theming[item.initiative].heading
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
                        theme={theming[item.initiative].theme}
                        className={`flex flex-row-reverse gap-x-3 items-center text-3xl font-semibold mb-8 ${
                          theming[item.initiative].fill
                        }`}
                        onClick={() => toggleVideo()}
                      />
                    )}
                  </div>
                </div>
                <div className="w-3/4 lg:w-full">
                  <h2
                    className={`uppercase text-xl lg:text-3xl font-extrabold ${
                      theming[item.initiative].heading
                    }`}
                  >
                    Jump to:
                  </h2>
                  <Button
                    label="A Look Inside the Co-Creation Process"
                    anchorId="cocreation"
                    className={`text-sm ${theming[item.initiative].text} ${
                      theming[item.initiative].fill
                    }
                      `}
                  />
                  <Button
                    label="Impact"
                    anchorId="impact"
                    className={`text-sm ${theming[item.initiative].text} ${
                      theming[item.initiative].fill
                    }
                      `}
                  />
                  <Button
                    label="Team"
                    anchorId="team"
                    className={`text-sm ${theming[item.initiative].text} ${
                      theming[item.initiative].fill
                    }
                      `}
                  />
                  <Button
                    label="Related Projects"
                    anchorId="related"
                    className={`text-sm ${theming[item.initiative].text} ${
                      theming[item.initiative].fill
                    }`}
                  />
                </div>
              </div>
            </Gutter>
            <Divider color="bg-green" />
            <AnimatePresence>
              <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Gutter>
                  <div id="cocreation">
                    <h2 className="font-bold text-5xl my-3">
                      A Look Inside the Co-Creation Process
                    </h2>
                    <DocumentRenderer
                      document={item.coCreation.document}
                      componentBlocks={Blocks(theming[item.initiative])}
                      renderers={Doc(rendererOverrides)}
                    />
                  </div>

                  <h2
                    className={`text-xl font-extrabold uppercase ${
                      theming[item.initiative].heading
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
                      componentBlocks={Blocks(theming[item.initiative])}
                      renderers={Doc(rendererOverrides)}
                    />
                  </div>
                </Gutter>

                <Divider color="bg-green" />
                <Gutter>
                  <h2 className="font-bold text-5xl my-3">Project Team</h2>
                  <h3
                    className={`text-lg font-medium uppercase mt-10 mb-4 ${
                      theming[item.initiative].heading
                    }`}
                  >
                    Learning Partners
                  </h3>
                  <div className="hidden flex-wrap my-4 gap-x-8 lg:flex">
                    {item.learningPartners.map((person) => (
                      <div
                        className="flex flex-col w-full items-center text-center xl:w-1/5 ml-0 xl:ml-3 group cursor-pointer"
                        key={`thumb-${person.key}`}
                      >
                        <Image
                          id={`thumb-${person.key}`}
                          alt={`Photo of ${person.name}`}
                          imgId={person.image.publicId}
                          width={230}
                          transforms="f_auto,dpr_auto,c_fill,g_face,r_max,h_230,w_230"
                          className={`rounded-full border-4 mt-2 transition-all group-hover:border-8 ${
                            theming[item.initiative].borderLight
                          }`}
                        />
                        <p
                          className={`text-lg ${
                            theming[item.initiative].text
                          } border-b-2`}
                        >
                          {person.name}
                        </p>
                        <p className="text-sm mt-1">{person.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col flex-wrap my-4 lg:hidden">
                    <hr
                      className={`border-1 ${theming[item.initiative].heading}`}
                    />
                    <h3
                      className={`text-lg font-medium uppercase my-4 ${
                        theming[item.initiative].heading
                      }`}
                    >
                      <button
                        className="flex items-center uppercase mb-2"
                        onClick={() => {
                          togglePeople(0);
                        }}
                      >
                        <p className="uppercase">Learning Partners</p>

                        <svg
                          className={`transition-transform ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 ${
                            peopleOpen[0] && 'rotate-180'
                          }`}
                          height="40"
                          viewBox="0 -960 960 960"
                          width="40"
                        >
                          <path d="M 500 -280.021 L 280 -559 L 720 -559 L 500 -280.021 Z"></path>
                        </svg>
                      </button>
                      <hr
                        className={`border-1 ${
                          theming[item.initiative].heading
                        }`}
                      />
                    </h3>

                    <AnimatePresence>
                      {peopleOpen[0] && (
                        <motion.div
                          animate={{
                            opacity: 1,
                            top: 0,
                            transition: { ease: 'easeOut', duration: 0.3 },
                          }}
                          exit={{
                            opacity: 0,
                            top: -40,
                            transition: { duration: 0.3 },
                          }}
                        >
                          {item.learningPartners.map((person) => (
                            <div
                              className="flex flex-col w-full items-center text-center xl:w-1/5 ml-0 xl:ml-3"
                              key={`thumb-${person.key}`}
                            >
                              <Image
                                id={`thumb-${person.key}`}
                                alt={`Photo of ${person.name}`}
                                imgId={person.image.publicId}
                                width={230}
                                transforms="f_auto,dpr_auto,c_fill,g_face,r_max,h_230,w_230"
                                className={`rounded-full border-4 mt-2 ${
                                  theming[item.initiative].border
                                }`}
                              />
                              <p
                                className={`text-lg ${
                                  theming[item.initiative].text
                                }`}
                              >
                                {person.name}
                              </p>
                              <p className="text-sm">{person.title}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Gutter>
              </motion.div>
            </AnimatePresence>
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
