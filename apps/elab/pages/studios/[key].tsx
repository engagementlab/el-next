import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Query, Video } from '@el-next/components';

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

type Studio = {
  name: string;
  blurb: string;
  semesters: {
    key: string;
    name: string;
    type: string;
    courseNumber: string;
    instructors: {
      name: string;
      key: string;
    }[];
    description: string;
    partners: string[];
    coCreation: {
      document: any;
    };
    impact: any;
    projects: {
      name: string;
      key: string;
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
          {/* {router.query[0]?.toString()} */}
          {item.semesters.map((se) => {
            return (
              <a
                href="#"
                onClick={(e) => {
                  toggle(se.key);
                  e.preventDefault();
                }}
                key={se.key}
                // theme={Theme.gunviolence}
              >
                {se.name}
              </a>
            );
          })}
          {currentSemester}
          {currentSemester !== '' && (
            <div className="content-container container w-full mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
              <h2 className="uppercase text-blue">Course Information</h2>
              <p>NUMBER: {item.semesters[0].courseNumber}</p>
              <p>
                INSTRUCTOR:&nbsp;
                {item.semesters[0].instructors.map((i) => i.name).join(', ')}
              </p>
              <p>{item.semesters[0].description}</p>
              <h2 className="uppercase text-blue">
                {item.semesters[0].name} Partners
              </h2>
              {/* <Logos
              partners={item.semesters[0].partners.map(
                (i: string) => i as unknown as Partner
              )}
            /> */}
              <DocumentRenderer
                document={item?.semesters[0].coCreation.document}
                componentBlocks={Blocks()}
                renderers={Doc()}
              />
            </div>
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
        semesters {
            key
            name
            type
            courseNumber
            instructors {
                name
                key
            }
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
