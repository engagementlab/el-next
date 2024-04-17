import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { Image, Query } from '@el-next/components';
import ImagePlaceholder from '@/components/ImagePlaceholder';

import {
  CustomEase,
  DefaultWhereCondition,
  InitiativeFilterGroups,
  InitiativeKeyMap,
  Studio,
  StudioUnion,
  Theming,
} from '@/types';

import Layout from '../../../components/Layout';
import {
  StudioGenericItemRenderer,
  StudiosGridRenderer,
} from '@/components/Renderers';
import { ClassFilterButton } from '@/shared';

export default function Studios({
  studios,
  initiative,
  initiativeBlurbs,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const FilteredItems = (props: { items: Studio[] | null }) => {
    // Store get/set
    const haveGroupOpen = (key: string) => {
      return key === initiative;
    };

    const ItemRenderer = (props: { item: Studio; index: number }) => {
      let borderColor = 'border-yellow';
      if (props.item.initiatives[0]) {
        if (props.item.initiatives[0] === 'gunviolence')
          borderColor = 'border-purple';
        else if (props.item.initiatives[0] === 'climate')
          borderColor = 'border-leaf';
      }
      return (
        <StudioGenericItemRenderer
          key={props.index}
          index={props.index}
          item={props.item as StudioUnion}
          showBorder={true}
        />
      );
    };
    const RenderFilters = () => {
      const menu = (
        <div className="mx-6 mt-7">
          <h2 className="uppercase leading-10 text-grey text-xl font-bold">
            Filter By:
          </h2>
          <div className="flex flex-col lg:flex-row gap-x-5 gap-y-2">
            {InitiativeFilterGroups.map((group) => {
              return (
                <>
                  <div key={group.key} className="flex flex-row">
                    {/* Hide group selector if other is selected */}
                    <Link
                      href={
                        haveGroupOpen(group.key)
                          ? '/studios'
                          : `/initiatives/${group.key}/studios`
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
                </>
              );
            })}
          </div>
        </div>
      );

      return <div>{menu}</div>;
    };

    return (
      <Layout
        error={error}
        theme={Theming[initiative].theme}
        title={`Studios - ${
          InitiativeFilterGroups.find((i) => i.key === initiative)?.label
        }`}
      >
        <div className="flex flex-col">
          <h1 className="mx-6 font-bold text-4xl xl:text-6xl text-slate">
            Studios
          </h1>
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
              {studios?.length === 0 && (
                <p className="w-full text-xl my-20 text-center">
                  Sorry, no matches found. Please try other filters.
                </p>
              )}

              {studios && studios?.length > 0 && (
                <StudiosGridRenderer>
                  <AnimatePresence>
                    {studios.map((item, i: number) => (
                      <ItemRenderer key={i} index={i} item={item} />
                    ))}
                  </AnimatePresence>
                </StudiosGridRenderer>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return <FilteredItems items={studios} />;
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: ['/initiatives/tngv/studios', '/initiatives/tnej/studios'],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { initiative: string };
}) {
  const studios = await Query(
    'studios',
    `studios(
			${DefaultWhereCondition()},
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
      semesters {
        key
        name
      }
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
        initiative: params.initiative,
        initiativeBlurbs: null,
      },
    };
  }
  const items = studios.filter((item: Studio) =>
    item.initiatives.includes(InitiativeKeyMap[params.initiative])
  );
  return {
    props: {
      studios: items as Studio[],
      initiative: params.initiative,
      initiativeBlurbs: initiativeBlurbs,
    },
    revalidate: 1,
  };
}
