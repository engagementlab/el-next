import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';

import { Query } from '@el-next/components';

import Layout from '../../../components/Layout';
import {
  Item,
  InitiativeKeyMap,
  Theming,
  InitiativeFilterGroups,
  DefaultWhereCondition,
} from '@/types';
import WhatsNewRenderer from '@/components/WhatsNew';

export default function WhatsNew({
  items,
  filter,
  initiative,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      error={error}
      theme={Theming[initiative].theme}
      title={`${filter?.at(0)?.toUpperCase()}${filter?.substring(
        1,
        filter.length
      )} - ${InitiativeFilterGroups.find((i) => i.key === initiative)?.label}`}
    >
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        {items && (
          <WhatsNewRenderer
            items={items}
            filter={filter}
            initiative={initiative}
          />
        )}
      </div>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: [
      '/initiatives/tngv/news',
      '/initiatives/tnej/news',
      '/initiatives/tngv/events',
      '/initiatives/tnej/events',
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { initiative: string; filter: string };
}) {
  let items = [];

  if (params.filter === 'news')
    items = await Query(
      'newsItems',
      `newsItems(
        ${DefaultWhereCondition()},
        orderBy: {
            publishDate: desc
        }		
    ) { 
        title
        key
        blurb {
          document
        }
        initiatives
        publishDate
        externalLink
        thumbnail { 
            publicId
        }
        thumbAltText
        summary
      }`
    );
  else
    items = await Query(
      'events',
      `events(
          ${DefaultWhereCondition()},
          orderBy: {
            eventDate: desc
          }) {
            name 
            key 
            initiatives
            eventDate 
            blurb {
              document
            }
            thumbnail {
              publicId
            }
            thumbAltText
            summary
          }`
    );

  if (items.error) {
    return {
      props: {
        error: items.error,
        items: null,
        initiative: 'tngvi',
      },
    };
  }

  return {
    props: {
      items: (items as Item[]).filter((item) =>
        item.initiatives.includes(InitiativeKeyMap[params.initiative])
      ),
      filter: params.filter,
      initiative: params.initiative,
    },
    revalidate: 1,
  };
}
