import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import _ from 'lodash';
import { AnimatePresence } from 'framer-motion';

import { DocumentRenderer } from '@keystone-6/document-renderer';
import { Image, Query } from '@el-next/components';
import {
  DefaultWhereCondition,
  InitiativeFilterGroups,
  StudioProject,
  StudioUnion,
  Theme,
  Theming,
} from '@/types';

import Layout from '../../../components/Layout';
import { StudioGenericItemRenderer } from '@/components/Renderers';
import { StudioProjectsSort } from '@/shared';

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
  filters,
  studioProjects,
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
    const { currentFilters, currentTheme, filterGroupOpen } = useStore(
      (state) => state
    );

    const noGroupsOpen = () => {
      return filterGroupOpen === '';
    };
    // const haveFilters = currentFilters.length > 0;

    const haveSpecificFilter = (key: string) => {
      return _.values(currentFilters).includes(key as never);
    };
    const haveGroupOpen = (key: string) => {
      return filterGroupOpen.toLowerCase() === key.toLowerCase();
    };
    const toggleFilter = useStore((state) => state.toggle);
    const reset = useStore((state) => state.reset);

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
                        !noGroupsOpen() && !haveGroupOpen(group.key) && 'hidden'
                      } `}
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
                    </a>
                  </div>
                </>
              );
            })}
          </div>

          {!noGroupsOpen() && (
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
                  {filters.map((filter) => {
                    const filterButtonStyle = `font-bold text-center border-2 border-${
                      Theming[filterGroupOpen].bg
                    } rounded-large px-3 py-1 ${
                      !haveSpecificFilter(filter.key)
                        ? `${Theming[filterGroupOpen].text}`
                        : `text-white ${Theming[filterGroupOpen].bg}`
                    } `;
                    return (
                      <a
                        href="#"
                        onClick={(e) => {
                          toggleFilter(filter.key);
                          e.preventDefault();
                        }}
                        key={filter.key}
                        className={filterButtonStyle}
                      >
                        {filter.name}
                      </a>
                    );
                  })}
                </div>
              </div>
              <button
                className="text-grey text-base uppercase leading-6 opacity-70 mt-4"
                onClick={(e) => {
                  reset();
                  e.preventDefault();
                }}
              >
                CLEAR ALL FILTERS
              </button>
            </>
          )}
        </div>
      );

      return <div>{menu}</div>;
    };

    let selectedFilters = useStore((state) => state.currentFilters);
    const filteredItems = props.items
      ? props.items.filter((item) => {
          // If selected groups empty, show all...
          const group =
            item.initiative.toLowerCase() === 'gunviolence' ? 'tngv' : 'tnej';
          return (
            filterGroupOpen === '' ||
            // ...otherwise, item's filters must match group and ALL selected sub-filters
            (group === filterGroupOpen.toLowerCase() &&
              _.every(
                selectedFilters,
                (r) => _.map(item.filters, 'key').indexOf(r) >= 0
              ))
          );
        })
      : [];

    const count = filteredItems.length;

    return (
      <Layout error={error} theme={currentTheme} title="Studio Projects">
        <div className="flex flex-col">
          <h1 className="mx-6 font-bold text-4xl xl:text-6xl text-slate">
            Studio Projects
          </h1>
          {/* <div className="mx-6 my-8 xl:my-4 uppercase font-semibold opacity-60">
            {showing}
          </div> */}
          {initiativeBlurbs.projectsBlurb && (
            <div className="mx-6 w-full lg:w-1/2">
              <DocumentRenderer
                document={initiativeBlurbs.projectsBlurb.document}
              />
            </div>
          )}
          {RenderFilters(filters)}
          <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
            <div className="w-full">
              {count === 0 && (
                <p className="w-full text-xl my-20 text-center">
                  Sorry, no matches found. Please try other filters.
                </p>
              )}
              <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-3 lg:grid-cols-2 lg:gap-2 lg:my-11">
                {count > 0 && (
                  <AnimatePresence>
                    {filteredItems.map((item, i: number) => (
                      <StudioGenericItemRenderer
                        key={i}
                        index={i}
                        item={item as StudioUnion}
                        showBorder={noGroupsOpen()}
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

export async function getStaticProps() {
  const filters = await Query(
    'filters',
    `filters {
            key
            name
        }`
  );

  if (filters.error) {
    return {
      props: {
        error: filters.error,
        studioProjects: null,
        filters: null,
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
        filters: null,
      },
    };
  }
  return {
    props: {
      filters,
      studioProjects: StudioProjectsSort(studioProjects as StudioProject[]),
      initiativeBlurbs,
    },
    revalidate: 1,
  };
}
