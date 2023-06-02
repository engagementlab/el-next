import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { create, Mutate, StoreApi } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import _ from 'lodash';
import { AnimatePresence, motion } from 'framer-motion';

import { Image, Filtering, Query } from '@el-next/components';

import Layout from '../../components/Layout';
// import ImagePlaceholder from '../../components/';

interface ItemRendererProps<T> {
  item: T;
  toggleFilter: (filter: string) => void;
}
interface FilterState {
  currentFilters: never[];
  filtersNavOpen: boolean;
  filterGroupsClosed: never[];
  toggle: (filter: any) => void;
  toggleFilterGroupClosed: (filterKey: string) => void;
  toggleFiltersOpen: (open: boolean) => void;
  reset: () => void;
}

type MediaItem = {
  title: string;
  key: string;
  shortDescription: string;
  filters: { key: string; name: string }[];
  thumbnail: {
    publicId: string;
  };
};

const ItemRenderer = (props: {
  item: MediaItem;
  toggleFilter: (filter: string) => void;
}) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <Link href={`/archive/${props.item.key}`} passHref className="group">
        {/* {props.item.thumbnail ? (
            <Image
              id={`thumb-${props.item.key}`}
              alt={`Thumbnail for media with name "${props.item.title}"
                            `}
              imgId={props.item.thumbnail.publicId}
              maxWidth={800}
              className="w-full"
            />
          ) : (
            // <ImagePlaceholder imageLabel="Media" width={335} height={200} />
          )} */}
        <h3 className="text-bluegreen text-xl font-semibold mt-4 hover:text-green-blue group-hover:text-green-blue">
          ITEM
        </h3>
      </Link>
      <div className="mt-2 mb-20">
        <p className="m-0">{props.item.shortDescription}</p>
      </div>
    </motion.div>
  );
};

