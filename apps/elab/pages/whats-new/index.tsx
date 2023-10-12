import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { News, Event, Item, CustomEase, Theming } from '@/types';
import { Query } from '@el-next/components';
import { NewsEventRenderer } from '@/components/Renderers';

import Layout from '../../components/Layout';
import WhatsNewRenderer from '@/components/WhatsNew';

const groupButtonStyle = `flex items-center transition-all text-sm font-bold border-2 rounded-large px-3 py-1 text-green border-green hover:scale-110 hover:text-white hover:bg-green ${CustomEase}`;
export default function WhatsNew({
  items,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout error={error}>
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
          {items && <WhatsNewRenderer items={items} />}
        </div>
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
    revalidate: 1,
  };
}
