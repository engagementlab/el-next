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
  // filtersNavOpen: boolean;
  filterGroupOpen: string;
  toggle: (filter: any) => void;
  toggleFilterGroupOpen: (groupKey: string) => void;
  reset: () => void;
}

type MediaItem = {
  title: string;
  key: string;
  shortDescription: string;
  filters: { key: string; name: string }[];
  initiative: string;
  thumbnail: {
    publicId: string;
  };
};

const ItemRenderer = (props: { item: MediaItem }) => {
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
          ITEM {props.item.initiative}
        </h3>
      </Link>
      <div className="mt-2 mb-20">
        <p className="m-0">{props.item.shortDescription}</p>
      </div>
    </motion.div>
  );
};

export default function MediaArchive({
  filters,
  mediaItems,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  let preSelectedFilters: never[] = [];
  let preSelectedGroup = '';
  if (Object.keys(router.query).length === 1) {
    const params = Object.keys(router.query)[0].split('/');
    console.log(params);
    preSelectedFilters = params.slice(1) as never[];
    preSelectedGroup = params[0];
  }

  // Create store with Zustand
  const useStore = create<FilterState>()(
    // Mutate<StoreApi<FilterState>, [['zustand/subscribeWithSelector', never]]>
    subscribeWithSelector((set) => ({
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
      toggleFilterGroupOpen: (filterGroupKey: string) =>
        set((state) => {
          return {
            ...state,
            filterGroupOpen:
              state.filterGroupOpen === filterGroupKey ? '' : filterGroupKey,
          };
        }),

      reset: () =>
        set({
          currentFilters: [],
        }),
    }))
  );

  // Alter URL when groups and filters change
  useStore.subscribe(
    (state) => state.filterGroupOpen,
    (current) => {
      history.replaceState(
        {},
        'Filtered Group',
        `${location.pathname}?${current.toLocaleLowerCase()}`
      );
    }
  );
  useStore.subscribe(
    (state) => state.currentFilters,
    (current) => {
      const group = location.search.length > 0 ? location.search : null;
      history.replaceState(
        {},
        'Filtered Data',
        `${location.pathname}${group}/${current.join('/')}`
      );
    }
  );

  const RenderFilters = (filters: any[]) => {
    // Store get/set
    const { currentFilters, filterGroupOpen, toggleFilterGroupOpen } = useStore(
      (state) => state
    );
    const haveFilters = currentFilters.length > 0;

    const haveSpecificFilter = (key: string) => {
      return _.values(currentFilters).includes(key as never);
    };
    const noGroupsOpen = () => {
      return filterGroupOpen === '';
    };
    const haveGroupOpen = (key: string) => {
      return filterGroupOpen.toLowerCase() === key.toLowerCase();
    };
    const toggleFilter = useStore((state) => state.toggle);
    const reset = useStore((state) => state.reset);

    const filterGroups = [
      {
        key: 'GunViolence',
        label: 'Transforming Narratives of Gun Violence',
        color: 'purple',
      },
      {
        key: 'Climate',
        label: 'Transforming Narratives for Climate Justice',
        color: 'green-blue',
      },
    ];

    const menu = (
      <div className="flex flex-col lg:flex-row w-full xl:w-3/4">
        {filterGroups.map((group) => {
          const groupButtonStyle = `flex items-center transition-all text-sm font-bold border-2 border-${
            group.color
          } rounded-full px-3 py-1 ${
            !haveGroupOpen(group.key)
              ? `text-${group.color}`
              : `text-white bg-${group.color}`
          } `;
          return (
            <div key={group.key} className="my-3 xl:my-0 md:mx-3">
              {/* Hide group selector if other is selected */}
              <a
                href="#"
                className={` ${
                  !noGroupsOpen() && !haveGroupOpen(group.key) && 'hidden'
                } `}
                onClick={(e) => {
                  toggleFilterGroupOpen(group.key);
                  e.preventDefault();
                }}
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
              <div
                className={`flex ml-5 ${
                  haveGroupOpen(group.key) ? 'block' : 'hidden'
                }`}
              >
                ↳
                <div className="flex flex-grow items-center justify-evenly ml-4 transition-all">
                  {filters.map((filter) => {
                    const filterButtonStyle = `font-bold border-2 border-${
                      group.color
                    } rounded-full px-3 py-1 ${
                      !haveSpecificFilter(filter.key)
                        ? `text-${group.color}`
                        : `text-white bg-${group.color}`
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
            </div>
          );
        })}
      </div>
    );

    return (
      <div>
        <div className="mr-4 flex justify-between">
          {/* <a
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
             */}
        </div>
        {menu}
      </div>
    );
  };
  const FilteredItems = (props: { items: MediaItem[] | null }) => {
    // Store get/set
    const { filterGroupOpen } = useStore((state) => state);
    // const haveGroupOpen = (key: string) => {
    //   return filterGroupOpen === key;
    // };
    let selectedFilters = useStore((state) => state.currentFilters);

    // const haveFilters = selectedFilters.length > 0;
    // const reset = useStore((state) => state.reset);

    const filteredItems = props.items
      ? props.items.filter((item) => {
          // If selected groups empty, show all...
          return (
            filterGroupOpen === '' ||
            // ...otherwise, item's filters must match group and ALL selected sub-filters
            (item.initiative.toLowerCase() === filterGroupOpen.toLowerCase() &&
              _.every(
                selectedFilters,
                (r) => _.map(item.filters, 'key').indexOf(r) >= 0
              ))
          );
        })
      : [];

    const count = filteredItems.length;
    // Decide plural of item count
    const showing = `Showing ${count}`;

    return (
      <div className="flex flex-col">
        {RenderFilters(filters)}

        <div className="w-full">
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
                  <ItemRenderer key={i} item={item} />
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
      <FilteredItems items={mediaItems} />
    </Layout>
  );
}

export async function getStaticProps() {
  const filters = await Query(
    'filters',
    `filters { 
            key
            name
        }`
  );
  // console.log(filters);
  if (filters.error) {
    return {
      props: {
        error: filters.error,
        mediaItems: null,
        filtersGrouped: null,
      },
    };
  }

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
			initiative
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
      filters,
      mediaItems: mediaItems as MediaItem[],
    },
  };
}