export default function MediaArchive({
  filtersGrouped,
  mediaItems,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const preSelectedFilters =
    Object.keys(router.query).length === 1
      ? (Object.keys(router.query)[0].split('/') as never[])
      : [];
  // Create store with Zustand
  const useStore = create<FilterState>()(
    // Mutate<StoreApi<FilterState>, [['zustand/subscribeWithSelector', never]]>
    subscribeWithSelector((set) => ({
      // If defined, pre-populate filter store
      currentFilters: preSelectedFilters || [],
      filtersNavOpen: false as boolean,
      filterGroupsClosed: [] as never[],
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
      toggleFilterGroupClosed: (filterGroupKey: string) =>
        set((state) => {
          return state.filterGroupsClosed.includes(filterGroupKey as never)
            ? {
                ...state,
                filterGroupsClosed: state.filterGroupsClosed.filter(
                  (e) => e !== (filterGroupKey as never)
                ),
              }
            : {
                ...state,
                filterGroupsClosed: [
                  ...state.filterGroupsClosed,
                  filterGroupKey as never,
                ],
              };
        }),
      toggleFiltersOpen: (open: boolean) =>
        set((state) => {
          document.body.style.overflow = open ? 'hidden' : 'visible';
          if (open) window.scrollTo(0, 0);
          return {
            ...state,
            filtersNavOpen: open,
          };
        }),
      reset: () =>
        set({
          currentFilters: [],
        }),
    }))
  );
  useStore.subscribe(
    (state) => state.currentFilters,
    (current) => {
      history.replaceState(
        {},
        'Filtered Data',
        `${location.pathname}?${current.join('/')}`
      );
    }
  );

  const RenderFilters = (filters: { [x: string]: any[] }) => {
    // Store get/set
    const selectedFilters = useStore((state) => state.currentFilters);
    const filtersOpen = useStore((state) => state.filtersNavOpen);
    const filterGroupsClosed = useStore((state) => state.filterGroupsClosed);
    const haveFilters = selectedFilters.length > 0;

    const haveSpecificFilter = (key: string) => {
      return _.values(selectedFilters).includes(key as never);
    };
    const haveGroupClosed = (key: string) => {
      return filterGroupsClosed.includes(key as never);
    };
    const toggleFilter = useStore((state) => state.toggle);
    const toggleFilterGroupOpen = useStore(
      (state) => state.toggleFilterGroupClosed
    );
    const toggleFiltersOpen = useStore((state) => state.toggleFiltersOpen);
    const reset = useStore((state) => state.reset);

    const menu = (
      <div>
        {Object.keys(filters).map((key) => (
          <div key={key}>
            <a
              href="#"
              className="text-xl xl:text-base"
              onClick={(e) => {
                toggleFilterGroupOpen(key);
                e.preventDefault();
              }}
            >
              <div className="mt-4 flex items-center flex-shrink-0 flex-grow-0 uppercase">
                <svg
                  height="10.0"
                  width="14"
                  className={`inline transition-transform ${
                    haveGroupClosed(key) ? 'rotate-180' : ''
                  }`}
                >
                  <polygon
                    points="0,0 14,0 7.0,9.0"
                    style={{ fill: '#8D33D2' }}
                  ></polygon>
                </svg>
                <span className="ml-2 text-coated text-lg xl:text-sm font-semibold">
                  {key}
                </span>
              </div>
            </a>
            <ul
              className={`relative overflow-hidden transition-all ${
                haveGroupClosed(key) ? 'max-h-0' : 'max-h-auto'
              }`}
            >
              {filters[key].map((filter) => {
                return (
                  <li
                    key={filter.key}
                    className={`text-lg xl:text-sm font-semibold my-8 xl:my-4
                                                    ${
                                                      !haveSpecificFilter(
                                                        filter.key
                                                      )
                                                        ? 'text-bluegreen'
                                                        : 'text-purple'
                                                    }`}
                  >
                    <a
                      href="#"
                      onClick={(e) => {
                        toggleFilter(filter.key);
                        e.preventDefault();
                      }}
                      className="w-full flex items-center justify-between"
                    >
                      <span
                      // className={
                      //   !haveSpecificFilter(filter.key) ? linkClass : ''
                      // }
                      >
                        {filter.name}
                      </span>
                      <svg
                        viewBox="185.411 115.41 11 11"
                        width="11"
                        height="11"
                        className="flex-shrink-0 mx-6"
                        style={{
                          visibility: !haveSpecificFilter(filter.key)
                            ? 'hidden'
                            : 'visible',
                        }}
                      >
                        <path
                          d="M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z"
                          className="fill-purple"
                        ></path>
                      </svg>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    );

    return (
      <div>
        {/* Tablet portrait+ */}
        <div className="hidden lg:block">
          <div className="mr-4 flex justify-between">
            <span>Filters</span>
            <a
              href="#"
              className="text-bluegreen"
              onClick={(e) => {
                reset();
                e.preventDefault();
              }}
              style={{ visibility: !haveFilters ? 'hidden' : 'visible' }}
            >
              Clear
            </a>
          </div>
          {menu}
        </div>
        {/* Mobile/tablet */}
        <div
          className={`lg:hidden block w-full absolute overflow-y-scroll top-0 left-0 h-full z-50 p-10 pt-20 bg-lynx
                        transition-all ease-[cubic-bezier(0.075, 0.820, 0.165, 1.000)] duration-300 ${
                          filtersOpen ? '' : '-translate-y-full'
                        }`}
        >
          <a
            className="uppercase w-full flex justify-end cursor-pointer text-bluegreen"
            onClick={(e) => {
              toggleFiltersOpen(false);
              e.preventDefault();
            }}
          >
            <svg
              viewBox="185.411 115.41 11 11"
              width="11"
              height="11"
              className="flex-shrink-0 my-1.5 mx-3"
            >
              <path
                d="M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z"
                className="fill-bluegreen"
              ></path>
            </svg>
            Close Filters
          </a>
          {menu}
          <button
            className="my-4 w-full rounded-full px-8 py-5 uppercase bg-purple text-white transition-all hover:opacity-75"
            onClick={(e) => {
              toggleFiltersOpen(false);
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  };
  const FilteredItems = (props: { items: MediaItem[] | null }) => {
    let selectedFilters = useStore((state) => state.currentFilters);

    const haveFilters = selectedFilters.length > 0;
    const reset = useStore((state) => state.reset);
    const toggleFilter = useStore((state) => state.toggle);
    const toggleFiltersOpen = useStore((state) => state.toggleFiltersOpen);

    const filteredItems = props.items
      ? props.items.filter(
          // If selected filters empty, show all...
          (item) =>
            selectedFilters.length === 0 ||
            // ...otherwise, item's filters must match ALL selected filters
            _.every(
              selectedFilters,
              (r) => _.map(item.filters, 'key').indexOf(r) >= 0
            )
        )
      : [];

    const count = filteredItems.length;
    // Decide plural of item count
    const showing = `Showing ${count}`;

    return (
      <div className="flex">
        <div className="w-0 lg:w-1/5 flex-shrink-0 lg:border-r border-sorbet">
          {RenderFilters(filtersGrouped)}
        </div>

        <div className="w-full">
          {/* Mobile Filters/Clear button */}
          <div className="lg:hidden inline-block w-full">
            <button
              className="rounded-full my-4 px-8 py-5 w-full uppercase bg-purple text-white transition-all hover:opacity-75"
              onClick={(e) => {
                toggleFiltersOpen(true);
                e.preventDefault();
              }}
            >
              Open Filters
            </button>
            <a
              href="#"
              className="py-2 text-bluegreen mt-2 mb-4 text-right text-lg font-semibold"
              onClick={(e) => {
                reset();
                e.preventDefault();
              }}
              style={{ display: !haveFilters ? 'none' : 'block' }}
            >
              <svg
                viewBox="185.411 115.41 11 11"
                width="11"
                height="11"
                className="my-1.5 mx-3 inline-block"
              >
                <path
                  d="M 195.198 115.41 L 190.911 119.695 L 186.624 115.41 L 185.411 116.623 L 189.696 120.91 L 185.411 125.197 L 186.624 126.41 L 190.911 122.125 L 195.198 126.41 L 196.411 125.197 L 192.126 120.91 L 196.411 116.623 Z"
                  className="fill-bluegreen"
                ></path>
              </svg>
              Clear Filters
            </a>
          </div>
          <span className="my-8 xl:my-4 uppercase w-full block text-right text-lg xl:text-sm font-semibold">
            {showing}
          </span>

          <div className="lg:ml-5 grid xl:grid-cols-3 xl:gap-3 lg:grid-cols-2 lg:gap-2">
            {count === 0 ? (
              <p className="w-full text-xl my-20 text-center">
                Sorry, no matches found. Please try other filters.
              </p>
            ) : (
              <AnimatePresence>
                {filteredItems.map((item, i: number) => (
                  <ItemRenderer
                    key={i}
                    item={item}
                    toggleFilter={toggleFilter}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Layout error={error}>
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        <h2 className="text-2xl text-bluegreen font-semibold mb-8">
          Media Archive
        </h2>

        <FilteredItems items={mediaItems} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const filters = await Query(
    'filters',
    `filters { 
            key
            name
            initiative
        }`
  );

  if (filters.error) {
    return {
      props: {
        error: filters.error,
        mediaItems: null,
        filtersGrouped: null,
      },
    };
  }

  // Group filters by initiative
  const filtersGrouped = (filters as any[]).reduce(
    (filterMemo, { initiative, key, name }) => {
      (filterMemo[initiative] = filterMemo[initiative] || []).push({
        key,
        name,
      });
      return filterMemo;
    },
    {}
  );

  const mediaItems = await Query(
    'mediaItems',
    `mediaItems(
			where: {
				enabled: {
					equals: true
				}
			},
			orderBy: {
				createdDate: desc
			}		
		) {
			title
			key
			shortDescription 
			filters {
				key
				name
			}
			thumbnail { 
				publicId
			}
		}`
  );

  if (mediaItems.error) {
    return {
      props: {
        error: mediaItems.error,
        mediaItems: null,
        filtersGrouped: null,
      },
    };
  }

  return {
    props: {
      filtersGrouped,
      mediaItems: mediaItems as MediaItem[],
    },
  };
}
