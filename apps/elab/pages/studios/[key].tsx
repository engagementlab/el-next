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
import { Blocks, Doc, QuoteRenderer } from '../../components/Renderers';
import { CTAButton } from '@/components/Buttons';
import { Partner, Theme, Theming } from '@/types';
import { subscribeWithSelector } from 'zustand/middleware';
import Logos from '@/components/Logos';
import { ReactElement, ReactNode, useEffect } from 'react';
import Divider from '@/components/Divider';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { PeopleList } from '@/components/People';
import Partners from '@/components/Partners';
import Slideshow from '@/components/Slideshow';

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
  slides: {
    slides: any[];
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
  contact: string;
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

  if (item) {
    const rendererOverrides = {
      heading: (level: number, children: ReactNode, textAlign: any) => {
        const customRenderers = {
          3: `text-xl font-extrabold uppercase my-4 ${
            Theming[item.initiatives[0]].heading
          }`,
        };
        return HeadingStyle({ level, children, textAlign, customRenderers });
      },
      quote: (children: ReactElement[]) => {
        return QuoteRenderer(children, item);
      },
    };
    return (
      <Layout
        error={error}
        breadcrumbs={[{ label: 'Social Impact Studios', href: '/studios' }]}
        theme={
          item.initiatives.length > 1
            ? Theme.none
            : Theming[item.initiatives[0]].theme
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
                } ${Theming[item.initiatives[0]].border}`}
              >
                <button
                  className={`absolute z-10 mt-2 ml-2 mr-2 pb-2 pr-2 w-full uppercase font-extrabold border-l-[1px] border-r-[1px] border-t-[1px] ${
                    !semestersNavOpen && 'border-b-[1px]'
                  } ${Theming[item.initiatives[0]].border} ${
                    Theming[item.initiatives[0]].text
                  }`}
                  onClick={() => {
                    toggleMenuHover();
                  }}
                >
                  <div className="flex items-center justify-between p-2 w-full">
                    <span>
                      {selectedSemester ? GetLabel(selectedSemester) : 'Select'}
                    </span>
                    <svg
                      className={`transition-transform ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 ${
                        semestersNavOpen && 'rotate-180'
                      } ${Theming[item.initiatives[0]].fill}`}
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
                      Theming[item.initiatives[0]].border
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
                      className={`w-full list-none uppercase border-l-[1px] border-r-[1px] border-b-[1px] ml-2 mb-2 ${
                        Theming[item.initiatives[0]].border
                      }`}
                    >
                      {item.semesters.map((se) => {
                        return (
                          <li>
                            <p
                              className={`p-2 cursor-pointer font-semibold ${
                                se.type
                                  ? Theming[item.initiatives[0]].heading
                                  : Theming[item.initiatives[0]].text
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
                          : Theming[item.initiatives[0]].border
                      }
                        ${
                          se.type
                            ? 'text-teal'
                            : Theming[item.initiatives[0]].text
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
                          : Theming[item.initiatives[0]].border +
                            ' ' +
                            Theming[item.initiatives[0]].text +
                            ' ' +
                            `group-hover:${Theming[item.initiatives[0]].bg}`
                      } ${
                        se === selectedSemester &&
                        (se.type
                          ? 'border-teal bg-teal/40 text-white'
                          : Theming[item.initiatives[0]].border +
                            ' text-white ' +
                            Theming[item.initiatives[0]].bg)
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
                  className={`my-20 ${Theming[item.initiatives[0]].secodaryBg}`}
                >
                  <div className="p-6">
                    <h2
                      className={`uppercase font-extrabold ${
                        Theming[item.initiatives[0]].heading
                      }`}
                    >
                      Course Information
                    </h2>

                    <div className="flex flex-col xl:flex-row gap-8">
                      <div className="w-full xl:w-1/2">
                        <p>
                          <span className="font-bold tracking-wider">
                            NUMBER:
                          </span>
                          <br />
                          {selectedSemester.courseNumber}
                        </p>

                        <p>
                          <span className="font-bold tracking-wider">
                            INSTRUCTOR:
                          </span>
                          <br />
                          {selectedSemester.instructors
                            .map((i) => i.name)
                            .join(', ')}
                        </p>
                        <p className="my-2">
                          <span className="font-bold tracking-wider">
                            PARTNERS:&nbsp;
                          </span>
                          {Partners({ partners: selectedSemester.partners })}
                        </p>
                      </div>
                      {selectedSemester.slides &&
                        selectedSemester.slides.slides.length > 0 && (
                          <Slideshow
                            slides={selectedSemester.slides.slides}
                            themeColor={Theming[item.initiatives[0]].bg}
                            className={`${
                              Theming[item.initiatives[0]].bg
                            } bg-opacity-50`}
                          />
                        )}
                    </div>
                  </div>
                  <p className="p-6">{selectedSemester.description}</p>
                  <div className="hidden lg:block w-full mt-6 p-6">
                    <h2
                      className={`uppercase text-xl lg:text-3xl font-extrabold ${
                        Theming[item.initiatives[0]].heading
                      }`}
                    >
                      Jump to:
                    </h2>
                    <div className="flex flex-col w-full gap-x-10">
                      <Button
                        label="A Look Inside the Co-Creation Process"
                        anchorId="cocreation"
                        className={`text-sm ${
                          Theming[item.initiatives[0]].text
                        } ${Theming[item.initiatives[0]].fill}
                      `}
                      />

                      {selectedSemester.projects &&
                        selectedSemester.projects.length > 0 && (
                          <Button
                            label="Projects"
                            anchorId="projects"
                            className={`text-sm ${
                              Theming[item.initiatives[0]].text
                            } ${Theming[item.initiatives[0]].fill}
                      `}
                          />
                        )}
                      {selectedSemester.impact &&
                        selectedSemester.impact.document.length > 2 && (
                          <Button
                            label="Impact Beyond the Studio"
                            anchorId="impact"
                            className={`text-sm ${
                              Theming[item.initiatives[0]].text
                            } ${Theming[item.initiatives[0]].fill}
                      `}
                          />
                        )}
                      <Button
                        label="Studio Participants"
                        anchorId="impact"
                        className={`text-sm ${
                          Theming[item.initiatives[0]].text
                        } ${Theming[item.initiatives[0]].fill}
                      `}
                      />
                    </div>
                  </div>
                  <div id="cocreation" className="p-6">
                    <h2 className="font-bold text-5xl my-3">
                      A Look Inside the Co-Creation Process
                    </h2>
                    <DocumentRenderer
                      document={selectedSemester.coCreation.document}
                      componentBlocks={Blocks()}
                      renderers={Doc(rendererOverrides)}
                    />
                  </div>

                  {selectedSemester.projects &&
                    selectedSemester.projects.length > 0 && (
                      <>
                        <Divider
                          color={`${
                            Theming[item.initiatives[0]].bg
                          } bg-opacity-50`}
                        />
                        <div id="projects" className="p-6">
                          <h2 className="font-bold text-5xl my-3">
                            {selectedSemester.name} Studio Projects
                          </h2>
                          <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-5 xl:gap-y-10 lg:grid-cols-2 lg:gap-2 text-grey">
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
                                    transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                                    width={460}
                                    className="w-full"
                                  />
                                ) : (
                                  <ImagePlaceholder
                                    imageLabel="Project"
                                    width={335}
                                    height={200}
                                  />
                                )}
                                <h3 className="text-bluegreen text-3xl font-bold mt-4 hover:text-green-blue group-hover:text-green-blue">
                                  {project.name}
                                </h3>
                                <div className="mt-2 mb-20">
                                  <p className="m-0">
                                    {project.shortDescription}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                  {selectedSemester.impact &&
                    selectedSemester.impact.document.length > 2 && (
                      <>
                        <Divider
                          color={`${
                            Theming[item.initiatives[0]].bg
                          } bg-opacity-50`}
                        />
                        <div id="impact" className="p-6">
                          <h2 className="font-bold text-5xl my-3">
                            Impact Beyond the Studio
                          </h2>
                          <DocumentRenderer
                            document={selectedSemester.impact.document}
                            componentBlocks={Blocks()}
                            renderers={Doc(rendererOverrides)}
                          />
                        </div>
                      </>
                    )}
                  <Divider
                    color={`${Theming[item.initiatives[0]].bg} bg-opacity-50`}
                  />
                  <div className="p-6">
                    <h2 className="font-bold text-5xl my-3">
                      {selectedSemester.name} Studio Participants
                    </h2>
                    {selectedSemester.studioStudents &&
                      selectedSemester.studioStudents.length > 0 && (
                        <PeopleList
                          list={selectedSemester.studioStudents}
                          heading="Students"
                          theme={Theming[item.initiatives[0]]}
                          index={0}
                        />
                      )}
                    {selectedSemester.learningPartners &&
                      selectedSemester.learningPartners.length > 0 && (
                        <PeopleList
                          list={selectedSemester.learningPartners}
                          heading="Learning Partners"
                          index={1}
                          theme={Theming[item.initiatives[0]]}
                        />
                      )}
                    <div className="flex flex-col lg:flex-row gap-x-7">
                      <div className="flex-grow">
                        {selectedSemester.instructors &&
                          selectedSemester.instructors.length > 0 && (
                            <PeopleList
                              list={selectedSemester.instructors}
                              heading="Studio Instructors"
                              theme={Theming[item.initiatives[0]]}
                              index={2}
                            />
                          )}
                      </div>
                      <div>
                        {selectedSemester.studioStaff &&
                          selectedSemester.studioStaff.length > 0 && (
                            <PeopleList
                              list={selectedSemester.studioStaff}
                              heading="Engagement Lab Staff"
                              theme={Theming[item.initiatives[0]]}
                              index={3}
                            />
                          )}
                      </div>
                    </div>
                    <h2
                      className={`text-xl font-extrabold uppercase my-3 ${
                        Theming[item.initiatives[0]].heading
                      }`}
                    >
                      Studio Contact
                    </h2>
                    <p className="lg:w-1/2">
                      Are you an Emerson student interested in enrolling in this
                      course in the future? Please contact the instructor
                      at&nbsp;
                      <a
                        href={`mailto:${selectedSemester.contact}`}
                        className={`font-semibold ${
                          Theming[item.initiatives[0]].text
                        }`}
                      >
                        {selectedSemester.contact}
                      </a>{' '}
                      to learn more!
                    </p>
                    <h2
                      className={`text-xl font-extrabold uppercase mb-3 mt-8 ${
                        Theming[item.initiatives[0]].heading
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
            slides {
              slides {
                altText
                image {
                  publicId
                }
              }
            }
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
            contact
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
