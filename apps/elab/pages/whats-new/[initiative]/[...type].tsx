'use client';
import { GetStaticPathsResult, InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Image, Query } from '@el-next/components';

import Layout from '../../../components/Layout';
import { News, Event, Item, InitiativeKeyMap } from '@/types';
import { useRouter } from 'next/router';
import { NewsEventRenderer } from '@/components/Renderers';
import WhatsNewRenderer from '@/components/WhatsNew';

export default function WhatsNew({
  items,
  type,
  initiative,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error}>
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        {items && (
          <WhatsNewRenderer
            items={items}
            filter={type}
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
      '/whats-new/tngv/news',
      '/whats-new/tnej/news',
      '/whats-new/tngv/events',
      '/whats-new/tnej/events',
    ],
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { initiative: string; type: string };
}) {
  let items = [];

  if (params.type === 'news')
    items = await Query(
      'newsItems',
      `newsItems(
      where: {
          enabled: {
              equals: true
          },
      },
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
          where: {
            enabled: {
              equals: true
            }
          },
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
      },
    };
  }

  return {
    props: {
      items: (items as Item[]).filter((item) =>
        item.initiatives.includes(InitiativeKeyMap[params.initiative])
      ),
      type: params.type,
      initiative: params.initiative,
    },
    revalidate: 1,
  };
}
