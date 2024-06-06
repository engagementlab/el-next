import { ReactElement, ReactNode, useEffect } from 'react';
import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Button, Image, Query } from '@el-next/components';

import {
  AnimatePresence,
  Variants,
  cubicBezier,
  motion,
  useCycle,
} from 'framer-motion';

import Layout from '../../../components/Layout';
import {
  Blocks,
  Doc,
  Heading,
  QuoteRenderer,
} from '../../../components/Renderers';
import {
  CustomEase,
  DefaultWhereCondition,
  Semester,
  Studio as StudioT,
  ThemeColors,
  Theming,
} from '@/types';

import Logos from '@/components/Logos';
import Divider from '@/components/Divider';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import { PeopleList } from '@/components/People';
import Partners from '@/components/Partners';
import Slideshow from '@/components/Slideshow';
import clsx from 'clsx';
import { SemestersSort } from '@/shared';

export default function Studio({
  item,
  currentSemester,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!item) return;
  let sortedSemesters = SemestersSort(item.semesters);

  const router = useRouter();
  const selectedSemester = item?.semesters.find(
    (semester) => semester.key === currentSemester
  );
  const [semestersNavOpen, toggleMenuHover] = useCycle(false, true);
  const semesterInstructors = selectedSemester?.instructors
    .map((i) => i.name)
    .join(', ');
  const dropdownVariants: Variants = {
    hover: {
      height: '80px',
      transition: {
        ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
        duration: 0.3,
      },
    },
  };
  const arrowVariants: Variants = {
    hover: {
      scale: 1.5,
      transition: {
        ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
        duration: 0.3,
      },
    },
  };

  const GetLabel = (selectedSemester: Semester) => {
    if (selectedSemester.type === 'upcoming')
      return <span>Upcoming Semester</span>;
    if (selectedSemester.type === 'current')
      return <span>Current Semester</span>;
    if (selectedSemester.type === null)
      return <span>{selectedSemester.name}</span>;
  };

  useEffect(() => {
    // If there is only one semester, just redirect there immediately
    if (!currentSemester && item?.semesters.length === 1)
      router.replace(`/studios/${item.key}/${item.semesters[0].key}`);
  });

  if (item) {
    let theme = Theming['none'];
    if (item.initiatives && item.initiatives.length === 1) {
      if (item.initiatives[0] === 'gunviolence') theme = Theming['tngv'];
      else if (item.initiatives[0] === 'climate') theme = Theming['tnej'];
    }
    const rendererOverrides = {
      heading: (level: number, children: ReactNode, textAlign: any) => {
        const customRenderers = {
          3: `text-xl font-extrabold uppercase my-4 ${theme.heading}`,
          5: `text-lg font-extrabold my-4 ${ThemeColors[theme.theme].primary}`,
        };
        return Heading(level, children, textAlign, customRenderers, theme);
      },
      quote: (children: ReactElement[]) => {
        return QuoteRenderer(children, item, theme);
      },
    };

    return (
      <Layout
        error={error}
        theme={theme.theme}
        title={`${selectedSemester ? selectedSemester.name + ' - ' : ''}${
          item.name
        } - Social Impact Studios`}
      >
        {item && (
          <div className="mx-6 text-grey">
            <h1 className="font-extrabold text-4xl">{item.name}</h1>
            <p className="my-6">{item.blurb}</p>

            {/* SMALL screens */}
            <div className="flex items-center uppercase mb-2">
              <svg height="36" viewBox="0 -960 960 960" width="36">
                <path d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z" />
              </svg>
              <p className="ml-2 mt-0">CHOOSE A SEMESTER TO EXPLORE:</p>
            </div>
            <div
              className={`relative z-10 bg-white border-l-[1px] border-r-[1px] border-t-[1px] w-full h-[67px] xl:hidden ${
                !semestersNavOpen && 'border-b-[1px]'
              } ${theme.border}`}
            >
              <motion.button
                className={`absolute group z-10 mt-2 ml-2 mr-2 pb-2 pr-2 w-full uppercase font-extrabold border-l-[1px] border-r-[1px] border-t-[1px] ${
                  !semestersNavOpen && 'border-b-[1px]'
                } ${theme.border} ${theme.text}`}
                onClick={() => {
                  toggleMenuHover();
                }}
                variants={dropdownVariants}
                whileTap={!semestersNavOpen ? 'hover' : ''}
                whileHover={!semestersNavOpen ? 'hover' : ''}
              >
                <div className="flex items-center justify-between p-2 w-full">
                  <span>
                    {selectedSemester ? GetLabel(selectedSemester) : 'Select'}
                  </span>
                  <motion.svg
                    className={`transition-transform ${CustomEase} duration-100 group-target:scale-150 ${
                      semestersNavOpen && 'rotate-180'
                    } ${theme.fill}`}
                    viewBox="0 -960 960 960"
                    width="40"
                    height="40"
                    variants={arrowVariants}
                  >
                    <path d="M 500 -280.021 L 280 -559 L 720 -559 L 500 -280.021 Z"></path>
                  </motion.svg>
                </div>
              </motion.button>
            </div>

            <AnimatePresence>
              {semestersNavOpen && (
                <motion.div
                  className={`relative border-l-[1px] border-r-[1px] border-b-[1px] w-full opacity-0 ${theme.border}`}
                  initial={{
                    opacity: 0,
                    top: -50,
                  }}
                  animate={{
                    opacity: 1,
                    top: 0,
                    transition: {
                      ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
                      duration: 0.3,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    top: -65,
                    transition: {
                      ease: cubicBezier(0.075, 0.82, 0.165, 1.0),
                      duration: 0.3,
                    },
                  }}
                >
                  <ul
                    className={`w-full list-none uppercase border-l-[1px] border-r-[1px] border-b-[1px] ml-2 mb-2 ${theme.border}`}
                  >
                    {sortedSemesters?.map((se) => {
                      return (
                        <li>
                          <p
                            className={`p-2 m-0 cursor-pointer font-semibold ${
                              se.type ? theme.heading : theme.text
                            }`}
                          >
                            <Link
                              href={`/studios/${item.key}/${se.key}`}
                              onClick={() => {
                                toggleMenuHover();
                              }}
                            >
                              {se.type === 'upcoming' && 'Upcoming Semester'}
                              {se.type === 'current' && 'Current Semester'}
                              {se.type === null && se.name.split(' - ')[0]}
                            </Link>
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* LARGE screens */}
            <div className="hidden xl:flex flex-row">
              {sortedSemesters?.map((se) => {
                const linkBaseClass =
                  'absolute cursor-pointer font-semibold uppercase block border-[1px] ml-1 mt-1 p-2 w-full h-full text-center transition-colors group-hover:text-white ';
                let initiativeClass = 'group-hover:bg-yellow';

                if (item.initiatives && item.initiatives[0]) {
                  if (item.initiatives[0] === 'gunviolence')
                    initiativeClass = `group-hover:bg-purple`;
                  else initiativeClass = `group-hover:bg-leaf`;
                }
                let innerClass = se.type
                  ? 'text-teal border-teal group-hover:bg-teal/40'
                  : `${theme.border}`;
                let innerSelectedClass = ``;
                if (se.type) {
                  if (selectedSemester == se)
                    innerSelectedClass = 'border-teal bg-teal/40 text-white';
                } else if (!se.type) {
                  if (selectedSemester == se)
                    innerSelectedClass = `${theme.border} ${theme.bg} text-white`;
                  else innerClass += ` ${theme.text}`;
                }

                const buttonClass = clsx(
                  linkBaseClass,
                  !se.type ? initiativeClass : null,
                  innerClass,
                  innerSelectedClass
                );

                return (
                  <button
                    key={se.key}
                    className="block relative w-32 h-16 ml-4 group"
                  >
                    <div
                      className={`absolute w-full h-full border-[1px] ${
                        se.type ? 'border-teal' : theme.border
                      }
                        ${se.type ? 'text-teal' : theme.text}`}
                    ></div>
                    <Link
                      href={`/studios/${item.key}/${se.key}`}
                      className={buttonClass}
                    >
                      {se.type === 'upcoming' && 'Upcoming \n Semester'}
                      {se.type === 'current' && 'Current \n Semester'}
                      {se.type === null && [
                        se.name.split(' ')[0],
                        <br />,
                        se.name.split(' ')[1],
                      ]}
                    </Link>
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {selectedSemester && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`my-20 ${theme.secondaryBg}`}
                >
                  <div className="p-6">
                    <h2 className={`uppercase font-extrabold ${theme.heading}`}>
                      Course Information
                    </h2>

                    <div className="flex flex-col xl:flex-row gap-8 ">
                      <div className="w-full xl:w-1/2">
                        <p>
                          <span className="font-bold tracking-wider">
                            DEPARTMENT(S):
                          </span>
                          <br />
                          {selectedSemester.courseNumber}
                        </p>

                        <p>
                          <span className="font-bold tracking-wider">
                            PROFESSOR
                            {selectedSemester.instructors.length > 1 && (
                              <span>S</span>
                            )}
                            :
                          </span>
                          <br />
                          {semesterInstructors}
                        </p>
                        <p>
                          <span className="font-bold tracking-wider">
                            PARTNER ORGANIZATION
                            {selectedSemester.partners.length > 1 && (
                              <span>S</span>
                            )}
                            :&nbsp;
                          </span>
                          {Partners({ partners: selectedSemester.partners })}
                        </p>
                        <p>
                          <span className="font-bold tracking-wider">
                            LEARNING PARTNER
                            {selectedSemester.learningPartners.length > 1 && (
                              <span>S</span>
                            )}
                            :
                          </span>
                          <br />
                          {selectedSemester.learningPartners
                            .map((i) => i.name)
                            .join(', ')}
                        </p>
                        <p className="my-2">{selectedSemester.description}</p>
                      </div>
                      {selectedSemester.slides &&
                        selectedSemester.slides.slides.length > 0 && (
                          <Slideshow
                            slides={selectedSemester.slides.slides}
                            theme={theme}
                            className={`${theme.bg} bg-opacity-50`}
                          />
                        )}
                    </div>
                  </div>
                  {selectedSemester.impact &&
                    selectedSemester.impact.document.length > 2 && (
                      <div className="hidden lg:block w-full mt-6 p-6">
                        <h2
                          className={`uppercase text-xl lg:text-3xl font-extrabold ${theme.heading}`}
                        >
                          Jump to:
                        </h2>
                        <div className="flex flex-col w-full gap-x-10">
                          <Button
                            label="A Look Inside the Co-Creation Process"
                            anchorId="cocreation"
                            className={`text-sm ${theme.text} ${theme.fill}
                      `}
                          />

                          {selectedSemester.projects &&
                            selectedSemester.projects.length > 0 && (
                              <Button
                                label="Projects"
                                anchorId="projects"
                                className={`text-sm ${theme.text} ${theme.fill}
                      `}
                              />
                            )}
                          {selectedSemester.impact &&
                            selectedSemester.impact.document.length > 0 && (
                              <Button
                                label="Impact Beyond the Studio"
                                anchorId="impact"
                                className={`text-sm ${theme.text} ${theme.fill}
                      `}
                              />
                            )}
                          {selectedSemester.learningPartners &&
                            selectedSemester.learningPartners.length > 0 &&
                            selectedSemester.studioStudents &&
                            selectedSemester.studioStudents.length > 0 && (
                              <Button
                                label="Studio Participants"
                                anchorId="participants"
                                className={`text-sm ${theme.text} ${theme.fill}
                      `}
                              />
                            )}
                        </div>
                      </div>
                    )}

                  {selectedSemester.coCreation &&
                    selectedSemester.coCreation.document.length > 2 && (
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
                    )}

                  {selectedSemester.projects &&
                    selectedSemester.projects.length > 0 && (
                      <>
                        <Divider color={`${theme.bg} bg-opacity-50`} />
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
                        <Divider color={`${theme.bg} bg-opacity-50`} />
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
                  <Divider color={`${theme.bg} bg-opacity-50`} />
                  <div className="p-6" id="participants">
                    <h2 className="font-bold text-5xl my-3">
                      {selectedSemester.name} Studio Participants
                    </h2>
                    {selectedSemester.studioStudents &&
                      selectedSemester.studioStudents.length > 0 && (
                        <PeopleList
                          list={selectedSemester.studioStudents}
                          heading="Students"
                          theme={theme}
                          index={0}
                        />
                      )}
                    {selectedSemester.learningPartners &&
                      selectedSemester.learningPartners.length > 0 && (
                        <PeopleList
                          list={selectedSemester.learningPartners}
                          heading="Learning Partners"
                          index={1}
                          theme={theme}
                        />
                      )}
                    <div className="flex flex-col lg:flex-row gap-x-7">
                      <div className="flex-grow">
                        {selectedSemester.instructors &&
                          selectedSemester.instructors.length > 0 && (
                            <PeopleList
                              list={selectedSemester.instructors}
                              heading="Studio Professors"
                              theme={theme}
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
                              theme={theme}
                              index={3}
                            />
                          )}
                      </div>
                    </div>
                    <h2
                      className={`text-xl font-extrabold uppercase my-3 ${theme.heading}`}
                    >
                      Studio Contact
                    </h2>
                    <p className="w-full">
                      Are you an Emerson student interested in enrolling in this
                      course in the future? Please contact &nbsp;
                      {selectedSemester.contact}&nbsp;to learn more!
                    </p>
                    {selectedSemester.partners &&
                      selectedSemester.partners.length > 0 && (
                        <>
                          <h2
                            className={`text-xl font-extrabold uppercase mb-3 mt-8 ${theme.heading}`}
                          >
                            {selectedSemester.name}&nbsp;
                            {selectedSemester.partners.length > 1
                              ? 'Partners'
                              : 'Partner'}
                          </h2>
                          <div className="px-6">
                            <Logos partners={selectedSemester.partners} />
                          </div>
                        </>
                      )}
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
  const studios = await Query(
    'studios',
    `studios {
      key
      semesters(${DefaultWhereCondition()}) {
        key
      }
    }`
  );
  if (studios.error) {
    return {
      paths: [],
      fallback: true,
    };
  }
  let semesterPaths: string[] = [];

  const paths = (studios as { key: string; semesters: { key: string }[] }[])
    .filter(({ key }) => !!key)
    .map(({ key, semesters }) => {
      semesters.map((semester) => {
        semesterPaths.push(`/studios/${key}/${semester.key}`);
      });
      return `/studios/${key}`;
    });

  return {
    paths: paths.concat(semesterPaths),
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { key: string; semester?: string };
}) {
  const itemResult = await Query(
    'studios',
    `studios(where: { key: { equals: "${params!.key}" } }) {
        name
        key
        blurb
        initiatives
        semesters(${DefaultWhereCondition()}) {
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
                publicUrl
              }
              caption
              captions { 
                url 
              }
              video { 
                file 
              }
              order
            }
          }
          coCreation {
              document(hydrateRelationships: true)
          }
          impact {
              document(hydrateRelationships: true)
          }
          projects(${DefaultWhereCondition()}) {
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
            secondaryTitle
            image {
                publicId
            }
          }
          learningPartners {
            name
            key
            title
            secondaryTitle
            image {
                publicId
            }
          }
          studioStudents {
            name
            key
            title
            secondaryTitle
            image {
                publicId
            }  
          }
          studioStaff {
            name
            key
            title
            secondaryTitle
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
  const item = itemResult[0] as StudioT;
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
  console.log(item.semesters[0].impact.document[0].props);
  return {
    props: {
      item,
      currentSemester: params.semester ? params.semester[0] : null,
    },
    revalidate: 1,
  };
}
