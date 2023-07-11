import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Button, Image, Query, Video } from '@el-next/components';

import _ from 'lodash';
import { create } from 'zustand';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

import Layout from '../../components/Layout';
import { Blocks, Doc } from '../../components/Renderers';
import { CTAButton } from '@/components/Buttons';
import { Partner, Theme } from '@/types';
import { subscribeWithSelector } from 'zustand/middleware';
import { Logos } from '@/components/Logos';
import { useEffect } from 'react';
import Divider from '@/components/Divider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';

type Studio = {
  name: string;
  blurb: string;
  semesters: {
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
  }[];
};
interface SemestersState {
  currentSemester: string;
  toggle: (semester: string) => void;
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
  }))
);

export default function Studio({
  item,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { toggle, currentSemester } = useStore((state) => state);
  const selectedSemester = item?.semesters.find(
    (semester) => semester.key === currentSemester
  );
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
    if (preSelectedSemester !== '' && currentSemester === '')
      toggle(preSelectedSemester);
  });
  return (
    <Layout
      error={error}
      breadcrumbs={[{ label: 'Social Impact Studios', href: '/studios' }]}
    >
      {item && (
        <>
          <h1>{item.name}</h1>
          {item.semesters.map((se) => {
            return (
              <a
                href="#"
                onClick={(e) => {
                  toggle(se.key);
                  e.preventDefault();
                }}
                key={se.key}
              >
                {se.name}
              </a>
            );
          })}
          {selectedSemester && (
            <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex flex-wrap my-4">
                {selectedSemester.learningPartners.map((person) => (
                  <div
                    className="flex flex-col w-1/5 ml-3"
                    key={`thumb-${person.key}`}
                  >
                    <Image
                      id={`thumb-${person.key}`}
                      alt={`Photo of ${person.name}`}
                      imgId={person.image.publicId}
                      width={230}
                      // aspectDefault={true}
                      transforms="f_auto,dpr_auto,c_fit,g_face,r_max,h_230,w_230"
                      className="rounded-full border-4 border-purple"
                    />
                    <p>{person.name}</p>
                    <p>{person.title}</p>
                  </div>
                ))}
              </div>
              <h2 className="uppercase text-blue">Course Information</h2>
              <p>NUMBER: {selectedSemester.courseNumber}</p>
              <p>
                INSTRUCTOR:&nbsp;
                {selectedSemester.instructors.map((i) => i.name).join(', ')}
              </p>
              <p>{selectedSemester.description}</p>
              <h2 className="uppercase text-blue">
                {selectedSemester.name} Partners
              </h2>
              {/* <Logos
              partners={selectedSemester.partners.map(
                (i: string) => i as unknown as Partner
              )}
            /> */}
              <div className="w-3/4 lg:w-full mt-6">
                <p className="text-yellow text-xl lg:text-3xl font-extrabold uppercase">
                  Jump to:
                </p>
                <Button
                  label="A Look Inside the Co-Creation Process"
                  anchorId="cocreation"
                  className="border-purple text-purple fill-purple text-sm"
                />
                <Button
                  label="Impact Beyond the Studio"
                  anchorId="impact"
                  className="border-green-blue text-green-blue fill-green-blue"
                />
                <Button
                  label="Studio Participants"
                  anchorId="impact"
                  className="border-green-blue text-green-blue fill-green-blue"
                />
              </div>
              <div id="cocreation">
                <DocumentRenderer
                  document={selectedSemester.coCreation.document}
                  componentBlocks={Blocks()}
                  renderers={Doc()}
                />
              </div>

              <Divider color="bg-[#E3BFFF]" />

              <div id="impact">
                <DocumentRenderer
                  document={selectedSemester.impact.document}
                  componentBlocks={Blocks()}
                  renderers={Doc()}
                />
              </div>

              <div className="grid lg:ml-5 lg:grid-cols-2 xl:grid-cols-3 lg:gap-2 xl:gap-3">
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

              <Divider color="bg-[#E3BFFF]" />
            </motion.div>
          )}
        </>
      )}
    </Layout>
  );
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
                thumbailAltText
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
