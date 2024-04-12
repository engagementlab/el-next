import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import _ from 'lodash';
import { AnimatePresence } from 'framer-motion';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Query } from '@el-next/components';
import {
  CustomEase,
  DefaultWhereCondition,
  InitiativeFilterGroups,
  Project,
  ResearchProject,
  StudioProject,
  StudioUnion,
  Theme,
} from '@/types';

import Layout from '../../../components/Layout';
import {
  ResearchProjectItemRenderer,
  StudioGenericItemRenderer,
  StudiosGridRenderer,
} from '@/components/Renderers';
import { ClassFilterButton, StudioProjectsSort } from '@/shared';

interface FilterState {
  currentTheme: Theme;
  currentFilters: never[];
  filterGroupOpen: string;
  toggle: (filter: any) => void;
  toggleFilterGroupOpen: (groupKey: string) => void;
  reset: () => void;
}

let preSelectedGroup = '';
let preSelectedFilters: never[] = [];
let preSelectedTheme = Theme.none;
export default function StudioProjects({
  projects,
  initiativeBlurbs,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // Create store with Zustand
  const useStore = create<FilterState>()(
    subscribeWithSelector((set) => ({
      currentTheme: preSelectedTheme || Theme.none,
      // If defined, pre-populate filter store
      currentFilters: preSelectedFilters || [],
      filterGroupOpen: preSelectedGroup || '',
      toggle: (filter: any) =>
        set((state) => {
          return state.currentFilters.includes(filter as never)
            ? {
                ...state,
                currentFilters: state.currentFilters.filter(
                  (e) => e !== filter
                ),
              }
            : {
                ...state,
                currentFilters: [...state.currentFilters, filter as never],
              };
        }),
      toggleFilterGroupOpen: (filterGroupKey: string) => {
        set((state) => {
          const group = filterGroupKey.toLocaleLowerCase();
          let theme = Theme.none;

          if (state.filterGroupOpen !== group) {
            if (group === 'tngv') {
              theme = Theme.gunviolence;
            } else if (group === 'tnej') {
              theme = Theme.climate;
            }
          }
          return {
            ...state,
            currentTheme: theme || Theme.none,
            filterGroupOpen: state.filterGroupOpen === group ? '' : group,
          };
        });
      },

      reset: () =>
        set({
          filterGroupOpen: '',
          currentFilters: [],
          currentTheme: Theme.none,
        }),
    }))
  );

  // Alter URL when groups and filters change
  useStore.subscribe(
    (state) => state.filterGroupOpen,
    (current) => {
      const group = current.toLowerCase();

      history.replaceState(
        {},
        'Filtered Data',
        `${location.pathname}?${group}`
      );
    }
  );
  useStore.subscribe(
    (state) => state.currentFilters,
    (current) => {
      // Preserve the current initiative key in path
      const initiativeKey = location.search.split('/')[0];
      // debugger;
      history.replaceState(
        {},
        'Filtered Data',
        `${location.pathname}${initiativeKey}/${current.join('/')}`
      );
    }
  );
  const toggleFilterGroupOpen = useStore(
    (state) => state.toggleFilterGroupOpen
  );
  useEffect(() => {
    // The preselected group will be in the query, if any
    if (router.asPath.indexOf('?') > 0) {
      let filtersAndGroup = router.asPath.substring(
        router.asPath.indexOf('?'),
        router.asPath.length
      );
      preSelectedGroup = (
        filtersAndGroup.indexOf('/') > 0
          ? filtersAndGroup.substring(0, filtersAndGroup.indexOf('/'))
          : filtersAndGroup
      ).replace('?', '');

      if (preSelectedGroup === 'gunviolence') {
        preSelectedTheme = Theme.gunviolence;
      } else if (preSelectedGroup === 'climate') {
        preSelectedTheme = Theme.climate;
      }

      if (useStore.getState().currentTheme === Theme.none)
        toggleFilterGroupOpen(preSelectedGroup);
    }
    // Call group-specific filters from the router path after the first key symbol
    if (router.asPath.indexOf('?') > 0) {
      const group = router.asPath.split('?')[1];
      let filters = group.split('/');
      if (group && filters.length > 1) {
        filters.shift();

        preSelectedFilters = filters as never[];
      }
    }
  }, []);

  const FilteredItems = (props: { items: StudioProject[] | null }) => {
    // Store get/set
    const { filterGroupOpen } = useStore((state) => state);
    const noGroupsOpen = () => {
      return filterGroupOpen === '';
    };
    const haveGroupOpen = (key: string) => {
      return filterGroupOpen.toLowerCase() === key.toLowerCase();
    };

    return (
      <Layout error={error} title="Studio Projects">
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

          <div className="mx-6 mt-7">
            <h2 className="uppercase leading-10 text-grey text-xl font-bold">
              Filter Projects By:
            </h2>
            <div className="flex flex-col md:flex-row gap-x-5 gap-y-2">
              {InitiativeFilterGroups.map((group) => {
                return (
                  <>
                    <div key={group.key} className="flex flex-row">
                      {/* Hide group selector if other is selected */}
                      <a
                        href={
                          haveGroupOpen(group.key)
                            ? '/studios/projects'
                            : `/initiatives/${group.key}/studios/projects`
                        }
                        className={`inline-block ${
                          !noGroupsOpen() &&
                          !haveGroupOpen(group.key) &&
                          'hidden'
                        }  transition-all ${CustomEase} ${
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
                      </a>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
            <div className="w-full">
              <StudiosGridRenderer>
                <AnimatePresence>
                  {props.items &&
                    props.items.map((item, i: number) => {
                      if ((item as Project).initiative)
                        return (
                          <StudioGenericItemRenderer
                            key={i}
                            index={i}
                            item={item as unknown as StudioUnion}
                            showBorder={true}
                          />
                        );
                      else
                        return (
                          <ResearchProjectItemRenderer
                            item={item as unknown as ResearchProject}
                            showYear={true}
                            showBorder={true}
                          />
                        );
                    })}
                </AnimatePresence>
              </StudiosGridRenderer>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return <FilteredItems items={projects} />;
}

export async function getStaticProps() {
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
  const initiatives = await Query(
    'initiatives',
    `initiatives {
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
        initiativesRelated {
          name
        }
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
      },
    };
  }
  if (initiatives.error) {
    return {
      props: {
        error: initiatives.error,
        projects: null,
        initiativeBlurbs: null,
      },
    };
  }

  const researchProjects: ResearchProject[] = [];
  (initiatives as any[]).forEach((initiative) => {
    return (initiative.research as ResearchProject[]).forEach((project) => {
      researchProjects.push(project);
    });
  });

  return {
    props: {
      projects: StudioProjectsSort([
        ...(studioProjects as Project[]),
        ...(researchProjects as Project[]),
      ]),

      initiativeBlurbs,
    },
    revalidate: 1,
  };
}
