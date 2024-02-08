'use client';
import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';

import { Image, Query } from '@el-next/components';

import Layout from '../../../components/Layout';
import {
  News,
  Event,
  Item,
  InitiativeKeyMap,
  Theming,
  InitiativeFilterGroups,
  DefaultWhereCondition,
} from '@/types';
import WhatsNewRenderer from '@/components/WhatsNew';

export default function WhatsNew({
  items,
  initiative,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      error={error}
      theme={Theming[initiative].theme}
      title={`What's New - ${
        InitiativeFilterGroups.find((i) => i.key === initiative)?.label
      }`}
    >
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        {items && <WhatsNewRenderer items={items} initiative={initiative} />}
      </div>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: ['/initiatives/tngv/whats-new', '/initiatives/tnej/whats-new'],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { initiative: string };
}) {
  const newsItems = await Query(
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
  const events = await Query(
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

  if (events.error) {
    return {
      props: {
        error: events.error,
        events: null,
        initiative: 'tngv',
      },
    };
  }

  if (newsItems.error) {
    return {
      props: {
        error: newsItems.error,
        newsItems: null,
        initiative: 'tngv',
      },
    };
  }
  const mergedItems = (
    [...(events as Event[]), ...(newsItems as News[])] as Item[]
  )
    .filter((item) =>
      item.initiatives.includes(InitiativeKeyMap[params.initiative])
    )
    .sort((a, b) => {
      let val = 0;
      if (a.publishDate && b.publishDate)
        val = Date.parse(a.publishDate) - Date.parse(b.publishDate);
      else if (a.eventDate && b.eventDate)
        val = Date.parse(a.eventDate) - Date.parse(b.eventDate);
      else if (a.eventDate && b.publishDate)
        val = Date.parse(a.eventDate) - Date.parse(b.publishDate);
      else if (a.publishDate && b.eventDate)
        val = Date.parse(a.publishDate) - Date.parse(b.eventDate);

      return val;
    })
    .reverse();
  return {
    props: {
      items: mergedItems,
      initiative: params.initiative,
    },
    revalidate: 1,
  };
}
