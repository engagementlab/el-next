import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { Image, Query } from '@el-next/components';

import Layout from '../components/Layout';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { News, Event, Item, DefaultWhereCondition } from '@/types';
import { useRouter } from 'next/router';
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
    <Layout error={error} title="Events">
      <div className="container mt-14 mb-24 xl:mt-16 px-4 xl:px-8">
        {items && <WhatsNewRenderer items={items} filter="events" />}
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
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
      },
    };
  }

  return {
    props: {
      items: events,
    },
    revalidate: 1,
  };
}
