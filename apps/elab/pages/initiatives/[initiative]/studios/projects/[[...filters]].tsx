'use client';
import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Image, Query } from '@el-next/components';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {
  CustomEase,
  DefaultWhereCondition,
  InitiativeFilterGroups,
  InitiativeKeyMap,
  StudioProject,
  StudioUnion,
  Theme,
  Theming,
} from '@/types';

import Layout from '../../../../../components/Layout';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { StudioGenericItemRenderer } from '@/components/Renderers';
import { StudioProjectsSort } from '@/shared';

export default function StudioProjects({
  filtersData,
  filters,
  initiative,
  studioProjects,
  initiativeBlurbs,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filtersQuery = searchParams.getAll('q')[0];
  const createQueryString = useCallback(
    (value: string) => {
      const existing =
        new URLSearchParams(document.location.search).get('q')?.split(',') ||
        [];
      let newValue: string[] = [];

      existing?.forEach((v) => {
        if (v != value) newValue.push(v);
      });
      if (!existing.includes(value)) newValue.push(value);

      if (newValue.length > 0 && newValue[0].length === 0) newValue.shift();
      return newValue.join(',');
    },
    [searchParams]
  );

  const FilteredItems = (props: { items: StudioProject[] | null }) => {
    const haveGroupOpen = (key: string) => {
      return key === initiative;
    };

    const haveSpecificFilter = (key: string) => {
      return filtersQuery
        ? filtersQuery.split(',').includes(key as never)
        : false;
    };

    const ItemRenderer = (props: { item: StudioProject }) => {
      let borderColor = 'border-yellow';
      if (props.item.initiative) {
        if (props.item.initiative === 'gunviolence')
          borderColor = 'border-purple';
        else if (props.item.initiative === 'climate')
          borderColor = 'border-leaf';
      }
      return (
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
          key={`project-${props.item.key}`}
        >
          <Link
            href={`/studios/projects/${props.item.key}`}
            className="group relative"
          >
            <div>
              {props.item.thumbnail ? (
                <Image
                  id={`thumb-${props.item.key}`}
                  alt={props.item.thumbAltText}
                  transforms="f_auto,dpr_auto,c_fill,g_face,h_290,w_460"
                  imgId={props.item.thumbnail.publicId}
                  width={460}
                  maxWidthDisable={true}
                  className="w-full"
                />
              ) : (
                <ImagePlaceholder
                  imageLabel="Studio Project"
                  width={335}
                  height={200}
                />
              )}
            </div>

            <h3 className="text-bluegreen text-xl font-semibold mt-4 hover:text-green-blue group-hover:text-green-blue">
              {props.item.name}
            </h3>
            <p>{props.item.shortDescription}</p>
          </Link>
        </motion.div>
      );
    };
    const RenderFilters = (filters: any[]) => {
      const menu = (
        <div className="mx-6 mt-7">
          <h2 className="uppercase leading-10 text-grey text-xl font-bold">
            Filter Projects By:
          </h2>
          <div className="flex flex-col md:flex-row gap-x-5 gap-y-2">
            {InitiativeFilterGroups.map((group) => {
              const groupButtonStyle = `flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1  ${
                !haveGroupOpen(group.key)
                  ? `bg-white ${Theming[group.key].text}`
                  : `text-white ${Theming[group.key].bg}`
              }
 `;
              return (
                <div key={group.key} className="flex flex-row">
                  {/* Hide group selector if other is selected */}
                  <Link
                    href={
                      haveGroupOpen(group.key)
                        ? '/studios/projects'
                        : `/initiatives/${group.key}/studios/projects`
                    }
                    className={`inline-block`}
                  >
                    <div className={groupButtonStyle}>
                      <span>{group.label}</span>
                      <svg
                        viewBox="185.411 115.41 11 11"
                        width="11"
                        height="11"
                        className={`flex-shrink-0 ml-3 ${
                          !haveGroupOpen(group.key) ? 'hidden' : 'block'
                        }`}
                      >
                        <path
                          d="M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z"
                          className="fill-white"
                        ></path>
                      </svg>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <>
            <div className="flex mt-2 ml-3 lg:ml-5 flex-grow">
              <svg
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                className="inline"
              >
                <path d="m566-120-43-43 162-162H200v-475h60v415h426L524-547l43-43 233 233-234 237Z" />
              </svg>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:flex flex-row items-center justify-start gap-x-1 transition-all">
                {filtersData.map((filter: { key: string; name: string }) => {
                  const filterButtonStyle = `font-bold text-center border-2 border-${
                    Theming[initiative].bg
                  } rounded-large px-3 py-1 ${
                    !haveSpecificFilter(filter.key)
                      ? `${Theming[initiative].text}`
                      : `text-white ${Theming[initiative].bg}`
                  } `;
                  return (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(
                          `/initiatives/${initiative}/studios/projects?q=${createQueryString(
                            filter.key
                          )}`,
                          undefined,
                          { shallow: true }
                        );
                      }}
                      key={`filter-${filter.key}`}
                      className={filterButtonStyle}
                    >
                      {filter.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        </div>
      );

      return <div>{menu}</div>;
    };

    const filteredProjects = studioProjects
      ? studioProjects.filter((item) => {
          return !filtersQuery
            ? true
            : _.some(
                filtersQuery.split(','),
                (r) => _.map(item.filters, 'key').indexOf(r) >= 0
              );
        })
      : [];

    return (
      <Layout
        error={error}
        theme={Theming[initiative].theme}
        title={`Studio Projects - ${
          InitiativeFilterGroups.find((i) => i.key === initiative)?.label
        }`}
      >
        <div className="flex flex-col">
          <h1 className="mx-6 font-bold text-4xl xl:text-6xl text-slate">
            Studio Projects
          </h1>
          {initiativeBlurbs.projectsBlurb && (
            <div className="mx-6 w-full lg:w-1/2">
              <DocumentRenderer
                document={initiativeBlurbs.projectsBlurb.document}
              />
            </div>
          )}
          {RenderFilters(filtersData)}
          <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
            <div className="w-full">
              {filteredProjects?.length === 0 && (
                <p className="w-full text-xl my-20 text-center">
                  Sorry, no matches found. Please try other filters.
                </p>
              )}
              <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-3 lg:grid-cols-2 lg:gap-2 lg:my-11">
                {filteredProjects && filteredProjects?.length > 0 && (
                  <AnimatePresence>
                    {filteredProjects.map((item, i: number) => (
                      <StudioGenericItemRenderer
                        key={i}
                        item={item as StudioUnion}
                        showBorder={false}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return <FilteredItems items={studioProjects} />;
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: [
      '/initiatives/tngv/studios/projects',
      '/initiatives/tnej/studios/projects',
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { initiative: string; filters?: string[] };
}) {
  const filtersData = await Query(
    'filters',
    `filters {
        key
        name
      }`
  );

  if (filtersData.error) {
    return {
      props: {
        error: filtersData.error,
        studioProjects: null,
        filtersData: null,
        filters: null,
        initiative: 'tngv',
      },
    };
  }

  const studioProjects = await Query(
    'studioProjects',
    `studioProjects(
			${DefaultWhereCondition()},
			orderBy: {
				name: asc
			}		
		) {
			name
			key
      filters {
        key
      }
      semester {
        key
        name
      }
			shortDescription 
			initiative
			thumbnail { 
				publicId
			}
		}`
  );

  const initiativeBlurbs = await Query(
    'initiativesLanding',
    `initiativesLanding(where: { name: "Miscellaneous Blurbs" }) {
        projectsBlurb {
          document
        }
      }`
  );
  if (studioProjects.error) {
    return {
      props: {
        error: studioProjects.error,
        studioProjects: null,
        initiativeBlurbs: null,
        filtersData: null,
        initiative: params.initiative,
      },
    };
  }

  const items = (studioProjects as StudioProject[]).filter(
    (item: StudioProject) =>
      item.initiative === InitiativeKeyMap[params.initiative]
  );
  return {
    props: {
      filtersData,
      studioProjects: StudioProjectsSort(items),
      initiativeBlurbs,
      initiative: params.initiative,
      filters: params.filters ? params.filters : null,
    },
    revalidate: 1,
  };
}
