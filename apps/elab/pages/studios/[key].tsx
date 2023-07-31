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

import Layout from '../../components/Layout';
import { Blocks, Doc } from '../../components/Renderers';
import { CTAButton } from '@/components/Buttons';
import { Partner, Theme } from '@/types';
import { subscribeWithSelector } from 'zustand/middleware';
import Logos from '@/components/Logos';
import { ReactElement, ReactNode, useEffect } from 'react';
import Divider from '@/components/Divider';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';

type Semester = {
  key: string;
  name: string;
  type: string;
  courseNumber: string;
  description: string;
  partners: string[];
  coCreation: {
    document: any;
  };
  impact: {
    document: any;
  };

  projects: {
    name: string;
    key: string;
    shortDescription: string;
    thumbnail: {
      publicId: string;
    };
    thumbailAltText: string;
  }[];

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

type Studio = {
  name: string;
  blurb: string;
  initiatives: string[];
  semesters: Semester[];
};
interface SemestersState {
  currentSemester: string;
  toggle: (semester: string) => void;
  peopleOpen: boolean[];
  togglePeople: (i: number) => void;
}
let preSelectedSemester = '';
let preSelectedTheme = Theme.none;

// Create store with Zustand
const useStore = create<SemestersState>()(
  subscribeWithSelector((set) => ({
    //   currentTheme: preSelectedTheme || Theme.none,
    // If defined, pre-populate filter store
    currentSemester: preSelectedSemester || '',
    toggle: (semester: string) =>
      set((state) => {
        // debugger;
        return {
          ...state,
          currentSemester: semester,
        };
      }),
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
  }))
);

export default function Studio({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { toggle, currentSemester, togglePeople, peopleOpen } = useStore(
    (state) => state
  );

  const selectedSemester = item?.semesters.find(
    (semester) => semester.key === currentSemester
  );
  const [semestersNavOpen, toggleMenuHover] = useCycle(false, true);
  const router = useRouter();

  // Alter URL on semester change
  useStore.subscribe(
    (state) => state.currentSemester,
    (current) => {
      if (location.pathname.includes(current)) return;
      history.replaceState(
        {},
        'Filtered Data',
        `${location.pathname}?${current}`
      );
    }
  );
  useEffect(() => {
    preSelectedSemester =
      Object.keys(router.query).length === 2
        ? Object.keys(router.query)[1]
        : '';
    if (currentSemester === '') {
      if (item?.semesters.length === 1) toggle(item?.semesters[0].key);
      else if (preSelectedSemester !== '') toggle(preSelectedSemester);
    }
  });

  interface ThemeConfig {
    [key: string]: {
      text: string;
      heading: string;
      bg: string;
      border: string;
      fill: string;
      gradient: string;
      secodaryBg: string;
      secodary: string;
      theme: Theme;
    };
  }

  const GetLabel = (selectedSemester: Semester) => {
    if (selectedSemester.type === 'upcoming')
      return <span>Upcoming Semester</span>;
    if (selectedSemester.type === 'current')
      return <span>Current Semester</span>;
    if (selectedSemester.type === null)
      return <span>{selectedSemester.name}</span>;
  };
  const theming: ThemeConfig = {
    gunviolence: {
      text: 'text-purple',
      heading: 'text-green',
      border: 'border-purple',
      bg: 'bg-purple/40',
      fill: 'fill-purple',
      gradient: 'from-[#E2BDFE] to-[#ecd0fe]',
      secodary: 'bg-[#E2BDFE]',
      secodaryBg: 'bg-[#E2BDFE]/40',
      theme: Theme.gunviolence,
    },
    climate: {
      text: 'text-leaf',
      heading: 'text-yellow',
      border: 'border-leaf',
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
      heading: (level: number, children: ReactNode, textAlign: any) => {
        const customRenderers = {
          3: `text-xl font-extrabold uppercase my-4 ${
            theming[item.initiatives[0]].heading
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
                className={`italic text-sm ${
                  theming[item.initiatives[0]].text
                }`}
              >
                {children[0].props.node.children[0].text}
              </p>
              <p className="text-right">
                {children[1].props.node.children[0].text}
              </p>
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
        breadcrumbs={[{ label: 'Social Impact Studios', href: '/studios' }]}
        theme={
          item.initiatives.length > 1
            ? Theme.none
            : theming[item.initiatives[0]].theme
        }
      >
        {item && (
          <div className="mx-6 text-grey">
            <h1 className="font-extrabold text-4xl">{item.name}</h1>
            <p className="my-6">{item.blurb}</p>
            <div className="">
              <div className="flex items-center uppercase mb-2">
                <svg height="36" viewBox="0 -960 960 960" width="36">
                  <path d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z" />
                </svg>
                <p className="ml-2">CHOOSE A SEMESTER TO EXPLORE:</p>
              </div>
              <div
                className={`relative z-10 border-l-[1px] border-r-[1px] border-t-[1px] w-full h-[67px] xl:hidden ${
                  !semestersNavOpen && 'border-b-[1px]'
                } ${theming[item.initiatives[0]].border}`}
              >
                <button
                  className={`absolute z-10 mt-2 ml-2 mr-2 pb-2 pr-2 w-full uppercase font-extrabold border-l-[1px] border-r-[1px] border-t-[1px] ${
                    !semestersNavOpen && 'border-b-[1px]'
                  } ${theming[item.initiatives[0]].border} ${
                    theming[item.initiatives[0]].text
                  }`}
                  onClick={() => {
                    toggleMenuHover();
                  }}
                >
                  <div
                    className={`flex items-center justify-between bg-gradient-to-b p-2 w-full ${
                      theming[item.initiatives[0]].gradient
                    }`}
                  >
                    <span>
                      {selectedSemester ? GetLabel(selectedSemester) : 'Select'}
                    </span>
                    <svg
                      className={`transition-transform ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 ${
                        semestersNavOpen && 'rotate-180'
                      } ${theming[item.initiatives[0]].fill}`}
                      viewBox="0 -960 960 960"
                      width="40"
                      height="40"
                    >
                      <path d="M 500 -280.021 L 280 -559 L 720 -559 L 500 -280.021 Z"></path>
                    </svg>
                  </div>
                </button>
              </div>

              <AnimatePresence>
                {semestersNavOpen && (
                  <motion.div
                    className={`relative border-l-[1px] border-r-[1px] border-b-[1px] w-full -top-1/2 opacity-0 ${
                      theming[item.initiatives[0]].border
                    }`}
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
                    <ul
                      className={`w-full uppercase border-l-[1px] border-r-[1px] border-b-[1px] ml-2 mb-2 ${
                        theming[item.initiatives[0]].border
                      }`}
                    >
                      {item.semesters.map((se) => {
                        return (
                          <li>
                            <p
                              className={`p-2 cursor-pointer font-semibold ${
                                se.type
                                  ? 'text-teal'
                                  : theming[item.initiatives[0]].text
                              }`}
                            >
                              <a
                                href="#"
                                onClick={(e) => {
                                  toggle(se.key);
                                  toggleMenuHover();

                                  e.preventDefault();
                                }}
                                key={se.key}
                              >
                                {se.type === 'upcoming' && 'Upcoming Semester'}
                                {se.type === 'current' && 'Current Semester'}
                                {se.type === null && se.name}
                              </a>
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden xl:flex flex-row">
              {item.semesters.map((se) => {
                // const label = () => { return ({se.name.split(' ')[0]} <br /> {se.name.split(' ')[1]}) };
                return (
                  <button
                    key={se.key}
                    className="block relative w-32 h-16 ml-4 group"
                  >
                    <div
                      className={`absolute w-full h-full border-[1px] ${
                        se.type
                          ? 'border-teal'
                          : theming[item.initiatives[0]].border
                      }
                        se.type
                          ? 'text-teal'
                          : theming[item.initiatives[0]].text
                      }`}
                    ></div>
                    <a
                      href="#"
                      onClick={(e) => {
                        toggle(se.key);
                        e.preventDefault();
                      }}
                      className={`absolute cursor-pointer font-semibold uppercase block border-[1px] ml-1 mt-1 p-2 w-full h-full text-center transition-colors group-hover:text-white ${
                        se.type
                          ? 'text-teal border-teal group-hover:bg-teal/40'
                          : theming[item.initiatives[0]].border +
                            ' ' +
                            theming[item.initiatives[0]].text +
                            ' ' +
                            `group-hover:${theming[item.initiatives[0]].bg}`
                      } ${
                        se === selectedSemester &&
                        (se.type
                          ? 'border-teal bg-teal/40 text-white'
                          : theming[item.initiatives[0]].border +
                            ' text-white ' +
                            theming[item.initiatives[0]].bg)
                      }`}
                    >
                      {se.type === 'upcoming' && 'Upcoming \n Semester'}
                      {se.type === 'current' && 'Current \n Semester'}
                      {se.type === null && [
                        se.name.split(' ')[0],
                        <br />,
                        se.name.split(' ')[1],
                      ]}
                    </a>
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {selectedSemester && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`my-20 ${theming[item.initiatives[0]].secodaryBg}`}
                >
                  <div className="p-6">
                    <h2
                      className={`uppercase font-extrabold ${
                        theming[item.initiatives[0]].heading
                      }`}
                    >
                      Course Information
                    </h2>
                    <p>
                      <span className="font-bold tracking-wider">NUMBER:</span>
                      <br />
                      {selectedSemester.courseNumber}
                    </p>

                    <p className="my-2">
                      <span className="font-bold tracking-wider">
                        INSTRUCTOR:
                      </span>
                      <br />
                      {selectedSemester.instructors
                        .map((i) => i.name)
                        .join(', ')}
                    </p>
                    <p className="my-2">{selectedSemester.description}</p>
                  </div>
                  <div className="w-3/4 lg:w-full mt-6 p-6">
                    <h2
                      className={`uppercase text-xl lg:text-3xl font-extrabold ${
                        theming[item.initiatives[0]].heading
                      }`}
                    >
                      Jump to:
                    </h2>
                    <Button
                      label="A Look Inside the Co-Creation Process"
                      anchorId="cocreation"
                      className={`text-sm ${
                        theming[item.initiatives[0]].text
                      } ${theming[item.initiatives[0]].fill}
                      `}
                    />
                    <Button
                      label="Impact Beyond the Studio"
                      anchorId="impact"
                      className={`text-sm ${
                        theming[item.initiatives[0]].text
                      } ${theming[item.initiatives[0]].fill}
                      `}
                    />
                    <Button
                      label="Studio Participants"
                      anchorId="impact"
                      className={`text-sm ${
                        theming[item.initiatives[0]].text
                      } ${theming[item.initiatives[0]].fill}
                      `}
                    />
                  </div>
                  <div id="cocreation" className="p-6">
                    <h2 className="font-bold text-2xl my-3">
                      A Look Inside the Co-Creation Process
                    </h2>
                    <DocumentRenderer
                      document={selectedSemester.coCreation.document}
                      componentBlocks={Blocks()}
                      renderers={Doc(rendererOverrides)}
                    />
                  </div>

                  <Divider color={theming[item.initiatives[0]].secodary} />

                  <div id="impact" className="p-6">
                    <h2 className="font-bold text-2xl my-3">
                      Impact Beyond the Studio
                    </h2>
                    <DocumentRenderer
                      document={selectedSemester.impact.document}
                      componentBlocks={Blocks()}
                      renderers={Doc(rendererOverrides)}
                    />
                  </div>

                  <div className="grid lg:ml-5 lg:grid-cols-2 xl:grid-cols-3 lg:gap-2 xl:gap-3 p-6">
                    <h2
                      className={`uppercase font-extrabold ${
                        theming[item.initiatives[0]].heading
                      }`}
                    >
                      {selectedSemester.name} {selectedSemester.type} Studio
                      Projects
                    </h2>
                    {selectedSemester.projects.map((project) => (
                      <Link
                        href={`/studios/projects/${project.key}`}
                        passHref
                        className="group"
                        key={project.key}
                      >
                        {project.thumbnail ? (
                          <Image
                            id={`thumb-${project.key}`}
                            alt={project.thumbailAltText}
                            imgId={project.thumbnail.publicId}
                            maxWidth={800}
                            className="w-full"
                          />
                        ) : (
                          <ImagePlaceholder
                            imageLabel="Project"
                            width={335}
                            height={200}
                          />
                        )}
                        <h3 className="text-bluegreen text-xl font-semibold mt-4 hover:text-green-blue group-hover:text-green-blue">
                          {project.name}
                        </h3>
                        <div className="mt-2 mb-20">
                          <p className="m-0">{project.shortDescription}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Divider color={theming[item.initiatives[0]].secodary} />
                  <div className="p-6">
                    <h2 className="font-bold text-2xl my-3">
                      {selectedSemester.name} Studio Participants
                    </h2>
                    <div className="flex flex-col flex-wrap my-4">
                      <hr
                        className={`border-1 ${
                          theming[item.initiatives[0]].heading
                        }`}
                      />
                      <h3
                        className={`text-lg font-medium uppercase my-4 ${
                          theming[item.initiatives[0]].heading
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
                            theming[item.initiatives[0]].heading
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
                            {selectedSemester.learningPartners.map((person) => (
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
                                    theming[item.initiatives[0]].border
                                  }`}
                                />
                                <p
                                  className={`text-lg ${
                                    theming[item.initiatives[0]].text
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

                    <h2
                      className={`text-xl font-extrabold uppercase ${
                        theming[item.initiatives[0]].heading
                      }`}
                    >
                      {selectedSemester.name} Partners
                    </h2>
                    <Logos partners={selectedSemester.partners} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Layout>
    );
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const items = await Query(
    'studios',
    `studios {
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
    .map(({ key }) => `/studios/${key}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const itemResult = await Query(
    'studios',
    `studios(where: { key: { equals: "${params!.key}" } }) {
        name
        blurb
        initiatives
        semesters {
            key
            name
            type
            courseNumber
            description
            partners
            coCreation {
                document(hydrateRelationships: true)
            }
            impact {
                document(hydrateRelationships: true)
            }
            projects {
                name
                key
                shortDescription
                thumbnail {
                    publicId
                }
                thumbAltText
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
  const item = itemResult[0] as Studio;
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