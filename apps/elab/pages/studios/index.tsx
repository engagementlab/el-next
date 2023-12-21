import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { AnimatePresence, motion } from 'framer-motion';

import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Image, Query } from '@el-next/components';
import ImagePlaceholder from '@/components/ImagePlaceholder';
import {
  CustomEase,
  InitiativeFilterGroups,
  Studio,
  StudioUnion,
  Theme,
  Theming,
} from '@/types';

import Layout from '../../components/Layout';
import { StudioGenericItemRenderer } from '@/components/Renderers';

interface FilterState {
  currentTheme: Theme;
  selectedFilter: string;
  toggle: (filter: any) => void;
  reset: () => void;
}

let preSelectedFilter = '';
let preSelectedTheme = Theme.none;
export default function Studios({
  studios,
  initiativeBlurbs,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  // Create store with Zustand
  const useStore = create<FilterState>()(
    subscribeWithSelector((set) => ({
      currentTheme: preSelectedTheme || Theme.none,
      // If defined, pre-populate filter store
      selectedFilter: preSelectedFilter || '',
      toggle: (filter: string) => {
        set((state) => {
          const group = filter.toLocaleLowerCase();
          let theme = Theme.none;
          // debugger;

          if (state.selectedFilter !== group) {
            if (group === 'tngv') {
              theme = Theme.gunviolence;
            } else if (group === 'tnej') {
              theme = Theme.climate;
            }
          }
          return {
            ...state,
            currentTheme: theme || Theme.none,
            selectedFilter: state.selectedFilter === group ? '' : group,
          };
        });
      },

      reset: () =>
        set({
          selectedFilter: '',
          currentTheme: Theme.none,
        }),
    }))
  );

  // Alter URL when filters change
  useStore.subscribe(
    (state) => state.selectedFilter,
    (current) => {
      history.replaceState({}, 'Filtered Data', `/studios?${current}`);
    }
  );
  const toggle = useStore((state) => state.toggle);
  useEffect(() => {
    // The preselected group will be in the query, if any
    if (router.asPath.indexOf('?') > 0) {
      let filter = router.asPath.substring(
        router.asPath.indexOf('?'),
        router.asPath.length
      );
      preSelectedFilter = filter.replace('?', '');

      if (preSelectedFilter === 'tngv') {
        preSelectedTheme = Theme.gunviolence;
      } else if (preSelectedFilter === 'tnej') {
        preSelectedTheme = Theme.climate;
      }

      if (useStore.getState().currentTheme === Theme.none)
        toggle(preSelectedFilter);
    }
  }, []);

  const FilteredItems = (props: { items: Studio[] | null }) => {
    // Store get/set
    const { currentTheme, selectedFilter, toggle } = useStore((state) => state);

    const noGroupsOpen = () => {
      return selectedFilter === '';
    };
    // const haveFilters = currentFilters.length > 0;

    const haveSpecificFilter = (key: string) => {
      return selectedFilter === key;
    };
    const haveGroupOpen = (key: string) => {
      return selectedFilter.toLowerCase() === key.toLowerCase();
    };

    const RenderFilters = () => {
      const menu = (
        <div className="mx-6 mt-7">
          <h2 className="uppercase leading-10 text-grey text-xl font-bold">
            Filter By:
          </h2>
          <div className="flex flex-col lg:flex-row gap-x-5 gap-y-2">
            {InitiativeFilterGroups.map((group) => {
              const groupButtonStyle = `flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1 ${
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
                          ? '/studios'
                          : `/initiatives/${group.key}/studios`
                      }
                      className={`inline-block ${
                        !noGroupsOpen() && !haveGroupOpen(group.key) && 'hidden'
                      } `}
                      // onClick={(e) => {
                      //   toggle(group.key);
                      //   e.preventDefault();
                      // }}
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
        </div>
      );

      return <div>{menu}</div>;
    };

    const filteredItems = props.items
      ? props.items.filter((item) => {
          // If selected groups empty, show all...

          let group = '';
          if (item.initiatives && item.initiatives.length > 0)
            group =
              item.initiatives[0].toLowerCase() === 'gunviolence'
                ? 'tngv'
                : 'tnej';

          return (
            selectedFilter === '' ||
            // ...otherwise, item's filters must match group and ALL selected sub-filters

            (item.initiatives &&
              item.initiatives.length > 0 &&
              group === selectedFilter)
          );
        })
      : [];

    const count = filteredItems.length;
    // Decide plural of item count
    const showing = `Showing ${count}`;

    return (
      <Layout
        error={error}
        theme={currentTheme}
        title="Studios"
        ogDescription="Learn about our current undergraduate studios."
      >
        <div className="flex flex-col">
          <h1 className="mx-6 font-bold text-4xl xl:text-6xl text-slate">
            Studios
          </h1>
          {/* <div className="mx-6 my-8 xl:my-4 uppercase font-semibold opacity-60">
            {showing}
          </div> */}
          {initiativeBlurbs.studiosBlurb && (
            <div className="mx-6 w-full lg:w-1/2">
              <DocumentRenderer
                document={initiativeBlurbs.studiosBlurb.document}
              />
            </div>
          )}
          {RenderFilters()}

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

  return <FilteredItems items={studios} />;
}

export async function getStaticProps() {
  const studios = await Query(
    'studios',
    `studios(
			where: {
				enabled: {
					equals: true
				}
			},
			orderBy: {
				createdDate: desc
			}		
		) {
			name
			key
      initiatives
			shortDescription 
			thumbnail { 
				publicId
			}
      thumbAltText
		}`
  );
  const initiativeBlurbs = await Query(
    'initiativesLanding',
    `initiativesLanding(where: { name: "Initiatives Landing Page" }) {
        studiosBlurb {
          document
        }
      }`
  );

  if (studios.error) {
    return {
      props: {
        error: studios.error,
        studios: null,
        initiativeBlurbs: null,
      },
    };
  }

  return {
    props: {
      studios: studios as Studio[],
      initiativeBlurbs: initiativeBlurbs,
    },
    revalidate: 1,
  };
}
