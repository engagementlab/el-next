'use client';
import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { AnimatePresence } from 'framer-motion';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Query } from '@el-next/components';
import {
  CustomEase,
  DefaultWhereCondition,
  InitiativeFilterGroups,
  InitiativeKeyMap,
  Project,
  ResearchProject,
  StudioProject,
  StudioUnion,
  Theme,
  Theming,
} from '@/types';

import Layout from '../../../../../components/Layout';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import {
  ResearchProjectItemRenderer,
  StudioGenericItemRenderer,
  StudiosGridRenderer,
} from '@/components/Renderers';
import { ClassFilterButton, ProjectsSort } from '@/shared';

export default function StudioProjects({
  filtersData,

  initiative,
  projects,
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

  const FilteredItems = (props: { items: Project[] | null }) => {
    const haveGroupOpen = (key: string) => {
      return key === initiative;
    };

    const haveSpecificFilter = (key: string) => {
      return filtersQuery
        ? filtersQuery.split(',').includes(key as never)
        : false;
    };

    const RenderFilters = () => {
      const menu = (
        <div className="mx-6 mt-7">
          <h2 className="uppercase leading-10 text-grey text-xl font-bold">
            Filter Projects By:
          </h2>
          <div className="flex flex-col md:flex-row gap-x-5 gap-y-2">
            {InitiativeFilterGroups.map((group) => {
              return (
                <div key={group.key} className="flex flex-row">
                  {/* Hide group selector if other is selected */}
                  <Link
                    href={
                      haveGroupOpen(group.key)
                        ? '/studios/projects'
                        : `/initiatives/${group.key}/studios/projects`
                    }
                    className={`inline-block transition-all ${CustomEase} ${
                      !haveGroupOpen(group.key) ? 'hover:scale-105' : ''
                    }`}
                  >
                    <div
                      className={ClassFilterButton(
                        haveGroupOpen(group.key),
                        group.key
                      )}
                    >
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
                  } rounded-large px-3 py-2 leading-none ${
                    !haveSpecificFilter(filter.key)
                      ? `${Theming[initiative].text} transition-all ${CustomEase} hover:scale-105`
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

    const filteredProjects = projects
      ? projects.filter((item) => {
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
          {RenderFilters()}
          <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
            <div className="w-full">
              {filteredProjects?.length === 0 && (
                <p className="w-full text-xl my-20 text-center">
                  Sorry, no matches found. Please try other filters.
                </p>
              )}
              {filteredProjects && filteredProjects?.length > 0 && (
                <StudiosGridRenderer>
                  <AnimatePresence>
                    {filteredProjects.map((item, i: number) => {
                      if ((item as Project).initiative)
                        return (
                          <StudioGenericItemRenderer
                            key={i}
                            index={i}
                            item={item as unknown as StudioUnion}
                            showBorder={false}
                          />
                        );
                      else
                        return (
                          <ResearchProjectItemRenderer
                            item={item as unknown as ResearchProject}
                            showYear={true}
                            showBorder={false}
                          />
                        );
                    })}
                  </AnimatePresence>
                </StudiosGridRenderer>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return <FilteredItems items={projects} />;
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
  let objectName = 'Gun Violence';
  if (params.initiative === 'tnej') objectName = 'Environmental Justice';

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
        projects: null,
        filtersData: null,
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

  const initiativeResearch = await Query(
    'initiative',
    `initiative(where: { name: "${objectName}" }) {
      research {
        name
        key
        pin
        ongoing
        startYear
        endYear
        shortDescription 
        thumbnail { 
          publicId
        }
        thumbAltText
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
        projects: null,
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

  const researchProjects: ResearchProject[] =
    initiativeResearch.research as ResearchProject[];
  // .forEach((project) => {
  //     researchProjects.push(project);
  //   });
  return {
    props: {
      filtersData,
      projects: ProjectsSort([
        ...(items as Project[]),
        ...(researchProjects as Project[]),
      ]),
      initiativeBlurbs,
      initiative: params.initiative,
    },
    revalidate: 1,
  };
}
