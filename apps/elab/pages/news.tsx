import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Image, Query } from '@el-next/components';

import Layout from '../components/Layout';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { News, Event, Item } from '@/types';
import { useRouter } from 'next/router';
import { NewsEventRenderer } from '@/components/Renderers';
import WhatsNewRenderer from '@/components/WhatsNew';

export default function WhatsNew({
  items,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  let filter: string | null = null;
  if (router.asPath.indexOf('news') > 0) filter = 'news';
  else if (router.asPath.indexOf('events') > 0) filter = 'events';

  return (
    <Layout error={error}>
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        {items && <WhatsNewRenderer items={items} filter="news" />}
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  const newsItems = await Query(
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
  const events = await Query(
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

  if (events.error) {
    return {
      props: {
        error: events.error,
        events: null,
      },
    };
  }

  if (newsItems.error) {
    return {
      props: {
        error: newsItems.error,
        newsItems: null,
      },
    };
  }
  const mergedItems = (
    [...(events as Event[]), ...(newsItems as News[])] as Item[]
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
    },
    revalidate: 5,
  };
}
